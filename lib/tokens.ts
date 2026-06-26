export type Token = {
  symbol: string;
  name: string;
  color: string;
};

export const TOKENS: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    color: "bg-sky-500",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    color: "bg-blue-500",
  },
  {
    symbol: "USDT",
    name: "Tether",
    color: "bg-emerald-500",
  },
  {
    symbol: "DAI",
    name: "Dai",
    color: "bg-yellow-500",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    color: "bg-orange-500",
  },
];