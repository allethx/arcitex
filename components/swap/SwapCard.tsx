"use client";

import { useEffect, useState } from "react";

import TokenModal from "@/components/modal/TokenModal";

import SwapHeader from "./SwapHeader";
import SwapInput from "./SwapInput";
import SwapOutput from "./SwapOutput";
import SwapSwitch from "./SwapSwitch";
import SwapInfo from "./SwapInfo";
import SwapAction from "./SwapAction";

import { useWallet } from "@/hooks/useWallet";
import { useSwap } from "@/hooks/useSwap";
import { useTokenBalance } from "@/hooks/useTokenBalance";

import { getTokenBySymbol } from "@/lib/tokens";

export default function SwapCard() {
  const [openModal, setOpenModal] = useState(false);

  const [fromToken, setFromToken] =
    useState("USDC");

  const [toToken, setToToken] =
    useState("EURC");

  const [fromAmount, setFromAmount] =
    useState("");

  const [selecting, setSelecting] =
    useState<"from" | "to">("from");
  
    const [mounted, setMounted] =
  useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  const { connected } = useWallet();

  const selectedToken =
    getTokenBySymbol(fromToken);

  const {
    balance,
  } = useTokenBalance({
    token: selectedToken?.address,
  });

  const {
    quote,
    validation,
    loading,
    swap,
  } = useSwap({
    fromToken,
    toToken,
    fromAmount,
    balance,
  });

  function handleSwapDirection() {
    setFromToken(toToken);
    setToToken(fromToken);
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
          balance={balance}
          onChange={setFromAmount}
          onSelect={() => {
            setSelecting("from");
            setOpenModal(true);
          }}
        />

        <SwapSwitch
          onClick={handleSwapDirection}
        />

        <SwapOutput
          value={quote.amount}
          token={toToken}
          onSelect={() => {
            setSelecting("to");
            setOpenModal(true);
          }}
        />

        <SwapInfo
         rate={quote.rate}
        loading={quote.loading}
         fee={quote.fee}
        route={quote.provider}
         fromToken={fromToken}
         toToken={toToken}
        />

        {mounted && (
         <SwapAction
            connected={connected}
           valid={validation.valid}
           message={validation.message}
          loading={loading}
           onSwap={swap}
         />
)}
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