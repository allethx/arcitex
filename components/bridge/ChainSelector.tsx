"use client";

import { ChevronDown } from "lucide-react";

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
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </label>

      <div className="relative">

        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
            w-full
            appearance-none
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-4
            py-3
            pr-11
            text-sm
            text-white
            outline-none
            transition
            focus:border-sky-400/50
            focus:bg-white/[0.05]
          "
        >
          {CHAINS.map((chain) => (
            <option
              key={chain.value}
              value={chain.value}
              className="bg-[#0B0F17]"
            >
              {chain.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

      </div>

    </div>
  );
}