import { createConfig, http } from "wagmi";
import { supportedChains } from "@/lib/chains";

export const wagmiConfig = createConfig({
  chains: [...supportedChains],
  transports: {
    1: http(),
    8453: http(),
    11155111: http(),
  },
});