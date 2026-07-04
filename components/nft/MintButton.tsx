"use client";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

type Props = {
  loading?: boolean;
  disabled?: boolean;
  approved?: boolean;
  onClick?: () => void;
};

export default function MintButton({
  loading = false,
  disabled = false,
  approved = false,
  onClick,
}: Props) {
  const label = approved
    ? "Mint Early Access NFT"
    : "Approve 55 USDC";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={
        loading ||
        disabled
      }
      className="
        group
        relative
        flex
        h-16
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-sky-500
        via-cyan-500
        to-violet-600
        font-bold
        text-lg
        text-white
        shadow-[0_0_40px_rgba(56,189,248,.35)]
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_0_55px_rgba(56,189,248,.55)]
        active:scale-[0.99]
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:scale-100
      "
    >
      {/* Shine */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.15),transparent)]
          -translate-x-full
          transition-transform
          duration-1000
          group-hover:translate-x-full
        "
      />

      {/* Loading */}

      {loading ? (
        <div className="relative z-10 flex items-center gap-3">

          <Loader2 className="h-5 w-5 animate-spin" />

          {approved
            ? "Minting NFT..."
            : "Approving..."}

        </div>
      ) : (
        <div className="relative z-10 flex items-center gap-3">

          {approved && (
            <CheckCircle2 className="h-5 w-5 text-white" />
          )}

          {label}

          <ArrowRight
            className="
              h-5
              w-5
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />

        </div>
      )}
    </button>
  );
}