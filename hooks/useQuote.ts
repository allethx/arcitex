"use client";

import { useMemo } from "react";

type Props = {
  fromAmount: string;
};

export function useQuote({
  fromAmount,
}: Props) {
  const amount =
    Number(fromAmount);

  const output = useMemo(() => {
    if (!amount) return 0;

    return amount;
  }, [amount]);

  return {
    output,
    rate: 1,
    fee: 0,
    loading: false,
  };
}