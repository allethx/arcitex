"use client";

import Link from "next/link";

import {
  Copy,
  ExternalLink,
  Wallet,
  LayoutDashboard,
} from "lucide-react";

type Props = {
  address: string;
  chainId?: number;
  onManageWallet: () => void;
};

function explorerUrl(
  chainId: number | undefined,
  address: string,
) {
  switch (chainId) {
    case 5042002:
      return `https://testnet.arcscan.app/address/${address}`;

    case 11155111:
      return `https://sepolia.etherscan.io/address/${address}`;

    case 84532:
      return `https://sepolia.basescan.org/address/${address}`;

    default:
      return "#";
  }
}

export default function WalletDropdown({
  address,
  chainId,
  onManageWallet,
}: Props) {
  async function copyAddress() {
    await navigator.clipboard.writeText(
      address,
    );
  }

  return (
    <div
      className="
        absolute
        right-0
        top-[70px]
        z-50
        w-72
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#10131B]
        shadow-2xl
      "
    >
      <div className="border-b border-white/5 p-5">
        <p className="text-xs text-zinc-500">
          Connected Wallet
        </p>

        <p className="mt-2 break-all font-semibold">
          {address}
        </p>
      </div>

      <button
        onClick={copyAddress}
        className="
          flex
          w-full
          items-center
          gap-3
          px-5
          py-4
          transition
          hover:bg-white/5
        "
      >
        <Copy className="h-5 w-5" />
        Copy Address
      </button>

      <a
        href={explorerUrl(
          chainId,
          address,
        )}
        target="_blank"
        rel="noreferrer"
        className="
          flex
          items-center
          gap-3
          px-5
          py-4
          transition
          hover:bg-white/5
        "
      >
        <ExternalLink className="h-5 w-5" />
        View Explorer
      </a>

      <Link
        href="/app/portfolio"
        className="
          flex
          items-center
          gap-3
          px-5
          py-4
          transition
          hover:bg-white/5
        "
      >
        <LayoutDashboard className="h-5 w-5" />
        Portfolio
      </Link>

      <button
        onClick={onManageWallet}
        className="
          flex
          w-full
          items-center
          gap-3
          border-t
          border-white/5
          px-5
          py-4
          transition
          hover:bg-white/5
        "
      >
        <Wallet className="h-5 w-5" />
        Manage Wallet
      </button>
    </div>
  );
}