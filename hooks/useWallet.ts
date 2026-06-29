"use client";

import { useAccount, useDisconnect } from "wagmi";

import { useAppKit } from "@reown/appkit/react";

export function useWallet() {
  const { open } = useAppKit();

  const {
    address,
    isConnected,
    chain,
  } = useAccount();

  const { disconnect } =
    useDisconnect();

  return {
    address: address ?? null,

    connected: isConnected,

    chain,

    loading: false,

    connect: () => open(),

    disconnect,
  };
}