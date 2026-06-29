"use client";

import { useMemo } from "react";

import {
  useAccount,
  useReadContract,
} from "wagmi";

import { erc20Abi } from "viem";

import { CONTRACTS } from "@/lib/contracts";

export function useEurcBalance() {
  const {
    address,
    isConnected,
  } = useAccount();

  const {
    data,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACTS.EURC as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const balance = useMemo(() => {
    if (!data) return 0;

    return Number(data) / 1_000_000;
  }, [data]);

  return {
    balance,
    loading: isLoading,
    connected: isConnected,
    refresh: refetch,
  };
}