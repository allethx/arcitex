// ==========================================
// Arc Escrow — types
//
// Mirrors the flow described in Arc's
// "Arc escrow" sample app
// (docs.arc.io/build/sample-apps/arc-escrow):
// a depositor (client) and beneficiary
// (freelancer) agree on deliverable
// criteria and a USDC amount, the escrow is
// funded, the beneficiary submits proof of
// work, it is validated against the
// criteria, and the contract settles by
// releasing funds to the beneficiary or
// refunding the depositor.
// ==========================================

export type EscrowStatus =
  | "Created"
  | "Funded"
  | "Submitted"
  | "Released"
  | "Refunded";

export type EscrowAgreement = {
  id: string;

  title: string;

  criteria: string;

  description?: string;

  depositor: string;

  beneficiary: string;

  amount: string;

  token: string;

  deadline?: string;

  status: EscrowStatus;

  deliverableNote?: string;

  deliverableLink?: string;

  fundTxHash?: string;

  settleTxHash?: string;

  createdAt: number;

  fundedAt?: number;

  submittedAt?: number;

  settledAt?: number;
};
