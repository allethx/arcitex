"use client";

import { Wallet } from "lucide-react";

import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";
import { useWallet } from "@/hooks/useWallet";
import { useBalance } from "@/hooks/useBalance";
export default function WalletCard() {
 const {
  connected,
  address,
  chain,
} = useWallet();
const { eth, usdc, loading } = useBalance();

  return (
    <div
      className="
        mt-auto
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-5
        backdrop-blur-xl
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-3">
          <Wallet className="h-5 w-5 text-white" />
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Wallet
          </p>

         <h3 className="font-semibold">
  {connected && address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not Connected"}
</h3>
        </div>
      </div>

      {/* Info */}

<div className="mt-5 rounded-2xl bg-zinc-800/70 p-4">

  <div className="mb-4 flex items-center justify-between">
  <span className="text-zinc-500">
    Network
  </span>

  <span>
    {connected
      ? chain?.name ?? "--"
      : "--"}
  </span>
</div>

  <div className="mb-3 flex items-center justify-between">
    <div>
      <p className="font-medium">ETH</p>
      <p className="text-xs text-zinc-500">
  {chain?.name ?? "Native"}
</p>
    </div>

    <span>
      {loading
        ? "Loading..."
        : connected
        ? eth.toFixed(4)
        : "--"}
    </span>
  </div>

  <div className="mb-3 flex items-center justify-between">
    <div>
      <p className="font-medium">USDC</p>
      <p className="text-xs text-zinc-500">
        USD Coin
      </p>
    </div>

    <span>
      {loading
        ? "Loading..."
        : connected
        ? usdc.toFixed(2)
        : "--"}
    </span>
  </div>

  <div className="mt-5 flex items-center justify-between">
    <span className="text-zinc-500">
      Status
    </span>

    <span
      className={
        connected
          ? "text-green-400"
          : "text-red-400"
      }
    >
      {connected
        ? "Connected"
        : "Offline"}
    </span>
  </div>

</div>

      {/* Button */}

      <div className="mt-5">
        <ConnectWalletButton fullWidth />
      </div>

    </div>
  );
}