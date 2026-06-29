import { createConfig, http } from "wagmi";
import { supportedChains } from "@/lib/chains";

export const wagmiConfig = createConfig({
  chains: [...supportedChains],

  transports: Object.fromEntries(
    supportedChains.map((chain) => [
      chain.id,
      http(),
    ])
  ),
});