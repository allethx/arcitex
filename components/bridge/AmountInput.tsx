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
      <div className="mb-1.5 flex items-center justify-between">

        <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Amount
        </label>

        <div className="flex items-center gap-3">

          <span className="text-xs text-slate-400">
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
              text-sky-400
              transition
              hover:text-sky-300
              disabled:cursor-not-allowed
              disabled:text-slate-600
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
          border-white/10
          bg-white/[0.03]
          px-4
          py-3
          text-lg
          font-semibold
          text-white
          outline-none
          transition
          placeholder:text-slate-600
          focus:border-sky-400/50
          focus:bg-white/[0.05]
        "
      />
    </div>
  );
}