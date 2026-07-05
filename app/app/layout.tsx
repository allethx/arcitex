"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import Background from "@/components/ui/BackgroundFX";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

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

      {/* Mobile sidebar backdrop */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            fixed
            inset-0
            z-30
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}

      <Sidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Topbar */}

      <Topbar onMenuClick={() => setMobileOpen(true)} />

      {/* Content */}

      <section
        className="
          relative
          h-screen
          overflow-y-auto
          px-4
          pt-20
          pb-8
          sm:px-6
          lg:ml-72
          lg:px-8
          lg:pt-24
        "
      >
        {children}
      </section>
    </main>
  );
}