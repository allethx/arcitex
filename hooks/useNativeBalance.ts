"use client";

import { useMemo } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";

export function useNativeBalance() {
  const { address, isConnected, chain } = useAccount();

  const { data, isLoading } = useBalance({
    address,
    query: {
      enabled: Boolean(address),
    },
  });

  const balance = useMemo(() => {
  if (!data) return 0;

  const value = Number(formatUnits(data.value, data.decimals));

  return Number.isFinite(value) ? value : 0;
}, [data]);
  return {
    balance,
    symbol: data?.symbol ?? "USDC",
    decimals: data?.decimals ?? 6,
    chain,
    loading: isLoading,
    connected: isConnected,
  };
}