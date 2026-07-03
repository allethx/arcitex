import "dotenv/config";

import {
  createPublicClient,
  http,
} from "viem";

import { arcTestnet } from "../../lib/chains";
import { CONTRACTS } from "../../lib/contracts";

import fs from "node:fs";
import path from "node:path";

async function main() {
  const artifact = JSON.parse(
    fs.readFileSync(
      path.join(
        process.cwd(),
        "artifacts/contracts/TexToken.sol/TexToken.json",
      ),
      "utf8",
    ),
  );

  const publicClient =
    createPublicClient({
      chain: arcTestnet,
      transport: http(
        process.env.ARC_RPC_URL,
      ),
    });

  const owner =
    await publicClient.readContract({
      address:
        CONTRACTS.TEX as `0x${string}`,
      abi: artifact.abi,
      functionName: "owner",
    });

  console.log(
    "================================"
  );

  console.log(
    "Current TEX Owner:"
  );

  console.log(owner);

  console.log(
    "================================"
  );
}

main().catch(console.error);