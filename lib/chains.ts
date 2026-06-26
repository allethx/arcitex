import { mainnet, base, sepolia } from "wagmi/chains";

export const supportedChains = [
  mainnet,
  base,
  sepolia,
] as const;

export const defaultChain = base;