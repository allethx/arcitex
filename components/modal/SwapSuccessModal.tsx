"use client";

import {
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;

  fromToken: string;
  toToken: string;

  fromAmount: string;
  toAmount: string;

  txHash: string;
};

export default function SwapSuccessModal({
  open,
  onClose,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  txHash,
}: Props) {
  if (!open) {
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
          max-h-[90vh]
          overflow-y-auto
          rounded-[32px]
          border
          border-white/10
          bg-[#0B0F17]
          p-8
          shadow-[0_0_60px_rgba(56,189,248,.18)]
        "
      >
        {/* Close */}

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

        {/* Icon */}

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
            <CheckCircle2
              className="h-12 w-12 text-white"
            />
          </div>

        </div>

        {/* Title */}

        <h2
          className="
            mt-8
            text-center
            text-3xl
            font-bold
          "
        >
          Swap Successful
        </h2>

        <p
          className="
            mx-auto
            mt-3
            max-w-sm
            text-center
            text-zinc-400
          "
        >
          Your swap has been
          completed.
        </p>

        {/* Card */}

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
          <div className="flex justify-between">

            <span className="text-zinc-400">
              You Paid
            </span>

            <span className="font-semibold">
              {fromAmount} {fromToken}
            </span>

          </div>

          <div className="my-4 text-center text-xl text-zinc-500">
            ↓
          </div>

          <div className="flex justify-between">

            <span className="text-zinc-400">
              You Received
            </span>

            <span className="font-semibold">
              {toAmount} {toToken}
            </span>

          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-zinc-400">
              Status
            </span>

            <span className="font-semibold text-emerald-400">
              Completed
            </span>

          </div>

        </div>

        {/* Explorer */}

        <button
          type="button"
          disabled={!txHash}
          onClick={() => {
            if (!txHash) return;

            window.open(
              `https://testnet.arcscan.app/tx/${txHash}`,
              "_blank",
            );
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

          <ExternalLink
            size={18}
          />
        </button>

        {/* Done */}

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
          Done
        </button>

      </div>
    </div>
  );
}