"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import Logo from "@/components/ui/Logo";
import BackgroundFX from "@/components/ui/BackgroundFX";
import PayBillCard from "@/components/payment/PayBillCard";

export default function PublicBillPayPage() {
  const params =
    useParams<{ payload: string }>();

  const payload = Array.isArray(
    params?.payload,
  )
    ? params.payload[0]
    : params?.payload ?? "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060F] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_60%)]" />

      <BackgroundFX />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/">
          <Logo size={30} />
        </Link>

        <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
          Secure Payment
        </span>
      </header>

      <div className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-4 py-10">
        <PayBillCard
          payload={payload}
        />
      </div>
    </main>
  );
}
