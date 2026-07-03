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
    <div
      className="
        rounded-3xl
        border
        border-white/5
        bg-[#171A23]
        px-5
        py-4
        transition-all
        hover:border-sky-500/20
      "
    >
      {/* Header */}

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-400">
          You Pay
        </p>

        <div className="flex items-center gap-2">
          <p className="text-xs text-zinc-500">
            Balance {balance.toFixed(4)}
          </p>

          {balance > 0 && (
            <button
              type="button"
              onClick={() =>
                onChange(
                  balance.toString(),
                )
              }
              className="
                rounded-full
                bg-sky-500/15
                px-3
                py-1
                text-[11px]
                font-semibold
                text-sky-300
                transition
                hover:bg-sky-500/25
              "
            >
              MAX
            </button>
          )}
        </div>
      </div>

      {/* Body */}

      <div className="flex items-center justify-between gap-4">
        <input
          type="number"
          inputMode="decimal"
          autoComplete="off"
          min="0"
          step="any"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="0.00"
          className="
            w-full
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