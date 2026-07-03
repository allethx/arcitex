"use client";

import { CheckCircle2 } from "lucide-react";

import { useGovernance } from "@/hooks/useGovernance";
import { useVote } from "@/hooks/useVote";

export default function ProposalList() {
  const {
    proposal,
    loading,
    refetch,
  } = useGovernance();

  const {
    voteYes,
    voteNo,
    voted,
    loading: voting,
  } = useVote(
    proposal?.id ?? 0,
    refetch,
  );

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/5 bg-[#11131A] p-5">
        <p className="text-zinc-400">
          Loading proposal...
        </p>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="rounded-3xl border border-white/5 bg-[#11131A] p-5">
        <p className="text-zinc-400">
          No Proposal Found
        </p>
      </div>
    );
  }

  function handleVote(
    support: boolean,
  ) {
    if (support) {
      voteYes();
    } else {
      voteNo();
    }
  }

  return (
    <div className="rounded-3xl border border-white/5 bg-[#11131A] p-5">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-zinc-400">
            Proposal #{proposal.id}
          </p>

          <h2 className="mt-2 text-lg font-bold">
            {proposal.title}
          </h2>

        </div>

        <div className="flex flex-col items-end gap-2">

          <CheckCircle2 className="h-7 w-7 text-sky-400" />

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              proposal.status === "Active"
                ? "bg-emerald-500/15 text-emerald-400"
                : proposal.status === "Ended"
                ? "bg-red-500/15 text-red-400"
                : "bg-sky-500/15 text-sky-400"
            }`}
          >
            {proposal.status}
          </span>

        </div>

      </div>

      {/* Description */}

      <p className="mt-4 text-sm leading-6 text-zinc-400">
        {proposal.description}
      </p>

      {/* Stats */}

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">

          <span className="text-zinc-500">
            YES
          </span>

          <span className="font-semibold text-emerald-400">
            {proposal.yesVotes.toLocaleString()} TEX
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-zinc-500">
            NO
          </span>

          <span className="font-semibold text-red-400">
            {proposal.noVotes.toLocaleString()} TEX
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-zinc-500">
            Ends In
          </span>

          <span className="font-semibold">
            {proposal.daysLeft} Days
          </span>

        </div>

      </div>

      {/* YES Progress */}

      <div className="mt-6">

        <div className="flex justify-between text-sm">

          <span className="text-emerald-400">
            YES
          </span>

          <span>
            {proposal.yesPercent.toFixed(1)}%
          </span>

        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">

          <div
            className="h-full bg-emerald-500 transition-all duration-700"
            style={{
              width: `${proposal.yesPercent}%`,
            }}
          />

        </div>

      </div>

      {/* NO Progress */}

      <div className="mt-4">

        <div className="flex justify-between text-sm">

          <span className="text-red-400">
            NO
          </span>

          <span>
            {proposal.noPercent.toFixed(1)}%
          </span>

        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">

          <div
            className="h-full bg-red-500 transition-all duration-700"
            style={{
              width: `${proposal.noPercent}%`,
            }}
          />

        </div>

      </div>

      {/* Total Voting */}

      <div className="mt-6 rounded-2xl border border-white/5 bg-[#0F1118] p-4">

        <div className="flex items-center justify-between">

          <span className="text-zinc-500">
            Total Voting Power
          </span>

          <span className="font-semibold text-sky-400">
            {proposal.totalVotes.toLocaleString()} TEX
          </span>

        </div>

      </div>

      {/* Vote */}

      {!voted ? (

        <div className="mt-6 grid grid-cols-2 gap-3">

          <button
            type="button"
            disabled={voting}
            onClick={() =>
              handleVote(true)
            }
            className="h-11 rounded-2xl bg-emerald-500 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {voting
              ? "Voting..."
              : "Vote YES"}
          </button>

          <button
            type="button"
            disabled={voting}
            onClick={() =>
              handleVote(false)
            }
            className="h-11 rounded-2xl bg-red-500 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {voting
              ? "Voting..."
              : "Vote NO"}
          </button>

        </div>

      ) : (

        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 py-3 text-center font-semibold text-emerald-400">
          ✅ Already Voted
        </div>

      )}

    </div>
  );
}