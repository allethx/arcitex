"use client";
import { installCircleProxy } from "@/lib/installCircleProxy";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

import { supportedChains } from "@/lib/chains";

export const projectId =
  "a9d99010e003fff141f9b10dfbca9857";

const metadata = {
  name: "Arcitex",
  description: "Cross-chain DEX powered by Arcitex",
  url: "http://localhost:3000",
  icons: [
    "https://avatars.githubusercontent.com/u/179229932",
  ],
};

export const wagmiAdapter =
  new WagmiAdapter({
    projectId,
    networks: [...supportedChains],
    ssr: false,
  });
installCircleProxy();
createAppKit({
  adapters: [wagmiAdapter],
  networks: [...supportedChains],
  projectId,
  metadata,
  features: {
    analytics: false,
  },
});