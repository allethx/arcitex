"use client";

import { useMemo } from "react";

import { useReadContract } from "wagmi";

import { formatUnits } from "viem";

import { CONTRACTS } from "@/lib/contracts";
import { texGovernanceAbi } from "@/lib/abi/texGovernance";

export function useGovernance() {
  // ==========================================
  // Proposal Count
  // ==========================================

  const {
    data: proposalCount = 0n,
    isLoading: loadingCount,
    refetch: refetchCount,
  } = useReadContract({
    address: CONTRACTS.GOVERNANCE,
    abi: texGovernanceAbi,
    functionName: "proposalCount",
  });

  // ==========================================
  // Proposal #1
  // ==========================================

  const {
    data: proposal,
    isLoading: loadingProposal,
    refetch: refetchProposal,
  } = useReadContract({
    address: CONTRACTS.GOVERNANCE,
    abi: texGovernanceAbi,
    functionName: "getProposal",
    args: proposalCount > 0n ? [1n] : undefined,
    query: {
      enabled: proposalCount > 0n,
    },
  });

  // ==========================================
  // Format Proposal
  // ==========================================

  const formattedProposal = useMemo(() => {
    if (!proposal) {
      return null;
    }

    const now = Math.floor(
      Date.now() / 1000,
    );

    const deadline = Number(
      proposal.deadline,
    );

    const secondsLeft = Math.max(
      0,
      deadline - now,
    );

    const daysLeft = Math.ceil(
      secondsLeft /
        (60 * 60 * 24),
    );

    const yesVotes = Number(
      formatUnits(
        proposal.yesVotes,
        18,
      ),
    );

    const noVotes = Number(
      formatUnits(
        proposal.noVotes,
        18,
      ),
    );

    const totalVotes =
      yesVotes + noVotes;

    const yesPercent =
      totalVotes === 0
        ? 0
        : (yesVotes /
            totalVotes) *
          100;

    const noPercent =
      totalVotes === 0
        ? 0
        : (noVotes /
            totalVotes) *
          100;

    const active =
      deadline > now;

    const status =
      proposal.executed
        ? "Executed"
        : active
        ? "Active"
        : "Ended";

    return {
      id: Number(
        proposal.id,
      ),

      title:
        proposal.title,

      description:
        proposal.description,

      deadline,

      daysLeft,

      active,

      status,

      executed:
        proposal.executed,

      yesVotes,

      noVotes,

      totalVotes,

      yesPercent,

      noPercent,
    };
  }, [proposal]);

  console.group(
    "GOVERNANCE",
  );

  console.log(
    "Proposal Count:",
    proposalCount.toString(),
  );

  console.log(
    "Proposal:",
    formattedProposal,
  );

  console.groupEnd();

  return {
    proposalCount:
      Number(
        proposalCount,
      ),

    proposal:
      formattedProposal,

    loading:
      loadingCount ||
      loadingProposal,

    refetch() {
      refetchCount();
      refetchProposal();
    },
  };
}