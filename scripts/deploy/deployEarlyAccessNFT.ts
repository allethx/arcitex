import "dotenv/config";

import {
  createWalletClient,
  createPublicClient,
  http,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

import { arcTestnet } from "@/lib/chains";

import {
  arcitexEarlyAccessNFTAbi,
  arcitexEarlyAccessNFTBytecode,
} from "@/lib/contracts/generated/ArcitexEarlyAccessNFT";

async function main() {
  console.log(
    "================================",
  );

  console.log(
    "Deploying Arcitex Early Access NFT...",
  );

  console.log(
    "================================",
  );

  const privateKey =
    process.env.PRIVATE_KEY;

  if (!privateKey) {
    throw new Error(
      "PRIVATE_KEY not found",
    );
  }

  const usdc =
    process.env.USDC_ADDRESS;

  if (!usdc) {
    throw new Error(
      "USDC_ADDRESS not found",
    );
  }

  const baseUri =
    process.env.NFT_BASE_URI ??
    "https://arcitex.xyz/nft/";

  const account =
    privateKeyToAccount(
      privateKey as `0x${string}`,
    );

  const walletClient =
    createWalletClient({
      account,
      chain: arcTestnet,
      transport: http(),
    });

  const publicClient =
    createPublicClient({
      chain: arcTestnet,
      transport: http(),
    });

  const hash =
    await walletClient.deployContract({
      abi:
        arcitexEarlyAccessNFTAbi,

      bytecode:
        arcitexEarlyAccessNFTBytecode,

      args: [
        usdc as `0x${string}`,
        baseUri,
      ],
    });

  console.log(
    "Transaction:",
    hash,
  );

  const receipt =
    await publicClient.waitForTransactionReceipt(
      {
        hash,
      },
    );

  console.log(
    "================================",
  );

  console.log(
    "Arcitex Early Access NFT deployed!",
  );

  console.log(
    "Contract:",
    receipt.contractAddress,
  );

  console.log(
    "Tx:",
    hash,
  );

  console.log(
    "USDC:",
    usdc,
  );

  console.log(
    "Base URI:",
    baseUri,
  );

  console.log(
    "================================",
  );
}

main().catch((error) => {
  console.error(error);

  process.exit(1);
});