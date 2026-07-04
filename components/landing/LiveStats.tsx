"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: boolean;
}

const stats: Stat[] = [
  { value: 2.5, suffix: "M+", prefix: "$", label: "Trading Volume", decimals: true },
  { value: 15, suffix: "K+", label: "Transactions" },
  { value: 99.9, suffix: "%", label: "Success Rate", decimals: true },
  { value: 6, suffix: "", label: "Core Products" },
];

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(stat.decimals ? "0.0" : "0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          let cur = 0;
          const steps = 40;
          const inc = stat.value / steps;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= stat.value) {
              cur = stat.value;
              clearInterval(timer);
            }
            setDisplay(stat.decimals ? cur.toFixed(1) : String(Math.floor(cur)));
          }, 30);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat]);

  return (
    <div
      ref={ref}
      className="rounded-[22px] border border-white/[0.09] bg-white/[0.045] p-6 backdrop-blur-xl transition-transform hover:-translate-y-1 hover:border-sky-400/35"
    >
      <div className="mb-1.5 bg-gradient-to-br from-white to-sky-400 bg-clip-text font-display text-[32px] font-bold text-transparent">
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="text-[13px] text-slate-400">{stat.label}</div>
    </div>
  );
}

export default function LiveStats() {
  return (
    <section className="px-6 pb-24 pt-10 sm:px-8">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 60}>
            <Counter stat={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
