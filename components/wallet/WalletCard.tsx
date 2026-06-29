"use client";

import { useEffect, useState } from "react";

import { Wallet } from "lucide-react";

import ConnectWalletButton from "./ConnectWalletButton";

import { useWallet } from "@/hooks/useWallet";
import { useTokenBalance } from "@/hooks/useTokenBalance";

import { getTokenBySymbol } from "@/lib/tokens";

export default function WalletCard() {
  const mounted = useMounted();

  const {
    address,
    chain,
  } = useWallet();

  const usdc =
    getTokenBySymbol("USDC");

  const {
    balance,
    loading,
  } = useTokenBalance({
    token: usdc?.address,
  });

  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-5
        backdrop-blur-xl
      "
    >
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-violet-500
            to-sky-500
          "
        >
          <Wallet className="h-5 w-5 text-white" />
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-xs text-zinc-500">
            Wallet
          </p>

          <p className="truncate font-semibold">
            {!mounted
              ? "Loading..."
              : address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Not Connected"}
          </p>

        </div>

      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center justify-between">

          <span className="text-zinc-500">
            Network
          </span>

          <span className="font-medium">
            {!mounted
              ? "--"
              : chain?.name ?? "Unknown"}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-zinc-500">
            USDC Balance
          </span>

          <span className="font-semibold">
            {!mounted
              ? "--"
              : loading
              ? "Loading..."
              : `${balance.toFixed(4)} USDC`}
          </span>

        </div>

      </div>

      <div className="mt-6">

        <ConnectWalletButton fullWidth />

      </div>

    </div>
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