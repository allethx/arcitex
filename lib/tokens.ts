export type SupportedChain =
  | "Arc_Testnet"
  | "Ethereum_Sepolia"
  | "Base_Sepolia";

export type Token = {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  chain: SupportedChain;
  logo: string;
};

export const TOKENS: Token[] = [
  // ==========================================
  // Arc Testnet
  // ==========================================

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
    symbol: "EURC",
    name: "Euro Coin",
    address:
      "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a",
    decimals: 6,
    chain: "Arc_Testnet",
    logo: "/tokens/eurc.png",
  },

  {
    symbol: "TEX",
    name: "Arcitex Governance",
    address:
      "0x7d64f1f63867fba73f66844321bbb85e792901e4",
    decimals: 18,
    chain: "Arc_Testnet",
    logo: "/tokens/tex.png",
  },

  // ==========================================
  // Ethereum Sepolia
  // ==========================================

  {
    symbol: "USDC",
    name: "USD Coin",
    address:
      "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    decimals: 6,
    chain: "Ethereum_Sepolia",
    logo: "/tokens/usdc.png",
  },

  // ==========================================
  // Base Sepolia
  // ==========================================

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

export function getToken(
  symbol: string,
  chain: SupportedChain,
) {
  return TOKENS.find(
    (token) =>
      token.symbol.toUpperCase() ===
        symbol.toUpperCase() &&
      token.chain === chain,
  );
}

export function getTokenBySymbol(
  symbol: string,
) {
  return TOKENS.find(
    (token) =>
      token.symbol.toUpperCase() ===
      symbol.toUpperCase(),
  );
}

export function getTokenByAddress(
  address: string,
) {
  return TOKENS.find(
    (token) =>
      token.address.toLowerCase() ===
      address.toLowerCase(),
  );
}

export function getTokenDecimals(
  address: string,
) {
  return (
    getTokenByAddress(address)?.decimals ??
    6
  );
}

export function getTokenSymbol(
  address: string,
) {
  return (
    getTokenByAddress(address)?.symbol ??
    ""
  );
}

export function getTokensByChain(
  chain: SupportedChain,
) {
  return TOKENS.filter(
    (token) => token.chain === chain,
  );
}

export function getSupportedChains(): SupportedChain[] {
  return [
    "Arc_Testnet",
    "Ethereum_Sepolia",
    "Base_Sepolia",
  ];
}