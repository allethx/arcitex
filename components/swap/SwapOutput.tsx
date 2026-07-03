"use client";

import TokenButton from "./TokenButton";

type Props = {
  value: string;
  token: string;
  onSelect: () => void;
};

export default function SwapOutput({
  value,
  token,
  onSelect,
}: Props) {
  return (
    <div
      className="
        mt-4
        rounded-3xl
        border
        border-white/5
        bg-[#171A23]
        px-5
        py-4
        transition-all
        hover:border-violet-500/20
      "
    >
      {/* Header */}

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-400">
          You Receive
        </p>

        <p className="text-xs text-zinc-500">
          Estimated
        </p>
      </div>

      {/* Body */}

      <div className="flex items-center justify-between gap-4">
        <input
          value={value}
          readOnly
          placeholder="0.00"
          className="
            w-full
            cursor-default
            bg-transparent
            text-4xl
            font-bold
            tracking-tight
            text-white
            outline-none
            placeholder:text-zinc-600
          "
        />

        <TokenButton
          symbol={token}
          onClick={onSelect}
        />
      </div>
    </div>
  );
}