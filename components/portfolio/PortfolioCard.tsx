"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

import AssetRow from "@/components/portfolio/AssetRow";
import PortfolioSummary from "@/components/portfolio/PortfolioSummary";
import LastActivity from "@/components/portfolio/LastActivity";
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

  const total = usdcBalance + eurcBalance;

  const usdcPercent =
    total > 0
      ? (usdcBalance / total) * 100
      : 0;

  const eurcPercent =
    total > 0
      ? (eurcBalance / total) * 100
      : 0;

  const history = useTransactionHistory();

  const completedSwaps =
    history.length;

  const latest =
    history[0];

  const formatBalance = (
    value: number
  ) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);

  return (
    <div
      className="
        w-full
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-8
        backdrop-blur-xl
      "
    >
      {/* Header */}


      {/* Top Section */}

      <div className="grid gap-6 xl:grid-cols-2">

        <AllocationChart
          usdc={usdcBalance}
          eurc={eurcBalance}
        />

        <div className="space-y-6">

          <PortfolioSummary
            totalAssets={
              !mounted
                ? "--"
                : formatBalance(total)
            }
            completedSwaps={
              completedSwaps
            }
          />

          <LastActivity
            latest={latest}
          />

        </div>

      </div>

      {/* Assets */}

      <div className="mt-8 space-y-4">

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