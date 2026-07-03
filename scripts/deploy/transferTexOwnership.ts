import "dotenv/config";

import {
  createWalletClient,
  createPublicClient,
  http,
  getAddress,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

import { arcTestnet } from "../../lib/chains";
import { CONTRACTS } from "../../lib/contracts";

import fs from "node:fs";
import path from "node:path";

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
        "artifacts/contracts/TexToken.sol/TexToken.json",
      ),
      "utf8",
    ),
  );

  // ==========================================
  // Normalize Address
  // ==========================================

  const texAddress =
    getAddress(CONTRACTS.TEX);

  const claimAddress =
    getAddress(CONTRACTS.CLAIM);

  console.log(
    "================================",
  );

  console.log(
    "Current Owner:",
    account.address,
  );

  console.log(
    "TEX:",
    texAddress,
  );

  console.log(
    "New Owner:",
    claimAddress,
  );

  console.log(
    "================================",
  );

  const hash =
    await walletClient.writeContract({
      address: texAddress,

      abi: artifact.abi,

      functionName:
        "transferOwnership",

      args: [claimAddress],
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
    "Ownership transferred successfully!",
  );

  console.log(
    "Block:",
    receipt.blockNumber,
  );

  console.log(
    "Tx:",
    receipt.transactionHash,
  );

  console.log(
    "================================",
  );
}

main().catch((error) => {
  console.error(error);
});