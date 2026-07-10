"use client";

import { useState } from "react";

import { Plus, X } from "lucide-react";

import { BILL_CATEGORIES, DEFAULT_BILLER_WALLET } from "@/lib/payment";

import type { Bill } from "@/types/payment";

type Props = {
  onCreate: (bill: Bill) => void;
  onClose: () => void;
};

export default function CreateBillForm({
  onCreate,
  onClose,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState(BILL_CATEGORIES[0].id);

  const [recipient, setRecipient] =
    useState(DEFAULT_BILLER_WALLET);

  const [amount, setAmount] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [description, setDescription] =
    useState("");

  const canSubmit =
    title.trim().length > 0 &&
    recipient.trim().length > 0 &&
    Number(amount) > 0;

  function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    onCreate({
      id: crypto.randomUUID(),

      title: title.trim(),

      description:
        description.trim() ||
        undefined,

      category,

      recipient: recipient.trim(),

      amount,

      token: "USDC",

      dueDate: dueDate || undefined,

      status: "Unpaid",

      createdAt: Date.now(),
    });

    onClose();
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-5
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
          New Bill
        </p>

        <button
          type="button"
          onClick={onClose}
          className="
            rounded-xl
            p-1.5
            text-zinc-400
            transition
            hover:bg-white/5
            hover:text-white
          "
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Bill Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="e.g. Design Retainer — July"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-3.5
              text-white
              outline-none
              transition
              placeholder:text-slate-600
              focus:border-sky-400/50
              focus:bg-white/[0.05]
            "
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value,
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-3.5
                text-white
                outline-none
                transition
                focus:border-sky-400/50
                focus:bg-white/[0.05]
              "
            >
              {BILL_CATEGORIES.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="bg-[#0B0F17]"
                  >
                    {item.label}
                  </option>
                ),
              )}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value,
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-3.5
                text-white
                outline-none
                transition
                focus:border-sky-400/50
                focus:bg-white/[0.05]
              "
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Biller Wallet (Recipient)
          </label>

          <input
            type="text"
            value={recipient}
            onChange={(e) =>
              setRecipient(
                e.target.value,
              )
            }
            placeholder="0x..."
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-3.5
              font-mono
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-slate-600
              focus:border-sky-400/50
              focus:bg-white/[0.05]
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Amount (USDC)
          </label>

          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value,
              )
            }
            placeholder="0.00"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-3.5
              text-xl
              font-semibold
              text-white
              outline-none
              transition
              placeholder:text-slate-600
              focus:border-sky-400/50
              focus:bg-white/[0.05]
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Notes (optional)
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value,
              )
            }
            rows={2}
            placeholder="What is this bill for?"
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-3.5
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-slate-600
              focus:border-sky-400/50
              focus:bg-white/[0.05]
            "
          />
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-sky-500
            to-violet-600
            py-4
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
          <Plus size={18} />
          Create Bill
        </button>
      </div>
    </div>
  );
}
