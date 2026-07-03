export type TransactionType =
  | "swap"
  | "send"
  | "bridge"
  | "claim"
  | "vote";

export type TransactionHistory = {
  id: string;

  type: TransactionType;

  txHash: string;

  fromToken: string;

  toToken: string;

  fromAmount: string;

  toAmount: string;

  status: "Completed" | "Failed";

  timestamp: number;

  // Optional metadata
  recipient?: string;

  fromChain?: string;

  toChain?: string;

  proposal?: string;

  vote?: "YES" | "NO";
};