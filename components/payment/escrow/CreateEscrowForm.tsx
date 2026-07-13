"use client";

import { useState } from "react";

import { ShieldPlus, X } from "lucide-react";

import type { EscrowAgreement } from "@/types/escrow";

type Props = {
  defaultDepositor?: string;
  onCreate: (agreement: EscrowAgreement) => void;
  onClose: () => void;
};

export default function CreateEscrowForm({
  defaultDepositor = "",
  onCreate,
  onClose,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [criteria, setCriteria] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [depositor, setDepositor] =
    useState(defaultDepositor);

  const [beneficiary, setBeneficiary] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  const canSubmit =
    title.trim().length > 0 &&
    criteria.trim().length > 0 &&
    depositor.trim().length > 0 &&
    beneficiary.trim().length > 0 &&
    Number(amount) > 0;

  function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    onCreate({
      id: crypto.randomUUID(),

      title: title.trim(),

      criteria: criteria.trim(),

      description:
        description.trim() ||
        undefined,

      depositor: depositor.trim(),

      beneficiary: beneficiary.trim(),

      amount,

      token: "USDC",

      deadline: deadline || undefined,

      status: "Created",

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
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          New Escrow Agreement
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
            Agreement Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="e.g. Landing Page Redesign"
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
              focus:border-emerald-400/50
              focus:bg-white/[0.05]
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Acceptance Criteria
          </label>

          <textarea
            value={criteria}
            onChange={(e) =>
              setCriteria(
                e.target.value,
              )
            }
            rows={2}
            placeholder="What has to be true for the deliverable to be accepted?"
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
              focus:border-emerald-400/50
              focus:bg-white/[0.05]
            "
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
              Depositor (Client) Wallet
            </label>

            <input
              type="text"
              value={depositor}
              onChange={(e) =>
                setDepositor(
                  e.target.value,
                )
              }
              placeholder="0x... (pays into escrow)"
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
                focus:border-emerald-400/50
                focus:bg-white/[0.05]
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
              Beneficiary (Freelancer) Wallet
            </label>

            <input
              type="text"
              value={beneficiary}
              onChange={(e) =>
                setBeneficiary(
                  e.target.value,
                )
              }
              placeholder="0x... (receives on release)"
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
                focus:border-emerald-400/50
                focus:bg-white/[0.05]
              "
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
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
                focus:border-emerald-400/50
                focus:bg-white/[0.05]
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
              Deadline
            </label>

            <input
              type="date"
              value={deadline}
              onChange={(e) =>
                setDeadline(
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
                focus:border-emerald-400/50
                focus:bg-white/[0.05]
              "
            />
          </div>
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
            placeholder="Any extra context for this agreement"
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
              focus:border-emerald-400/50
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
            from-emerald-500
            to-teal-600
            py-4
            font-semibold
            text-white
            shadow-[0_0_30px_rgba(16,185,129,0.25)]
            transition-all
            duration-300
            hover:opacity-90
            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:shadow-none
          "
        >
          <ShieldPlus size={18} />
          Create Agreement
        </button>
      </div>
    </div>
  );
}
