import type { ReactNode } from "react";

import Background from "@/components/layout/Background";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        text-white
      "
    >
      {/* Background */}

      <Background />

      {/* Sidebar */}

      <Sidebar />

      {/* Topbar */}

      <Topbar />

      {/* Content */}

      <section
        className="
          relative
          ml-72
          h-screen
          overflow-y-auto
          px-8
          pt-24
          pb-8
        "
      >
        {children}
      </section>
    </main>
  );
}