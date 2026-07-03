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