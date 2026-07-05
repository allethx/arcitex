"use client";

import Image from "next/image";

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
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          max-h-[85vh]
          w-full
          max-w-md
          overflow-y-auto
          rounded-3xl
          border
          border-white/10
          bg-[#10131B]
          p-5
          shadow-2xl
          sm:p-6
        "
      >
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Select Token
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              transition
              hover:bg-white/5
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}

        <input
          placeholder="Search token..."
          className="
            mb-5
            w-full
            rounded-2xl
            border
            border-white/10
            bg-zinc-800/60
            p-3
            text-white
            outline-none
            placeholder:text-zinc-500
          "
        />

        {/* Token List */}

        <div className="space-y-2">
          {TOKENS.map((token) => (
            <button
              key={`${token.chain}-${token.symbol}`}
              type="button"
              onClick={() => {
                onSelect(token.symbol);
                onClose();
              }}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                p-3
                transition-all
                hover:bg-white/5
              "
            >
              <div className="flex items-center gap-4">
                <Image
                  src={token.logo}
                  alt={token.symbol}
                  width={42}
                  height={42}
                  className="rounded-full"
                />

                <div className="text-left">
                  <p className="font-semibold text-white">
                    {token.symbol}
                  </p>

                  <p className="text-sm text-zinc-400">
                    {token.name}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-zinc-500">
                  {token.chain.replaceAll("_", " ")}
                </p>

                {token.symbol === "TEX" && (
                  <span
                    className="
                      mt-1
                      inline-block
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
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}