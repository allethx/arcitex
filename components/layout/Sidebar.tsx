"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowLeftRight,
  Send,
  GitBranch,
  BriefcaseBusiness,
  History,
  Droplets,
  Landmark,
} from "lucide-react";

const menus = [
  {
    href: "/app",
    label: "Swap",
    icon: ArrowLeftRight,
  },
  {
    href: "/app/send",
    label: "Send",
    icon: Send,
  },
  {
    href: "/app/bridge",
    label: "Bridge",
    icon: GitBranch,
  },
  {
    href: "/app/portfolio",
    label: "Portfolio",
    icon: BriefcaseBusiness,
  },
  {
    href: "/app/history",
    label: "History",
    icon: History,
  },
  {
    href: "/app/pools",
    label: "Pools",
    icon: Droplets,
    comingSoon: true,
  },
  {
    href: "/app/governance",
    label: "Governance",
    icon: Landmark,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-white/5
        bg-[#080A12]
        px-6
        py-8
      "
    >
      {/* Logo */}

      <Link
        href="/app"
        className="flex items-center gap-4"
      >
        <Image
          src="/logo1.png"
          alt="Arcitex"
          width={54}
          height={54}
          priority
          className="rounded-xl"
        />

        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            ARCITEX
          </h1>

          <p className="mt-1 text-xs text-white">
            The Gateway to Trading on ARC
          </p>
        </div>
      </Link>

      {/* Divider */}

      <div className="my-8 h-px bg-white/5" />

      {/* Navigation */}

      <nav className="flex-1 space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                flex
                items-center
                justify-between
                rounded-2xl
                px-5
                py-4
                transition-all
                duration-200

                ${
                  active
                    ? `
                      bg-gradient-to-r
                      from-sky-500
                      to-violet-600
                      text-white
                      shadow-lg
                      shadow-sky-500/20
                    `
                    : `
                      text-zinc-400
                      hover:bg-white/5
                      hover:text-white
                    `
                }
              `}
            >
              <div className="flex items-center gap-4">
                <Icon className="h-5 w-5 shrink-0" />

                <span className="font-medium">
                  {item.label}
                </span>
              </div>

              {item.comingSoon && (
                <span
                  className="
                    rounded-full
                    bg-sky-500/15
                    px-2
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-sky-300
                  "
                >
                  Coming Soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div
        className="
          rounded-2xl
          border
          border-emerald-500/20
          bg-emerald-500/10
          p-4
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <p className="text-sm font-medium text-emerald-300">
            Connected
          </p>
        </div>

        <p className="mt-2 text-xs text-zinc-400">
          Powered by Arcitex
        </p>
      </div>
    </aside>
  );
}