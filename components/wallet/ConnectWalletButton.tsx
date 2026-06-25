"use client";

import { Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  fullWidth?: boolean;
};

export default function ConnectWalletButton({
  fullWidth = false,
}: Props) {
  return (
    <Button
      className={`
        h-11
        rounded-2xl
        bg-violet-600
        hover:bg-violet-500
        transition
        ${fullWidth ? "w-full" : "px-6"}
      `}
    >
      <Wallet className="mr-2 h-4 w-4" />

      Connect Wallet
    </Button>
  );
}