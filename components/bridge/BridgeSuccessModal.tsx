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
          Your assets are now being bridged.
        </p>

        {/* Info */}

        <div className="mt-8 space-y-4">

          <div>
            <p className="text-xs text-zinc-500">
              Transaction Hash
            </p>

            <p className="mt-1 break-all text-sm">
              {result?.txHash ?? "--"}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">
              Status
            </p>

            <p className="mt-1 font-medium text-green-400">
              {result?.status ?? "Pending"}
            </p>
          </div>

          {result?.explorerUrl && (
            <a
              href={result.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                block
                text-center
                text-violet-400
                transition
                hover:text-violet-300
              "
            >
              View on Explorer
            </a>
          )}

        </div>

        {/* Button */}

        <button
          type="button"
          onClick={onClose}
          className="
            mt-8
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