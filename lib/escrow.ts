import type { EscrowStatus } from "@/types/escrow";

// ==========================================
// Arc Escrow — settlement vault
//
// In Arc's own sample app, funds are locked
// inside an on-chain Refund Protocol
// contract (deployed per-agreement through
// the Circle Smart Contract Platform), and
// a Circle developer-controlled wallet acts
// as the agent that releases or refunds
// once an OpenAI vision model validates the
// submitted deliverable.
//
// This project has no backend, so it has no
// deployed contract and no developer-
// controlled agent wallet to automate that
// release. To keep the on-chain step real
// (rather than faked), funding a case here
// moves USDC into this fixed "vault" wallet
// address on Arc Testnet, and
// releasing/refunding is a second, explicit
// on-chain transfer out of that role —
// standing in for what the deployed
// contract + agent wallet would otherwise
// do automatically.
// ==========================================

export const ESCROW_VAULT_WALLET: `0x${string}` =
  "0x9E2b4F1a3C6d8E0f2A4b6C8d0E2f4A6b8C0d2E4f";

export type EscrowStatusMeta = {
  label: string;
  description: string;
  badgeClass: string;
};

export const ESCROW_STATUS_META: Record<
  EscrowStatus,
  EscrowStatusMeta
> = {
  Created: {
    label: "Awaiting Funding",
    description:
      "Agreement created. Waiting for the depositor to lock USDC into escrow.",
    badgeClass:
      "border-amber-400/20 bg-amber-400/10 text-amber-300",
  },

  Funded: {
    label: "Funded — In Progress",
    description:
      "USDC is locked in escrow. Waiting for the beneficiary to submit the deliverable.",
    badgeClass:
      "border-sky-400/20 bg-sky-400/10 text-sky-300",
  },

  Submitted: {
    label: "Deliverable Submitted",
    description:
      "Deliverable submitted. Waiting for validation against the agreed criteria.",
    badgeClass:
      "border-violet-400/20 bg-violet-400/10 text-violet-300",
  },

  Released: {
    label: "Released to Beneficiary",
    description:
      "Validation passed. Escrowed USDC has been released to the beneficiary.",
    badgeClass:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  },

  Refunded: {
    label: "Refunded to Depositor",
    description:
      "Validation failed or the deliverable was rejected. Escrowed USDC has been refunded to the depositor.",
    badgeClass:
      "border-rose-400/20 bg-rose-400/10 text-rose-300",
  },
};
