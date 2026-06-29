"use client";

import { useAppKitProvider } from "@reown/appkit/react";

export function useCircle() {
  const { walletProvider } = useAppKitProvider("eip155");

  return {
    walletProvider,
  };
}