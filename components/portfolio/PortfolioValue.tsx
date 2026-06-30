"use client";

type Props = {
  total: number;
};

export default function PortfolioValue({
  total,
}: Props) {
  const formatted = new Intl.NumberFormat(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(total);

  return (
    <div
      className="
        w-full
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-violet-500/40
        hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]
      "
    >
      <p className="text-sm text-zinc-500">
        Portfolio Value
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        ${formatted}
      </h2>

      <div className="mt-4 flex items-center gap-2">
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
          +4.21%
        </span>

        <span className="text-sm text-zinc-500">
          Today
        </span>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="
            h-full
            w-[72%]
            rounded-full
            bg-gradient-to-r
            from-violet-500
            via-fuchsia-500
            to-cyan-500
            transition-all
            duration-1000
          "
        />
      </div>
    </div>
  );
}