import type {
  SendParams,
} from "@circle-fin/app-kit";

import { circleClient } from "./client";
import { createCircleAdapter } from "./adapter";

import { ensureCircleConfig } from "@/lib/circle";

export type ExecuteCircleSendParams = {
  walletProvider: any;

  recipient: string;

  token: string;

  amount: string;
};

export async function executeCircleSend({
  walletProvider,
  recipient,
  token,
  amount,
}: ExecuteCircleSendParams) {
  const { kitKey } =
    ensureCircleConfig();

  const adapter =
    await createCircleAdapter(
      walletProvider
    );

  const params: SendParams = {
    from: {
      adapter,
      chain: "Arc_Testnet",
    },

    to: recipient,

    token,

    amount,

    config: {
      kitKey,
    },
  };

  console.group(
    "Circle Send"
  );

  console.log(
    "Send Params",
    params
  );

  // ==========================
  // Estimate
  // ==========================

  const estimate =
    await circleClient.estimateSend(
      params
    );

  console.log(
    "Estimate",
    estimate
  );

  // ==========================
  // Execute
  // ==========================

  const result =
    await circleClient.send(
      params
    );

  console.log(
    "Result",
    result
  );

  console.groupEnd();

  return {
    estimate,
    result,
  };
}