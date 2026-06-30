"use client";

import { ArrowRight } from "lucide-react";

import type { TransactionHistory } from "@/types/transaction";

type Props = {
  latest?: TransactionHistory;
};

export default function LastActivity({
  latest,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/40
        p-5
      "
    >
      <p className="text-sm text-zinc-500">
        Last Activity
      </p>

      {!latest ? (
        <p className="mt-4 text-sm text-zinc-500">
          No transactions yet
        </p>
      ) : (
        <div className="mt-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-violet-500
                to-cyan-500
                text-sm
                font-bold
                text-white
              "
            >
              {latest.fromToken.charAt(0)}
            </div>

            <div>

              <div className="flex items-center gap-2">

                <span className="font-semibold text-white">
                  {latest.fromToken}
                </span>

                <ArrowRight
                  size={15}
                  className="text-zinc-500"
                />

                <span className="font-semibold text-white">
                  {latest.toToken}
                </span>

              </div>

              <p className="mt-1 text-xs text-zinc-500">
                {new Date(
                  latest.timestamp
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          <span
            className="
              rounded-full
              bg-emerald-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-emerald-400
            "
          >
            Completed
          </span>

        </div>
      )}

    </div>
  );
}