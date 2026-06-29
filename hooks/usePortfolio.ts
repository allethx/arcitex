"use client";

import { useMemo } from "react";

import { useNativeBalance } from "./useNativeBalance";
import { useEurcBalance } from "./useEurcBalance";

export function usePortfolio() {
  const native = useNativeBalance();
  const eurc = useEurcBalance();

  const total = useMemo(() => {
    return native.balance + eurc.balance;
  }, [native.balance, eurc.balance]);

  const loading =
    native.loading || eurc.loading;

  return {
    native,
    eurc,
    total,
    loading,
  };
}