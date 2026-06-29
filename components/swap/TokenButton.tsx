"use client";

import { ChevronDown } from "lucide-react";

import { TOKENS } from "@/lib/tokens";

type Props = {
  symbol: string;
  onClick: () => void;
};

export default function TokenButton({
  symbol,
  onClick,
}: Props) {
  const token = TOKENS.find(
    (item) => item.symbol === symbol
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-zinc-700
        px-4
        py-2
        transition
        hover:bg-zinc-600
      "
    >
      <div
        className={`h-6 w-6 rounded-full ${
          token?.color ?? "bg-zinc-500"
        }`}
      />

      <span className="font-semibold">
        {token?.symbol ?? symbol}
      </span>

      <ChevronDown className="h-4 w-4" />
    </button>
  );
}