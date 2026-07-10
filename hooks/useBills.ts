"use client";

import { useEffect, useState } from "react";

import type { Bill } from "@/types/payment";

const STORAGE_KEY = "arcitex-bills";

export function useBills() {
  const [bills, setBills] =
    useState<Bill[]>([]);

  const [loaded, setLoaded] =
    useState(false);

  // ==========================
  // Load
  // ==========================

  useEffect(() => {
    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        setBills(JSON.parse(raw));
      } catch {
        setBills([]);
      }
    }

    setLoaded(true);
  }, []);

  // ==========================
  // Persist
  // ==========================

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(bills),
    );
  }, [bills, loaded]);

  // ==========================
  // Create Bill
  // ==========================

  function addBill(bill: Bill) {
    setBills((prev) => [
      bill,
      ...prev,
    ]);
  }

  // ==========================
  // Mark Paid
  // ==========================

  function markPaid(
    id: string,
    txHash: string,
  ) {
    setBills((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Paid" as const,
              txHash,
              paidAt: Date.now(),
            }
          : item,
      ),
    );
  }

  // ==========================
  // Delete Bill (unpaid only)
  // ==========================

  function removeBill(id: string) {
    setBills((prev) =>
      prev.filter(
        (item) => item.id !== id,
      ),
    );
  }

  return {
    bills,
    addBill,
    markPaid,
    removeBill,
  };
}
