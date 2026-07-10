// ==========================================
// Arc Commerce — default biller/merchant
// settlement wallet used when a bill is
// created without a custom recipient
// ==========================================

export const DEFAULT_BILLER_WALLET: `0x${string}` =
  "0x4C1a2A6b8F9d3E7c5B0a1D2E3f4A5B6C7D8e9F00";

export type BillCategory = {
  id: string;
  label: string;
};

export const BILL_CATEGORIES: BillCategory[] = [
  { id: "invoice", label: "Invoice" },
  { id: "subscription", label: "Subscription" },
  { id: "utilities", label: "Utilities" },
  { id: "rent", label: "Rent" },
  { id: "other", label: "Other" },
];
