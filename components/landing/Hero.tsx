"use client";

import { useRef } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const trustPills = ["Non-custodial", "Audited contracts", "USDC native"];

export default function Hero() {
  const dashRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = dashRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${-y * 10 + 4}deg) rotateY(${x * 14 - 6}deg)`;
  }

  function handleMouseLeave() {
    if (dashRef.current) dashRef.current.style.transform = "rotateX(4deg) rotateY(-6deg)";
  }

  return (
    <section className="relative px-6 pb-28 pt-[150px] sm:px-8 sm:pt-[170px]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* left column */}
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-1.5 text-[12.5px] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
              Powered by Circle&nbsp;•&nbsp;Built on Arc
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mb-5 font-display text-[40px] font-bold leading-[1.03] sm:text-[56px] lg:text-[68px]">
              Trade Faster.
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-violet-300 to-violet-500 bg-clip-text text-transparent">
                Pay Smarter.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mb-8 max-w-[480px] text-[17px] leading-[1.7] text-slate-400">
              The fastest decentralized finance platform built for the Arc ecosystem. Swap
              assets, bridge across chains, send stablecoins, manage your portfolio and
              participate in governance, everything from one platform.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mb-10 flex flex-wrap gap-3.5">
             <Link
            href="/app"
            className="rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-2.5 text-sm font-semibold text-[#04101B] shadow-[0_8px_30px_-6px_rgba(56,189,248,0.55)] transition-transform hover:-translate-y-0.5"
          >
            Launch App
          </Link>
            
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-wrap gap-5 text-[13px] text-slate-500">
              {trustPills.map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* right column — dashboard mockup */}
        <Reveal delay={120}>
          <div
            className="relative [perspective:1200px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute -inset-10 -z-10 animate-[arc-pulse_6s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(124,58,237,0.35),transparent_55%)] blur-xl" />

            <div
              ref={dashRef}
              className="relative rounded-[22px] border border-white/[0.09] bg-white/[0.045] p-5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform duration-300"
              style={{ transform: "rotateX(4deg) rotateY(-6deg)" }}
            >
              <div className="mb-4 flex items-center justify-between px-1">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                </div>
                <div className="text-xs text-slate-500">arcitex.app</div>
              </div>

              <div className="mb-4 flex gap-1.5 rounded-xl bg-white/[0.03] p-1.5">
                {["Swap", "Bridge", "Send", "Portfolio", "Gov"].map((tab, i) => (
                  <div
                    key={tab}
                    className={`flex-1 rounded-lg py-2 text-center text-xs transition-colors ${
                      i === 0
                        ? "border border-white/[0.08] bg-gradient-to-br from-sky-400/20 to-violet-500/20 text-white"
                        : "text-slate-400"
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              <div className="mb-3 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4.5">
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[13px]">
                    <span className="h-[26px] w-[26px] rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
                    USDC
                  </div>
                  <div className="text-[13px] text-slate-400">2,450.00</div>
                </div>
                <div className="mx-auto my-0.5 flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-white/[0.09] bg-white/[0.04] text-sky-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[13px]">
                    <span className="h-[26px] w-[26px] rounded-full bg-gradient-to-br from-violet-400 to-sky-400" />
                    ARC
                  </div>
                  <div className="text-[13px] text-slate-400">18,920.4</div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4.5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs text-slate-400">Portfolio Value</div>
                  <div className="text-[11px] text-emerald-400">+4.8%</div>
                </div>
                <div className="font-display text-[22px] font-bold">$48,204.12</div>
                <div className="mt-2.5 flex h-[46px] items-end gap-[3px]">
                  {[35, 55, 40, 70, 50, 85, 60, 95].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 rounded-sm bg-gradient-to-t from-sky-400/15 to-sky-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -top-4 flex items-center gap-2 rounded-2xl border border-white/[0.09] bg-[#0A0C16]/85 px-3.5 py-2.5 text-xs backdrop-blur-lg [animation:arc-floatcard_5s_ease-in-out_infinite]">
              <span className="h-[7px] w-[7px] rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              Bridge confirmed
            </div>
            <div className="absolute -left-7 bottom-5 flex items-center gap-2 rounded-2xl border border-white/[0.09] bg-[#0A0C16]/85 px-3.5 py-2.5 text-xs backdrop-blur-lg [animation:arc-floatcard_5s_ease-in-out_infinite] [animation-delay:1.4s]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              Sent 500 USDC
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
