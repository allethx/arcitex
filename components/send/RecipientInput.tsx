"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RecipientInput({
  value,
  onChange,
}: Props) {
  return (
    <div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Recipient Address
      </p>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="0x..."
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          px-4
          py-3.5
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
