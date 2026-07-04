"use client";

import { useMemo } from "react";

import {
  useAccount,
  useReadContract,
} from "wagmi";

import { formatUnits } from "viem";

import { CONTRACTS } from "@/lib/contracts";
import { arcitexNFTAbi } from "@/lib/abi/arcitexNFT";

export function useNFT() {
  const { address } =
    useAccount();

  // ==========================================
  // PRICE
  // ==========================================

  const {
    data: price = 0n,
    isLoading: loadingPrice,
    refetch: refetchPrice,
  } = useReadContract({
    address: CONTRACTS.NFT,
    abi: arcitexNFTAbi,
    functionName: "PRICE",
  });

  // ==========================================
  // MAX SUPPLY
  // ==========================================

  const {
    data: maxSupply = 0n,
    isLoading: loadingMaxSupply,
    refetch: refetchMaxSupply,
  } = useReadContract({
    address: CONTRACTS.NFT,
    abi: arcitexNFTAbi,
    functionName: "MAX_SUPPLY",
  });

  // ==========================================
  // TOTAL MINTED
  // ==========================================

  const {
    data: totalMinted = 0n,
    isLoading: loadingMinted,
    refetch: refetchMinted,
  } = useReadContract({
    address: CONTRACTS.NFT,
    abi: arcitexNFTAbi,
    functionName: "totalMinted",
  });

  // ==========================================
  // REMAINING
  // ==========================================

  const {
    data: remainingSupply = 0n,
    isLoading: loadingRemaining,
    refetch: refetchRemaining,
  } = useReadContract({
    address: CONTRACTS.NFT,
    abi: arcitexNFTAbi,
    functionName: "remainingSupply",
  });

  // ==========================================
  // MINT ENABLED
  // ==========================================

  const {
    data: mintEnabled = false,
    isLoading: loadingMintEnabled,
    refetch: refetchMintEnabled,
  } = useReadContract({
    address: CONTRACTS.NFT,
    abi: arcitexNFTAbi,
    functionName: "mintEnabled",
  });

  // ==========================================
  // HAS MINTED
  // ==========================================

  const {
    data: hasMinted = false,
    isLoading: loadingHasMinted,
    refetch: refetchHasMinted,
  } = useReadContract({
    address: CONTRACTS.NFT,
    abi: arcitexNFTAbi,
    functionName: "hasMinted",
    args: address
      ? [address]
      : undefined,
    query: {
      enabled: !!address,
    },
  });

  // ==========================================
  // BALANCE
  // ==========================================

  const {
    data: balance = 0n,
    isLoading: loadingBalance,
    refetch: refetchBalance,
  } = useReadContract({
    address: CONTRACTS.NFT,
    abi: arcitexNFTAbi,
    functionName: "balanceOf",
    args: address
      ? [address]
      : undefined,
    query: {
      enabled: !!address,
    },
  });

  // ==========================================
  // COMPUTED
  // ==========================================

  const nft = useMemo(() => {
    return {
      price: Number(
        formatUnits(
          price,
          6,
        ),
      ),

      minted:
        Number(totalMinted),

      maxSupply:
        Number(maxSupply),

      remaining:
        Number(
          remainingSupply,
        ),

      owned:
        Number(balance),

      hasNFT:
        Number(balance) >
        0,

      hasMinted:
        Boolean(
          hasMinted,
        ),

      mintEnabled:
        Boolean(
          mintEnabled,
        ),
    };
  }, [
    price,
    totalMinted,
    maxSupply,
    remainingSupply,
    balance,
    hasMinted,
    mintEnabled,
  ]);

  // ==========================================
  // DEBUG
  // ==========================================

  console.group(
    "ARCITEX NFT",
  );

  console.log(
    "Price:",
    nft.price,
    "USDC",
  );

  console.log(
    "Minted:",
    nft.minted,
  );

  console.log(
    "Remaining:",
    nft.remaining,
  );

  console.log(
    "Owned:",
    nft.owned,
  );

  console.log(
    "Has NFT:",
    nft.hasNFT,
  );

  console.log(
    "Already Minted:",
    nft.hasMinted,
  );

  console.log(
    "Mint Enabled:",
    nft.mintEnabled,
  );

  console.groupEnd();

  // ==========================================
  // RETURN
  // ==========================================

  return {
    nft,

    loading:
      loadingPrice ||
      loadingMaxSupply ||
      loadingMinted ||
      loadingRemaining ||
      loadingMintEnabled ||
      loadingHasMinted ||
      loadingBalance,

    refetch() {
      refetchPrice();
      refetchMaxSupply();
      refetchMinted();
      refetchRemaining();
      refetchMintEnabled();
      refetchHasMinted();
      refetchBalance();
    },
  };
}