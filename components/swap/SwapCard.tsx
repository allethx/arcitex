"use client";

import { useEffect, useState } from "react";

import TokenModal from "@/components/modal/TokenModal";
import SwapSuccessModal from "@/components/modal/SwapSuccessModal";

import SwapHeader from "./SwapHeader";
import SwapInput from "./SwapInput";
import SwapOutput from "./SwapOutput";
import SwapSwitch from "./SwapSwitch";
import SwapInfo from "./SwapInfo";
import SwapAction from "./SwapAction";

import { useWallet } from "@/hooks/useWallet";
import { useSwap } from "@/hooks/useSwap";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useHistory } from "@/hooks/useHistory";

import { getTokenBySymbol } from "@/lib/tokens";

export default function SwapCard() {
  const [openModal, setOpenModal] =
    useState(false);

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

  const [successOpen, setSuccessOpen] =
    useState(false);

  const [successData, setSuccessData] =
    useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { connected } =
    useWallet();

  const { addHistory } =
    useHistory();

  const selectedToken =
    getTokenBySymbol(fromToken);

  const { balance } =
    useTokenBalance({
      token: selectedToken?.address,
    });

  const {
    quote,
    validation,
    loading,
    status,
    swap,
  } = useSwap({
    fromToken,
    toToken,
    fromAmount,
    balance,

    onSuccess(result) {
      setSuccessData(result);

      setSuccessOpen(true);

      addHistory({
        id: crypto.randomUUID(),

        type: "swap",

        txHash: result.txHash,

        fromToken,

        toToken,

        fromAmount,

        toAmount:
          result.amountOut,

        status: "Completed",

        timestamp: Date.now(),
      });
    },
  });

  function handleSwapDirection() {
    setFromToken(toToken);
    setToToken(fromToken);
  }

  return (
    <>
      <div
        className="
          mt-10
          w-full
          max-w-md
          rounded-[32px]
          border
          border-white/10
          bg-[#11131A]/80
          p-6
          backdrop-blur-2xl
          shadow-[0_0_60px_rgba(56,189,248,.08)]
          transition-all
        "
      >
        <SwapHeader />

        <div className="mt-6 space-y-4">

          {/* From */}

          <div
            className="
              rounded-3xl
              border
              border-white/5
              bg-white/[0.03]
              p-4
              transition
              hover:border-sky-500/20
            "
          >
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
          </div>

          {/* Switch */}

          <div className="flex justify-center">
            <SwapSwitch
              onClick={
                handleSwapDirection
              }
            />
          </div>

          {/* To */}

          <div
            className="
              rounded-3xl
              border
              border-white/5
              bg-white/[0.03]
              p-4
              transition
              hover:border-sky-500/20
            "
          >
            <SwapOutput
              value={quote.amount}
              token={toToken}
              onSelect={() => {
                setSelecting("to");
                setOpenModal(true);
              }}
            />
          </div>

        </div>

        {/* Quote */}

        <div className="mt-5">
          <SwapInfo
            rate={quote.rate}
            loading={quote.loading}
            fee={quote.fee}
            route={quote.provider}
            fromToken={fromToken}
            toToken={toToken}
          />
        </div>

        {/* Button */}

        {mounted && (
          <>
            <div className="mt-6">
              <SwapAction
                connected={connected}
                valid={
                  validation.valid
                }
                message={
                  loading
                    ? status
                    : validation.message
                }
                loading={loading}
                onSwap={swap}
              />
            </div>

            <SwapSuccessModal
              open={successOpen}
              onClose={() =>
                setSuccessOpen(false)
              }
              fromToken={fromToken}
              toToken={toToken}
              fromAmount={fromAmount}
              toAmount={
                successData?.amountOut ??
                quote.amount
              }
              txHash={
                successData?.txHash ??
                ""
              }
            />
          </>
        )}
      </div>

      <TokenModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSelect={(token) => {
          if (
            selecting === "from"
          ) {
            setFromToken(token);
          } else {
            setToToken(token);
          }
        }}
      />
    </>
  );
}