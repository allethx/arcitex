"use client";

type ChainOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const CHAINS: ChainOption[] = [
  {
    label: "Arc Testnet",
    value: "Arc_Testnet",
  },
  {
    label: "Ethereum Sepolia",
    value: "Ethereum_Sepolia",
  },
  {
    label: "Base Sepolia",
    value: "Base_Sepolia",
  },
];

export default function ChainSelector({
  label,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <select
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
          text-white
          outline-none
          transition
          focus:border-violet-500
        "
      >
        {CHAINS.map((chain) => (
          <option
            key={chain.value}
            value={chain.value}
          >
            {chain.label}
          </option>
        ))}
      </select>
    </div>
  );
}