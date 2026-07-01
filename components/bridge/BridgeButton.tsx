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
        from-violet-600
        to-cyan-500
        py-4
        font-semibold
        text-white
        transition-all
        duration-300
        hover:opacity-90
        hover:shadow-lg
        disabled:cursor-not-allowed
        disabled:opacity-50
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