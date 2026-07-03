"use client";

import {
  useEffect,
  useState,
} from "react";

import BridgeHeader from "./BridgeHeader";
import ChainSelector from "./ChainSelector";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import BridgeInfo from "./BridgeInfo";
import BridgeButton from "./BridgeButton";
import BridgeSuccessModal from "./BridgeSuccessModal";

import { useBridge } from "@/hooks/useBridge";
import { useHistory } from "@/hooks/useHistory";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useAutoSwitchNetwork } from "@/hooks/useAutoSwitchNetwork";
import { useCurrentUsdc } from "@/hooks/useCurrentUsdc";

import {
  type SupportedChain,
} from "@/lib/tokens";

const DEFAULT_TOKEN = "USDC";

export default function BridgeCard() {
  const mounted = useMounted();

  const [fromChain, setFromChain] =
    useState<SupportedChain>(
      "Arc_Testnet",
    );

  const [toChain, setToChain] =
    useState<SupportedChain>(
      "Ethereum_Sepolia",
    );

  const [token, setToken] =
    useState(DEFAULT_TOKEN);

  const [amount, setAmount] =
    useState("");

  const [openSuccess, setOpenSuccess] =
    useState(false);

  // ==========================================
  // Auto Switch Network
  // ==========================================

  useAutoSwitchNetwork({
    chain: fromChain,
  });

  const { addHistory } =
    useHistory();

  // ==========================================
  // Current USDC
  // ==========================================

  const usdc =
    useCurrentUsdc();

  // ==========================================
  // Balance
  // ==========================================

  const {
    balance,
    loading: balanceLoading,
  } = useTokenBalance({
    token: usdc?.address,
    decimals: usdc?.decimals,
    symbol: usdc?.symbol,
  });

  // ==========================================
  // Bridge Hook
  // ==========================================

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

        type: "bridge",

        txHash:
          result?.txHash ?? "",

        fromToken: token,

        toToken: token,

        fromAmount: amount,

        toAmount: amount,

        fromChain,

        toChain,

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
          max-w-[430px]
          rounded-3xl
          border
          border-white/5
          bg-[#171A23]/90
          p-6
          backdrop-blur-xl
        "
      >
        <BridgeHeader />

        <div className="mt-6 space-y-4">

          <ChainSelector
            label="From"
            value={fromChain}
            onChange={(value) =>
              setFromChain(
                value as SupportedChain,
              )
            }
          />

          <ChainSelector
            label="To"
            value={toChain}
            onChange={(value) =>
              setToChain(
                value as SupportedChain,
              )
            }
          />

          <AmountInput
            value={amount}
            onChange={setAmount}
            balance={balance}
            loading={balanceLoading}
            onMax={() =>
              setAmount(
                balance.toString(),
              )
            }
          />

          <TokenSelector
            token={token}
            onChange={setToken}
          />

          <BridgeInfo
            estimate={estimate}
          />

          {mounted &&
            error && (
              <div
                className="
                  rounded-2xl
                  border
                  border-red-500/20
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
                  rounded-2xl
                  border
                  border-red-500/20
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