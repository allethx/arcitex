import type {
  BridgeParams,
  EstimateResult,
} from "@circle-fin/app-kit";

import { circleClient } from "./client";
import { createCircleAdapter } from "./adapter";

export type EstimateBridgeParams = {
  walletProvider: any;

  fromChain: string;

  toChain: string;

  amount: string;
};

export async function estimateBridge({
  walletProvider,
  fromChain,
  toChain,
  amount,
}: EstimateBridgeParams): Promise<EstimateResult> {
  console.group("Bridge Estimate");

  const adapter =
    await createCircleAdapter(
      walletProvider,
    );

  const params: BridgeParams = {
    from: {
      adapter,
      chain: fromChain,
    },

    to: {
      adapter,
      chain: toChain,
    },

    amount,

    token: "USDC",
  };

  console.log("Bridge Params");
  console.log(params);

  const estimate =
    await circleClient.estimateBridge(
      params,
    );

    console.group("========== BRIDGE ESTIMATE ==========");

console.dir(
  estimate,
  {
    depth: null,
  },
);

console.groupEnd();

  console.log("Bridge Estimate");
  console.log(estimate);

  console.groupEnd();

  return estimate;
}