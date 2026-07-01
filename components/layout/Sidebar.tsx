"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowLeftRight,
  Send,
  GitBranch,
  BriefcaseBusiness,
  History,
  Droplets,
  Settings,
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
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-col">

      {/* Logo */}

      <Link
        href="/app"
        className="mb-12 flex items-center gap-3"
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-violet-500
            to-sky-500
            text-lg
            font-bold
            text-white
          "
        >
          A
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Arcitex
          </h1>

          <p className="text-sm text-zinc-500">
            Smart Cross-chain Exchange
          </p>
        </div>
      </Link>

      {/* Navigation */}

      <nav className="space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                rounded-2xl
                px-5
                py-4
                transition-all
                duration-300

                ${
                  active
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
              `}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}