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
    <div className="mt-4 rounded-2xl bg-zinc-800 p-4">

      <p className="mb-2 text-sm text-zinc-400">
        You Receive
      </p>

      <div className="flex items-center justify-between gap-4">

        <input
          value={value}
          readOnly
          placeholder="0.0"
          className="
            w-full
            bg-transparent
            text-3xl
            font-semibold
            outline-none
            placeholder:text-zinc-500
            cursor-default
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