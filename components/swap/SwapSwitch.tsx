"use client";

import { ArrowDownUp } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function SwapSwitch({
  onClick,
}: Props) {
  return (
    <div className="relative my-4 flex items-center justify-center">
      {/* Divider kiri */}
      <div className="absolute left-0 h-px w-[42%] bg-gradient-to-r from-transparent to-white/10" />

      {/* Divider kanan */}
      <div className="absolute right-0 h-px w-[42%] bg-gradient-to-l from-transparent to-white/10" />

      <button
        type="button"
        onClick={onClick}
        className="
          group
          relative
          z-10
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-sky-400/30
          bg-gradient-to-br
          from-sky-500
          via-cyan-500
          to-violet-600
          text-white
          shadow-[0_0_30px_rgba(56,189,248,.35)]
          transition-all
          duration-500
          hover:scale-110
          hover:rotate-180
          hover:shadow-[0_0_45px_rgba(56,189,248,.6)]
          active:scale-95
        "
      >
        {/* Glow Ring */}
        <span
          className="
            absolute
            inset-0
            rounded-full
            border
            border-white/20
            opacity-40
            transition
            duration-500
            group-hover:scale-125
            group-hover:opacity-0
          "
        />

        <ArrowDownUp className="relative z-10 h-5 w-5" />
      </button>
    </div>
  );
}