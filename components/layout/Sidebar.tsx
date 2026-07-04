"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/ui/Logo";

import {
  ArrowLeftRight,
  Send,
  GitBranch,
  BriefcaseBusiness,
  History,
  Droplets,
  Landmark,
  Wallet,
  Image as ImageIcon,
} from "lucide-react";

const menus = [
  {
    href: "/app",
    label: "Swap",
    icon: ArrowLeftRight,
  },
  {
    href: "/app/send",
    label: "Send",
    icon: Send,
  },
  {
    href: "/app/bridge",
    label: "Bridge",
    icon: GitBranch,
  },
  {
    href: "/app/portfolio",
    label: "Portfolio",
    icon: BriefcaseBusiness,
  },
  {
    href: "/app/governance",
    label: "Governance",
    icon: Landmark,
  },
  {
    href: "/app/history",
    label: "History",
    icon: History,
  },
  {
    href: "/app/nft",
    label: "NFT",
    icon: ImageIcon,
    badgeText: "Live",
  },
  {
    href: "/app/pools",
    label: "Pools",
    icon: Droplets,
    comingSoon: true,
    disabled: true,
  },
  {
    href: "/app/pay",
    label: "Pay",
    icon: Wallet,
    comingSoon: true,
    disabled: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        flex
        h-screen
        w-[280px]
        flex-col
        border-r
        border-white/[0.09]
        bg-[#070A12]/95
        px-4
        py-4
        backdrop-blur-xl
      "
    >
      {/* Logo */}
      <Link
        href="/app"
        className="
          group
          relative
          shrink-0
          overflow-hidden
          rounded-[18px]
          border
          border-white/[0.09]
          bg-white/[0.045]
          p-3
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-sky-400/40
          hover:shadow-[0_0_45px_rgba(56,189,248,.18)]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-sky-400/10
            via-transparent
            to-violet-500/10
          "
        />
        <div className="relative flex items-center gap-2.5">
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-white/[0.09]
              bg-white/[0.04]
            "
          >
            <Logo size={20} showWordmark={false} />
          </div>
          <div>
            <div className="font-display text-[14px] font-bold leading-tight text-white">
              Arcitex
            </div>
            <div className="text-[10px] leading-tight text-slate-400">
              Trade Faster. Pay Smarter.
            </div>
          </div>
        </div>
      </Link>

      {/* Divider */}
      <div
        className="
          my-4
          h-px
          shrink-0
          bg-gradient-to-r
          from-transparent
          via-sky-400/30
          to-transparent
        "
      />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {menus.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const isDisabled = Boolean(item.disabled);

          const content = (
            <>
              {active && !isDisabled && (
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-white/5
                    to-transparent
                  "
                />
              )}

              <div className="relative flex items-center gap-3">
                <div
                  className={`
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    transition
                    ${
                      active && !isDisabled
                        ? "bg-white/15"
                        : "bg-white/[0.04] group-hover:bg-white/10"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-medium tracking-wide">
                  {item.label}
                </span>
              </div>

              {(item.comingSoon || item.badgeText) && (
                <span
                  className="
                    rounded-full
                    border
                    border-sky-400/20
                    bg-sky-400/10
                    px-2
                    py-0.5
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-sky-300
                  "
                >
                  {item.badgeText ?? "Soon"}
                </span>
              )}
            </>
          );

          const sharedClassName = `
            group
            relative
            flex
            items-center
            justify-between
            overflow-hidden
            rounded-xl
            border
            px-3
            py-2.5
            transition-all
            duration-300
            ${
              isDisabled
                ? `
                  cursor-not-allowed
                  border-transparent
                  text-slate-600
                  opacity-50
                `
                : active
                ? `
                  border-sky-400/20
                  bg-gradient-to-r
                  from-sky-400
                  via-blue-500
                  to-violet-600
                  text-white
                  shadow-[0_0_35px_rgba(56,189,248,.28)]
                `
                : `
                  border-transparent
                  text-slate-400
                  hover:border-white/[0.09]
                  hover:bg-white/[0.045]
                  hover:text-white
                `
            }
          `;

          if (isDisabled) {
            return (
              <div
                key={item.href}
                aria-disabled="true"
                title={item.badgeText ?? "Coming soon"}
                className={sharedClassName}
              >
                {content}
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={sharedClassName}>
              {content}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-3 shrink-0">
        <div className="mb-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Social */}
        <div className="mb-3 flex items-center justify-center gap-2.5">
          <a
            href="https://github.com/allethx"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-white/[0.09]
              bg-white/[0.04]
              transition-all
              duration-300
              hover:border-sky-400/40
              hover:bg-sky-400/10
              hover:shadow-[0_0_18px_rgba(56,189,248,.30)]
            "
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.93c.58.1.79-.25.79-.56v-2.18c-3.26.71-3.95-1.39-3.95-1.39-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.76.41-1.27.74-1.56-2.6-.3-5.34-1.3-5.34-5.77 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.2a11.06 11.06 0 015.82 0c2.22-1.51 3.2-1.2 3.2-1.2.63 1.63.23 2.83.11 3.13.75.82 1.2 1.87 1.2 3.15 0 4.48-2.74 5.46-5.36 5.76.42.37.79 1.08.79 2.19v3.24c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>

          <a
            href="https://x.com/muflihabdull"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-white/[0.09]
              bg-white/[0.04]
              transition-all
              duration-300
              hover:border-violet-400/40
              hover:bg-violet-500/10
              hover:shadow-[0_0_18px_rgba(168,85,247,.30)]
            "
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
              <path d="M18.901 1H22L15.24 8.73L23.2 23H16.97L12.08 15.04L5.11 23H2L9.23 14.73L1.6 1H7.99L12.41 8.28L18.901 1Z" />
            </svg>
          </a>
        </div>

        {/* Connected */}
        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-sky-400/15
            bg-gradient-to-br
            from-sky-400/10
            via-[#0F1628]
            to-violet-500/10
            p-3
          "
        >
          <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]" />
              <p className="text-[13px] font-semibold text-white">Connected</p>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Powered by <span className="ml-1 font-medium text-sky-300">Arcitex</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}