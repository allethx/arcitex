"use client";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-violet-500" />
          <span className="text-xl font-bold">
            Arcitex
          </span>
        </div>

        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#">Swap</a>
          <a href="#">Pool</a>
          <a href="#">Portfolio</a>
          <a href="#">Docs</a>
        </nav>

        <Button>
          Connect Wallet
        </Button>

      </div>
    </header>
  );
}