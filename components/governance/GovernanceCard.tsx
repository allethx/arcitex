"use client";

import GovernanceHeader from "./GovernanceHeader";
import ClaimCard from "./ClaimCard";
import VotingPowerCard from "./VotingPowerCard";
import ProposalList from "./ProposalList";

import { useCurrentUsdc } from "@/hooks/useCurrentUsdc";
import { useTokenBalance } from "@/hooks/useTokenBalance";

export default function GovernanceCard() {
  const usdc = useCurrentUsdc();

  const {
    balance: usdcBalance,
  } = useTokenBalance({
    token: usdc?.address,
    decimals: usdc?.decimals,
    symbol: usdc?.symbol,
  });

  return (
    <div className="mx-auto flex w-full max-w-[520px] justify-center">
      <div
        className="
          w-full
          rounded-3xl
          border
          border-white/5
          bg-[#171A23]/90
          p-6
          backdrop-blur-xl
          sm:p-7
        "
      >
        <GovernanceHeader />

        <div className="mt-6 space-y-5">
          <VotingPowerCard />

          <ClaimCard
            usdcBalance={usdcBalance}
          />

          <ProposalList />
        </div>
      </div>
    </div>
  );
}