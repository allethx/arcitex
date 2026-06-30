"use client";

import { ExternalLink, CheckCircle2 } from "lucide-react";

import type { TransactionHistory } from "@/types/transaction";

type Props = {
  item: TransactionHistory;
};

export default function HistoryItem({
  item,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-900
        p-5
      "
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <CheckCircle2
            className="text-green-400"
            size={22}
          />

          <div>
            <p className="font-semibold text-white">
              {item.fromToken} → {item.toToken}
            </p>

            <p className="text-sm text-zinc-400">
              {item.fromAmount} → {item.toAmount}
            </p>
          </div>
        </div>

        <span className="text-sm text-green-400">
          {item.status}
        </span>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <span className="text-xs text-zinc-500">
          {new Date(
            item.timestamp
          ).toLocaleString()}
        </span>

        <button
          onClick={() =>
            window.open(
              `https://testnet.arcscan.app/tx/${item.txHash}`,
              "_blank"
            )
          }
          className="
            flex
            items-center
            gap-2
            text-sm
            text-cyan-400
            hover:text-cyan-300
          "
        >
          ArcScan

          <ExternalLink size={16} />
        </button>

      </div>
    </div>
  );
}