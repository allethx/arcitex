"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { CONTRACTS } from "@/lib/contracts";
import { texClaimAbi } from "@/lib/abi/texClaim";

export function useClaim() {
  const { address } = useAccount();

  const [txHash, setTxHash] =
    useState<`0x${string}`>();

  // ==========================
  // Already Claimed
  // ==========================

  const {
    data: claimed = false,
    refetch: refetchClaimed,
  } = useReadContract({
    address: CONTRACTS.CLAIM,
    abi: texClaimAbi,
    functionName: "claimed",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // ==========================
  // Eligible
  // ==========================

  const {
    data: eligible = false,
    refetch: refetchEligible,
  } = useReadContract({
    address: CONTRACTS.CLAIM,
    abi: texClaimAbi,
    functionName: "canClaim",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // ==========================
  // Debug
  // ==========================

  useEffect(() => {
    console.group(
      "========== CLAIM HOOK =========="
    );

    console.log(
      "Wallet:",
      address,
    );

    console.log(
      "Claim Contract:",
      CONTRACTS.CLAIM,
    );

    console.log(
      "Eligible:",
      eligible,
    );

    console.log(
      "Claimed:",
      claimed,
    );

    console.log(
      "Tx Hash:",
      txHash,
    );

    console.groupEnd();
  }, [
    address,
    eligible,
    claimed,
    txHash,
  ]);

  // ==========================
  // Write Contract
  // ==========================

  const {
    writeContract,
    isPending,
  } = useWriteContract();

  // ==========================
  // Wait Receipt
  // ==========================

  const {
    isLoading: confirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: txHash,

    query: {
      enabled: !!txHash,
    },
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    console.log(
      "✅ Claim transaction confirmed",
    );

    refetchClaimed();
    refetchEligible();
  }, [
    isSuccess,
    refetchClaimed,
    refetchEligible,
  ]);

  // ==========================
  // Execute Claim
  // ==========================

  function claim() {
    console.log(
      "Calling TexClaim.claim()..."
    );

    writeContract(
      {
        address: CONTRACTS.CLAIM,
        abi: texClaimAbi,
        functionName: "claim",
      },
      {
        onSuccess(hash) {
          console.log(
            "Transaction Sent:",
            hash,
          );

          setTxHash(hash);
        },

        onError(error) {
          console.error(
            "Claim Error:",
            error,
          );
        },
      },
    );
  }

  return {
    claim,

    claimed,

    eligible,

    txHash,

    loading:
      isPending ||
      confirming,
  };
}