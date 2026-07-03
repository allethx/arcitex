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

async function main() {
  const privateKey =
    process.env.PRIVATE_KEY as `0x${string}`;

  if (!privateKey) {
    throw new Error(
      "PRIVATE_KEY not found",
    );
  }

  const account =
    privateKeyToAccount(
      privateKey,
    );

  console.log(
    "================================",
  );

  console.log(
    "Deployer:",
    account.address,
  );

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
        "artifacts/contracts/TexToken.sol/TexToken.json",
      ),
      "utf8",
    ),
  );

  console.log(
    "Deploying TEX..."
  );

  const hash =
    await walletClient.deployContract({
      abi: artifact.abi,
      bytecode:
        artifact.bytecode,
      args: [account.address],
    });

  console.log(
    "Transaction:",
    hash,
  );

  const receipt =
    await publicClient.waitForTransactionReceipt({
      hash,
    });

  console.log(
    "================================",
  );

  console.log(
    "TEX deployed!",
  );

  console.log(
    "Contract:",
    receipt.contractAddress,
  );

  console.log(
    "Tx:",
    receipt.transactionHash,
  );

  console.log(
    "================================",
  );
}

main().catch((err) => {
  console.error(err);
});