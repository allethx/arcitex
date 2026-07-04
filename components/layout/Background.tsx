"use client";

export default function Background() {
  return (
    <>
      {/* Base */}
      <div className="fixed inset-0 -z-50 bg-[#06070D]" />

      {/* Blue Glow — top left */}
      <div
        className="
          fixed
          -left-40
          -top-40
          -z-40
          h-[560px]
          w-[560px]
          rounded-full
          bg-sky-500/20
          blur-[160px]
        "
      />

      {/* Violet Glow — bottom right */}
      <div
        className="
          fixed
          -right-40
          -bottom-40
          -z-40
          h-[620px]
          w-[620px]
          rounded-full
          bg-violet-600/20
          blur-[180px]
        "
      />

      {/* Cyan Glow — center, behind hero */}
      <div
        className="
          fixed
          left-1/2
          top-[36%]
          -z-40
          h-[380px]
          w-[380px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400/10
          blur-[140px]
        "
      />

      {/* Vignette — keeps edges dark so glows read as ambient, not spotlights */}
      <div
        className="
          fixed
          inset-0
          -z-30
          bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,7,13,0.6)_75%,rgba(6,7,13,0.95)_100%)]
        "
      />

      {/* Grid */}
      <div
        className="
          fixed
          inset-0
          -z-30
          opacity-[0.05]
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