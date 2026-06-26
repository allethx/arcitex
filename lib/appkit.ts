import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, base, sepolia } from "@reown/appkit/networks";

export const projectId =
  "a9d99010e003fff141f9b10dfbca9857";

const metadata = {
  name: "Arcitex",
  description: "Cross-chain DEX powered by Arcitex",
  url: "http://localhost:3000",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export const networks = [
  mainnet,
  base,
  sepolia,
];

export const wagmiAdapter =
  new WagmiAdapter({
    projectId,
    networks,
    ssr: true,
  });

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});