import { defineChain } from "viem";
import {
  baseSepolia,
  sepolia,
} from "wagmi/chains";

export const arcTestnet = defineChain({
  id: 5042002,

  name: "Arc Testnet",

  network: "arc-testnet",

  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
  },

  rpcUrls: {
    default: {
      http: [
        "https://rpc.testnet.arc.network",
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
  baseSepolia,
  sepolia,
] as const;

export const defaultChain =
  arcTestnet;