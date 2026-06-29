export type Token = {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  chain: string;
  logo?: string;
};

export const TOKENS: Token[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address:
      "0x3600000000000000000000000000000000000000",
    decimals: 6,
    chain: "Arc_Testnet",
  },

  {
    symbol: "EURC",
    name: "Euro Coin",
    address:
      "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a",
    decimals: 6,
    chain: "Arc_Testnet",
  },
];

export function getTokenBySymbol(
  symbol: string,
) {
  return TOKENS.find(
    (token) =>
      token.symbol.toUpperCase() ===
      symbol.toUpperCase()
  );
}

export function getTokenByAddress(
  address: string,
) {
  return TOKENS.find(
    (token) =>
      token.address.toLowerCase() ===
      address.toLowerCase()
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