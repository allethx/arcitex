import type {
  SwapParams,
  SwapResult,
} from "@circle-fin/app-kit";

import { circleClient } from "./client";
import { createCircleAdapter } from "./adapter";

import { ensureCircleConfig } from "@/lib/circle";

export type ExecuteCircleSwapParams = {
  walletProvider: any;

  fromToken: string;

  toToken: string;

  amount: string;
};

export async function executeCircleSwap({
  walletProvider,
  fromToken,
  toToken,
  amount,
}: ExecuteCircleSwapParams): Promise<SwapResult> {
  const { kitKey } = ensureCircleConfig();

  const adapter =
    await createCircleAdapter(walletProvider);

  const params: SwapParams = {
    from: {
      adapter,
      chain: "Arc_Testnet",
    },

    tokenIn: fromToken,

    tokenOut: toToken,

    amountIn: amount,

    config: {
      kitKey,
    },
  };

  return circleClient.swap(params);
}