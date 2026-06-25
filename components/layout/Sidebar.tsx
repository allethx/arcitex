"use client";

import {
  ArrowLeftRight,
  BarChart3,
  Clock3,
  Droplets,
  Settings,
} from "lucide-react";

import WalletCard from "./WalletCard";

const menus = [
  {
    icon: ArrowLeftRight,
    label: "Swap",
    active: true,
  },
  {
    icon: BarChart3,
    label: "Portfolio",
    active: false,
  },
  {
    icon: Clock3,
    label: "History",
    active: false,
  },
  {
    icon: Droplets,
    label: "Pools",
    active: false,
  },
  {
    icon: Settings,
    label: "Settings",
    active: false,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden h-[calc(100vh-4rem)] w-72 shrink-0 flex-col lg:flex">
      {/* Logo */}

      <div className="mb-12">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-lg font-bold">
            A
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Arcitex
            </h1>

            <p className="text-sm text-zinc-500">
              Smart Cross-chain Exchange
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.label}
              className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                menu.active
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">
                {menu.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Spacer */}

      <div className="flex-1" />

      {/* Wallet */}

      <WalletCard />
    </aside>
  );
}