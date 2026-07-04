import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import Logo from "@/components/ui/Logo";

const benefits = [
  "Early Access",
  "Exclusive Governance",
  "Premium Badge",
  "Community Rewards",
];

export default function NFTMembership() {
  return (
    <section className="px-6 py-24 sm:px-8">
      <Reveal>
        <div className="relative mx-auto grid max-w-[1180px] overflow-hidden rounded-[22px] border border-violet-500/35 bg-gradient-to-br from-sky-400/[0.07] to-violet-500/10 p-8 sm:p-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="pointer-events-none absolute -right-[10%] -top-[30%] h-[160%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_60%)] blur-2xl" />

          <div className="relative mb-8 flex aspect-[1/1.1] items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-sky-400/25 to-violet-500/35 shadow-[0_30px_60px_-20px_rgba(124,58,237,0.5)] lg:mb-0">
            <div className="absolute inset-0 animate-[arc-shine_4s_ease-in-out_infinite] bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.25)_50%,transparent_65%)] bg-[length:250%_250%]" />
            <div className="relative z-10 scale-[2.2]">
              <Logo size={40} showWordmark={false} />
            </div>
          </div>

          <div className="relative z-10">
            <span className="mb-3.5 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-sky-400">
              Membership
            </span>
            <h3 className="mb-2.5 font-display text-[28px] font-bold sm:text-[30px]">
              Arcitex Early Access NFT
            </h3>
            <p className="mb-7 text-[15px] text-slate-400">
              Become an early member of the Arcitex ecosystem.
            </p>

            <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-white">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    className="shrink-0"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-5">
              <div className="font-display text-[26px] font-bold">
                55 USDC
                <span className="block font-body text-[13px] font-medium text-slate-400">
                  Mint Price
                </span>
              </div>
              <Link
                href="/app/nft"
                className="rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3 text-sm font-semibold text-[#04101B] shadow-[0_8px_30px_-6px_rgba(56,189,248,0.55)] transition-transform hover:-translate-y-0.5"
              >
                Mint NFT
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}