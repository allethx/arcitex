"use client";

import {
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";

import type { Bill } from "@/types/payment";

type Props = {
  open: boolean;
  onClose: () => void;
  bill: Bill | null;
  result: any;
};

export default function BillPaySuccessModal({
  open,
  onClose,
  bill,
  result,
}: Props) {
  if (!open || !bill) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
      "
    >
      <div
        className="
          relative
          w-full
          max-w-lg
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-[#0B0F17]
          p-8
          shadow-[0_0_60px_rgba(56,189,248,.18)]
        "
      >
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            rounded-xl
            p-2
            text-zinc-400
            transition
            hover:bg-white/5
            hover:text-white
          "
        >
          <X size={18} />
        </button>

        <div className="flex justify-center">
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-sky-500
              to-violet-600
              shadow-[0_0_40px_rgba(56,189,248,.35)]
            "
          >
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
        </div>

        <h2 className="mt-8 text-center text-3xl font-bold">
          Bill Paid
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-center text-zinc-400">
          {bill.title} has been settled
          successfully on Arc.
        </p>

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-sky-500/20
            bg-sky-500/5
            p-5
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              Amount Paid
            </span>

            <span className="font-semibold text-white">
              {bill.amount} {bill.token}
            </span>
          </div>

          <div className="mt-4 h-px bg-white/5" />

          <span className="mt-4 block text-xs text-zinc-500">
            Transaction Hash
          </span>

          <p className="mt-2 break-all font-mono text-sm font-semibold">
            {result?.txHash ?? "--"}
          </p>
        </div>

        <button
          type="button"
          disabled={!result?.explorerUrl}
          onClick={() => {
            if (result?.explorerUrl) {
              window.open(
                result.explorerUrl,
                "_blank",
              );
            }
          }}
          className="
            mt-8
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            font-semibold
            transition
            hover:border-sky-500
            hover:bg-sky-500/10
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          View on ArcScan
          <ExternalLink size={18} />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="
            mt-4
            h-14
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-sky-500
            to-violet-600
            font-semibold
            text-white
            transition
            hover:opacity-90
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
