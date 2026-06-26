"use client";

import { Wallet, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWallet } from "@/providers/WalletProvider";

type Props = {
  fullWidth?: boolean;
};

export default function ConnectWalletButton({
  fullWidth = false,
}: Props) {
  const {
    connected,
    loading,
    address,
    connect,
    disconnect,
  } = useWallet();

  return (
    <Button
      onClick={connected ? disconnect : connect}
      disabled={loading}
      className={`
        h-11
        rounded-2xl
        transition
        ${
          connected
            ? "bg-emerald-600 hover:bg-emerald-500"
            : "bg-violet-600 hover:bg-violet-500"
        }
        ${fullWidth ? "w-full" : "px-6"}
      `}
    >
      {connected ? (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          {address}
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          {loading ? "Connecting..." : "Connect Wallet"}
        </>
      )}
    </Button>
  );
}