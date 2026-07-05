"use client";

import { useState } from "react";

import { SendHorizontal } from "lucide-react";

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
          group
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.03]
          p-7
          backdrop-blur-2xl
          transition-all
          duration-500
          hover:border-violet-400/30
          hover:shadow-[0_0_70px_rgba(168,85,247,0.14)]
          sm:p-9
        "
      >
        {/* Ambient glow */}

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-sky-500/10
            blur-[110px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -bottom-24
            h-72
            w-72
            rounded-full
            bg-violet-600/12
            blur-[110px]
          "
        />

        {/* Header */}

        <div className="relative flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-sky-500
              to-violet-600
              shadow-[0_0_30px_rgba(56,189,248,.30)]
            "
          >
            <SendHorizontal className="h-7 w-7 text-white" />
          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
              Transfer
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Send
            </h2>

          </div>

        </div>

        <p className="relative mt-3 text-sm leading-relaxed text-slate-400">
          Transfer USDC securely to another wallet, anywhere on Arc.
        </p>

        <div className="relative mt-8 space-y-5">

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
                rounded-2xl
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
