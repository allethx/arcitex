"use client";

import { useState } from "react";

import {
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Loader2,
  Lock,
  ShieldCheck,
  ShieldX,
  Trash2,
  UploadCloud,
  Wallet,
  XCircle,
} from "lucide-react";

import { usePay } from "@/hooks/usePay";
import { useTokenBalance } from "@/hooks/useTokenBalance";

import { getTokenBySymbol } from "@/lib/tokens";
import {
  ESCROW_STATUS_META,
  ESCROW_VAULT_WALLET,
} from "@/lib/escrow";

import type { EscrowAgreement } from "@/types/escrow";

type Props = {
  agreement: EscrowAgreement;

  onUpdate: (
    id: string,
    patch: Partial<EscrowAgreement>,
  ) => void;

  onRemove: (id: string) => void;
};

export default function EscrowItem({
  agreement,
  onUpdate,
  onRemove,
}: Props) {
  const [showDeliverableForm, setShowDeliverableForm] =
    useState(false);

  const [deliverableLink, setDeliverableLink] =
    useState("");

  const [deliverableNote, setDeliverableNote] =
    useState("");

  const token = getTokenBySymbol(
    agreement.token,
  );

  const { balance, loading: balanceLoading } =
    useTokenBalance({
      token: token?.address,
      decimals: token?.decimals,
      symbol: token?.symbol,
    });

  const meta =
    ESCROW_STATUS_META[
      agreement.status
    ];

  // ==========================
  // Three dedicated payment
  // flows, one per lifecycle
  // step, each with a fixed
  // recipient. This avoids any
  // shared "which action is
  // active" state that a click
  // could race against.
  //  - fund: client -> vault
  //  - release: (vault role)
  //    -> beneficiary
  //  - refund: (vault role)
  //    -> depositor
  // ==========================

  const fund = usePay({
    recipient: ESCROW_VAULT_WALLET,
    token: agreement.token,
    amount: agreement.amount,
    balance,
    idleLabel: "Fund Escrow",

    onSuccess: (result) => {
      onUpdate(agreement.id, {
        status: "Funded",
        fundTxHash:
          result?.txHash ?? "",
        fundedAt: Date.now(),
      });
    },
  });

  const release = usePay({
    recipient: agreement.beneficiary,
    token: agreement.token,
    amount: agreement.amount,
    balance,
    idleLabel: "Approve & Release",

    onSuccess: (result) => {
      onUpdate(agreement.id, {
        status: "Released",
        settleTxHash:
          result?.txHash ?? "",
        settledAt: Date.now(),
      });
    },
  });

  const refund = usePay({
    recipient: agreement.depositor,
    token: agreement.token,
    amount: agreement.amount,
    balance,
    idleLabel: "Reject & Refund",

    onSuccess: (result) => {
      onUpdate(agreement.id, {
        status: "Refunded",
        settleTxHash:
          result?.txHash ?? "",
        settledAt: Date.now(),
      });
    },
  });

  function handleSubmitDeliverable() {
    if (!deliverableLink.trim()) {
      return;
    }

    onUpdate(agreement.id, {
      status: "Submitted",
      deliverableLink:
        deliverableLink.trim(),
      deliverableNote:
        deliverableNote.trim() ||
        undefined,
      submittedAt: Date.now(),
    });

    setShowDeliverableForm(false);
  }

  const isSettled =
    agreement.status === "Released" ||
    agreement.status === "Refunded";

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#0B0F17]
        p-5
        transition
        hover:border-emerald-500/30
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`
                rounded-full
                border
                px-2.5
                py-0.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                ${meta.badgeClass}
              `}
            >
              {meta.label}
            </span>

            {agreement.deadline && (
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <CalendarClock
                  size={12}
                />
                Due{" "}
                {new Date(
                  agreement.deadline,
                ).toLocaleDateString(
                  "en-US",
                )}
              </span>
            )}
          </div>

          <p className="mt-2 truncate font-semibold text-white">
            {agreement.title}
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            {meta.description}
          </p>

          <p className="mt-2 line-clamp-2 text-xs text-zinc-500">
            Criteria: {agreement.criteria}
          </p>

          <div className="mt-2 space-y-0.5">
            <p className="truncate font-mono text-xs text-zinc-500">
              Depositor:{" "}
              {agreement.depositor}
            </p>

            <p className="truncate font-mono text-xs text-zinc-500">
              Beneficiary:{" "}
              {agreement.beneficiary}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-lg font-bold text-white">
            {agreement.amount}{" "}
            <span className="text-sm font-medium text-zinc-400">
              {agreement.token}
            </span>
          </p>

          {agreement.status ===
            "Created" && (
            <button
              type="button"
              onClick={() =>
                onRemove(agreement.id)
              }
              aria-label="Delete agreement"
              title="Delete agreement"
              className="
                mt-2
                inline-flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                text-zinc-400
                transition
                hover:border-red-500/30
                hover:text-red-400
              "
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* ========================== */}
      {/* Step: Created -> Fund */}
      {/* ========================== */}

      {agreement.status === "Created" && (
        <div className="mt-4">
          {fund.error && (
            <p className="mb-2 text-sm text-red-400">
              {fund.error}
            </p>
          )}

          {!fund.validation.valid &&
            !fund.loading && (
              <p className="mb-2 text-xs text-amber-300">
                {fund.validation.message}
              </p>
            )}

          <button
            type="button"
            disabled={
              fund.loading ||
              !fund.validation.valid
            }
            onClick={fund.pay}
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-emerald-500
              to-teal-600
              font-semibold
              text-white
              shadow-[0_0_25px_rgba(16,185,129,0.22)]
              transition-all
              duration-300
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:shadow-none
            "
          >
            {fund.loading ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Lock size={16} />
            )}
            {fund.loading
              ? fund.status
              : "Fund Escrow"}
          </button>

          <p className="mt-2 text-center text-xs text-zinc-500">
            {balanceLoading
              ? "Checking USDC balance..."
              : `Balance: ${balance.toFixed(2)} USDC on Arc Testnet`}
          </p>
        </div>
      )}

      {/* ========================== */}
      {/* Step: Funded -> Submit */}
      {/* ========================== */}

      {agreement.status === "Funded" &&
        !showDeliverableForm && (
          <button
            type="button"
            onClick={() =>
              setShowDeliverableForm(
                true,
              )
            }
            className="
              mt-4
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              font-semibold
              text-white
              transition
              hover:border-sky-500/30
              hover:text-sky-300
            "
          >
            <UploadCloud size={16} />
            Submit Deliverable
          </button>
        )}

      {agreement.status === "Funded" &&
        showDeliverableForm && (
          <div
            className="
              mt-4
              space-y-3
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              p-4
            "
          >
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Deliverable Link
              </label>

              <input
                type="text"
                value={deliverableLink}
                onChange={(e) =>
                  setDeliverableLink(
                    e.target.value,
                  )
                }
                placeholder="https://... (repo, file, preview)"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-600
                  focus:border-sky-400/50
                "
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Note (optional)
              </label>

              <textarea
                value={deliverableNote}
                onChange={(e) =>
                  setDeliverableNote(
                    e.target.value,
                  )
                }
                rows={2}
                placeholder="How does this meet the acceptance criteria?"
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-3
                  py-2.5
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-600
                  focus:border-sky-400/50
                "
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={
                  !deliverableLink.trim()
                }
                onClick={
                  handleSubmitDeliverable
                }
                className="
                  flex
                  h-11
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-sky-500
                  to-violet-600
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <FileCheck2 size={15} />
                Submit for Review
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowDeliverableForm(
                    false,
                  )
                }
                className="h-11 shrink-0 rounded-xl border border-white/10 px-3 text-sm font-semibold text-zinc-400 transition hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      {/* ========================== */}
      {/* Step: Submitted -> Validate */}
      {/* ========================== */}

      {agreement.status ===
        "Submitted" && (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs text-zinc-400">
              Deliverable
            </p>

            <a
              href={
                agreement.deliverableLink
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-1.5 break-all text-sm font-medium text-sky-300 hover:text-sky-200"
            >
              {
                agreement.deliverableLink
              }
              <ExternalLink
                size={13}
              />
            </a>

            {agreement.deliverableNote && (
              <p className="mt-2 text-sm text-zinc-400">
                {
                  agreement.deliverableNote
                }
              </p>
            )}
          </div>

          <p className="text-xs text-zinc-500">
            In Arc's full sample app this is
            where an OpenAI vision model
            checks the deliverable against
            the acceptance criteria and the
            Refund Protocol contract settles
            automatically. This demo has no
            AI backend wired in, so the
            depositor reviews and decides
            here instead.
          </p>

          {(release.error ||
            refund.error) && (
            <p className="text-sm text-red-400">
              {release.error ??
                refund.error}
            </p>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={
                release.loading ||
                refund.loading ||
                !release.validation
                  .valid
              }
              onClick={release.pay}
              className="
                flex
                h-12
                flex-1
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-emerald-500
                to-teal-600
                text-sm
                font-semibold
                text-white
                shadow-[0_0_25px_rgba(16,185,129,0.22)]
                transition-all
                duration-300
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:shadow-none
              "
            >
              {release.loading ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <ShieldCheck
                  size={15}
                />
              )}
              {release.loading
                ? release.status
                : "Approve & Release"}
            </button>

            <button
              type="button"
              disabled={
                release.loading ||
                refund.loading ||
                !refund.validation
                  .valid
              }
              onClick={refund.pay}
              className="
                flex
                h-12
                flex-1
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-rose-500/30
                bg-rose-500/10
                text-sm
                font-semibold
                text-rose-300
                transition
                hover:bg-rose-500/15
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {refund.loading ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <ShieldX size={15} />
              )}
              {refund.loading
                ? refund.status
                : "Reject & Refund"}
            </button>
          </div>

          <p className="text-center text-xs text-zinc-500">
            {balanceLoading
              ? "Checking USDC balance..."
              : `Connected wallet balance: ${balance.toFixed(2)} USDC`}
          </p>
        </div>
      )}

      {/* ========================== */}
      {/* Settled */}
      {/* ========================== */}

      {isSettled && (
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`flex items-center gap-1.5 text-sm font-medium ${
              agreement.status ===
              "Released"
                ? "text-emerald-400"
                : "text-rose-400"
            }`}
          >
            {agreement.status ===
            "Released" ? (
              <CheckCircle2
                size={16}
              />
            ) : (
              <XCircle size={16} />
            )}
            {agreement.status ===
            "Released"
              ? "Released to beneficiary"
              : "Refunded to depositor"}
          </span>

          {agreement.settleTxHash && (
            <button
              type="button"
              onClick={() =>
                window.open(
                  `https://testnet.arcscan.app/tx/${agreement.settleTxHash}`,
                  "_blank",
                )
              }
              className="flex items-center gap-2 text-sm text-sky-400 transition hover:text-sky-300"
            >
              View on ArcScan
              <ExternalLink
                size={14}
              />
            </button>
          )}
        </div>
      )}

      {agreement.fundTxHash &&
        agreement.status !== "Created" && (
          <button
            type="button"
            onClick={() =>
              window.open(
                `https://testnet.arcscan.app/tx/${agreement.fundTxHash}`,
                "_blank",
              )
            }
            className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-300"
          >
            <Wallet size={12} />
            Funding tx on ArcScan
          </button>
        )}
    </div>
  );
}
