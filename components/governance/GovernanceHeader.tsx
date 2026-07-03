"use client";

import { Landmark } from "lucide-react";

export default function GovernanceHeader() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-sky-500
          to-violet-600
          shadow-[0_0_30px_rgba(56,189,248,.25)]
        "
      >
        <Landmark className="h-7 w-7 text-white" />
      </div>

      <div>
        <h1 className="text-2xl font-bold">
          Governance
        </h1>

        <p className="text-sm text-zinc-400">
          Claim TEX & Vote
        </p>
      </div>
    </div>
  );
}