"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

const navItems = [
  { label: "Swap", href: "/app" },
  { label: "Bridge", href: "app/bridge" },
  { label: "Send", href: "app/send" },
  { label: "Portfolio", href: "app/portfolio" },
  { label: "Governance", href: "app/governance" },
  { label: "NFT", href: "app/nft" },
  { label: "Pools", href: "#", soon: true },
  { label: "Pay", href: "#", soon: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center pt-4">
      <nav className="flex w-[94%] max-w-[1180px] items-center justify-between rounded-2xl border border-white/[0.09] bg-[#080A14]/60 px-5 py-3 backdrop-blur-xl">
        <Logo size={30} />

        <div className="hidden items-center gap-6 text-sm text-slate-400 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition-colors hover:text-white">
              {item.label}
              {item.soon && (
                <sup className="ml-0.5 text-[9px] font-bold text-violet-400">SOON</sup>
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/allethx"
            aria-label="GitHub"
            className="hidden h-8 w-8 items-center justify-center rounded-lg border border-white/[0.09] text-slate-400 transition-colors hover:text-white sm:flex"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.11 3.05.75.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.17v3.22c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
            </svg>
          </a>
          <a
            href="https://x.com/muflihabdull"
            aria-label="X"
            className="hidden h-8 w-8 items-center justify-center rounded-lg border border-white/[0.09] text-slate-400 transition-colors hover:text-white sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 1.6h3.7l-8.1 9.3 9.5 12.5h-7.4l-5.8-7.6-6.6 7.6H.6l8.7-10-9.1-11.8h7.6l5.3 7z" />
            </svg>
          </a>

            <Link
            href="/app"
            className="rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-2.5 text-sm font-semibold text-[#04101B] shadow-[0_8px_30px_-6px_rgba(56,189,248,0.55)] transition-transform hover:-translate-y-0.5"
          >
            Launch App
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09] text-white lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute top-[74px] w-[94%] max-w-[1180px] rounded-2xl border border-white/[0.09] bg-[#080A14]/95 p-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4 text-sm text-slate-300">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label} {item.soon && <span className="text-xs text-violet-400">SOON</span>}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
