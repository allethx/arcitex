"use client";

import { GitBranch } from "lucide-react";

export default function BridgeHeader() {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-sky-500
              to-violet-600
            "
          >
            <GitBranch className="h-5 w-5 text-white" />
          </div>

          <h2 className="text-3xl font-bold">
            Bridge
          </h2>
        </div>

        <p className="text-sm text-zinc-400">
          Move USDC securely across chains
        </p>
      </div>
    </div>
  );
}