import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-600/20 blur-[180px]" />

      <Navbar />

      <Hero />

    </main>
  );
}