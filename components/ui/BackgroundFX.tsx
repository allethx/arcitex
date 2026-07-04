"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export default function BackgroundFX() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // generated on mount only, so SSR/client markup never mismatches
  useEffect(() => {
    setParticles(
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 14 + 10,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)",
        }}
      />

      <div className="absolute -left-[10%] -top-[10%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_65%)] blur-2xl" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_65%)] blur-2xl" />

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white/70 motion-reduce:hidden"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            animation: `arc-float ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
