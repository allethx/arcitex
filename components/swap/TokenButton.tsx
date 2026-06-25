"use client";

import { ChevronDown } from "lucide-react";

type Props = {
  symbol: string;
};

export default function TokenButton({ symbol }: Props) {
  return (
    <button
      className="
      flex items-center gap-2
      rounded-full
      bg-zinc-800
      px-4
      py-2
      hover:bg-zinc-700
      transition
      "
    >
      <div className="h-6 w-6 rounded-full bg-purple-500" />

      <span className="font-medium">
        {symbol}
      </span>

      <ChevronDown className="h-4 w-4" />
    </button>
  );
}