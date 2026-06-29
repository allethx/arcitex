"use client";

import TokenButton from "./TokenButton";

type Props = {
  value: string;
  token: string;
  balance?: number;
  onChange: (value: string) => void;
  onSelect: () => void;
};

export default function SwapInput({
  value,
  token,
  balance = 0,
  onChange,
  onSelect,
}: Props) {
  return (
    <div className="rounded-2xl bg-zinc-800 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          You Pay
        </p>

        <p className="text-xs text-zinc-500">
          Balance: {balance.toFixed(4)} {token}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <input
          type="number"
          inputMode="decimal"
          autoComplete="off"
          min="0"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="
            w-full
            bg-transparent
            text-3xl
            font-semibold
            outline-none
            placeholder:text-zinc-500
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