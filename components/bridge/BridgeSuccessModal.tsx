"use client";

import {
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  result: any;
};

export default function BridgeSuccessModal({
  open,
  onClose,
  result,
}: Props) {
  if (!open) {
    return null;
  }

  async function copyHash() {
    if (!result?.txHash) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        result.txHash,
      );
    } catch {
      console.error(
        "Failed to copy transaction hash",
      );
    }
  }

  const sourceChain = String(
    result?.source?.chain?.name ??
      result?.source?.chain ??
      "--",
  ).replaceAll("_", " ");

  const destinationChain = String(
    result?.destination?.chain?.name ??
      result?.destination?.chain ??
      "--",
  ).replaceAll("_", " ");

  const provider =
    result?.provider ===
    "CCTPV2BridgingProvider"
      ? "Circle CCTP V2"
      : result?.provider ?? "--";

  const explorerUrl =
    result?.explorerUrl ??
    (result?.txHash
      ? `https://testnet.arcscan.app/tx/${result.txHash}`
      : null);

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
          Bridge Successful
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
          Your assets have been
          bridged successfully.
        </p>

        {/* Bridge Details */}

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
              Amount
            </span>

            <span className="font-semibold">
              {result?.amount ?? "--"}{" "}
              {result?.token ?? ""}
            </span>

          </div>

          <div className="mt-4 flex items-start justify-between">

            <span className="text-zinc-400">
              Route
            </span>

            <div className="text-right">
              <p className="font-semibold">
                {sourceChain}
              </p>

              <p className="text-zinc-500">
                ↓
              </p>

              <p className="font-semibold">
                {destinationChain}
              </p>
            </div>

          </div>

          <div className="mt-4 flex justify-between">

            <span className="text-zinc-400">
              Provider
            </span>

            <span className="font-semibold">
              {provider}
            </span>

          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-zinc-400">
              Speed
            </span>

            <span
              className="
                rounded-full
                bg-emerald-500/15
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-400
              "
            >
              {result?.config
                ?.transferSpeed ??
                "FAST"}
            </span>

          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-zinc-400">
              Status
            </span>

            <span className="font-semibold text-emerald-400">
              {result?.status ??
                "Pending"}
            </span>

          </div>

        </div>

        {/* Transaction */}

        <div className="mt-6">

          <p className="mb-2 text-xs text-zinc-500">
            Transaction Hash
          </p>

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-4
            "
          >
            <p className="break-all font-mono text-xs text-zinc-300">
              {result?.txHash ??
                "--"}
            </p>

            {result?.txHash && (
              <button
                type="button"
                onClick={copyHash}
                className="
                  shrink-0
                  text-zinc-400
                  transition
                  hover:text-white
                "
              >
                <Copy size={16} />
              </button>
            )}
          </div>

        </div>

        {/* Explorer */}

        <button
          type="button"
          disabled={!explorerUrl}
          onClick={() => {
            if (explorerUrl) {
              window.open(
                explorerUrl,
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
          View on Explorer

          <ExternalLink
            size={18}
          />
        </button>

        {/* Close */}

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