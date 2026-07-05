"use client";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

type TopbarProps = {
  onMenuClick?: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-20
        h-16
        border-b
        border-white/5
        bg-[#06070D]/80
        backdrop-blur-xl
        sm:h-20
        lg:left-72
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-between
          gap-2
          px-4
          sm:justify-end
          sm:gap-4
          sm:px-8
        "
      >
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-white/5
            bg-[#11131A]
            transition
            hover:bg-[#171A23]
            lg:hidden
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          className="
            hidden
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
            sm:flex
          "
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          className="
            relative
            hidden
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
            sm:flex
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