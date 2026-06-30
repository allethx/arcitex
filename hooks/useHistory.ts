"use client";

import { useEffect, useState } from "react";

import type { TransactionHistory } from "@/types/transaction";

const STORAGE_KEY = "arcitex-history";

export function useHistory() {
  const [history, setHistory] = useState<TransactionHistory[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return;
    }

    try {
      setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, []);


 function addHistory(item: TransactionHistory) {
  console.log("ADD HISTORY");
  console.log(item);

  setHistory((prev) => {
    const next = [item, ...prev];

    console.log("NEXT HISTORY");
    console.log(next);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next),
    );

    return next;
  });
}

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }

  return {
    history,
    addHistory,
    clearHistory,
  };
}