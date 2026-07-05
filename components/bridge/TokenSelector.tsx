"use client";

import { ChevronDown } from "lucide-react";

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
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
        Token
      </label>

      <div className="relative">

        <select
          value={token}
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
          <option
            value="USDC"
            className="bg-[#0B0F17]"
          >
            USDC
          </option>

          <option
            value="EURC"
            disabled
            className="bg-[#0B0F17]"
          >
            EURC (Coming Soon)
          </option>
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

      <p className="mt-1.5 text-xs text-slate-500">
        Bridge currently supports USDC only.
      </p>

    </div>
  );
}