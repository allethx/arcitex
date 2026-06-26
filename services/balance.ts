export type WalletBalance = {
  eth: number;
  usdc: number;
};

export async function getWalletBalance(): Promise<WalletBalance> {
  // Dummy sementara.
  // Nanti diganti dengan viem / wagmi.

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    eth: 1.2487,
    usdc: 3524.42,
  };
}