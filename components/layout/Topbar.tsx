"use client";

import {
  Bell,
  Search,
} from "lucide-react";

import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

export default function Topbar() {
  return (
    <header
      className="
        fixed
        left-72
        right-0
        top-0
        z-50
        h-20
        border-b
        border-white/5
        bg-[#06070D]/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-end
          gap-4
          px-8
        "
      >
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-white/5
            bg-[#11131A]
            transition
            hover:bg-[#171A23]
          "
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-white/5
            bg-[#11131A]
            transition
            hover:bg-[#171A23]
          "
        >
          <Bell className="h-5 w-5" />

          <span
            className="
              absolute
              right-3
              top-3
              h-2
              w-2
              rounded-full
              bg-sky-400
            "
          />
        </button>

        <ConnectWalletButton />
      </div>
    </header>
  );
}