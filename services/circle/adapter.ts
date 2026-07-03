import { createViemAdapterFromProvider } from "@circle-fin/adapter-viem-v2";

export async function createCircleAdapter(
  walletProvider: any,
) {
  console.group(
    "========== CREATE CIRCLE ADAPTER ==========",
  );

  console.log(
    "Provider Exists:",
    !!walletProvider,
  );

  console.log(
    "Provider Request:",
    typeof walletProvider?.request,
  );

  // ==========================================
  // Wallet Accounts
  // ==========================================

  const accounts =
    await walletProvider.request({
      method: "eth_accounts",
    });

  console.log(
    "eth_accounts:",
    accounts,
  );

  const chainId =
    await walletProvider.request({
      method: "eth_chainId",
    });

  console.log(
    "eth_chainId:",
    chainId,
  );

  // ==========================================
  // Create Adapter
  // ==========================================

  const adapter =
    await createViemAdapterFromProvider({
      provider: walletProvider,
    });

  console.log(
    "Adapter:",
    adapter,
  );

  // ==========================================
  // Inspect Adapter
  // ==========================================

  console.group(
    "Adapter Properties",
  );

  console.log(
    "chainType:",
    (adapter as any).chainType,
  );

  console.log(
    "account:",
    (adapter as any).account,
  );

  console.log(
    "walletClient:",
    (adapter as any).walletClient,
  );

  console.log(
    "publicClient:",
    (adapter as any).publicClient,
  );

  console.log(
    "options:",
    (adapter as any).options,
  );

  console.groupEnd();

  // ==========================================
  // Try getAddress()
  // ==========================================

  if (
    typeof (adapter as any)
      .getAddress === "function"
  ) {
    try {
      const address =
        await (adapter as any).getAddress();

      console.log(
        "Adapter Address:",
        address,
      );
    } catch (e) {
      console.log(
        "getAddress() failed",
        e,
      );
    }
  }

  console.groupEnd();

  return adapter;
}