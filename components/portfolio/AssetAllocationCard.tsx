"use client";

import Image from "next/image";

import AllocationChart from "@/components/charts/AllocationChart";

type Props = {
  totalDisplay: string;
  usdcBalance: number;
  eurcBalance: number;
  usdcDisplay: string;
  eurcDisplay: string;
  usdcPercent: number;
  eurcPercent: number;
};

export default function AssetAllocationCard({
  totalDisplay,
  usdcBalance,
  eurcBalance,
  usdcDisplay,
  eurcDisplay,
  usdcPercent,
  eurcPercent,
}: Props) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.03]
        p-7
        backdrop-blur-2xl
        transition-all
        duration-500
        hover:border-sky-400/30
        hover:shadow-[0_0_60px_rgba(56,189,248,0.12)]
        sm:p-8
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-sky-500/10
          blur-[100px]
        "
      />
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -bottom-24
          h-64
          w-64
          rounded-full
          bg-violet-600/10
          blur-[100px]
        "
      />

      <div className="relative">
        <p className="text-sm font-medium text-slate-400">
          Total Balance
        </p>

        <div className="mt-2 flex flex-wrap items-end gap-3">
          <h2
            className="
              bg-gradient-to-r
              from-white
              to-slate-300
              bg-clip-text
              text-4xl
              font-bold
              tracking-tight
              text-transparent
              sm:text-5xl
            "
          >
            ${totalDisplay}
          </h2>

          <span
            className="
              mb-1.5
              rounded-full
              bg-emerald-500/10
              px-2.5
              py-1
              text-xs
              font-semibold
              text-emerald-400
            "
          >
            +4.21%
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Across USDC & EURC on Arc Testnet
        </p>

        {/* Chart */}

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            p-6
          "
        >
        

          <div className="mt-4">
            <AllocationChart
              usdc={usdcBalance}
              eurc={eurcBalance}
            />
          </div>
        </div>

        {/* Token list — stacked below the chart */}

        <div className="mt-4 space-y-3">

          <div
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-3.5
              transition-all
              duration-300
              hover:border-sky-400/30
              hover:bg-white/[0.05]
            "
          >
            <div className="flex items-center gap-3">
              <Image
                src="/tokens/usdc.png"
                alt="USDC"
                width={36}
                height={36}
                className="rounded-full ring-1 ring-white/10"
              />
              <div>
                <p className="text-sm font-semibold text-white">USDC</p>
                <p className="text-xs text-slate-500">USD Coin</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-white">{usdcDisplay}</p>
              <p className="text-xs text-sky-400">{usdcPercent.toFixed(0)}%</p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-3.5
              transition-all
              duration-300
              hover:border-violet-400/30
              hover:bg-white/[0.05]
            "
          >
            <div className="flex items-center gap-3">
              <Image
                src="/tokens/eurc.png"
                alt="EURC"
                width={36}
                height={36}
                className="rounded-full ring-1 ring-white/10"
              />
              <div>
                <p className="text-sm font-semibold text-white">EURC</p>
                <p className="text-xs text-slate-500">Euro Coin</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-white">{eurcDisplay}</p>
              <p className="text-xs text-violet-400">{eurcPercent.toFixed(0)}%</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
