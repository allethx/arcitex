import hre from "hardhat";

async function main() {
  const publicClient =
    await hre.viem.getPublicClient();

  const [walletClient] =
    await hre.viem.getWalletClients();

  console.log(
    "Deployer:",
    walletClient.account.address,
  );

  const tex =
    await hre.viem.deployContract(
      "TexToken",
      [walletClient.account.address]
    );

  console.log(
    "Waiting deployment..."
  );

  const receipt =
    await publicClient.waitForTransactionReceipt({
      hash: tex.deploymentTransaction.hash,
    });

  console.log(
    "================================"
  );

  console.log(
    "TEX Address:"
  );

  console.log(
    tex.address
  );

  console.log(
    "Tx:"
  );

  console.log(
    receipt.transactionHash
  );

  console.log(
    "================================"
  );
}

main().catch(console.error);