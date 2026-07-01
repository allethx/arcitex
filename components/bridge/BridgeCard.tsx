"use client";

import {
  useEffect,
  useState,
} from "react";

import ChainSelector from "./ChainSelector";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import BridgeInfo from "./BridgeInfo";
import BridgeButton from "./BridgeButton";
import BridgeSuccessModal from "./BridgeSuccessModal";

import { useBridge } from "@/hooks/useBridge";
import { useHistory } from "@/hooks/useHistory";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { getTokenBySymbol } from "@/lib/tokens";

const DEFAULT_TOKEN = "USDC";

export default function BridgeCard() {
  const mounted =
    useMounted();

  const [fromChain, setFromChain] =
    useState("Arc_Testnet");

  const [toChain, setToChain] =
    useState("Ethereum_Sepolia");

  const [token, setToken] =
    useState(DEFAULT_TOKEN);

  const [amount, setAmount] =
    useState("");

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
  bridge,
  loading,
  status,
  validation,
  error,
  result,
  estimate,
  } = useBridge({
    fromChain,
    toChain,
    token,
    amount,
    balance,

    onSuccess: (result) => {
      addHistory({
        id: crypto.randomUUID(),

        txHash:
          result?.txHash ?? "",

        fromToken: token,

        toToken: token,

        fromAmount: amount,

        toAmount: amount,

        status: "Completed",

        timestamp: Date.now(),
      });

      setAmount("");

      setToken(DEFAULT_TOKEN);

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
          Bridge
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Move your USDC across supported blockchains.
        </p>

        <div className="mt-8 space-y-5">

          <ChainSelector
            label="From Chain"
            value={fromChain}
            onChange={setFromChain}
          />

          <ChainSelector
            label="To Chain"
            value={toChain}
            onChange={setToChain}
          />

          <TokenSelector
            token={token}
            onChange={setToken}
          />

          <AmountInput
            value={amount}
            onChange={setAmount}
          />

          <BridgeInfo
  estimate={estimate}
/>

          {mounted &&
            error && (
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
                {error}
              </div>
            )}

          {mounted &&
            !error &&
            !validation.valid && (
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

          <BridgeButton
            loading={loading}
            disabled={
              mounted
                ? !validation.valid
                : true
            }
            onClick={bridge}
          >
            {status}
          </BridgeButton>

        </div>
      </div>

      <BridgeSuccessModal
        open={openSuccess}
        result={result}
        onClose={() =>
          setOpenSuccess(false)
        }
      />
    </>
  );
}

function useMounted() {
  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}