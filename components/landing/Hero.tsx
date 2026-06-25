"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import SwapCard from "@/components/swap/SwapCard";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center">
      {/* Badge */}

      <div className="mb-6 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
        Smart Cross-Chain Stablecoin Exchange
      </div>

      {/* Heading */}

      <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
        Trade Crypto
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          {" "}
          Smarter
        </span>
        <br />
        Across Every Chain
      </h1>

      {/* Description */}

      <p className="mt-8 max-w-2xl text-lg text-zinc-400">
        Arcitex is a next-generation decentralized exchange designed for
        lightning-fast swaps, intelligent routing, and seamless cross-chain
        trading.
      </p>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/app">
          <Button
            size="lg"
            className="rounded-2xl bg-violet-600 px-8 hover:bg-violet-500"
          >
            Launch App
          </Button>
        </Link>

        <Button
          size="lg"
          variant="outline"
          className="rounded-2xl border-zinc-700 bg-transparent px-8 text-white hover:bg-zinc-900"
        >
          Learn More
        </Button>
      </div>

      {/* Swap Card */}

      <SwapCard />
    </section>
  );
}