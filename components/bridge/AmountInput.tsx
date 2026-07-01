"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function AmountInput({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm text-zinc-400">
          Amount
        </label>

        <button
          type="button"
          className="
            text-xs
            font-medium
            text-violet-400
            transition
            hover:text-violet-300
          "
        >
          MAX
        </button>
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

      <p className="mt-2 text-xs text-zinc-500">
        Enter the amount of tokens to bridge.
      </p>
    </div>
  );
}