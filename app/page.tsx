import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundFX from "@/components/ui/BackgroundFX";
import Hero from "@/components/landing/Hero";
import LiveStats from "@/components/landing/LiveStats";
import Features from "@/components/landing/Features";
import NFTMembership from "@/components/landing/NFTMembership";
import WhyArcitex from "@/components/landing/WhyArcitex";
import Ecosystem from "@/components/landing/Ecosystem";
import Roadmap from "@/components/landing/Roadmap";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060F] text-white">
      {/* Soft ambient wash behind everything */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_60%)]" />
      <BackgroundFX />

      <Navbar />
      <Hero />
      <LiveStats />
      <Features />
      <NFTMembership />
      <WhyArcitex />
      <Ecosystem />
      <Roadmap />
      <Footer />
    </main>
  );
}
