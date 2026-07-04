import { createConfig, http } from "wagmi";
import { arcTestnet } from "@/lib/chains";
import { baseSepolia, sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [arcTestnet, baseSepolia, sepolia],

  transports: {
    [arcTestnet.id]: http(),
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
  },
});