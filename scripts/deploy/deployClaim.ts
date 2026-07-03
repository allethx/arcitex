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

  const publicClient =
    createPublicClient({
      chain: arcTestnet,
      transport: http(
        process.env.ARC_RPC_URL,
      ),
    });

  const walletClient =
    createWalletClient({
      account,
      chain: arcTestnet,
      transport: http(
        process.env.ARC_RPC_URL,
      ),
    });

  const artifact = JSON.parse(
    fs.readFileSync(
      path.join(
        process.cwd(),
        "artifacts/contracts/TexClaim.sol/TexClaim.json",
      ),
      "utf8",
    ),
  );

  console.log(
    "Deploying TexClaim..."
  );

  const hash =
    await walletClient.deployContract({
      abi: artifact.abi,
      bytecode:
        artifact.bytecode,
      args: [
        CONTRACTS.USDC,
        CONTRACTS.TEX,
        account.address,
      ],
    });

  console.log("Tx:", hash);

  const receipt =
    await publicClient.waitForTransactionReceipt({
      hash,
    });

  console.log(
    "================================"
  );

  console.log(
    "TexClaim deployed:"
  );

  console.log(
    receipt.contractAddress,
  );

  console.log(
    "================================"
  );
}

main().catch(console.error);