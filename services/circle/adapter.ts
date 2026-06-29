import { createViemAdapterFromProvider } from "@circle-fin/adapter-viem-v2";

export async function createCircleAdapter(
  walletProvider: any,
) {
  console.group("Create Circle Adapter");

  console.log(
    "provider exists:",
    !!walletProvider,
  );

  console.log(
    "provider.request:",
    typeof walletProvider?.request,
  );

  const adapter =
    await createViemAdapterFromProvider({
      provider: walletProvider,
    });

  console.log(
    "adapter:",
    adapter,
  );

  console.groupEnd();

  return adapter;
}