"use client";

import {
  useAccount,
  useReadContract,
} from "wagmi";

import { erc20Abi } from "viem";

import { CONTRACTS } from "@/lib/contracts";

export function useAllowance() {
  const { address } = useAccount();

  const {
    data,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACTS.EURC as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: address
      ? [
          address,
          CONTRACTS.ROUTER as `0x${string}`,
        ]
      : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const allowance =
    data
      ? Number(data) / 1_000_000
      : 0;

  return {
    allowance,
    loading: isLoading,
    refresh: refetch,
  };
}