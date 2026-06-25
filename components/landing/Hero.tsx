"use client";

import { Button } from "@/components/ui/button";
import SwapCard from "@/components/swap/SwapCard";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center">

      <h1 className="max-w-4xl text-5xl md:text-6xl font-bold leading-tight">
        The Next Generation
        <br />
        Decentralized Exchange
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-gray-400">
        Swap tokens instantly across chains with
        lightning-fast execution powered by Arcitex.
      </p>

      <div className="mt-10 flex gap-4">
        <Button size="lg">
          Launch App
        </Button>

        <Button
          size="lg"
          variant="outline"
        >
          Learn More
        </Button>
      </div>

      <SwapCard />

    </section>
  );
}