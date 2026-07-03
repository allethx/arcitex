"use client";

import {
  ArrowRightLeft,
  Coins,
  Route,
} from "lucide-react";

type Props = {
  rate: string;
  loading: boolean;
  fee: string;
  route: string;
  fromToken: string;
  toToken: string;
};

export default function SwapInfo({
  rate,
  loading,
  fee,
  route,
  fromToken,
  toToken,
}: Props) {
  return (
    <div
      className="
        mt-5
        rounded-3xl
        border
        border-white/5
        bg-[#171A23]
        px-5 py-4
      "
    >
      <div className="space-y-4">

        {/* Rate */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <ArrowRightLeft className="h-4 w-4" />

            <span>Exchange Rate</span>
          </div>

          <span className="font-medium text-white">
            {loading
              ? "Loading..."
              : rate === "--"
              ? "--"
              : `1 ${fromToken} = ${rate} ${toToken}`}
          </span>
        </div>

        {/* Fee */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <Coins className="h-4 w-4" />

            <span>Network Fee</span>
          </div>

          <span className="font-medium text-white">
            {loading ? "Loading..." : fee}
          </span>
        </div>

        {/* Route */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <Route className="h-4 w-4" />

            <span>Route</span>
          </div>

          <span
            className="
              rounded-full
              bg-sky-500/10
              px-3
              py-1
              text-xs
              font-semibold
              text-sky-300
            "
          >
            {route}
          </span>
        </div>

      </div>
    </div>
  );
}