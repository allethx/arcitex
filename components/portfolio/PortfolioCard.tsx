"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import AssetAllocationCard from "@/components/portfolio/AssetAllocationCard";
import NFTHoldings from "@/components/portfolio/NFTHoldings";

import { useTokenBalance } from "@/hooks/useTokenBalance";
import { getTokenBySymbol } from "@/lib/tokens";
import { useNFT } from "@/hooks/useNFT";

export default function PortfolioCard() {
  const mounted = useMounted();

  const { address } = useAccount();

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

  const { nft } = useNFT();

  const formatBalance = (
    value: number
  ) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);

  const usdcDisplay = !mounted
    ? "--"
    : usdcLoading
    ? "Loading..."
    : formatBalance(usdcBalance);

  const eurcDisplay = !mounted
    ? "--"
    : eurcLoading
    ? "Loading..."
    : formatBalance(eurcBalance);

  const totalDisplay = !mounted
    ? "--"
    : formatBalance(total);

  return (
    <div className="grid gap-6 xl:grid-cols-2 xl:items-start">

      <AssetAllocationCard
        totalDisplay={totalDisplay}
        usdcBalance={usdcBalance}
        eurcBalance={eurcBalance}
        usdcDisplay={usdcDisplay}
        eurcDisplay={eurcDisplay}
        usdcPercent={usdcPercent}
        eurcPercent={eurcPercent}
      />

      <NFTHoldings
        hasNFT={
          !mounted
            ? false
            : nft.hasNFT
        }
        address={address}
      />

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
