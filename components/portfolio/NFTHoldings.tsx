"use client";

import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

type Props = {
  hasNFT: boolean;
  address?: string;
};

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function NFTHoldings({ hasNFT, address }: Props) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        p-7
        backdrop-blur-2xl
        transition-all
        duration-500
        hover:border-violet-400/30
        hover:shadow-[0_0_70px_rgba(168,85,247,0.14)]
        sm:p-16
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-sky-500/10
          blur-[110px]
        "
      />
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -bottom-24
          h-72
          w-72
          rounded-full
          bg-violet-600/12
          blur-[110px]
        "
      />

      <div className="relative flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          NFT Holdings
        </span>

        {hasNFT && (
          <span
            className="
              flex
              items-center
              gap-1
              rounded-full
              bg-emerald-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-emerald-400
            "
          >
            <Sparkles size={12} />
            Owned
          </span>
        )}
      </div>

      {!hasNFT ? (
        <div
          className="
            relative
            mt-8
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-dashed
            border-white/10
            bg-white/[0.02]
            py-16
            text-center
          "
        >
          <p className="text-sm text-slate-400">
            You don&apos;t own the Arcitex Genesis NFT yet
          </p>

          <a
            href="/app/nft"
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-sky-500
              to-violet-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-[0_0_30px_rgba(56,189,248,0.25)]
              transition
              hover:opacity-90
            "
          >
            Mint Now
          </a>
        </div>
      ) : (
        <div className="relative mt-6 flex flex-col items-center text-center">

          {/* Eyebrow + Title */}

          <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
            Membership
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Arcitex Genesis
          </h3>

          {/* Artwork — large, matches the dedicated /app/nft showcase */}

          <a
            href="/app/nft"
            className="
              group/art
              relative
              mt-6
              aspect-square
              w-full
              max-w-sm
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-[#05060D]
              transition-transform
              duration-500
              hover:scale-[1.015]
              hover:border-sky-400/40
            "
          >
            <svg viewBox="0 0 340 340" className="h-full w-full">
              <defs>
                <linearGradient id="nftArtGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
                <linearGradient id="nftSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="nftOrbGrad" cx="35%" cy="28%" r="75%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#93C5FD" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </radialGradient>
                <radialGradient id="nftGlowBlue" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="nftGlowViolet" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="nftFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C084FC" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              <rect width="340" height="340" fill="#05060D" />
              <circle cx="75" cy="75" r="130" fill="url(#nftGlowBlue)" />
              <circle cx="270" cy="270" r="140" fill="url(#nftGlowViolet)" />

              <g opacity="0.5">
                <circle cx="45" cy="50" r="0.9" fill="#93C5FD" />
                <circle cx="301" cy="59" r="0.9" fill="#D8B4FE" />
                <circle cx="56" cy="283" r="0.9" fill="#C084FC" />
                <circle cx="287" cy="296" r="0.9" fill="#7DD3FC" />
                <circle cx="309" cy="180" r="0.8" fill="#D8B4FE" />
                <circle cx="31" cy="150" r="0.8" fill="#7DD3FC" />
              </g>

              <circle cx="170" cy="165" r="118" fill="none" stroke="#7DD3FC" strokeOpacity="0.06" strokeWidth="1" />
              <circle cx="170" cy="165" r="98" fill="none" stroke="#C084FC" strokeOpacity="0.09" strokeWidth="1" />
              <circle cx="170" cy="165" r="79" fill="none" stroke="#7DD3FC" strokeOpacity="0.14" strokeWidth="0.6" strokeDasharray="1 6" />

              <path d="M 95 201 A 75 75 0 0 1 245 201" fill="none" stroke="#6366F1" strokeOpacity="0.20" strokeWidth="23" strokeLinecap="round" />
              <path d="M 95 201 A 75 75 0 0 1 245 201" fill="none" stroke="url(#nftArtGrad)" strokeWidth="13" strokeLinecap="round" />
              <path d="M 95 201 A 75 75 0 0 1 245 201" fill="none" stroke="url(#nftSheen)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

              <circle cx="245" cy="201" r="18" fill="#8B5CF6" opacity="0.20" />
              <circle cx="245" cy="201" r="11" fill="url(#nftOrbGrad)" />
              <circle cx="241" cy="197" r="3" fill="#FFFFFF" opacity="0.9" />

              <path d="M 160 113 l 2 5 l 5 2 l -5 2 l -2 5 l -2 -5 l -5 -2 l 5 -2 z" fill="#E9D5FF" opacity="0.55" />
              <path d="M 280 235 l 1.5 3.5 l 3.5 1.5 l -3.5 1.5 l -1.5 3.5 l -1.5 -3.5 l -3.5 -1.5 l 3.5 -1.5 z" fill="#BAE6FD" opacity="0.5" />

              <rect x="13" y="13" width="314" height="314" rx="20" fill="none" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="1" />

              <path d="M 22 50 L 22 22 L 50 22" fill="none" stroke="url(#nftFrameGrad)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 318 50 L 318 22 L 290 22" fill="none" stroke="url(#nftFrameGrad)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 22 290 L 22 318 L 50 318" fill="none" stroke="url(#nftFrameGrad)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 318 290 L 318 318 L 290 318" fill="none" stroke="url(#nftFrameGrad)" strokeWidth="1.5" strokeLinecap="round" />

              <text x="170" y="38" textAnchor="middle" fontSize="9" letterSpacing="4" fill="#93C5FD" opacity="0.8" fontWeight="500">MEMBERSHIP</text>

              <text x="170" y="262" textAnchor="middle" fontSize="19" letterSpacing="5" fill="#F8FAFC" fontWeight="500">ARCITEX</text>
              <text x="170" y="280" textAnchor="middle" fontSize="8" letterSpacing="3" fill="#94A3B8" opacity="0.65">GENESIS COLLECTION</text>
            </svg>

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/40
                via-transparent
                to-transparent
                opacity-0
                transition-opacity
                duration-300
                group-hover/art:opacity-100
              "
            />
          </a>

          {/* Description */}

          <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-400">
            Early-access membership NFT for the Arcitex ecosystem —
            grants exclusive governance rights, a premium badge, and
            ongoing Arcitex Pay features.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-1
                text-xs
                text-slate-300
              "
            >
              <ShieldCheck size={12} className="text-sky-400" />
              Non-custodial
            </span>

            {address && (
              <span
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-3
                  py-1
                  text-xs
                  text-slate-300
                "
              >
                {shortAddress(address)}
              </span>
            )}
          </div>

          {/* Links */}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://testnet.arcscan.app/token/0x71767C20316C71AEa96468eb5e1750A419c9F207"
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-sky-500
                to-violet-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-[0_0_30px_rgba(56,189,248,0.20)]
                transition
                hover:opacity-90
              "
            >
              View NFT
            </a>

            {address && (
              <button
                onClick={() =>
                  window.open(
                    `https://testnet.arcscan.app/address/${address}`,
                    "_blank",
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:border-sky-500/50
                  hover:bg-sky-500/10
                "
              >
                ArcScan
                <ExternalLink size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
