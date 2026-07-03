"use client";

import Image from "next/image";
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
    (item) => item.symbol === symbol,
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
        border
        border-white/10
        bg-zinc-800/70
        px-4
        py-2.5
        transition-all
        hover:border-sky-500/40
        hover:bg-zinc-700/70
      "
    >
      {token?.logo && (
        <Image
          src={token.logo}
          alt={token.symbol}
          width={26}
          height={26}
          className="rounded-full"
        />
      )}

      <span className="font-semibold text-white">
        {token?.symbol ?? symbol}
      </span>

      <ChevronDown
        className="
          h-4
          w-4
          text-zinc-400
        "
      />
    </button>
  );
}