"use client";

import { Loader2 } from "lucide-react";

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
    !connected ||
    !valid ||
    loading;

  const buttonText =
    !connected
      ? "Connect Wallet"
      : loading
      ? message
      : !valid
      ? message
      : "Swap Now";

  return (
    <div className="mt-5">
      <button
        type="button"
        disabled={disabled}
        onClick={onSwap}
        className={`
          relative
          flex
          h-14
          w-full
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          text-lg
          font-semibold
          transition-all
          duration-300

          ${
            disabled
              ? `
                cursor-not-allowed
                border
                border-white/5
                bg-zinc-800
                text-zinc-500
              `
              : `
                bg-gradient-to-r
                from-sky-500
                via-cyan-500
                to-violet-600
                text-white
                shadow-[0_0_35px_rgba(56,189,248,.35)]
                hover:scale-[1.02]
                hover:shadow-[0_0_50px_rgba(56,189,248,.55)]
                active:scale-[0.99]
              `
          }
        `}
      >
        {!disabled && (
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
              opacity-0
              transition-opacity
              duration-300
              hover:opacity-100
            "
          />
        )}

        {loading ? (
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />

            <span>{message}</span>
          </div>
        ) : (
          <span className="relative z-10">
            {buttonText}
          </span>
        )}
      </button>
    </div>
  );
}