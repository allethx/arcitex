"use client";

import { useMemo, useState } from "react";

import { useAppKitProvider } from "@reown/appkit/react";

import { useWallet } from "@/hooks/useWallet";
import { executeCircleSend } from "@/services/circle/send";
import { isAddress } from "viem";

type UseSendParams = {
  recipient: string;
  token: string;
  amount: string;
  balance: number;

  onSuccess?: (result: any) => void;
};

export function useSend({
  recipient,
  token,
  amount,
  balance,
  onSuccess,
}: UseSendParams) {
  const { walletProvider } =
    useAppKitProvider("eip155");

  const { connected } =
    useWallet();

  // ==========================
  // State
  // ==========================

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState("Send");

  const [estimate, setEstimate] =
    useState<any>(null);

  const [result, setResult] =
    useState<any>(null);

  const [error, setError] =
    useState<string | null>(null);

  // ==========================
  // Validation
  // ==========================

  const validation = useMemo(() => {
    if (!connected || !walletProvider) {
      return {
        valid: false,
        message: "Connect Wallet",
      };
    }

    if (!recipient.trim()) {
      return {
        valid: false,
        message: "Enter recipient",
      };
    }

    if (!amount) {
      return {
        valid: false,
        message: "Enter amount",
      };
    }

    const value = Number(amount);

    if (
      Number.isNaN(value) ||
      value <= 0
    ) {
      return {
        valid: false,
        message: "Invalid amount",
      };
    }

    if (balance < value) {
      return {
        valid: false,
        message:
          "Insufficient balance",
      };
    }

    return {
      valid: true,
      message: "Send",
    };
  }, [
    connected,
    walletProvider,
    recipient,
    amount,
    balance,
  ]);

  // ==========================
  // Execute Send
  // ==========================

  async function send() {
    if (
      !walletProvider ||
      !validation.valid
    ) {
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("Sending...");

    try {
      const response =
        await executeCircleSend({
          walletProvider,
          recipient,
          token,
          amount,
        });

      setEstimate(
        response.estimate
      );

      setResult(
        response.result
      );

      onSuccess?.(
        response.result
      );

      setStatus("Success");

      return response;
    } catch (err) {
      console.error(
        "Send Error:",
        err,
      );

      const message =
        err instanceof Error
          ? err.message
          : "Send failed";

      setError(message);

      setStatus("Failed");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setStatus("Send");
      }, 2000);
    }
  }

  // ==========================
  // Hook Return
  // ==========================

  return {
    validation,

    loading,

    status,

    error,

    estimate,

    result,

    send,
  };
}