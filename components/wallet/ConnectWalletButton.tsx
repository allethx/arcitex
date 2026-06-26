"use client";

import { Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

type Props = {
  fullWidth?: boolean;
};

export default function ConnectWalletButton({
  fullWidth = false,
}: Props) {
  const { open } = useAppKit();

  const { isConnected, address } =
    useAccount();

  return (
    <Button
      onClick={() => open()}
      className={`
        h-11
        rounded-2xl
        transition
        ${
          isConnected
            ? "bg-emerald-600 hover:bg-emerald-500"
            : "bg-violet-600 hover:bg-violet-500"
        }
        ${fullWidth ? "w-full" : "px-6"}
      `}
    >
      <Wallet className="mr-2 h-4 w-4" />

      {isConnected
        ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
}