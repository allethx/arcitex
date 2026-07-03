"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;

  balance?: number;
  loading?: boolean;
  onMax?: () => void;
};

export default function AmountInput({
  value,
  onChange,
  balance = 0,
  loading = false,
  onMax,
}: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">

        <label className="text-sm text-zinc-400">
          Amount
        </label>

        <div className="flex items-center gap-3">

          <span className="text-xs text-zinc-400">
            Balance{" "}
            <span className="font-medium text-white">
              {loading
                ? "..."
                : balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}
            </span>{" "}
            USDC
          </span>

          <button
            type="button"
            onClick={onMax}
            disabled={loading}
            className="
              text-xs
              font-semibold
              text-violet-400
              transition
              hover:text-violet-300
              disabled:cursor-not-allowed
              disabled:text-zinc-600
            "
          >
            MAX
          </button>

        </div>

      </div>

      <input
        type="number"
        inputMode="decimal"
        placeholder="0.00"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          px-4
          py-4
          text-lg
          text-white
          outline-none
          transition
          placeholder:text-zinc-600
          focus:border-violet-500
        "
      />
    </div>
  );
}