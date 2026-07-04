import Reveal from "@/components/ui/Reveal";

const features = [
  {
    title: "Swap",
    desc: "Lightning-fast token swaps with smart routing across the ARC ecosystem.",
    path: "M7 10l5-5 5 5M7 14l5 5 5-5",
  },
  {
    title: "Bridge",
    desc: "Secure cross-chain USDC transfers, backed by Circle infrastructure.",
    path: "M3 12h18M3 6h18M3 18h18",
  },
  {
    title: "Send",
    desc: "Instant wallet-to-wallet stablecoin payments, anywhere in the world.",
    path: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  },
  {
    title: "Portfolio",
    desc: "Track balances, positions and full transaction history in real time.",
    path: "M3 3v18h18M18 9l-5 5-3-3-4 4",
  },
  {
    title: "Governance",
    desc: "Vote on protocol proposals and shape Arcitex's future using TEX.",
    path: "M12 2l9 4.5v6c0 5-3.8 8.5-9 9.5-5.2-1-9-4.5-9-9.5v-6L12 2z",
  },
  {
    title: "NFT Membership",
    desc: "Exclusive Early Access NFT unlocking premium ecosystem benefits.",
    path: "M12 2l3 6 6 1-4.5 4.5 1 6.5-5.5-3-5.5 3 1-6.5L3 9l6-1 3-6z",
  },
  {
    title: "Pools",
    desc: "Provide liquidity to earn trading fees and future TEX rewards.",
    path: "M12 2C8 6 5 9 5 13a7 7 0 0014 0c0-4-3-7-7-11z",
    soon: true,
  },
  {
    title: "Pay",
    desc: "Accept and send merchant payments using USDC, built for real commerce.",
    path: "M2 7h20v13H2V7zM2 10h20M6 15h4",
    soon: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-16 max-w-[640px]">
          <span className="mb-3.5 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-sky-400">
            Core Products
          </span>
          <h2 className="mb-4 font-display text-[32px] font-bold sm:text-[40px]">
            One platform, six ways to move value
          </h2>
          <p className="text-[16px] leading-[1.7] text-slate-400">
            Every core action of a DeFi portfolio, unified inside a single fast, secure
            interface.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 40}>
              <div className="group relative overflow-hidden rounded-[22px] border border-white/[0.09] bg-white/[0.045] p-7 backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-violet-500/40">
                <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_30%_0%,rgba(56,189,248,0.16),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.09] bg-gradient-to-br from-sky-400/20 to-violet-500/20 text-sky-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={f.path} />
                  </svg>
                </div>

                <h3 className="relative z-10 mb-2 flex items-center gap-2 text-[18px] font-semibold">
                  {f.title}
                  {f.soon && (
                    <span className="rounded-full border border-violet-500/40 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-bold text-violet-300">
                      SOON
                    </span>
                  )}
                </h3>
                <p className="relative z-10 text-[14px] leading-[1.65] text-slate-400">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
