"use client";

import { useEffect, useState } from "react";

import { getWalletBalance } from "@/services/balance";
import { useWallet } from "@/providers/WalletProvider";

export function useBalance() {
  const { connected } = useWallet();

  const [eth, setEth] = useState(0);
  const [usdc, setUsdc] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected) {
      setEth(0);
      setUsdc(0);
      return;
    }

    async function load() {
      setLoading(true);

      try {
        const balance = await getWalletBalance();

        setEth(balance.eth);
        setUsdc(balance.usdc);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [connected]);

  return {
    eth,
    usdc,
    loading,
  };
}