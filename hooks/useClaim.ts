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
import { arcitexNFTAbi } from "@/lib/abi/arcitexNFT";

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
  // NFT Ownership (Arcitex NFT required to claim)
  // ==========================

  const {
    data: nftBalance = 0n,
    refetch: refetchNftBalance,
  } = useReadContract({
    address: CONTRACTS.NFT,
    abi: arcitexNFTAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const hasNFT = Number(nftBalance) > 0;

  // ==========================
  // Eligible
  // ==========================

  const {
    data: canClaimOnChain = false,
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

  // Require both: the on-chain claim conditions (USDC balance, not yet
  // claimed) AND holding an Arcitex NFT.
  const eligible = Boolean(canClaimOnChain) && hasNFT;

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
      "Has NFT:",
      hasNFT,
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
    hasNFT,
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
    refetchNftBalance();
  }, [
    isSuccess,
    refetchClaimed,
    refetchEligible,
    refetchNftBalance,
  ]);

  // ==========================
  // Execute Claim
  // ==========================

  function claim() {
    if (!hasNFT) {
      console.warn(
        "Claim blocked: wallet does not hold an Arcitex NFT",
      );

      return;
    }

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

    hasNFT,

    txHash,

    loading:
      isPending ||
      confirming,
  };
}