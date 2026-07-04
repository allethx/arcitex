"use client";

import Image from "next/image";

export default function NFTArtwork() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-gradient-to-br
        from-sky-500/10
        via-violet-500/5
        to-transparent
        p-3
      "
    >
      {/* Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,#38bdf855,transparent_70%)]
        "
      />

      <Image
        src="/nft/artwork.png"
        alt="Arcitex Early Access NFT"
        width={900}
        height={900}
        priority
        className="
          relative
          z-10
          w-full
          rounded-3xl
          object-cover
          transition-transform
          duration-500
          hover:scale-[1.02]
        "
      />
    </div>
  );
}