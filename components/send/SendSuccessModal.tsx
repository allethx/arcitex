"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  result: any;
};

export default function SendSuccessModal({
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
        <div className="text-center">

          <div
            className="
              mx-auto
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
              ✅
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Transaction Successful
          </h2>

          <p className="mt-2 text-zinc-500">
            Your tokens have been sent successfully.
          </p>

        </div>

        <div className="mt-8 space-y-4">

          <div>

            <p className="text-xs text-zinc-500">
              Transaction Hash
            </p>

            <p className="mt-1 break-all text-sm">
              {result?.txHash ?? "--"}
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
              View on ArcScan
            </a>
          )}

        </div>

        <button
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
          "
        >
          Close
        </button>

      </div>

    </div>
  );
}