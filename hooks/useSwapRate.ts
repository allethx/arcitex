"use client";

import { useEffect, useState } from "react";

type SwapRateState = {
  rate: number;
  loading: boolean;
  error: string | null;
};

export function useSwapRate(from: string, to: string) {
  const [state, setState] = useState<SwapRateState>({
    rate: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadRate() {
      try {
        setState((prev) => ({
          ...prev,
          loading: true,
        }));

        const response = await fetch(
          `/api/prices?from=${from}&to=${to}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch price");
        }

        const json = await response.json();

        if (!cancelled) {
          setState({
            rate: json.rate,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            rate: 0,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Unknown error",
          });
        }
      }
    }

    loadRate();

    return () => {
      cancelled = true;
    };
  }, [from, to]);

  return state;
}