"use client";

import { Wallet } from "lucide-react";

import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

export default function WalletCard() {
  return (
    <div
      className="
        mt-auto
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-5
        backdrop-blur-xl
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-3">
          <Wallet className="h-5 w-5 text-white" />
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Wallet
          </p>

          <h3 className="font-semibold">
            Not Connected
          </h3>
        </div>

      </div>

      {/* Info */}

      <div className="mt-5 rounded-2xl bg-zinc-800/70 p-4">

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">
            Network
          </span>

          <span>
            Ethereum
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-zinc-500">
            Balance
          </span>

          <span>
            --
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-zinc-500">
            Status
          </span>

          <span className="text-red-400">
            Offline
          </span>
        </div>

      </div>

      {/* Button */}

      <div className="mt-5">
        <ConnectWalletButton fullWidth />
      </div>

    </div>
  );
}