"use client";

import { useWalletClient } from "wagmi";

export function useWalletProvider() {
  const { data: walletClient } = useWalletClient();

  return {
    walletClient,
    provider:
      walletClient?.transport ?? null,
  };
}