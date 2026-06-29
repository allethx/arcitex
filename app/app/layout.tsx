import type { ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-7xl gap-8 p-8">

        {/* Sidebar */}

        <Sidebar />

        {/* Main Content */}

        <section className="flex flex-1 flex-col">

          <Topbar />

          <div className="mt-8 flex-1">
            {children}
          </div>

        </section>

      </div>
    </main>
  );
}