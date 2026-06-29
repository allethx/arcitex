"use client";

import { useMemo } from "react";
import { useAccount, useBalance } from "wagmi";

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

  const value = Number(data.formatted);

  return Number.isFinite(value) ? value : 0;
}, [data]);
  return {
    balance,
    symbol: data?.symbol ?? "USDC",
    decimals: data?.decimals ?? 18,
    chain,
    loading: isLoading,
    connected: isConnected,
  };
}