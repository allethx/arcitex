"use client";

import { useState } from "react";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { CONTRACTS } from "@/lib/contracts";
import { texGovernanceAbi } from "@/lib/abi/texGovernance";

export function useVote(
  proposalId: number,
  onConfirmed?: () => void,
) {
  const { address } = useAccount();

  const [txHash, setTxHash] =
    useState<`0x${string}`>();

  // ==========================================
  // Already Voted
  // ==========================================

  const {
    data: voted = false,
    refetch,
  } = useReadContract({
    address: CONTRACTS.GOVERNANCE,
    abi: texGovernanceAbi,
    functionName: "voted",
    args: address
      ? [
          BigInt(proposalId),
          address,
        ]
      : undefined,
    query: {
      enabled:
        !!address &&
        proposalId > 0,
    },
  });

  // ==========================================
  // Write Contract
  // ==========================================

  const {
    writeContract,
    isPending,
  } = useWriteContract();

  // ==========================================
  // Wait Confirmation
  // ==========================================

  const {
    isLoading: confirming,
  } =
    useWaitForTransactionReceipt({
      hash: txHash,

      query: {
        enabled: !!txHash,
      },

      onSuccess() {
        console.group(
          "GOVERNANCE VOTE",
        );

        console.log(
          "✅ Vote Confirmed",
        );

        console.log(
          "Proposal:",
          proposalId,
        );

        console.log(
          "Tx:",
          txHash,
        );

        console.groupEnd();

        refetch();

        onConfirmed?.();
      },
    });

  function voteYes() {
    console.log(
      "Voting YES...",
    );

    writeContract(
      {
        address:
          CONTRACTS.GOVERNANCE,

        abi:
          texGovernanceAbi,

        functionName:
          "vote",

        args: [
          BigInt(
            proposalId,
          ),
          true,
        ],
      },
      {
        onSuccess(hash) {
          console.log(
            "Vote YES Tx:",
            hash,
          );

          setTxHash(hash);
        },
      },
    );
  }

  function voteNo() {
    console.log(
      "Voting NO...",
    );

    writeContract(
      {
        address:
          CONTRACTS.GOVERNANCE,

        abi:
          texGovernanceAbi,

        functionName:
          "vote",

        args: [
          BigInt(
            proposalId,
          ),
          false,
        ],
      },
      {
        onSuccess(hash) {
          console.log(
            "Vote NO Tx:",
            hash,
          );

          setTxHash(hash);
        },
      },
    );
  }

  return {
    voteYes,
    voteNo,
    voted,
    loading:
      isPending ||
      confirming,
  };
}