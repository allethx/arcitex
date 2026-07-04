"use client";

import {
  Gem,
  Coins,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function NFTInfo() {
  return (
    <div className="space-y-6">

      {/* Badge */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-sky-500/20
          bg-sky-500/10
          px-4
          py-2
          text-sm
          font-medium
          text-sky-300
        "
      >
        <Gem className="h-4 w-4" />

        Genesis Membership
      </div>

      {/* Title */}

      <div>

        <h1
          className="
            text-4xl
            font-black
            leading-tight
            tracking-tight
          "
        >
          Arcitex Early
          <br />

          <span
            className="
              bg-gradient-to-r
              from-sky-400
              via-cyan-300
              to-violet-400
              bg-clip-text
              text-transparent
            "
          >
            Access NFT
          </span>
        </h1>

        <p
          className="
            mt-4
            max-w-xl
            text-base
            leading-7
            text-zinc-400
          "
        >
          Become one of the first 500 Genesis members of
          Arcitex. Unlock premium ecosystem access,
          exclusive governance participation, future
          rewards and an on-chain membership badge.
        </p>

      </div>

      {/* Price */}

      <div
        className="
          rounded-3xl
          border
          border-white/5
          bg-[#11131A]
          p-5
        "
      >
        <div className="flex items-center justify-between">

          <span className="text-zinc-400">
            Mint Price
          </span>

          <div className="flex items-center gap-2">

            <Coins className="h-5 w-5 text-sky-400" />

            <span
              className="
                text-3xl
                font-black
                text-sky-400
              "
            >
              55 USDC
            </span>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4">

        <div
          className="
            rounded-2xl
            border
            border-white/5
            bg-[#11131A]
            p-5
          "
        >
          <Users className="mb-3 h-6 w-6 text-sky-400" />

          <p className="text-sm text-zinc-500">
            Max Supply
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            500 NFT
          </h3>

        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/5
            bg-[#11131A]
            p-5
          "
        >
          <ShieldCheck className="mb-3 h-6 w-6 text-violet-400" />

          <p className="text-sm text-zinc-500">
            Network
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            ARC
          </h3>

        </div>

      </div>

    </div>
  );
}