"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

import AssetRow from "@/components/portfolio/AssetRow";
import PortfolioSummary from "@/components/portfolio/PortfolioSummary";
import LastActivity from "@/components/portfolio/LastActivity";
import PortfolioValue from "@/components/portfolio/PortfolioValue";
import AllocationChart from "@/components/charts/AllocationChart";

import { useTokenBalance } from "@/hooks/useTokenBalance";
import { getTokenBySymbol } from "@/lib/tokens";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";

export default function PortfolioCard() {
  const mounted = useMounted();

  const usdc = getTokenBySymbol("USDC");
  const eurc = getTokenBySymbol("EURC");

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

  const usdcPercent =
    total > 0
      ? (usdcBalance / total) * 100
      : 0;

  const eurcPercent =
    total > 0
      ? (eurcBalance / total) * 100
      : 0;

  const history =
    useTransactionHistory();

  const completedSwaps =
    history.length;

  const latest =
    history[0];

  const formatBalance = (
    value: number
  ) =>
    new Intl.NumberFormat(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }
    ).format(value);

  return (
    <div
      className="
        w-[360px]
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-violet-500/40
        hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]
      "
    >
      {/* Header */}

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
            to-cyan-500
          "
        >
          <Wallet className="h-5 w-5 text-white" />
        </div>

        <div>

          <p className="text-sm text-zinc-500">
            Dashboard
          </p>

          <h2 className="text-3xl font-bold">
            Portfolio
          </h2>

        </div>

      </div>

      <div className="mt-6 h-px bg-zinc-800" />

      <div className="mt-6 space-y-6">

        {/* Portfolio Value */}

        <PortfolioValue
          total={total}
        />

        {/* Allocation */}

        <AllocationChart
          usdc={usdcBalance}
          eurc={eurcBalance}
        />

        {/* Assets */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/40
            divide-y
            divide-zinc-800
          "
        >

          <AssetRow
            symbol="USDC"
            name="USD Coin"
            logo="/tokens/usdc.png"
            balance={
              !mounted
                ? "--"
                : usdcLoading
                ? "Loading..."
                : formatBalance(
                    usdcBalance
                  )
            }
            percent={usdcPercent}
          />

          <AssetRow
            symbol="EURC"
            name="Euro Coin"
            logo="/tokens/eurc.png"
            balance={
              !mounted
                ? "--"
                : eurcLoading
                ? "Loading..."
                : formatBalance(
                    eurcBalance
                  )
            }
            percent={eurcPercent}
          />

        </div>

        {/* Summary */}

        <PortfolioSummary
          totalAssets={
            !mounted
              ? "--"
              : formatBalance(
                  total
                )
          }
          completedSwaps={
            completedSwaps
          }
        />

        {/* Activity */}

        <LastActivity
          latest={latest}
        />

      </div>

    </div>
  );
}

function useMounted() {
  const [
    mounted,
    setMounted,
  ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}