"use client";

import { useId } from "react";

/**
 * Arcitex mark: a rising arc (bridge / cross-chain motif, and a nod to
 * "ARC") with a glowing network node at its apex, standing in for the
 * connectivity + trading-pulse of the ecosystem. Replaces the generic
 * letter-in-a-box treatment.
 */
export default function Logo({
  size = 32,
  showWordmark = true,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        className="shrink-0"
        style={{ filter: "drop-shadow(0 0 10px rgba(56,189,248,0.45))" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`arc-grad-${uid}`} x1="4" y1="30" x2="36" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <radialGradient id={`node-grad-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="55%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#38BDF8" />
          </radialGradient>
        </defs>

        {/* outer rising arc — bridge / cross-chain motif */}
        <path
          d="M5 28 A15 15 0 0 1 35 28"
          stroke={`url(#arc-grad-${uid})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* inner echo arc for depth */}
        <path
          d="M11.5 28 A8.5 8.5 0 0 1 28.5 28"
          stroke="#7C3AED"
          strokeOpacity="0.35"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* network node / pulse point at the apex */}
        <circle cx="20" cy="13.2" r="3.6" fill={`url(#node-grad-${uid})`} />
        <circle cx="20" cy="13.2" r="6" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1" fill="none" />
      </svg>

      {showWordmark && (
        <span className="font-display text-[17px] font-bold tracking-tight text-white">
          Arcitex
        </span>
      )}
    </div>
  );
}
