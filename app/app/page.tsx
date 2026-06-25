import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import SwapCard from "@/components/swap/SwapCard";

export default function AppPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-7xl gap-8 p-8">
        <Sidebar />

        <section className="flex flex-1 flex-col">
          <Topbar />

          <div className="flex flex-1 items-start justify-center">
            <SwapCard />
          </div>
        </section>
      </div>
    </main>
  );
}