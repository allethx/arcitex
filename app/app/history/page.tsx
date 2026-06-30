"use client";

import { useTransactionHistory } from "@/hooks/useTransactionHistory";

import HistoryItem from "@/components/history/HistoryItem";

export default function HistoryPage() {
  const history = useTransactionHistory();

  return (
    <div className="mx-auto max-w-3xl p-8">

      <h1 className="mb-8 text-4xl font-bold text-white">
        Transaction History
      </h1>

      {history.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900
            py-20
            text-center
          "
        >
          <p className="text-zinc-400">
            No transactions yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

  {[...history]
    .sort(
      (a, b) => b.timestamp - a.timestamp
    )
    .map((item) => (
      <HistoryItem
        key={item.id}
        item={item}
      />
    ))}

</div>
      )}

    </div>
  );
}