"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowLeftRight,
  Briefcase,
  Clock3,
  Droplets,
  Settings,
} from "lucide-react";

import WalletCard from "@/components/wallet/WalletCard";

const menus = [
  {
    title: "Swap",
    href: "/app",
    icon: ArrowLeftRight,
  },
  {
    title: "Portfolio",
    href: "/app/portfolio",
    icon: Briefcase,
  },
  {
    title: "History",
    href: "/app/history",
    icon: Clock3,
  },
  {
    title: "Pools",
    href: "/app/pools",
    icon: Droplets,
  },
  {
    title: "Settings",
    href: "/app/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        sticky
        top-8
        flex
        h-[calc(100vh-4rem)]
        w-64
        flex-col
      "
    >
      {/* Logo */}

      <div>
        <div className="mb-10 flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-violet-500
              to-cyan-500
              text-lg
              font-bold
              text-white
            "
          >
            A
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Arcitex
            </h1>

            <p className="text-sm text-zinc-500">
              Smart Cross-chain Exchange
            </p>
          </div>

        </div>

        {/* Navigation */}

        <nav className="space-y-2">

          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            return (
              <Link
                key={menu.title}
                href={menu.href}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  px-5
                  py-4
                  transition-all

                  ${
                    active
                      ? "bg-gradient-to-r from-violet-600 to-purple-500 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }
                `}
              >
                <Icon className="h-5 w-5" />

                <span>
                  {menu.title}
                </span>

              </Link>
            );
          })}

        </nav>
      </div>

      {/* Wallet Mini */}

      <div className="mt-auto pt-8">
        <WalletCard />
      </div>

    </aside>
  );
}