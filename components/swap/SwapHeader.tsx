"use client";

import {
  Settings2,
  ArrowLeftRight,
} from "lucide-react";

export default function SwapHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-sky-500
            to-violet-600
            shadow-[0_0_25px_rgba(56,189,248,.35)]
          "
        >
          <ArrowLeftRight className="h-6 w-6 text-white" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Swap
          </h2>

          <p className="text-sm text-zinc-500">
            Trade tokens instantly
          </p>
        </div>
      </div>

      <button
        className="
          rounded-2xl
          border
          border-white/10
          bg-[#171A23]
          p-3
          transition-all
          hover:border-sky-500/30
          hover:bg-[#1D2230]
          hover:rotate-90
        "
      >
        <Settings2 className="h-5 w-5 text-zinc-300" />
      </button>
    </div>
  );
}