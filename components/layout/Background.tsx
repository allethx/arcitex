"use client";

export default function Background() {
  return (
    <>
      {/* Base */}

      <div className="fixed inset-0 -z-50 bg-[#06070D]" />

      {/* Blue Glow */}

      <div
        className="
          fixed
          -left-52
          -top-52
          -z-40
          h-[520px]
          w-[520px]
          rounded-full
          bg-sky-500/15
          blur-[140px]
        "
      />

      {/* Violet Glow */}

      <div
        className="
          fixed
          -right-60
          bottom-0
          -z-40
          h-[620px]
          w-[620px]
          rounded-full
          bg-violet-600/15
          blur-[180px]
        "
      />

      {/* Cyan Glow */}

      <div
        className="
          fixed
          left-1/2
          top-1/3
          -z-40
          h-[320px]
          w-[320px]
          -translate-x-1/2
          rounded-full
          bg-cyan-400/10
          blur-[120px]
        "
      />

      {/* Grid */}

      <div
        className="
          fixed
          inset-0
          -z-30
          opacity-[0.04]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
    </>
  );
}