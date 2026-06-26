"use client";

import { useMemo } from "react";
import { useAccount, useBalance as useWagmiBalance } from "wagmi";

export function useBalance() {
  const { address, isConnected } = useAccount();

  const { data, isLoading } = useWagmiBalance({
    address,
  });

  const eth = useMemo(() => {
    if (!data) return 0;

    return Number(data.formatted);
  }, [data]);

  return {
    eth,
    usdc: 0,
    loading: isLoading,
    connected: isConnected,
  };
}