"use client";

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

  const sourceChain =
    String(
      result?.source?.chain?.name ??
        result?.source?.chain ??
        "--",
    ).replaceAll("_", " ");

  const destinationChain =
    String(
      result?.destination?.chain?.name ??
        result?.destination?.chain ??
        "--",
    ).replaceAll("_", " ");

  const provider =
    result?.provider ===
    "CCTPV2BridgingProvider"
      ? "Circle CCTP V2"
      : result?.provider ?? "--";

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900
          p-8
        "
      >
        {/* Icon */}

        <div className="flex justify-center">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-green-500/20
            "
          >
            <span className="text-3xl">
              🌉
            </span>
          </div>
        </div>

        {/* Title */}

        <h2 className="mt-6 text-center text-2xl font-bold">
          Bridge Successful
        </h2>

        <p className="mt-2 text-center text-zinc-500">
          Your assets have been bridged successfully.
        </p>

        {/* Bridge Details */}

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950/50
            p-5
          "
        >
          <h3 className="mb-5 text-base font-semibold">
            Bridge Details
          </h3>

          <div className="space-y-4 text-sm">

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">
                Amount
              </span>

              <span className="font-medium">
                {result?.amount ?? "--"}{" "}
                {result?.token ?? ""}
              </span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-zinc-500">
                Route
              </span>

              <div className="text-right">
                <p>{sourceChain}</p>

                <p className="text-zinc-500">
                  ↓
                </p>

                <p>{destinationChain}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">
                Provider
              </span>

              <span className="font-medium">
                {provider}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">
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

          </div>
        </div>

        {/* Transaction */}

        <div className="mt-8">

          <p className="mb-2 text-xs text-zinc-500">
            Transaction Hash
          </p>

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-950
              p-4
            "
          >
            <p className="break-all font-mono text-xs">
              {result?.txHash ??
                "--"}
            </p>

            {result?.txHash && (
              <button
                type="button"
                onClick={copyHash}
                className="
                  mt-3
                  text-xs
                  font-medium
                  text-cyan-400
                  transition
                  hover:text-cyan-300
                "
              >
                📋 Copy Hash
              </button>
            )}
          </div>

        </div>

        {/* Status */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-zinc-800
            bg-zinc-950/50
            px-4
            py-3
          "
        >
          <span className="text-zinc-400">
            Status
          </span>

          <span className="font-semibold text-emerald-400">
            {result?.status ??
              "Pending"}
          </span>
        </div>

        {/* Explorer */}

        {result?.explorerUrl && (
          <a
            href={
              result.explorerUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-violet-500/30
              bg-violet-500/10
              py-4
              font-semibold
              text-violet-300
              transition
              hover:bg-violet-500/20
            "
          >
            🔗 View on Explorer
          </a>
        )}

        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          className="
            mt-5
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-cyan-500
            py-4
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