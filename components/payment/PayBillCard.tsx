"use client";

import { useEffect, useState } from "react";

import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Receipt,
} from "lucide-react";

import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

import { usePay } from "@/hooks/usePay";
import { useMounted } from "@/hooks/useMounted";
import { useWallet } from "@/hooks/useWallet";
import { useHistory } from "@/hooks/useHistory";
import { useTokenBalance } from "@/hooks/useTokenBalance";

import { getTokenBySymbol } from "@/lib/tokens";
import { BILL_CATEGORIES } from "@/lib/payment";
import { decodeBillPayload } from "@/lib/paymentLink";

type Props = {
  payload: string;
};

function paidKey(id: string) {
  return `arcitex-paid-link:${id}`;
}

export default function PayBillCard({
  payload,
}: Props) {
  const mounted = useMounted();
  const { connected } = useWallet();
  const { addHistory } = useHistory();

  const bill =
    decodeBillPayload(payload);

  const [paidTx, setPaidTx] =
    useState<string | null>(null);

  useEffect(() => {
    if (!bill) {
      return;
    }

    const existing =
      localStorage.getItem(
        paidKey(bill.id),
      );

    if (existing) {
      setPaidTx(existing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const token = bill
    ? getTokenBySymbol(bill.token)
    : undefined;

  const {
    balance,
    loading: balanceLoading,
  } = useTokenBalance({
    token: token?.address,
    decimals: token?.decimals,
    symbol: token?.symbol,
  });

  const {
    pay,
    loading,
    status,
    validation,
    error,
    result,
  } = usePay({
    recipient: bill?.recipient ?? "",
    token: bill?.token ?? "USDC",
    amount: bill?.amount ?? "0",
    balance,
    idleLabel: "Pay Bill",

    onSuccess: (paymentResult) => {
      if (!bill) {
        return;
      }

      const txHash =
        paymentResult?.txHash ?? "";

      localStorage.setItem(
        paidKey(bill.id),
        txHash,
      );

      setPaidTx(txHash);

      addHistory({
        id: crypto.randomUUID(),

        type: "payment",

        category: "bill",

        txHash,

        fromToken: bill.token,

        toToken: "Bill",

        fromAmount: bill.amount,

        toAmount: bill.amount,

        recipient: bill.recipient,

        note: bill.title,

        status: "Completed",

        timestamp: Date.now(),
      });
    },
  });

  // ==========================
  // Invalid / broken link
  // ==========================

  if (!bill) {
    return (
      <div
        className="
          w-full
          max-w-md
          rounded-[32px]
          border
          border-red-500/20
          bg-white/[0.03]
          p-8
          text-center
          backdrop-blur-2xl
        "
      >
        <div className="flex justify-center">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-red-500/10
            "
          >
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          Invalid Payment Link
        </h2>

        <p className="mt-3 text-sm text-zinc-400">
          This payment link looks
          broken or incomplete. Ask
          the sender for a new one.
        </p>
      </div>
    );
  }

  const categoryLabel =
    BILL_CATEGORIES.find(
      (item) =>
        item.id === bill.category,
    )?.label ?? "Other";

  const isPaid = Boolean(paidTx);

  return (
    <div
      className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        p-7
        backdrop-blur-2xl
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

      {isPaid ? (
        <div className="relative">
          <div className="flex justify-center">
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-sky-500
                to-violet-600
                shadow-[0_0_40px_rgba(56,189,248,.35)]
              "
            >
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-white">
            Bill Paid
          </h2>

          <p className="mx-auto mt-2 max-w-xs text-center text-sm text-zinc-400">
            {bill.title} has been
            settled successfully.
          </p>

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-sky-500/20
              bg-sky-500/5
              p-5
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                Amount Paid
              </span>

              <span className="font-semibold text-white">
                {bill.amount}{" "}
                {bill.token}
              </span>
            </div>

            {paidTx && (
              <>
                <div className="mt-4 h-px bg-white/5" />

                <span className="mt-4 block text-xs text-zinc-500">
                  Transaction Hash
                </span>

                <p className="mt-2 break-all font-mono text-xs font-semibold">
                  {paidTx}
                </p>
              </>
            )}
          </div>

          {paidTx &&
            paidTx !==
              "manual-confirmation" && (
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://testnet.arcscan.app/tx/${paidTx}`,
                    "_blank",
                  )
                }
                className="
                  mt-6
                  flex
                  h-13
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:border-sky-500
                  hover:bg-sky-500/10
                "
              >
                View on ArcScan
                <ExternalLink
                  size={16}
                />
              </button>
            )}
        </div>
      ) : (
        <div className="relative">
          {/* Header */}

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
                Payment Request
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                {bill.title}
              </h2>
            </div>
          </div>

          {bill.description && (
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {bill.description}
            </p>
          )}

          {/* Details */}

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Amount
              </span>

              <span className="text-2xl font-bold text-white">
                {bill.amount}{" "}
                <span className="text-sm font-medium text-slate-400">
                  {bill.token}
                </span>
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-sm text-slate-400">
                Category
              </span>

              <span className="text-sm font-medium text-white">
                {categoryLabel}
              </span>
            </div>

            {bill.dueDate && (
              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-slate-400">
                  <CalendarClock
                    size={14}
                  />
                  Due Date
                </span>

                <span className="text-sm font-medium text-white">
                  {new Date(
                    bill.dueDate,
                  ).toLocaleDateString("en-US")}
                </span>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Pay To
              </span>

              <span className="truncate pl-4 font-mono text-xs text-white">
                {bill.recipient}
              </span>
            </div>
          </div>

          {/* Action */}

          <div className="relative mt-6 space-y-3">
            {!mounted ? (
              <div className="h-14 w-full animate-pulse rounded-2xl bg-white/5" />
            ) : !connected ? (
              <ConnectWalletButton
                fullWidth
              />
            ) : (
              <>
                {error && (
                  <p className="text-sm text-red-400">
                    {error}
                  </p>
                )}

                {!validation.valid &&
                  !loading && (
                    <div
                      className="
                        rounded-2xl
                        border
                        border-red-500/30
                        bg-red-500/10
                        px-4
                        py-3
                        text-sm
                        text-red-300
                      "
                    >
                      {
                        validation.message
                      }
                    </div>
                  )}

                <button
                  type="button"
                  disabled={
                    !validation.valid ||
                    loading
                  }
                  onClick={pay}
                  className="
                    flex
                    h-14
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-sky-500
                    to-violet-600
                    font-semibold
                    text-white
                    shadow-[0_0_30px_rgba(56,189,248,0.25)]
                    transition-all
                    duration-300
                    hover:opacity-90
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    disabled:shadow-none
                  "
                >
                  {loading && (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  )}
                  {status}
                </button>

                <p className="text-center text-xs text-zinc-500">
                  {balanceLoading
                    ? "Checking your USDC balance..."
                    : `Balance: ${balance.toFixed(
                        2,
                      )} USDC on Arc Testnet`}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
