"use client";

import { Gift } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { useClaim } from "@/hooks/useClaim";

type Props = {
  usdcBalance?: number;
};

export default function ClaimCard({
  usdcBalance = 0,
}: Props) {
  const mounted = useMounted();

  const {
    claim,
    claimed,
    eligible,
    hasNFT,
    loading,
  } = useClaim();

  const disabled =
    !mounted ||
    loading ||
    claimed ||
    !eligible ||
    !hasNFT;

  return (
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

        <div>

          <p className="text-sm text-zinc-400">
            TEX Claim
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            100
            <span className="ml-2 text-sky-400">
              TEX
            </span>
          </h2>

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-sky-500
            to-violet-600
            shadow-[0_0_25px_rgba(56,189,248,.25)]
          "
        >
          <Gift className="h-7 w-7 text-white" />
        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            USDC Balance
          </span>

          <span className="font-medium">
            {!mounted
              ? "..."
              : `${usdcBalance.toFixed(2)} USDC`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Requirement
          </span>

          <span
            className={
              !mounted
                ? "text-zinc-400"
                : eligible
                ? "text-emerald-400"
                : "text-red-400"
            }
          >
            ≥ 50 USDC
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Arcitex NFT
          </span>

          <span
            className={
              !mounted
                ? "text-zinc-400"
                : hasNFT
                ? "text-emerald-400"
                : "text-red-400"
            }
          >
            {!mounted
              ? "..."
              : hasNFT
              ? "Owned"
              : "Required"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Status
          </span>

          <span
            className={
              !mounted
                ? "text-zinc-400"
                : claimed
                ? "text-sky-400"
                : eligible && hasNFT
                ? "text-emerald-400"
                : "text-red-400"
            }
          >
            {!mounted
              ? "Loading..."
              : claimed
              ? "Claimed"
              : !hasNFT
              ? "Need Arcitex NFT"
              : eligible
              ? "Eligible"
              : "Not Eligible"}
          </span>
        </div>

      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={claim}
        className={`
          mt-6
          h-12
          w-full
          rounded-2xl
          font-semibold
          transition-all

          ${
            disabled
              ? `
                cursor-not-allowed
                bg-zinc-800
                text-zinc-500
              `
              : `
                bg-gradient-to-r
                from-sky-500
                to-violet-600
                text-white
                hover:opacity-90
              `
          }
        `}
      >
        {!mounted
          ? "Loading..."
          : claimed
          ? "Already Claimed"
          : loading
          ? "Claiming..."
          : !hasNFT
          ? "Requires Arcitex NFT"
          : "Claim 100 TEX"}
      </button>
    </div>
  );
}