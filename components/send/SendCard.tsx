"use client";

import { useState } from "react";

import RecipientInput from "./RecipientInput";
import AmountInput from "./AmountInput";
import TokenSelector from "./TokenSelector";
import SendInfo from "./SendInfo";
import SendButton from "./SendButton";
import SendSuccessModal from "./SendSuccessModal";

import { useSend } from "@/hooks/useSend";
import { useHistory } from "@/hooks/useHistory";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { getTokenBySymbol } from "@/lib/tokens";

export default function SendCard() {
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

  const selectedToken =
    getTokenBySymbol(token);

  const { balance } =
    useTokenBalance({
      token: selectedToken?.address,
    });

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

        txHash: result.txHash,

        fromToken: token,

        toToken: "Wallet",

        fromAmount: amount,

        toAmount: amount,

        status: "Completed",

        timestamp: Date.now(),
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
          border-zinc-800
          bg-zinc-900/70
          p-6
          backdrop-blur-xl
        "
      >
        <h2 className="text-3xl font-bold">
          Send
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Send USDC or EURC to another wallet.
        </p>

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
            disabled={!validation.valid}
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