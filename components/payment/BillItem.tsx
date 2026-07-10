"use client";

import { useState } from "react";

import {
  CalendarClock,
  CheckCircle2,
  Copy,
  ExternalLink,
  Link2,
  Trash2,
} from "lucide-react";

import { BILL_CATEGORIES } from "@/lib/payment";
import { buildBillPaymentLink } from "@/lib/paymentLink";

import type { Bill } from "@/types/payment";

type Props = {
  bill: Bill;

  onMarkPaid: (
    id: string,
    txHash: string,
  ) => void;

  onRemove: (id: string) => void;
};

export default function BillItem({
  bill,
  onMarkPaid,
  onRemove,
}: Props) {
  const [copied, setCopied] =
    useState(false);

  const [confirming, setConfirming] =
    useState(false);

  const [txHashInput, setTxHashInput] =
    useState("");

  const categoryLabel =
    BILL_CATEGORIES.find(
      (item) =>
        item.id === bill.category,
    )?.label ?? "Other";

  const isPaid =
    bill.status === "Paid";

  const paymentLink =
    buildBillPaymentLink({
      id: bill.id,
      title: bill.title,
      description: bill.description,
      category: bill.category,
      recipient: bill.recipient,
      amount: bill.amount,
      token: bill.token,
      dueDate: bill.dueDate,
      createdAt: bill.createdAt,
    });

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(
        paymentLink,
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        2000,
      );
    } catch {
      window.prompt(
        "Copy this payment link:",
        paymentLink,
      );
    }
  }

  function handleConfirmPaid() {
    onMarkPaid(
      bill.id,
      txHashInput.trim() ||
        "manual-confirmation",
    );

    setConfirming(false);
    setTxHashInput("");
  }

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#0B0F17]
        p-5
        transition
        hover:border-sky-500/30
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="
                rounded-full
                border
                border-sky-400/20
                bg-sky-400/10
                px-2.5
                py-0.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-sky-300
              "
            >
              {categoryLabel}
            </span>

            {bill.dueDate && (
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <CalendarClock
                  size={12}
                />
                Due{" "}
                {new Date(
                  bill.dueDate,
                ).toLocaleDateString("en-US")}
              </span>
            )}
          </div>

          <p className="mt-2 truncate font-semibold text-white">
            {bill.title}
          </p>

          {bill.description && (
            <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
              {bill.description}
            </p>
          )}

          <p className="mt-2 truncate font-mono text-xs text-zinc-500">
            To {bill.recipient}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-lg font-bold text-white">
            {bill.amount}{" "}
            <span className="text-sm font-medium text-zinc-400">
              {bill.token}
            </span>
          </p>

          {isPaid ? (
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400">
              <CheckCircle2
                size={16}
              />
              Paid
            </span>
          ) : (
            <span className="mt-2 inline-flex text-sm font-medium text-amber-400">
              Awaiting Payment
            </span>
          )}
        </div>
      </div>

      {!isPaid && (
        <>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="
                flex
                h-12
                flex-1
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-sky-500
                to-violet-600
                font-semibold
                text-white
                shadow-[0_0_25px_rgba(56,189,248,0.22)]
                transition-all
                duration-300
                hover:opacity-90
              "
            >
              {copied ? (
                <>
                  <CheckCircle2
                    size={16}
                  />
                  Link Copied
                </>
              ) : (
                <>
                  <Link2 size={16} />
                  Copy Payment Link
                </>
              )}
            </button>

            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Preview payment page"
              title="Preview payment page"
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-zinc-400
                transition
                hover:border-sky-500/30
                hover:text-sky-300
              "
            >
              <ExternalLink
                size={16}
              />
            </a>

            <button
              type="button"
              onClick={() =>
                onRemove(bill.id)
              }
              aria-label="Delete bill"
              title="Delete bill"
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-zinc-400
                transition
                hover:border-red-500/30
                hover:text-red-400
              "
            >
              <Trash2 size={16} />
            </button>
          </div>

          {!confirming ? (
            <button
              type="button"
              onClick={() =>
                setConfirming(true)
              }
              className="mt-3 text-xs font-medium text-zinc-500 underline-offset-4 transition hover:text-zinc-300 hover:underline"
            >
              Already paid outside the
              app? Mark as paid
            </button>
          ) : (
            <div
              className="
                mt-3
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-3
              "
            >
              <p className="text-xs text-zinc-400">
                Optional: paste the
                transaction hash the
                payer shared with you.
              </p>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={txHashInput}
                  onChange={(e) =>
                    setTxHashInput(
                      e.target.value,
                    )
                  }
                  placeholder="0x... (optional)"
                  className="
                    h-10
                    flex-1
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-3
                    font-mono
                    text-xs
                    text-white
                    outline-none
                    placeholder:text-slate-600
                    focus:border-sky-400/50
                  "
                />

                <button
                  type="button"
                  onClick={
                    handleConfirmPaid
                  }
                  className="h-10 shrink-0 rounded-xl bg-emerald-500 px-3 text-xs font-semibold text-white transition hover:opacity-90"
                >
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setConfirming(
                      false,
                    )
                  }
                  className="h-10 shrink-0 rounded-xl border border-white/10 px-3 text-xs font-semibold text-zinc-400 transition hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {isPaid && (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-2 text-xs text-zinc-500 transition hover:text-zinc-300"
          >
            <Copy size={13} />
            Copy link
          </button>

          {bill.txHash &&
            bill.txHash !==
              "manual-confirmation" && (
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://testnet.arcscan.app/tx/${bill.txHash}`,
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
    </div>
  );
}
