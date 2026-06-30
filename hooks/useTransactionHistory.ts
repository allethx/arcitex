"use client";

import { useEffect, useState } from "react";

import type { TransactionHistory } from "@/types/transaction";

export function useTransactionHistory() {
  const [history, setHistory] = useState<TransactionHistory[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("arcitex-history");

    if (!raw) {
      return;
    }

    try {
      setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, []);

  return history;
}