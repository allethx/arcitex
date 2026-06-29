"use client";

import {
  useAccount,
  useWriteContract,
} from "wagmi";

import { erc20Abi, parseUnits } from "viem";

import { CONTRACTS } from "@/lib/contracts";

export function useApprove() {
  const { address } = useAccount();

  const {
    writeContractAsync,
    isPending,
  } = useWriteContract();

  async function approve(amount: string) {
    if (!address) return;

    await writeContractAsync({
      address: CONTRACTS.EURC as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        CONTRACTS.ROUTER as `0x${string}`,
        parseUnits(amount, 6),
      ],
    });
  }

  return {
    approve,
    loading: isPending,
  };
}