import { createConfig, http } from "wagmi";
import { mainnet, base, sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [mainnet, base, sepolia],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});