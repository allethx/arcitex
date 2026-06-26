"use client";

import { useState } from "react";

import TokenModal from "@/components/modal/TokenModal";

import SwapHeader from "./SwapHeader";
import SwapInput from "./SwapInput";
import SwapOutput from "./SwapOutput";
import SwapSwitch from "./SwapSwitch";
import SwapInfo from "./SwapInfo";
import SwapAction from "./SwapAction";

import { useQuote } from "@/hooks/useQuote";
import { useWallet } from "@/providers/WalletProvider";
import { useBalance } from "@/hooks/useBalance";
import { useSwapValidation } from "@/hooks/useSwapValidation";

export default function SwapCard() {
  const [openModal, setOpenModal] = useState(false);

  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");

  const [fromAmount, setFromAmount] = useState("");

  const [selecting, setSelecting] =
    useState<"from" | "to">("from");

  const {
    quote,
    loading,
    fetchQuote,
  } = useQuote();

  const { connected } = useWallet();

  const { eth } = useBalance();

  const validation = useSwapValidation({
    balance: eth,
    amount: fromAmount,
  });

  async function handleInput(value: string) {
    setFromAmount(value);

    await fetchQuote(
      fromToken,
      toToken,
      value
    );
  }

  async function handleSwapDirection() {
    const oldFrom = fromToken;
    const oldTo = toToken;

    setFromToken(oldTo);
    setToToken(oldFrom);

    if (!fromAmount) return;

    await fetchQuote(
      oldTo,
      oldFrom,
      fromAmount
    );
  }

  function handleSwap() {
    console.log("Swap");

    console.log({
      fromToken,
      toToken,
      fromAmount,
      quote,
    });
  }

  return (
    <>
      <div
        className="
          mt-16
          w-full
          max-w-md
          rounded-3xl
          border
          border-zinc-700
          bg-zinc-900/70
          p-6
          backdrop-blur-xl
        "
      >
        <SwapHeader />

        <SwapInput
          value={fromAmount}
          token={fromToken}
          onChange={handleInput}
          onSelect={() => {
            setSelecting("from");
            setOpenModal(true);
          }}
        />

        <SwapSwitch
          onClick={handleSwapDirection}
        />

        <SwapOutput
          value={quote?.buyAmount ?? ""}
          token={toToken}
          onSelect={() => {
            setSelecting("to");
            setOpenModal(true);
          }}
        />

        <SwapInfo
          rate={Number(quote?.price ?? 0)}
          loading={loading}
          fee={`${quote?.estimatedGas ?? "--"} ETH`}
          route={`${fromToken} → ${toToken}`}
        />

        <SwapAction
          connected={connected}
          valid={validation.valid}
          message={validation.message}
          loading={loading}
          onSwap={handleSwap}
        />
      </div>

      <TokenModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSelect={(token) => {
          if (selecting === "from") {
            setFromToken(token);
          } else {
            setToToken(token);
          }
        }}
      />
    </>
  );
}