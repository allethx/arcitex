import type {
  SwapParams,
  SwapResult,
  SwapStatusResult,
} from "@circle-fin/app-kit";

import { circleClient } from "./client";
import { createCircleAdapter } from "./adapter";

import { ensureCircleConfig } from "@/lib/circle";

export type ExecuteSwapParams = {
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
}: ExecuteSwapParams): Promise<SwapStatusResult> {
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

  const result: SwapResult =
    await circleClient.swap(params);

  return circleClient.waitForSwap({
    result,
    kitKey,
  });
}