export type Token = {
  symbol: string;
  name: string;
  color: string;
};

export const TOKENS: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    color: "bg-violet-500",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    color: "bg-blue-500",
  },
  {
    symbol: "USDT",
    name: "Tether",
    color: "bg-green-500",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    color: "bg-orange-500",
  },
  {
    symbol: "DAI",
    name: "DAI Stablecoin",
    color: "bg-yellow-500",
  },
];