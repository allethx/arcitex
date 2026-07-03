"use client";

import { useMemo } from "react";

import {
  useAccount,
  useReadContract,
} from "wagmi";

import { formatUnits } from "viem";

import { CONTRACTS } from "@/lib/contracts";
import { texTokenAbi } from "@/lib/abi/texToken";

export function useTexBalance() {
  const { address } =
    useAccount();

  const {
    data,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACTS.TEX,

    abi: texTokenAbi,

    functionName:
      "balanceOf",

    args: address
      ? [address]
      : undefined,

    query: {
      enabled: !!address,
    },
  });

  const balance =
    useMemo(() => {
      if (data == null) {
        return 0;
      }

      return Number(
        formatUnits(
          data,
          18,
        ),
      );
    }, [data]);

  console.group(
    "TEX BALANCE"
  );

  console.log(
    "Wallet:",
    address,
  );

  console.log(
    "Balance:",
    balance,
  );

  console.groupEnd();

  return {
    balance,

    loading: isLoading,

    refetch,
  };
}