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
}: ExecuteBridgeParams): Promise<any> {
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

  console.log("========== BRIDGE PARAMS ==========");

  console.dir(params, {
    depth: null,
  });

  console.log(
    "Calling Circle SDK..."
  );

  let result: BridgeResult =
    await circleClient.bridge(
      params,
    );

  // ==========================================
  // FULL RESULT
  // ==========================================

  console.group(
    "========== FULL BRIDGE RESULT =========="
  );

  console.log("State:");
  console.log(result.state);

  console.log("Result:");
  console.dir(result, {
    depth: null,
  });

  console.groupEnd();

  // ==========================================
  // STEPS
  // ==========================================

  if ("steps" in result) {
    console.group(
      "========== BRIDGE STEPS =========="
    );

    result.steps.forEach(
      (
        step: any,
        index: number,
      ) => {
        console.group(
          `STEP ${index}`
        );

        console.log(
          "Name:",
          step.name,
        );

        console.log(
          "State:",
          step.state,
        );

        console.log(
          "Status:",
          step.status,
        );

        console.log(
          "TxHash:",
          step.txHash,
        );

        console.log(
          "Explorer:",
          step.explorerUrl,
        );

        console.log(
          "Error:",
          step.error,
        );

        console.dir(step, {
          depth: null,
        });

        console.groupEnd();
      },
    );

    console.groupEnd();
  }

  // ==========================================
  // RETRY
  // ==========================================

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

    console.group(
      "========== RETRY RESULT =========="
    );

    console.dir(result, {
      depth: null,
    });

    console.groupEnd();
  }

  // ==========================================
  // MINT STEP
  // ==========================================

  const mintStep =
    result.steps?.find(
      (step: any) =>
        step.name === "mint",
    );

  const txHash =
    mintStep?.txHash ??
    mintStep?.data?.txHash ??
    "";

  const explorerUrl =
    mintStep?.explorerUrl ??
    "";

  console.group(
    "========== FINAL BRIDGE =========="
  );

  console.log({
    state: result.state,
    txHash,
    explorerUrl,
  });

  console.groupEnd();

  console.groupEnd();

  return {
    ...result,

    txHash,

    explorerUrl,

    status:
      result.state ===
      "success"
        ? "Completed"
        : result.state ===
            "error"
          ? "Failed"
          : "Pending",
  };
}