"use client";

import { Vote } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { useTexBalance } from "@/hooks/useTexBalance";

export default function VotingPowerCard() {
  const mounted = useMounted();

  const {
    balance,
    loading,
  } = useTexBalance();

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
            Voting Power
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {!mounted || loading
              ? "..."
              : balance.toLocaleString()}

            <span className="ml-2 text-xl text-sky-400">
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
          <Vote className="h-7 w-7 text-white" />
        </div>

      </div>

      <div
        className="
          mt-5
          h-px
          bg-white/5
        "
      />

      <div className="mt-4 flex items-center justify-between">

        <span className="text-sm text-zinc-500">
          Governance Status
        </span>

        <span
          className="
            rounded-full
            bg-emerald-500/15
            px-3
            py-1
            text-xs
            font-semibold
            text-emerald-400
          "
        >
          Active
        </span>

      </div>
    </div>
  );
}