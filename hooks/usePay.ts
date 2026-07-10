"use client";

import { useMemo, useState } from "react";

import { useAppKitProvider } from "@reown/appkit/react";

import { useWallet } from "@/hooks/useWallet";
import { executeCircleSend } from "@/services/circle/send";

type UsePayParams = {
  recipient: string;
  token: string;
  amount: string;
  balance: number;

  idleLabel?: string;

  onSuccess?: (result: any) => void;
};

export function usePay({
  recipient,
  token,
  amount,
  balance,
  idleLabel = "Pay",
  onSuccess,
}: UsePayParams) {
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
    useState(idleLabel);

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

    if (!recipient || !recipient.trim()) {
      return {
        valid: false,
        message: "Recipient required",
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
      message: idleLabel,
    };
  }, [
    connected,
    walletProvider,
    recipient,
    amount,
    balance,
    idleLabel,
  ]);

  // ==========================
  // Execute Payment
  // ==========================

  async function pay() {
    if (
      !walletProvider ||
      !validation.valid
    ) {
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("Processing...");

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
        "Payment Error:",
        err,
      );

      const message =
        err instanceof Error
          ? err.message
          : "Payment failed";

      setError(message);

      setStatus("Failed");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setStatus(idleLabel);
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

    pay,
  };
}
