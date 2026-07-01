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

      <p className="mb-2 text-sm text-zinc-400">
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
          border-zinc-800
          bg-zinc-950
          px-4
          py-3
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