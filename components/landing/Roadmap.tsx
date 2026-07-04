import Reveal from "@/components/ui/Reveal";

type Status = "done" | "progress" | "upcoming";

const phases: { phase: string; title: string; status: Status; label: string }[] = [
  { phase: "PHASE 1", title: "Swap", status: "done", label: "Completed" },
  { phase: "PHASE 2", title: "Bridge", status: "done", label: "Completed" },
  { phase: "PHASE 3", title: "Send", status: "done", label: "Completed" },
  { phase: "PHASE 4", title: "Portfolio", status: "done", label: "Completed" },
  { phase: "PHASE 5", title: "Governance", status: "done", label: "Completed" },
  { phase: "PHASE 6", title: "NFT Membership", status: "progress", label: "In Development" },
  { phase: "PHASE 7", title: "Liquidity Pools", status: "upcoming", label: "Coming Soon" },
  { phase: "PHASE 8", title: "Arcitex Pay", status: "upcoming", label: "Coming Soon" },
];

const statusStyles: Record<Status, string> = {
  done: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300",
  progress: "border-violet-300/30 bg-violet-300/15 text-violet-300",
  upcoming: "border-white/[0.09] bg-white/[0.06] text-slate-400",
};

const dotStyles: Record<Status, string> = {
  done: "border-sky-400 bg-sky-400 shadow-[0_0_10px_#38BDF8]",
  progress: "border-violet-300 bg-[#05060F]",
  upcoming: "border-slate-500 bg-[#05060F]",
};

export default function Roadmap() {
  return (
    <section className="px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-16 max-w-[640px]">
          <span className="mb-3.5 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-sky-400">
            Roadmap
          </span>
          <h2 className="mb-4 font-display text-[32px] font-bold sm:text-[40px]">
            Shipping in public
          </h2>
          <p className="text-[16px] leading-[1.7] text-slate-400">
            Eight phases from core trading to a complete merchant-ready payments layer.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative pl-7">
            <div className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-gradient-to-b from-sky-400 via-violet-500 to-white/5" />

            {phases.map((p, i) => (
              <div key={p.phase} className={`relative pb-8 last:pb-0 ${i === phases.length - 1 ? "" : ""}`}>
                <span
                  className={`absolute -left-7 top-1 h-3 w-3 rounded-full border-2 ${dotStyles[p.status]}`}
                />
                <div className="mb-1 flex flex-wrap items-center gap-3">
                  <span className="text-[11.5px] font-semibold tracking-[0.04em] text-slate-500">
                    {p.phase}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[p.status]}`}>
                    {p.label}
                  </span>
                </div>
                <div className="text-[17px] font-semibold">{p.title}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
