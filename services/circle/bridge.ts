import type {
  BridgeParams,
  BridgeResult,
} from "@circle-fin/app-kit";

import { circleClient } from "./client";
import { createCircleAdapter } from "./adapter";

export type ExecuteBridgeParams = {
  walletProvider: any;

  fromChain: string;

  toChain: string;

  amount: string;
};

export async function executeBridge({
  walletProvider,
  fromChain,
  toChain,
  amount,
}: ExecuteBridgeParams): Promise<BridgeResult> {
  console.group(
    "========== EXECUTE BRIDGE =========="
  );

  console.log("Creating adapter...");

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
  console.dir(params, {
    depth: null,
  });

  console.log("Calling Circle SDK...");

  let result =
    await circleClient.bridge(
      params,
    );

  console.log(
    "========== BRIDGE RESULT =========="
  );

  console.dir(result, {
    depth: null,
  });

  if (result.state === "error") {
    console.warn(
      "Bridge failed. Retrying..."
    );

    result =
      await circleClient.retryBridge(
        result,
        {
          from: adapter,
          to: adapter,
        },
      );

    console.log(
      "========== RETRY RESULT =========="
    );

    console.dir(result, {
      depth: null,
    });
  }

  console.groupEnd();

  return result;
}