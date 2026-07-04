import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/[0.09] px-6 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-10">
          <div>
            <Logo size={30} className="mb-3.5" />
            <p className="max-w-[260px] text-[14px] leading-[1.6] text-slate-400">
              Trade Faster.
              <br />
              Pay Smarter.
            </p>
          </div>

          <div className="flex flex-wrap gap-9">
            <div>
              <h5 className="mb-3.5 text-xs uppercase tracking-[0.06em] text-slate-500">Product</h5>
              <a href="/app" className="mb-2.5 block text-sm text-slate-400 transition-colors hover:text-sky-400">
                Launch App
              </a>
              <a href="#" className="block text-sm text-slate-400 transition-colors hover:text-sky-400">
                Documentation
              </a>
            </div>
            <div>
              <h5 className="mb-3.5 text-xs uppercase tracking-[0.06em] text-slate-500">Community</h5>
              <a href="https://github.com/allethx" className="mb-2.5 block text-sm text-slate-400 transition-colors hover:text-sky-400">
                GitHub
              </a>
              <a href="https://x.com/muflihabdull" className="block text-sm text-slate-400 transition-colors hover:text-sky-400">
                X
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-white/[0.09] pt-6 text-[13px] text-slate-500">
          <div>© 2026 Arcitex. All rights reserved.</div>
          <div className="flex gap-2.5">
            <span className="rounded-full border border-white/[0.09] px-3 py-1.5 text-xs text-slate-400">
              Powered by Circle
            </span>
            <span className="rounded-full border border-white/[0.09] px-3 py-1.5 text-xs text-slate-400">
              Built on ARC
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
