"use client";

import { useState } from "react";

import MintSuccessModal from "./MintSuccessModal";
import NFTArtwork from "./NFTArtwork";
import NFTBenefits from "./NFTBenefits";
import NFTInfo from "./NFTInfo";
import MintButton from "./MintButton";

import { useApproveUSDC } from "@/hooks/useApproveUSDC";
import { useMintNFT } from "@/hooks/useMintNFT";
import { useNFT } from "@/hooks/useNFT";

export default function NFTCard() {
  // ==========================================
  // Success Modal
  // ==========================================

  const [successOpen, setSuccessOpen] =
    useState(false);

  const [txHash, setTxHash] =
    useState("");

  // ==========================================
  // NFT Data
  // ==========================================

  const {
    nft,
    loading: nftLoading,
    refetch,
  } = useNFT();

  // ==========================================
  // Approve
  // ==========================================

  const {
    approve,
    approved,
    loading: approving,
  } = useApproveUSDC({
    amount: 55,
  });

  // ==========================================
  // Mint
  // ==========================================

  const {
    mint,
    loading: minting,
    status,
    error,
  } = useMintNFT({
    onSuccess(result) {
      console.log(
        "NFT Minted:",
        result.txHash,
      );

      setTxHash(
        result.txHash,
      );

      refetch();

      setSuccessOpen(true);
    },
  });

  // ==========================================
  // Button
  // ==========================================

  const loading =
    nftLoading
      ? false
      : approved
      ? minting
      : approving;

  const buttonDisabled =
    nftLoading ||
    nft.hasMinted;

  function handleClick() {
    if (nftLoading) {
      return;
    }

    if (nft.hasMinted) {
      console.log(
        "NFT already minted",
      );

      return;
    }

    if (approved) {
      mint();
    } else {
      approve();
    }
  }


 return (
  <>
    <div
      className="
        mx-auto
        w-full
        max-w-7xl
      "
    >
      <div
  className={`
    overflow-hidden
    rounded-[36px]
    border
    bg-[#0B0F17]
    transition-all
    duration-700

    ${
      successOpen
        ? `
          border-sky-400/40
          shadow-[0_0_80px_rgba(56,189,248,.35)]
        `
        : `
          border-white/10
          shadow-[0_0_60px_rgba(56,189,248,.08)]
        `
    }
  `}
>
        <div
          className="
            grid
            gap-10
            p-8

            lg:grid-cols-2
            lg:p-10
          "
        >
          {/* ===================================== */}
          {/* Left */}
          {/* ===================================== */}

          <div className="space-y-6">

            <NFTArtwork />

          </div>
          

            {/* ===================================== */}
          {/* Right */}
          {/* ===================================== */}

          <div className="flex flex-col">

            <NFTInfo />


<div
  className="
    mt-6
    inline-flex
    w-fit
    items-center
    rounded-full
    border
    border-sky-500/20
    bg-sky-500/10
    px-4
    py-2
    text-xs
    font-semibold
    uppercase
    tracking-wider
    text-sky-300
  "
>
  ✨ Early Access Collection
</div>

            <div className="mt-8">
              <NFTBenefits />
            </div>

            {/* ===================================== */}
            {/* Status */}
            {/* ===================================== */}

            <div className="mt-8">

              <div
                className="
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.03]
                  px-5
                  py-4
                "
              >
                <div className="flex items-center justify-between">

                  <span className="text-zinc-400">
                    Mint Status
                  </span>

                  <span
                    className={`
                      font-semibold
                      ${
                        error
                          ? "text-red-400"
                          : "text-sky-400"
                      }
                    `}
                  >
                    {error ?? status}
                  </span>

                </div>

              </div>

            </div>

            {/* ===================================== */}
            {/* Action */}
            {/* ===================================== */}

            <div className="mt-8">

              <MintButton
                approved={
                  approved &&
                  !nft.hasMinted
                }
                loading={loading}
                disabled={buttonDisabled}
                onClick={handleClick}
              />

            </div>

            {/* ===================================== */}
            {/* Already Minted */}
            {/* ===================================== */}

            {nft.hasMinted && (

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-5
                  py-4
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      h-3
                      w-3
                      rounded-full
                      bg-emerald-400
                    "
                  />

                  <div>

                    <p className="font-semibold text-emerald-300">
                      NFT Already Minted
                    </p>

                    <p className="mt-1 text-sm text-emerald-200/80">
                      This wallet already owns
                      Arcitex Early Access Membership.
                    </p>

                  </div>

                </div>

              </div>

            )}

            {/* ===================================== */}
            {/* Live NFT Statistics */}
            {/* ===================================== */}

            <div className="mt-8">

              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                "
              >
                {/* Price */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-5
                  "
                >
                  <p className="text-sm text-zinc-500">
                    Mint Price
                  </p>

                  <p className="mt-2 text-xl font-bold text-sky-400">
                    {nft.price} USDC
                  </p>
                </div>

                {/* Minted */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-5
                  "
                >
                  <p className="text-sm text-zinc-500">
                    Minted
                  </p>

                  <p className="mt-2 text-xl font-bold text-white">
                    {nft.minted} / {nft.maxSupply}
                  </p>
                </div>

                {/* Remaining */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-5
                  "
                >
                  <p className="text-sm text-zinc-500">
                    Remaining
                  </p>

                  <p className="mt-2 text-xl font-bold text-violet-400">
                    {nft.remaining}
                  </p>
                </div>

                {/* Mint Status */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-5
                  "
                >
                  <p className="text-sm text-zinc-500">
                    Status
                  </p>

                  <p
                    className={`mt-2 text-xl font-bold ${
                      nft.mintEnabled
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {nft.mintEnabled
                      ? "OPEN"
                      : "CLOSED"}
                  </p>
                </div>

              </div>

            </div>

                        {/* ===================================== */}
            {/* Mint Progress */}
            {/* ===================================== */}

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/5
                bg-white/[0.03]
                p-5
              "
            >
              <div className="flex items-center justify-between">

                <span className="text-sm text-zinc-400">
                  Mint Progress
                </span>

                <span className="text-sm font-semibold text-white">
                  {(
                    (nft.minted /
                      nft.maxSupply) *
                    100
                  ).toFixed(1)}
                  %
                </span>

              </div>

              <div
                className="
                  mt-4
                  h-3
                  overflow-hidden
                  rounded-full
                  bg-white/5
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-sky-500
                    via-cyan-400
                    to-violet-500
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${Math.min(
                      100,
                      (nft.minted /
                        nft.maxSupply) *
                        100,
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-sm text-zinc-500">
                {nft.remaining} NFTs remaining out of{" "}
                {nft.maxSupply}.
              </p>

            </div>






          </div>

        </div>
      </div>
        </div>

    <MintSuccessModal
      open={successOpen}
      txHash={txHash}
     onClose={() => {
  setSuccessOpen(false);

  refetch();
}}
    />
  </>
);
}