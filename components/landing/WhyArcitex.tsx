import Reveal from "@/components/ui/Reveal";

const items = [
  { title: "Lightning Fast", desc: "Sub second execution across every core action.", path: "M13 2L3 14h7l-1 8 10-12h-7l1-8z" },
  { title: "Smart Cross-chain", desc: "Bridging logic that finds the fastest safe route.", path: "M3 12h4l3-9 4 18 3-9h4" },
  { title: "Circle Stablecoins", desc: "Native USDC support, backed by trusted issuance.", path: "M12 2l9 4.5v6c0 5-3.8 8.5-9 9.5-5.2-1-9-4.5-9-9.5v-6L12 2z" },
  { title: "Low Fees", desc: "Optimized routing keeps costs minimal on every trade.", path: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" },
  { title: "Secure Smart Contracts", desc: "Independently audited before every mainnet release.", path: "M3 11h18v10H3V11zM7 11V7a5 5 0 0110 0v4" },
  { title: "Community Governance", desc: "Every major decision is proposed and voted on by holders.", path: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
  { title: "Portfolio Tracking", desc: "Real time visibility into balances and positions.", path: "M3 3v18h18M18 9l-5 5-3-3-4 4" },
  { title: "Future Liquidity Mining", desc: "Earn rewards for providing liquidity, coming soon.", path: "M12 2C8 6 5 9 5 13a7 7 0 0014 0c0-4-3-7-7-11z" },
  { title: "Merchant Payments", desc: "Accept USDC payments for real world commerce.", path: "M2 7h20v13H2V7zM2 10h20M6 15h4" },
];

export default function WhyArcitex() {
  return (
    <section className="px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-16 max-w-[640px]">
          <span className="mb-3.5 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-sky-400">
            Why Arcitex
          </span>
          <h2 className="mb-4 font-display text-[32px] font-bold sm:text-[40px]">
            Built to be the financial layer of ARC
          </h2>
          <p className="text-[16px] leading-[1.7] text-slate-400">
            Every design decision is made for speed, security and long-term reliability.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.title} className="bg-[#070A12] p-7 transition-colors hover:bg-sky-400/5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" className="mb-3.5">
                  <path d={item.path} />
                </svg>
                <h4 className="mb-1.5 text-[15px] font-semibold">{item.title}</h4>
                <p className="text-[13px] leading-[1.6] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
