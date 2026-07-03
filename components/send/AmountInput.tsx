"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;

  balance?: number;
  loading?: boolean;
  onMax?: () => void;
};

const formatter =
  new Intl.NumberFormat(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    },
  );

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

          <p className="text-xs text-zinc-400">
            Balance{" "}

            <span className="font-medium text-white">
              {loading
                ? "..."
                : formatter.format(
                    balance,
                  )}
            </span>{" "}
            USDC

          </p>

          <button
            type="button"
            onClick={onMax}
            disabled={loading}
            className="
              text-xs
              font-medium
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
        min="0"
        step="any"
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value,
          )
        }
        placeholder="0.00"
        className="
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          px-4
          py-3
          text-xl
          font-semibold
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