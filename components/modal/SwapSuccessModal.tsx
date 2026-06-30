"use client";

import { CheckCircle2, ExternalLink } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-zinc-700
          bg-zinc-900
          p-8
          shadow-2xl
        "
      >
        <div className="flex flex-col items-center">

          <CheckCircle2
            className="mb-5 h-16 w-16 text-green-400"
          />

          <h2 className="text-2xl font-bold text-white">
            Swap Successful
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Your swap has been completed.
          </p>

          <div className="my-8 w-full rounded-2xl bg-zinc-800 p-5">

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">
                You Paid
              </span>

              <span className="font-semibold text-white">
                {fromAmount} {fromToken}
              </span>
            </div>

            <div className="my-4 text-center text-2xl text-zinc-500">
              ↓
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">
                You Received
              </span>

              <span className="font-semibold text-white">
                {toAmount} {toToken}
              </span>
            </div>

          </div>

          <div className="mb-6 flex w-full items-center justify-between rounded-xl bg-zinc-800 px-4 py-3">

            <span className="text-zinc-400">
              Status
            </span>

            <span className="font-semibold text-green-400">
              Completed
            </span>

          </div>

          <button
  disabled={!txHash}
  onClick={() => {
    if (!txHash) return;

    window.open(
      `https://testnet.arcscan.app/tx/${txHash}`,
      "_blank"
    );
  }}
  className={`
    mb-3
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-2xl
    py-3
    transition

    ${
      txHash
        ? "bg-zinc-800 hover:bg-zinc-700"
        : "cursor-not-allowed bg-zinc-800/50 text-zinc-500"
    }
  `}
>
  View on ArcScan

  <ExternalLink size={18} />
</button>

          <button
            onClick={onClose}
            className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              to-cyan-500
              py-3
              font-semibold
              text-white
            "
          >
            Done
          </button>

        </div>
      </div>

    </div>
  );
}