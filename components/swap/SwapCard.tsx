"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Settings2, ArrowDownUp } from "lucide-react";

import TokenButton from "./TokenButton";
import SwapInfo from "./SwapInfo";
import TokenModal from "@/components/modal/TokenModal";

export default function SwapCard() {
  const [openModal, setOpenModal] = useState(false);

  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");

  const [selecting, setSelecting] = useState<"from" | "to">("from");

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
          shadow-[0_0_60px_rgba(139,92,246,0.15)]
          backdrop-blur
        "
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Swap</h2>

          <button className="rounded-xl p-2 transition hover:bg-zinc-800">
            <Settings2 className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* FROM */}

          <div className="rounded-2xl bg-zinc-800 p-4">
            <p className="mb-2 text-sm text-zinc-400">
              You Pay
            </p>

            <div className="flex items-center justify-between">
              <input
                placeholder="0.0"
                className="w-32 bg-transparent text-3xl outline-none"
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

          <div className="flex justify-center">
            <button
              className="
                rounded-full
                border
                border-zinc-700
                bg-zinc-800
                p-3
                transition
                hover:rotate-180
                hover:bg-zinc-700
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
                placeholder="0.0"
                className="w-32 bg-transparent text-3xl outline-none"
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

          <SwapInfo />

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