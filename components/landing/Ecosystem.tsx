import Reveal from "@/components/ui/Reveal";

const nodes = [
  "Swap",
  "Bridge",
  "Send",
  "Portfolio",
  "Governance",
  "NFT Membership",
  "Pools (Coming Soon)",
  "Arcitex Pay (Coming Soon)",
];

export default function Ecosystem() {
  return (
    <section className="px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
          <span className="mb-3.5 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-sky-400">
            The Ecosystem
          </span>
          <h2 className="mb-4 font-display text-[32px] font-bold sm:text-[40px]">
            One flow, from swap to governance
          </h2>
          <p className="mx-auto text-[16px] leading-[1.7] text-slate-400">
            Each product connects into the next, building a complete financial loop.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative mx-auto max-w-[420px]">
            {/* connector line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-sky-400/50 to-transparent">
              <div className="absolute left-1/2 h-[60px] w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_14px_#fff] [animation:arc-travel_3.2s_linear_infinite]" />
            </div>

            {nodes.map((n, i) => {
              const isSoon = n.includes("Coming Soon");
              return (
                <div
                  key={n}
                  className={`relative z-10 mx-auto mb-8 w-fit rounded-2xl border border-white/[0.09] bg-white/[0.045] px-8 py-4 text-center text-[15px] font-semibold backdrop-blur-xl last:mb-0 ${
                    isSoon ? "opacity-60" : ""
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSoon ? "bg-slate-500" : "bg-sky-400 shadow-[0_0_10px_#38BDF8]"
                      }`}
                    />
                    {n}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
