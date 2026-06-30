"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAppKitProvider } from "@reown/appkit/react";

import { formatUnits } from "viem";

import { useWallet } from "@/hooks/useWallet";

import { estimateCircleSwap } from "@/services/circle/quote";
import { executeCircleSwap } from "@/services/circle/swap";

type UseSwapParams = {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  balance: number;

  onSuccess?: (
    result: SwapStatusResult
  ) => void;
};

export function useSwap({
  fromToken,
  toToken,
  fromAmount,
  balance,
  onSuccess,
}: UseSwapParams) {
  const { walletProvider } =
    useAppKitProvider("eip155");

  const { address } =
    useWallet();

  // ==========================
  // State
  // ==========================

  const [estimate, setEstimate] =
    useState<any>(null);

  const [quoteLoading, setQuoteLoading] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState("Swap");

  const [error, setError] =
    useState<string | null>(null);

  // ==========================
  // Provider Audit
  // ==========================

  useEffect(() => {
    console.group("Provider Audit");

    console.log(
      "exists:",
      !!walletProvider,
    );

    console.log(
      "request:",
      typeof walletProvider?.request,
    );

    console.log(
      "on:",
      typeof walletProvider?.on,
    );

    console.log(
      "removeListener:",
      typeof walletProvider?.removeListener,
    );

    console.groupEnd();
  }, [walletProvider]);

  // ==========================
  // Quote
  // ==========================

  useEffect(() => {
    let cancelled = false;

    async function loadQuote() {
      if (
        !address ||
        !fromAmount ||
        Number(fromAmount) <= 0
      ) {
        setEstimate(null);
        return;
      }

      setQuoteLoading(true);

      try {
        const result =
          await estimateCircleSwap({
            from: {
              address,
              chain: "Arc_Testnet",
            },

            tokenIn: fromToken,

            tokenOut: toToken,

            amountIn: fromAmount,
          });

        if (!cancelled) {
          setEstimate(result);
        }
      } catch (err) {
        console.error(
          "Estimate failed:",
          err,
        );

        if (!cancelled) {
          setEstimate(null);
        }
      } finally {
        if (!cancelled) {
          setQuoteLoading(false);
        }
      }
    }

    loadQuote();

    return () => {
      cancelled = true;
    };
  }, [
    address,
    fromAmount,
    fromToken,
    toToken,
  ]);

  // ==========================
  // Validation
  // ==========================


const validation = useMemo(() => {
  if (!walletProvider) {
    return {
      valid: false,
      message: "Connect Wallet",
    };
  }

  if (!fromAmount) {
    return {
      valid: false,
      message: "Enter amount",
    };
  }

  const amount = Number(fromAmount);

  if (
    Number.isNaN(amount) ||
    amount <= 0
  ) {
    return {
      valid: false,
      message: "Invalid amount",
    };
  }

  if (balance < amount) {
    return {
      valid: false,
      message:
        "Insufficient balance",
    };
  }

  return {
    valid: true,
    message: "Swap",
  };
}, [
  walletProvider,
  fromAmount,
  balance,
]);

// ==========================
// Execute Swap
// ==========================

async function swap() {
  if (
    !walletProvider ||
    !validation.valid
  ) {
    return;
  }

  setLoading(true);
  setError(null);
  setStatus("Estimating...");

  try {
    setStatus(
      "Waiting Confirmation..."
    );

    const result =
  await executeCircleSwap({
    walletProvider,
    fromToken,
    toToken,
    amount: fromAmount,
  });

console.log("========== SWAP RESULT ==========");

console.log(
  JSON.stringify(result, null, 2)
);

onSuccess?.(result);
    setStatus("Success");

    return result;
  } catch (err) {
    console.error(
      "Swap Error:",
      err,
    );

    const message =
      err instanceof Error
        ? err.message
        : "Swap failed";

    setError(message);

    setStatus("Failed");
  } finally {
    setLoading(false);

    setTimeout(() => {
      setStatus("Swap");
    }, 2000);
  }
}

// ==========================
// Derived Quote Data
// ==========================

const exchangeRate =
  estimate?.estimatedAmount &&
  Number(fromAmount) > 0
    ? (
        Number(
          formatUnits(
            BigInt(
              estimate.estimatedAmount
            ),
            6
          )
        ) / Number(fromAmount)
      ).toFixed(6)
    : "--";

// ==========================
// Hook Return
// ==========================

return {
  quote: {
    loading: quoteLoading,

    amount:
      estimate?.estimatedAmount
        ? formatUnits(
            BigInt(
              estimate.estimatedAmount
            ),
            6
          )
        : "",

    rate: exchangeRate,

    fee:
      estimate?.fees?.provider
        ?.length
        ? `${formatUnits(
            BigInt(
              estimate.fees.provider[0]
                .amount
            ),
            estimate.fees.provider[0]
              .decimals
          )} ${
            estimate.fees.provider[0]
              .symbol
          }`
        : "--",

    provider:
      estimate?.route?.steps?.[0]
        ?.toolName ??
      estimate?.route?.provider ??
      "--",

    raw: estimate,
  },

  validation,

  loading,

  status,

  error,

  swap,
};
}