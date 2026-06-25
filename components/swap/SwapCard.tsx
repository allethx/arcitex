"use client";

import { useEffect, useState } from "react";

import { ArrowDownUp, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";


import TokenButton from "./TokenButton";
import TokenModal from "@/components/modal/TokenModal";
import SwapInfo from "./SwapInfo";
import { useQuote } from "@/hooks/useQuote";
export default function SwapCard() {
  const [openModal, setOpenModal] = useState(false);
  const {
  quote,
  loading,
  fetchQuote,
} = useQuote();

  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");

  const [fromAmount, setFromAmount] = useState("");

  const [selecting, setSelecting] =
    useState<"from" | "to">("from");


 function handleSwap() {
  const oldFrom = fromToken;
  const oldTo = toToken;

  setFromToken(oldTo);
  setToToken(oldFrom);

  if (fromAmount) {
    fetchQuote(
      oldTo,
      oldFrom,
      fromAmount
    );
  }
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
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold">
            Swap
          </h2>

          <button className="rounded-xl p-2 hover:bg-zinc-800">

            <Settings2 className="h-5 w-5" />

          </button>

        </div>

        {/* FROM */}

        <div className="rounded-2xl bg-zinc-800 p-4">

          <p className="mb-2 text-sm text-zinc-400">

            You Pay

          </p>

          <div className="flex items-center justify-between">

            <input
              value={fromAmount}
             onChange={async (e) => {
  const value = e.target.value;

  setFromAmount(value);

  await fetchQuote(
    fromToken,
    toToken,
    value
  );
}}
              placeholder="0.0"
              className="w-36 bg-transparent text-3xl font-semibold outline-none"
            />

            <TokenButton
              symbol={fromToken}
              onClick={() => {
                setSelecting("from");
                setOpenModal(true);
              }}
            />

          </div>

        </div>

        {/* SWITCH */}

        <div className="my-3 flex justify-center">

          <button
            onClick={handleSwap}
            className="
              rounded-full
              border
              border-zinc-700
              bg-zinc-800
              p-3
              transition
              hover:rotate-180
            "
          >

            <ArrowDownUp className="h-5 w-5" />

          </button>

        </div>

        {/* TO */}

        <div className="rounded-2xl bg-zinc-800 p-4">

          <p className="mb-2 text-sm text-zinc-400">

            You Receive

          </p>

          <div className="flex items-center justify-between">

            <input
             value={quote?.buyAmount ?? ""}
              readOnly
              placeholder="0.0"
              className="w-36 bg-transparent text-3xl font-semibold outline-none"
            />

            <TokenButton
              symbol={toToken}
              onClick={() => {
                setSelecting("to");
                setOpenModal(true);
              }}
            />

          </div>

        </div>

      <SwapInfo
  rate={Number(quote?.price ?? 0)}
  loading={loading}
  fee={`${quote?.estimatedGas ?? "--"} ETH`}
  route={`${fromToken} → ${toToken}`}
/>

        <Button
          className="
            mt-6
            h-12
            w-full
            rounded-2xl
            bg-violet-600
            hover:bg-violet-500
          "
        >
          Connect Wallet
        </Button>

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