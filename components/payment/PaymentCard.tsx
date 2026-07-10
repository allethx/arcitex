"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Plus,
  Receipt,
} from "lucide-react";

import CreateBillForm from "./CreateBillForm";
import BillItem from "./BillItem";

import { useBills } from "@/hooks/useBills";
import { useHistory } from "@/hooks/useHistory";

import { buildBillPaymentLink } from "@/lib/paymentLink";

import type { Bill } from "@/types/payment";

export default function PaymentCard() {
  const {
    bills,
    addBill,
    markPaid,
    removeBill,
  } = useBills();

  const { addHistory } =
    useHistory();

  const [showForm, setShowForm] =
    useState(false);

  const [justCreated, setJustCreated] =
    useState(false);

  const unpaid = bills.filter(
    (bill) => bill.status === "Unpaid",
  );

  const paid = bills.filter(
    (bill) => bill.status === "Paid",
  );

  const totalUnpaid = unpaid.reduce(
    (sum, bill) =>
      sum + Number(bill.amount || 0),
    0,
  );

  async function handleCreate(
    bill: Bill,
  ) {
    addBill(bill);

    const link =
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

    try {
      await navigator.clipboard.writeText(
        link,
      );
    } catch {
      // clipboard may be unavailable
      // (e.g. insecure context) — the
      // link is still shown per-bill
      // via the "Copy Payment Link"
      // button below.
    }

    setJustCreated(true);

    setTimeout(
      () => setJustCreated(false),
      4000,
    );
  }

  function handleMarkPaid(
    id: string,
    txHash: string,
  ) {
    markPaid(id, txHash);

    const bill = bills.find(
      (item) => item.id === id,
    );

    addHistory({
      id: crypto.randomUUID(),

      type: "payment",

      category: "bill",

      txHash:
        txHash === "manual-confirmation"
          ? ""
          : txHash,

      fromToken:
        bill?.token ?? "USDC",

      toToken: "Bill",

      fromAmount:
        bill?.amount ?? "0",

      toAmount:
        bill?.amount ?? "0",

      recipient: bill?.recipient,

      note: bill?.title,

      status: "Completed",

      timestamp: Date.now(),
    });
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
        hover:border-violet-400/30
        hover:shadow-[0_0_70px_rgba(168,85,247,0.14)]
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
          bg-sky-500/10
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
          bg-violet-600/12
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
              from-sky-500
              to-violet-600
              shadow-[0_0_30px_rgba(56,189,248,.30)]
            "
          >
            <Receipt className="h-7 w-7 text-white" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
              Arc Commerce
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bills
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
            from-sky-500
            to-violet-600
            px-4
            text-sm
            font-semibold
            text-white
            shadow-[0_0_25px_rgba(56,189,248,0.22)]
            transition-all
            duration-300
            hover:opacity-90
          "
        >
          <Plus size={16} />
          New Bill
        </button>
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-slate-400">
        Create a bill, then share its
        payment link with whoever owes
        it — they open it, connect
        their wallet, and pay you in
        USDC on Arc.
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
          Bill created — payment link
          copied to your clipboard.
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
            Outstanding
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {totalUnpaid.toLocaleString(
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
            Bills
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {unpaid.length}{" "}
            <span className="text-sm font-medium text-slate-400">
              unpaid
            </span>
          </p>
        </div>
      </div>

      {/* Create Form */}

      {showForm && (
        <div className="relative mt-6">
          <CreateBillForm
            onCreate={handleCreate}
            onClose={() =>
              setShowForm(false)
            }
          />
        </div>
      )}

      {/* Bill List */}

      <div className="relative mt-6 space-y-3">
        {bills.length === 0 ? (
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
              No bills yet. Create
              your first bill to get
              a shareable payment
              link.
            </p>
          </div>
        ) : (
          <>
            {[...unpaid]
              .sort(
                (a, b) =>
                  b.createdAt -
                  a.createdAt,
              )
              .map((bill) => (
                <BillItem
                  key={bill.id}
                  bill={bill}
                  onMarkPaid={
                    handleMarkPaid
                  }
                  onRemove={
                    removeBill
                  }
                />
              ))}

            {paid.length > 0 && (
              <>
                <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Paid
                </p>

                {[...paid]
                  .sort(
                    (a, b) =>
                      (b.paidAt ??
                        0) -
                      (a.paidAt ??
                        0),
                  )
                  .map((bill) => (
                    <BillItem
                      key={bill.id}
                      bill={bill}
                      onMarkPaid={
                        handleMarkPaid
                      }
                      onRemove={
                        removeBill
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
