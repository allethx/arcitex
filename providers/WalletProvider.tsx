"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

type WalletContextType = {
  connected: boolean;
  loading: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  async function connect() {
    setLoading(true);

    try {
      // Dummy sementara.
      // Nanti diganti dengan Reown AppKit.
      await new Promise((resolve) => setTimeout(resolve, 700));

      setConnected(true);
      setAddress("0x72A8...91Fd");
    } finally {
      setLoading(false);
    }
  }

  function disconnect() {
    setConnected(false);
    setAddress(null);
  }

  const value = useMemo(
    () => ({
      connected,
      loading,
      address,
      connect,
      disconnect,
    }),
    [connected, loading, address]
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used inside WalletProvider");
  }

  return context;
}