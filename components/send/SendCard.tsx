"use client";

import { useState } from "react";

import { SendHorizonal } from "lucide-react";

import RecipientInput from "./RecipientInput";
import AmountInput from "./AmountInput";
import TokenSelector from "./TokenSelector";
import SendInfo from "./SendInfo";
import SendButton from "./SendButton";
import SendSuccessModal from "./SendSuccessModal";

import { useMounted } from "@/hooks/useMounted";
import { useSend } from "@/hooks/useSend";
import { useHistory } from "@/hooks/useHistory";
import { useTokenBalance } from "@/hooks/useTokenBalance";

import { getTokenBySymbol } from "@/lib/tokens";

export default function SendCard() {
  const mounted = useMounted();

  const [recipient, setRecipient] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [token, setToken] =
    useState("USDC");

  const [openSuccess, setOpenSuccess] =
    useState(false);

  const { addHistory } =
    useHistory();

  // ==========================================
  // Selected Token
  // ==========================================

  const selectedToken =
    getTokenBySymbol(token);

  // ==========================================
  // Balance
  // ==========================================

  const {
    balance,
    loading: balanceLoading,
  } = useTokenBalance({
    token: selectedToken?.address,
    decimals:
      selectedToken?.decimals,
    symbol:
      selectedToken?.symbol,
  });

  // ==========================================
  // Send Hook
  // ==========================================

  const {
    send,
    loading,
    status,
    validation,
    error,
    estimate,
    result,
  } = useSend({
    recipient,
    token,
    amount,
    balance,

    onSuccess: (result) => {
      addHistory({
        id: crypto.randomUUID(),

        type: "send",

        txHash:
          result.txHash,

        fromToken:
          token,

        toToken:
          "Wallet",

        fromAmount:
          amount,

        toAmount:
          amount,

        recipient,

        status:
          "Completed",

        timestamp:
          Date.now(),
      });

      setRecipient("");
      setAmount("");
      setToken("USDC");

      setOpenSuccess(true);
    },
  });

  return (
    <>
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/5
          bg-[#171A23]/90
          p-6
          backdrop-blur-xl
        "
      >
        {/* Header */}

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-sky-500
              to-violet-600
              shadow-[0_0_30px_rgba(56,189,248,.30)]
            "
          >
            <SendHorizonal className="h-7 w-7 text-white" />
          </div>

          <div>

            <h2 className="text-4xl font-bold tracking-tight">
              Send
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Transfer USDC securely to another wallet.
            </p>

          </div>

        </div>

        <div className="mt-8 space-y-5">

          <RecipientInput
            value={recipient}
            onChange={setRecipient}
          />

          <TokenSelector
            token={token}
            onChange={setToken}
          />

          <AmountInput
            value={amount}
            onChange={setAmount}
            balance={
              mounted
                ? balance
                : 0
            }
            loading={
              mounted
                ? balanceLoading
                : true
            }
            onMax={() =>
              setAmount(
                balance.toString(),
              )
            }
          />

          <SendInfo
            estimate={estimate}
          />

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {!validation.valid && (
            <div
              className="
                rounded-xl
                border
                border-red-500/30
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-300
              "
            >
              {validation.message}
            </div>
          )}

          <SendButton
            loading={loading}
            disabled={
              !validation.valid
            }
            onClick={send}
          >
            {status}
          </SendButton>

        </div>
      </div>

      <SendSuccessModal
        open={openSuccess}
        result={result}
        onClose={() =>
          setOpenSuccess(false)
        }
      />
    </>
  );
}