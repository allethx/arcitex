"use client";

import type { ReactNode } from "react";

type Props = {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export default function BridgeButton({
  loading = false,
  disabled = false,
  onClick,
  children,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-sky-500
        to-violet-600
        py-3.5
        font-semibold
        text-white
        shadow-[0_0_30px_rgba(56,189,248,0.25)]
        transition-all
        duration-300
        hover:opacity-90
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:shadow-none
      "
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-white/30
              border-t-white
            "
          />

          <span>
            Bridging...
          </span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}