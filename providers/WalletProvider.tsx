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

  const [address, setAddress] = useState<string | null>(null);

  async function connect() {
    // sementara dummy
    setConnected(true);

    setAddress("0x72A8...91Fd");
  }

  function disconnect() {
    setConnected(false);

    setAddress(null);
  }

  const value = useMemo(
    () => ({
      connected,
      address,
      connect,
      disconnect,
    }),
    [connected, address]
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
    throw new Error("WalletProvider not found");
  }

  return context;
}