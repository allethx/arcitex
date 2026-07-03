import { Token } from "./types";

export const BRIDGE_TOKENS: Token[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address:
      "0x3600000000000000000000000000000000000000",
    decimals: 6,
    chain: "Arc_Testnet",
    logo: "/tokens/usdc.png",
  },

  {
    symbol: "USDC",
    name: "USD Coin",
    address:
      "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    decimals: 6,
    chain: "Ethereum_Sepolia",
    logo: "/tokens/usdc.png",
  },

  {
    symbol: "USDC",
    name: "USD Coin",
    address:
      "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    decimals: 6,
    chain: "Base_Sepolia",
    logo: "/tokens/usdc.png",
  },
];