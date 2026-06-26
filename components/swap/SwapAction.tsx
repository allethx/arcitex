"use client";

import { Button } from "@/components/ui/button";
import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

type Props = {
  connected: boolean;
  valid: boolean;
  message: string;
  loading?: boolean;
  onSwap?: () => void;
};

export default function SwapAction({
  connected,
  valid,
  message,
  loading = false,
  onSwap,
}: Props) {
  if (!connected) {
    return (
      <div className="mt-6">
        <ConnectWalletButton fullWidth />
      </div>
    );
  }

  return (
    <Button
      onClick={onSwap}
      disabled={!valid || loading}
      className={`
        mt-6
        h-12
        w-full
        rounded-2xl
        transition
        ${
          valid
            ? "bg-violet-600 hover:bg-violet-500"
            : "bg-zinc-700 cursor-not-allowed"
        }
      `}
    >
      {loading ? "Swapping..." : message}
    </Button>
  );
}