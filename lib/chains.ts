import { defineChain } from "viem";
import { base, sepolia } from "wagmi/chains";

export const arcTestnet = defineChain({
  id: 5042002,

  name: "Arc Testnet",

  network: "arc-testnet",

  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
  },

  rpcUrls: {
    default: {
      http: [
        "https://arc-testnet.drpc.org",
      ],
    },
  },

  blockExplorers: {
    default: {
      name: "ArcScan",
      url: "https://testnet.arcscan.app",
    },
  },

  testnet: true,
});

export const supportedChains = [
  arcTestnet,
  base,
  sepolia,
] as const;

export const defaultChain = arcTestnet;