export type BillStatus = "Unpaid" | "Paid";

export type Bill = {
  id: string;

  title: string;

  description?: string;

  category: string;

  recipient: string;

  amount: string;

  token: string;

  dueDate?: string;

  status: BillStatus;

  txHash?: string;

  createdAt: number;

  paidAt?: number;
};
