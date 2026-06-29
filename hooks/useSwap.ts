"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAppKitProvider } from "@reown/appkit/react";

import type {
  SwapStatusResult,
} from "@circle-fin/app-kit";

import { estimateCircleSwap } from "@/services/circle/quote";
import { executeCircleSwap } from "@/services/circle/swap";

import { formatUnits } from "viem";
import { useWallet } from "@/hooks/useWallet";
import { buildTransactions } from "@/services/circle/executor";

type UseSwapParams = {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  balance: number;
};

export function useSwap({
  fromToken,
  toToken,
  fromAmount,
  balance,
}: UseSwapParams) {
  const { walletProvider } =
    useAppKitProvider("eip155");
const {
  address,
} = useWallet();
  const [estimate, setEstimate] =
  useState<any>(null);

  const [quoteLoading, setQuoteLoading] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  // ===== Provider Audit =====
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

  // ===== Quote =====
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
  
console.log("LOAD QUOTE", {
  address,
  fromAmount,
  fromToken,
  toToken,
});

console.log("LOAD QUOTE", {
  address,
  fromAmount,
  fromToken,
  toToken,
});

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
  fromToken,
  toToken,
  fromAmount,
]);

  // ===== Validation =====
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

    const amount =
      Number(fromAmount);

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

  // ===== Execute Swap =====
 async function swap(): Promise<any> 
  
 {
     if (
      !walletProvider ||
      !validation.valid
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
    const estimate =
  await estimateCircleSwap({
    from: {
      address: address ?? "",
      chain: "Arc_Testnet",
    },

    tokenIn: fromToken,
    tokenOut: toToken,
    amountIn: fromAmount,
  });

console.log(
  "Execution Params",
  estimate.transaction.executionParams
);

const transactions = buildTransactions(
  estimate.transaction.executionParams,
  address ?? ""
);

console.log("Transactions");

transactions.forEach((tx, index) => {
  console.group(
    `Transaction ${index + 1}`
  );

  console.log("From:", tx.from);
  console.log("To:", tx.to);
  console.log("Value:", tx.value);
  console.log("Data:", tx.data);

  console.groupEnd();
});

const instructions =
  estimate.transaction.executionParams.instructions;

console.log(
  "Instructions Count:",
  instructions.length
);

const tx = transactions[0];

console.log("Sending Transaction");
console.log(tx);
const txHash =
  await walletProvider.request({
    method: "eth_sendTransaction",
    params: [tx],
  });

console.log("Tx Hash:", txHash);



return txHash;

return transactions;

    } catch (err) {
      console.error(
        "Swap Error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Swap failed",
      );
    } finally {
      setLoading(false);
    }
  }

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

  return {
 quote: {
  loading: quoteLoading,

  amount:
    estimate?.estimatedAmount
      ? formatUnits(
          BigInt(estimate.estimatedAmount),
          6
        )
      : "",

  rate: exchangeRate,

  fee:
    estimate?.fees?.provider?.length
      ? `${formatUnits(
          BigInt(
            estimate.fees.provider[0].amount
          ),
          estimate.fees.provider[0].decimals
        )} ${estimate.fees.provider[0].symbol}`
      : "--",

  provider:
    estimate?.route?.steps?.[0]?.toolName ??
    estimate?.route?.provider ??
    "--",

  raw: estimate,
},

    validation,

    loading,

    error,

    swap,
  };
}