"use client";

type Props = {
  connected: boolean;
  valid: boolean;
  message: string;
  loading: boolean;
  onSwap: () => void;
};

export default function SwapAction({
  connected,
  valid,
  message,
  loading,
  onSwap,
}: Props) {
  const disabled =
    !connected || !valid || loading;

  return (
    <div className="mt-6">

      {!connected && (
        <p className="mb-3 text-center text-sm text-zinc-400">
          Connect your wallet to continue.
        </p>
      )}

      {connected && !valid && (
        <p className="mb-3 text-center text-sm text-red-400">
          {message}
        </p>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={onSwap}
        className={`
          w-full
          rounded-2xl
          py-4
          text-lg
          font-semibold
          transition-all

          ${
            disabled
              ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
              : "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90"
          }
        `}
      >
        {!connected
       ? "Connect Wallet"
       : loading
       ? message
       : !valid
       ? message
       : "Swap"}
      </button>

    </div>
  );
}