"use client";

import {
  ArrowLeftRight,
  SendHorizontal,
  GitBranchPlus,
  Gift,
  Vote,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import type { TransactionHistory } from "@/types/transaction";

type Props = {
  item: TransactionHistory;
};

function getTypeInfo(type?: string) {
  switch (type) {
    case "swap":
      return {
        icon: ArrowLeftRight,
        label: "Swap",
        color: "text-violet-400",
      };

    case "send":
      return {
        icon: SendHorizontal,
        label: "Send",
        color: "text-sky-400",
      };

    case "bridge":
      return {
        icon: GitBranchPlus,
        label: "Bridge",
        color: "text-sky-400",
      };

    case "claim":
      return {
        icon: Gift,
        label: "Claim",
        color: "text-emerald-400",
      };

    case "vote":
      return {
        icon: Vote,
        label: "Governance",
        color: "text-amber-400",
      };

    default:
      return {
        icon: ArrowLeftRight,
        label: "Transaction",
        color: "text-zinc-400",
      };
  }
}

export default function HistoryItem({
  item,
}: Props) {
  const info = getTypeInfo(item.type);

  const Icon = info.icon;

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#0B0F17]
        p-5
        transition
        hover:border-sky-500/30
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-start gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-sky-500
              to-violet-600
              shadow-[0_0_20px_rgba(56,189,248,.25)]
            "
          >
            <Icon className="h-5 w-5 text-white" />
          </div>

          <div>

            <p
              className={`text-sm font-semibold ${info.color}`}
            >
              {info.label}
            </p>

            <p className="mt-1 font-semibold text-white">
              {item.fromToken}
              {item.toToken &&
                ` → ${item.toToken}`}
            </p>

            <p className="text-sm text-zinc-400">
              {item.fromAmount}

              {item.toAmount &&
                ` → ${item.toAmount}`}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <CheckCircle2
            size={18}
            className="text-emerald-400"
          />

          <span className="text-sm font-medium text-emerald-400">
            {item.status}
          </span>

        </div>

      </div>

      {/* Extra Information */}

      {item.type === "send" &&
        item.recipient && (
          <div
            className="
              mt-5
              rounded-xl
              border
              border-sky-500/20
              bg-sky-500/5
              p-4
            "
          >
            <p className="text-xs text-zinc-500">
              Recipient
            </p>

            <p className="mt-1 break-all text-sm text-white">
              {item.recipient}
            </p>
          </div>
        )}

      {item.type === "bridge" &&
        item.fromChain &&
        item.toChain && (
          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-sky-500/20
              bg-sky-500/5
              px-4
              py-3
            "
          >
            <span className="text-sm text-zinc-300">
              {item.fromChain}
            </span>

            <span className="text-zinc-500">
              →
            </span>

            <span className="text-sm text-zinc-300">
              {item.toChain}
            </span>

          </div>
        )}

      {item.type === "vote" &&
        item.proposal && (
          <div
            className="
              mt-5
              rounded-xl
              border
              border-sky-500/20
              bg-sky-500/5
              p-4
            "
          >
            <p className="text-xs text-zinc-500">
              Proposal
            </p>

            <p className="mt-1 text-sm text-white">
              {item.proposal}
            </p>

            {item.vote && (
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  item.vote === "YES"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-red-500/15 text-red-400"
                }`}
              >
                Vote {item.vote}
              </span>
            )}

          </div>
        )}

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between">

        <span className="text-xs text-zinc-500">
          {new Date(
            item.timestamp
          ).toLocaleString()}
        </span>

        <button
          type="button"
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
            text-sky-400
            transition
            hover:text-sky-300
          "
        >
          ArcScan

          <ExternalLink size={16} />
        </button>

      </div>

    </div>
  );
}