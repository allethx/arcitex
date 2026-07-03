"use client";

import { useMemo } from "react";

import {
  useAccount,
  useReadContract,
} from "wagmi";

import { formatUnits } from "viem";

const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
] as const;

type Props = {
  token?: `0x${string}`;
  decimals?: number;
  symbol?: string;
};

export function useTokenBalance({
  token,
  decimals = 6,
  symbol = "",
}: Props) {
  const account = useAccount();

  const {
    data: rawBalance,
    isLoading,
  } = useReadContract({
    address: token,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: account.address
      ? [account.address]
      : undefined,
    query: {
      enabled:
        Boolean(token) &&
        Boolean(account.address),
    },
  });

  const balance = useMemo(() => {
    if (rawBalance == null) {
      return 0;
    }

    return Number(
      formatUnits(
        rawBalance,
        decimals,
      ),
    );
  }, [
    rawBalance,
    decimals,
  ]);

  console.log("TOKEN HOOK", {
    address: account.address,
    chainId: account.chain?.id,
    token,
    rawBalance,
    decimals,
    symbol,
    balance,
  });

  return {
    balance,
    decimals,
    symbol,
    loading: isLoading,
    connected:
      account.isConnected,
    chain: account.chain,
  };
}