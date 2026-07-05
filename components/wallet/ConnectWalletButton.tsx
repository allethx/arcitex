"use client";

import { useEffect, useState } from "react";

import {
  ChevronDown,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

import WalletDropdown from "./WalletDropdown";

type Props = {
  fullWidth?: boolean;
};

function getNetworkName(
  chainId?: number,
) {
  switch (chainId) {
    case 5042002:
      return "Arc Testnet";

    case 11155111:
      return "Ethereum Sepolia";

    case 84532:
      return "Base Sepolia";

    default:
      return "Unknown Network";
  }
}

export default function ConnectWalletButton({
  fullWidth = false,
}: Props) {
  const { open } = useAppKit();

  const {
    isConnected,
    address,
    chain,
  } = useAccount();

  const [mounted, setMounted] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside() {
      setOpenMenu(false);
    }

    if (openMenu) {
      window.addEventListener(
        "click",
        handleClickOutside,
      );
    }

    return () => {
      window.removeEventListener(
        "click",
        handleClickOutside,
      );
    };
  }, [openMenu]);

  if (!mounted) {
    return (
      <Button
        className={`
          h-11
          rounded-2xl
          bg-gradient-to-r
          from-sky-500
          to-violet-600
          hover:opacity-90
          sm:h-12
          ${
            fullWidth
              ? "w-full"
              : "px-4 sm:px-6"
          }
        `}
      >
        <Wallet className="h-4 w-4 sm:mr-2" />
        <span className={fullWidth ? "ml-2" : "hidden sm:ml-0 sm:inline"}>
          Connect Wallet
        </span>
      </Button>
    );
  }

  if (!isConnected || !address) {
    return (
      <Button
        onClick={() => open()}
        className={`
          h-11
          rounded-2xl
          bg-gradient-to-r
          from-sky-500
          to-violet-600
          hover:opacity-90
          sm:h-12
          ${
            fullWidth
              ? "w-full"
              : "px-4 sm:px-6"
          }
        `}
      >
        <Wallet className="h-4 w-4 sm:mr-2" />
        <span className={fullWidth ? "ml-2" : "hidden sm:ml-0 sm:inline"}>
          Connect Wallet
        </span>
      </Button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu(!openMenu);
        }}
        className={`
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-white/10
          bg-[#11131A]
          px-3
          py-2
          transition-all
          hover:border-sky-500/40
          hover:bg-[#171A23]
          sm:gap-4
          sm:px-4
          ${
            fullWidth
              ? "w-full justify-between"
              : ""
          }
        `}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="
              h-3
              w-3
              shrink-0
              rounded-full
              bg-emerald-400
              shadow-[0_0_12px_rgba(74,222,128,.9)]
            "
          />

          <div className="text-left">
            <p
              className="
                hidden
                text-[11px]
                text-zinc-400
                sm:block
              "
            >
              {getNetworkName(
                chain?.id,
              )}
            </p>

            <p
              className="
                text-sm
                font-semibold
                text-white
                sm:text-base
              "
            >
              {address.slice(
                0,
                6,
              )}
              ...
              {address.slice(-4)}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`
            h-4
            w-4
            shrink-0
            text-zinc-400
            transition-transform
            ${
              openMenu
                ? "rotate-180"
                : ""
            }
          `}
        />
      </button>

      {openMenu && (
        <WalletDropdown
          address={address}
          chainId={chain?.id}
          onManageWallet={() => {
            setOpenMenu(false);

            open({
              view: "Account",
            });
          }}
        />
      )}
    </div>
  );
}