"use client";

import { useAccount } from "wagmi";

import { getCurrentChain } from "@/lib/currentChain";
import { getToken } from "@/lib/tokens";

export function useCurrentUsdc() {
  const { chain } = useAccount();

  return getToken(
    "USDC",
    getCurrentChain(chain?.id),
  );
}