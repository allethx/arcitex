"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAppKitProvider } from "@reown/appkit/react";

import { useWallet } from "@/hooks/useWallet";

import { executeBridge } from "@/services/circle/bridge";
import { estimateBridge } from "@/services/circle/bridgeQuote";

type UseBridgeParams = {
  fromChain: string;

  toChain: string;

  token: string;

  amount: string;

  balance: number;

  onSuccess?: (result: any) => void;
};

export function useBridge({
  fromChain,
  toChain,
  token,
  amount,
  balance,
  onSuccess,
}: UseBridgeParams) {
  const { walletProvider } =
    useAppKitProvider("eip155");

  const { connected } =
    useWallet();

  const [mounted, setMounted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [quoteLoading, setQuoteLoading] =
    useState(false);

  const [status, setStatus] =
    useState("Bridge");

  const [error, setError] =
    useState<string | null>(null);

  const [result, setResult] =
    useState<any>(null);

  const [estimate, setEstimate] =
    useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ==========================
  // Bridge Estimate
  // ==========================

  useEffect(() => {
    let cancelled = false;

    async function loadEstimate() {
      if (
        !mounted ||
        !walletProvider ||
        !connected ||
        !amount ||
        Number(amount) <= 0
      ) {
        setEstimate(null);
        return;
      }

      setQuoteLoading(true);

      try {
        const response =
          await estimateBridge({
            walletProvider,
            fromChain,
            toChain,
            amount,
          });

        if (!cancelled) {
          setEstimate(response);
        }
      } catch (err) {
        console.error(
          "Bridge Estimate Error:",
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

    loadEstimate();

    return () => {
      cancelled = true;
    };
  }, [
    mounted,
    walletProvider,
    connected,
    fromChain,
    toChain,
    amount,
  ]);

  // ==========================
  // Validation
  // ==========================

  const validation =
    useMemo(() => {
      if (!mounted) {
        return {
          valid: false,
          message: "",
        };
      }

      if (!connected) {
        return {
          valid: false,
          message:
            "Connect Wallet",
        };
      }

      if (!walletProvider) {
        return {
          valid: false,
          message:
            "Wallet unavailable",
        };
      }

      if (!amount.trim()) {
        return {
          valid: false,
          message:
            "Enter amount",
        };
      }

      const value =
        Number(amount);

      if (
        Number.isNaN(value) ||
        value <= 0
      ) {
        return {
          valid: false,
          message:
            "Invalid amount",
        };
      }

      if (value > balance) {
        return {
          valid: false,
          message:
            "Insufficient balance",
        };
      }

      if (
        fromChain === toChain
      ) {
        return {
          valid: false,
          message:
            "Choose another destination chain",
        };
      }

      return {
        valid: true,
        message: "Bridge",
      };
    }, [
      mounted,
      connected,
      walletProvider,
      amount,
      balance,
      fromChain,
      toChain,
    ]);

  // ==========================
  // Execute Bridge
  // ==========================

  async function bridge() {
    if (
      !mounted ||
      !walletProvider ||
      !validation.valid
    ) {
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("Bridging...");

    try {
      console.group("Bridge");

      console.log("From:", fromChain);
      console.log("To:", toChain);
      console.log("Token:", token);
      console.log("Amount:", amount);

      const response =
        await executeBridge({
          walletProvider,
          fromChain,
          toChain,
          amount,
        });

      console.log("Bridge Result");

      console.dir(response, {
        depth: null,
      });

      console.groupEnd();

      setResult(response);

      // ==========================
      // SUCCESS
      // ==========================

      if (
        response.state ===
        "success"
      ) {
        setStatus("Success");

        onSuccess?.(response);

        return response;
      }

      // ==========================
      // FAILED
      // ==========================

      setStatus("Failed");

      setError(
        "Bridge transaction failed."
      );

      return response;
    } catch (err) {
      console.error(
        "Bridge Error:",
        err,
      );

      setStatus("Failed");

      setError(
        err instanceof Error
          ? err.message
          : "Bridge failed"
      );
    } finally {
      setLoading(false);

      setTimeout(() => {
        setStatus("Bridge");
      }, 2000);
    }
  }

  return {
    bridge,

    loading,

    status,

    validation,

    error,

    result,

    estimate: {
      loading: quoteLoading,

      raw: estimate,
    },
  };
}