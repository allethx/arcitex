import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

import {
  createPublicClient,
  createWalletClient,
  http,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

import { arcTestnet } from "../../lib/chains";
import { CONTRACTS } from "../../lib/contracts";

async function main() {
  const privateKey =
    process.env.PRIVATE_KEY as `0x${string}`;

  if (!privateKey) {
    throw new Error(
      "PRIVATE_KEY not found",
    );
  }

  const account =
    privateKeyToAccount(privateKey);

  const walletClient =
    createWalletClient({
      account,
      chain: arcTestnet,
      transport: http(
        process.env.ARC_RPC_URL,
      ),
    });

  const publicClient =
    createPublicClient({
      chain: arcTestnet,
      transport: http(
        process.env.ARC_RPC_URL,
      ),
    });

  const artifact = JSON.parse(
    fs.readFileSync(
      path.join(
        process.cwd(),
        "artifacts/contracts/TexGovernance.sol/TexGovernance.json",
      ),
      "utf8",
    ),
  );

  console.log("================================");
  console.log(
    "Deploying TexGovernance..."
  );

  const hash =
    await walletClient.deployContract({
      abi: artifact.abi,
      bytecode:
        artifact.bytecode as `0x${string}`,
      args: [
        CONTRACTS.TEX,
        account.address,
      ],
    });

  console.log(
    "Transaction:",
    hash,
  );

  const receipt =
    await publicClient.waitForTransactionReceipt({
      hash,
    });

  console.log("================================");
  console.log(
    "TexGovernance deployed!"
  );

  console.log(
    "Contract:",
    receipt.contractAddress,
  );

  console.log(
    "Tx:",
    hash,
  );

  console.log("================================");
}

main().catch(console.error);