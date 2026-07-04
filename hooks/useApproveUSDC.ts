"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { parseUnits } from "viem";

import { erc20Abi } from "@/lib/abi/erc20";
import { CONTRACTS } from "@/lib/contracts";
import { getToken } from "@/lib/tokens";

type Params = {
  amount: number;
  onApproved?: () => void;
};

export function useApproveUSDC({
  amount,
  onApproved,
}: Params) {
  const { address } =
    useAccount();

  const [txHash, setTxHash] =
    useState<`0x${string}`>();

  // ==========================================
  // Arc USDC
  // ==========================================

  const usdc = getToken(
    "USDC",
    "Arc_Testnet",
  );

  // ==========================================
  // Required Amount
  // ==========================================

  const required =
    useMemo(
      () =>
        parseUnits(
          amount.toString(),
          6,
        ),
      [amount],
    );

  // ==========================================
  // Allowance
  // ==========================================

  const {
    data: allowance = 0n,
    refetch,
  } = useReadContract({
    address:
      usdc?.address,

    abi:
      erc20Abi,

    functionName:
      "allowance",

    args:
      address &&
      usdc
        ? [
            address,
            CONTRACTS.NFT,
          ]
        : undefined,

    query: {
      enabled:
        !!address &&
        !!usdc,
    },
  });

  // ==========================================
  // Write
  // ==========================================

  const {
    writeContract,
    isPending,
  } =
    useWriteContract();

  // ==========================================
  // Wait Receipt
  // ==========================================

  const {
    isLoading:
      confirming,

    isSuccess,
  } =
    useWaitForTransactionReceipt({
      hash: txHash,

      query: {
        enabled:
          !!txHash,
      },
    });

  // ==========================================
  // Confirmed
  // ==========================================

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    console.group(
      "USDC APPROVE",
    );

    console.log(
      "Approval Confirmed",
    );

    console.log(
      "Hash:",
      txHash,
    );

    console.groupEnd();

    refetch();

    onApproved?.();
  }, [
    isSuccess,
    txHash,
    refetch,
    onApproved,
  ]);

  // ==========================================
  // Approve
  // ==========================================

  function approve() {
    if (!usdc) {
      return;
    }

    if (
      allowance >=
      required
    ) {
      console.log(
        "Already Approved",
      );

      onApproved?.();

      return;
    }

    console.group(
      "USDC APPROVE",
    );

    console.log(
      "Amount:",
      amount,
      "USDC",
    );

    console.log(
      "Required:",
      required.toString(),
    );

    console.log(
      "Allowance:",
      allowance.toString(),
    );

    console.log(
      "NFT:",
      CONTRACTS.NFT,
    );

    console.groupEnd();

    writeContract(
      {
        address:
          usdc.address,

        abi:
          erc20Abi,

        functionName:
          "approve",

        args: [
          CONTRACTS.NFT,
          required,
        ],
      },
      {
        onSuccess(
          hash,
        ) {
          console.log(
            "Approve Tx:",
            hash,
          );

          setTxHash(
            hash,
          );
        },

        onError(
          error,
        ) {
          console.error(
            "Approve Error:",
            error,
          );
        },
      },
    );
  }

  // ==========================================
  // Reset
  // ==========================================

  function reset() {
    setTxHash(
      undefined,
    );
  }

  // ==========================================
  // Return
  // ==========================================

  return {
    approve,

    allowance,

    required,

    approved:
      allowance >=
      required,

    txHash,

    isConfirmed:
      isSuccess,

    loading:
      isPending ||
      confirming,

    refetchAllowance:
      refetch,

    reset,
  };
}