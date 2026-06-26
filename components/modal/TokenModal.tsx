"use client";

import { X } from "lucide-react";
import { TOKENS } from "@/lib/tokens";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (token: string) => void;
};

export default function TokenModal({
  open,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Select Token
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <input
          placeholder="Search token..."
          className="mb-5 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none placeholder:text-zinc-500"
        />

        {/* Token List */}
        <div className="space-y-2">

          {TOKENS.map((token) => (
            <button
              key={token.symbol}
              onClick={() => {
                onSelect(token.symbol);
                onClose();
              }}
              className="flex w-full items-center justify-between rounded-xl p-3 transition hover:bg-zinc-800"
            >
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold">
                  {token.symbol.charAt(0)}
                </div>

                <div className="text-left">
                  <p className="font-medium text-white">
                    {token.symbol}
                  </p>

                  <p className="text-sm text-zinc-400">
                    {token.name}
                  </p>
                </div>

              </div>

              <span className="text-xs text-zinc-500">
                {token.chainId === 1 ? "Ethereum" : token.chainId}
              </span>
            </button>
          ))}

        </div>

      </div>
    </div>
  );
}