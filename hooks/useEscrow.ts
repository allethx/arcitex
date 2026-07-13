"use client";

import { useEffect, useState } from "react";

import type { EscrowAgreement } from "@/types/escrow";

const STORAGE_KEY = "arcitex-escrow";

export function useEscrow() {
  const [agreements, setAgreements] =
    useState<EscrowAgreement[]>([]);

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
        setAgreements(
          JSON.parse(raw),
        );
      } catch {
        setAgreements([]);
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
      JSON.stringify(agreements),
    );
  }, [agreements, loaded]);

  // ==========================
  // Create Agreement
  // ==========================

  function addAgreement(
    agreement: EscrowAgreement,
  ) {
    setAgreements((prev) => [
      agreement,
      ...prev,
    ]);
  }

  // ==========================
  // Patch Agreement
  // ==========================

  function updateAgreement(
    id: string,
    patch: Partial<EscrowAgreement>,
  ) {
    setAgreements((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...patch }
          : item,
      ),
    );
  }

  // ==========================
  // Delete Agreement
  // (only before it is funded)
  // ==========================

  function removeAgreement(
    id: string,
  ) {
    setAgreements((prev) =>
      prev.filter(
        (item) => item.id !== id,
      ),
    );
  }

  return {
    agreements,
    addAgreement,
    updateAgreement,
    removeAgreement,
  };
}
