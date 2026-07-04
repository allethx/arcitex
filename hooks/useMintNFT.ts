"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { CONTRACTS } from "@/lib/contracts";
import { arcitexNFTAbi } from "@/lib/abi/arcitexNFT";

type Params = {
  onSuccess?: (result: {
    txHash: `0x${string}`;
  }) => void;
};

export function useMintNFT({
  onSuccess,
}: Params = {}) {
  // ==========================================
  // State
  // ==========================================

  const [status, setStatus] =
    useState(
      "Mint Early Access NFT",
    );

  const [error, setError] =
    useState<string | null>(
      null,
    );

  const [txHash, setTxHash] =
    useState<
      `0x${string}`
    >();

  // ==========================================
  // Write Contract
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
  // Receipt
  // ==========================================

  useEffect(() => {
    if (!isSuccess || !txHash) {
      return;
    }

    console.group(
      "ARCITEX NFT",
    );

    console.log(
      "NFT Minted"
    );

    console.log(
      "Tx:",
      txHash,
    );

    console.groupEnd();

    setStatus(
      "NFT Minted"
    );

    onSuccess?.({
      txHash,
    });

    const timer =
      setTimeout(() => {
        setStatus(
          "Mint Early Access NFT",
        );
      }, 2500);

    return () =>
      clearTimeout(
        timer,
      );
  }, [
    isSuccess,
    txHash,
    onSuccess,
  ]);

  // ==========================================
  // Mint
  // ==========================================

  function mint() {
    setError(null);

    setStatus(
      "Minting..."
    );

    writeContract(
      {
        address:
          CONTRACTS.NFT,

        abi:
          arcitexNFTAbi,

        functionName:
          "mint",
      },
      {
        onSuccess(
          hash,
        ) {
          console.log(
            "Mint Tx:",
            hash,
          );

          setTxHash(
            hash,
          );
        },

        onError(
          err,
        ) {
          console.error(
            err,
          );

          setError(
            err.message,
          );

          setStatus(
            "Mint Failed",
          );

          setTimeout(() => {
            setStatus(
              "Mint Early Access NFT",
            );
          }, 2500);
        },
      },
    );
  }

  // ==========================================
  // Return
  // ==========================================

  return {
    mint,

    txHash,

    error,

    status,

    loading:
      isPending ||
      confirming,
  };
}