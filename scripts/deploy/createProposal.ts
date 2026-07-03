import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

import {
  createWalletClient,
  createPublicClient,
  http,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

import { arcTestnet } from "../../lib/chains";
import { CONTRACTS } from "../../lib/contracts";

const ONE_DAY = 24 * 60 * 60;

const PROPOSAL_DURATION =
  100 * ONE_DAY;

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
        "artifacts/contracts/TexGovernance.sol/TexGovernance.json",
      ),
      "utf8",
    ),
  );

  console.log(
    "================================",
  );

  console.log(
    "Creating Proposal...",
  );

  console.log(
    "Title:",
    "Should Arcitex add USDC-TEX Pools?",
  );

  console.log(
    "Duration:",
    "100 Days",
  );

  const hash =
    await walletClient.writeContract({
      address:
        CONTRACTS.GOVERNANCE,

      abi: artifact.abi,

      functionName:
        "createProposal",

      args: [
        "Should Arcitex add USDC-TEX Pools?",

        "Adding a native USDC-TEX liquidity pool will improve liquidity, enable TEX trading, increase on-chain activity, and strengthen the Arcitex ecosystem.",

        BigInt(
          PROPOSAL_DURATION,
        ),
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

  console.log(
    "================================",
  );

  console.log(
    "Proposal Created Successfully!",
  );

  console.log(
    "Block:",
    receipt.blockNumber,
  );

  console.log(
    "Tx:",
    hash,
  );

  console.log(
    "================================",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});