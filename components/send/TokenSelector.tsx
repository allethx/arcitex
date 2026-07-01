"use client";

type Props = {
  token: string;
  onChange: (value: string) => void;
};

export default function TokenSelector({
  token,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        Token
      </label>

      <select
        value={token}
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
          text-white
          outline-none
          transition
          focus:border-violet-500
        "
      >
        <option value="USDC">
          USDC
        </option>

        <option
          value="EURC"
          disabled
        >
          EURC (Coming Soon)
        </option>
      </select>

      <p className="mt-2 text-xs text-zinc-500">
        Only USDC is currently supported for Send on Arc Testnet.
      </p>
    </div>
  );
}