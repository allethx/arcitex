"use client";

type Props = {
  totalAssets: string;
  completedSwaps: number;
};

export default function PortfolioSummary({
  totalAssets,
  completedSwaps,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/40
        overflow-hidden
      "
    >
      <div className="flex items-center justify-between px-5 py-5">

        <span className="text-zinc-400">
          Total Assets
        </span>

        <span className="text-lg font-semibold text-white">
          {totalAssets}
        </span>

      </div>

      <div className="h-px bg-zinc-800" />

      <div className="flex items-center justify-between px-5 py-5">

        <span className="text-zinc-400">
          Completed Swaps
        </span>

        <span className="text-lg font-semibold text-violet-400">
          {completedSwaps}
        </span>

      </div>

    </div>
  );
}