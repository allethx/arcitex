import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/arcitex-logo.png"
          alt="Arcitex logo"
          width={34}
          height={34}
          priority
          className="h-[34px] w-[34px]"
        />
        <span className="text-xl font-extrabold tracking-tight text-white">
          ARCITEX
        </span>
      </Link>

      <Link
        href="#launch"
        className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,108,255,0.35)]"
      >
        Launch App
      </Link>
    </nav>
  );
}
