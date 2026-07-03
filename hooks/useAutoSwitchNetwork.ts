"use client";

import { useEffect } from "react";

import {
  useAccount,
  useSwitchChain,
} from "wagmi";

type Props = {
  chain: string;
};

const CHAIN_IDS: Record<
  string,
  number
> = {
  Arc_Testnet: 5042002,

  Ethereum_Sepolia: 11155111,

  Base_Sepolia: 84532,
};

export function useAutoSwitchNetwork({
  chain,
}: Props) {
  const account =
    useAccount();

  const {
    switchChain,
  } = useSwitchChain();

  useEffect(() => {
    const target =
      CHAIN_IDS[chain];

    console.log(
      "Auto Switch",
      {
        selectedChain: chain,
        walletChain:
          account.chain?.id,
        target,
      },
    );

    if (!target) {
      return;
    }

    if (
      account.chain?.id === target
    ) {
      return;
    }

    switchChain({
      chainId: target,
    });
  }, [
    chain,
    account.chain?.id,
    switchChain,
  ]);
}