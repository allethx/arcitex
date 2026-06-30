"use client";

import { Bell, Search } from "lucide-react";

import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

export default function Topbar() {
  return (
    <header
      className="
        mb-8
        flex
        items-center
        justify-between
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-5
        backdrop-blur-xl
      "
    >
      {/* Left */}

      <div className="space-y-1">
  <p className="text-sm text-zinc-500">
    Smart cross-chain token exchange powered by Arcitex.
  </p>
</div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-3
            transition
            hover:bg-zinc-800
          "
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          className="
            relative
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-3
            transition
            hover:bg-zinc-800
          "
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
        </button>

        <ConnectWalletButton />

      </div>
    </header>
  );
}