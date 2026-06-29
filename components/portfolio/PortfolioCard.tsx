"use client";

import { useEffect, useState } from "react";

import { Wallet } from "lucide-react";

import { useTokenBalance } from "@/hooks/useTokenBalance";
import { getTokenBySymbol } from "@/lib/tokens";

export default function PortfolioCard() {
  const mounted = useMounted();

  const usdc =
    getTokenBySymbol("USDC");

  const eurc =
    getTokenBySymbol("EURC");

  const {
    balance: usdcBalance,
    loading: usdcLoading,
  } = useTokenBalance({
    token: usdc?.address,
  });

  const {
    balance: eurcBalance,
    loading: eurcLoading,
  } = useTokenBalance({
    token: eurc?.address,
  });

  const total =
    usdcBalance + eurcBalance;

  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-6
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

        <div>

          <p className="text-sm text-zinc-500">
            Portfolio
          </p>

          <h2 className="text-2xl font-bold">
            My Assets
          </h2>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="font-semibold">
              USDC
            </p>

            <p className="text-sm text-zinc-500">
              USD Coin
            </p>

          </div>

          <p className="font-semibold">
            {!mounted
              ? "--"
              : usdcLoading
              ? "Loading..."
              : usdcBalance.toFixed(4)}
          </p>

        </div>

        <div className="flex items-center justify-between">

          <div>

            <p className="font-semibold">
              EURC
            </p>

            <p className="text-sm text-zinc-500">
              Euro Coin
            </p>

          </div>

          <p className="font-semibold">
            {!mounted
              ? "--"
              : eurcLoading
              ? "Loading..."
              : eurcBalance.toFixed(4)}
          </p>

        </div>

        <div className="border-t border-zinc-800 pt-5">

          <div className="flex items-center justify-between">

            <span className="text-zinc-500">
              Total Assets
            </span>

            <span className="text-xl font-bold">
              {!mounted
                ? "--"
                : total.toFixed(4)}
            </span>

          </div>

        </div>

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