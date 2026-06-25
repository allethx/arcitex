"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

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
  const [search, setSearch] = useState("");

  const filteredTokens = useMemo(() => {
    return TOKENS.filter(
      (token) =>
        token.symbol
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        token.name
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-[420px] rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">

        {/* HEADER */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Select Token
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* SEARCH */}

        <div className="relative mb-6">

          <Search className="absolute left-4 top-3 h-5 w-5 text-zinc-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search token..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 outline-none focus:border-violet-500"
          />

        </div>

        {/* TOKEN LIST */}

        <div className="max-h-[320px] space-y-2 overflow-y-auto">

          {filteredTokens.map((token) => (

            <button
              key={token.symbol}
              onClick={() => {
                onSelect(token.symbol);
                onClose();
              }}
              className="flex w-full items-center justify-between rounded-xl p-3 transition hover:bg-zinc-800"
            >

              <div className="flex items-center gap-3">

                <div
                  className={`h-10 w-10 rounded-full ${token.color}`}
                />

                <div className="text-left">

                  <p className="font-medium">
                    {token.symbol}
                  </p>

                  <p className="text-sm text-zinc-400">
                    {token.name}
                  </p>

                </div>

              </div>

            </button>

          ))}

        </div>

      </div>

    </div>
  );
}