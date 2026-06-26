"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

import { getQuote, QuoteResult } from "@/services/quote";

export function useQuote() {
  const { address } = useAccount();

  const [quote, setQuote] =
    useState<QuoteResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function fetchQuote(
    sellToken: string,
    buyToken: string,
    sellAmount: string
  ) {
    if (!sellAmount || Number(sellAmount) <= 0) {
      setQuote(null);
      return;
    }

    if (!address) {
      setQuote(null);
      return;
    }

    try {
      setLoading(true);

      const result = await getQuote({
        sellToken,
        buyToken,
        sellAmount,
        taker: address,
      });

      setQuote(result);
    } catch (error) {
      console.error(error);
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    quote,
    loading,
    fetchQuote,
  };
}