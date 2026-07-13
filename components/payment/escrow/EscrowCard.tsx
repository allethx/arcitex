"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Plus,
  ShieldCheck,
} from "lucide-react";

import CreateEscrowForm from "./CreateEscrowForm";
import EscrowItem from "./EscrowItem";

import { useEscrow } from "@/hooks/useEscrow";
import { useWallet } from "@/hooks/useWallet";

import type { EscrowAgreement } from "@/types/escrow";

export default function EscrowCard() {
  const {
    agreements,
    addAgreement,
    updateAgreement,
    removeAgreement,
  } = useEscrow();

  const { address } = useWallet();

  const [showForm, setShowForm] =
    useState(false);

  const [justCreated, setJustCreated] =
    useState(false);

  const active = agreements.filter(
    (item) =>
      item.status !== "Released" &&
      item.status !== "Refunded",
  );

  const settled = agreements.filter(
    (item) =>
      item.status === "Released" ||
      item.status === "Refunded",
  );

  const totalLocked = agreements
    .filter(
      (item) =>
        item.status === "Funded" ||
        item.status === "Submitted",
    )
    .reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0,
    );

  function handleCreate(
    agreement: EscrowAgreement,
  ) {
    addAgreement(agreement);

    setJustCreated(true);

    setTimeout(
      () => setJustCreated(false),
      4000,
    );
  }

  return (
    <div
      className="
        group
        relative
        w-full
        max-w-2xl
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        p-7
        backdrop-blur-2xl
        transition-all
        duration-500
        hover:border-emerald-400/30
        hover:shadow-[0_0_70px_rgba(16,185,129,0.14)]
        sm:p-9
      "
    >
      {/* Ambient glow */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-emerald-500/10
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -bottom-24
          h-72
          w-72
          rounded-full
          bg-teal-600/12
          blur-[110px]
        "
      />

      {/* Header */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-emerald-500
              to-teal-600
              shadow-[0_0_30px_rgba(16,185,129,.30)]
            "
          >
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Arc Escrow
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Escrow
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowForm(
              (prev) => !prev,
            )
          }
          className="
            flex
            h-11
            shrink-0
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            to-teal-600
            px-4
            text-sm
            font-semibold
            text-white
            shadow-[0_0_25px_rgba(16,185,129,0.22)]
            transition-all
            duration-300
            hover:opacity-90
          "
        >
          <Plus size={16} />
          New Escrow
        </button>
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-slate-400">
        Lock USDC for a deliverable, let
        the beneficiary submit proof of
        work, then release or refund once
        it's reviewed against the agreed
        criteria — modeled on Arc's escrow
        sample app.
      </p>

      {justCreated && (
        <div
          className="
            relative
            mt-5
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-4
            py-3
            text-sm
            text-emerald-300
          "
        >
          <CheckCircle2 size={16} />
          Agreement created — fund it
          below to lock the USDC in
          escrow.
        </div>
      )}

      {/* Summary */}

      <div className="relative mt-8 grid grid-cols-2 gap-4">
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-4
          "
        >
          <p className="text-xs text-slate-400">
            Locked in Escrow
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {totalLocked.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}{" "}
            <span className="text-sm font-medium text-slate-400">
              USDC
            </span>
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-4
          "
        >
          <p className="text-xs text-slate-400">
            Agreements
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {active.length}{" "}
            <span className="text-sm font-medium text-slate-400">
              active
            </span>
          </p>
        </div>
      </div>

      {/* Create Form */}

      {showForm && (
        <div className="relative mt-6">
          <CreateEscrowForm
            defaultDepositor={
              address ?? ""
            }
            onCreate={handleCreate}
            onClose={() =>
              setShowForm(false)
            }
          />
        </div>
      )}

      {/* Agreement List */}

      <div className="relative mt-6 space-y-3">
        {agreements.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              py-14
              text-center
            "
          >
            <p className="text-sm text-slate-400">
              No escrow agreements yet.
              Create one to lock funds
              for a deliverable.
            </p>
          </div>
        ) : (
          <>
            {[...active]
              .sort(
                (a, b) =>
                  b.createdAt -
                  a.createdAt,
              )
              .map((agreement) => (
                <EscrowItem
                  key={agreement.id}
                  agreement={agreement}
                  onUpdate={
                    updateAgreement
                  }
                  onRemove={
                    removeAgreement
                  }
                />
              ))}

            {settled.length > 0 && (
              <>
                <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Settled
                </p>

                {[...settled]
                  .sort(
                    (a, b) =>
                      (b.settledAt ??
                        0) -
                      (a.settledAt ??
                        0),
                  )
                  .map((agreement) => (
                    <EscrowItem
                      key={
                        agreement.id
                      }
                      agreement={
                        agreement
                      }
                      onUpdate={
                        updateAgreement
                      }
                      onRemove={
                        removeAgreement
                      }
                    />
                  ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
