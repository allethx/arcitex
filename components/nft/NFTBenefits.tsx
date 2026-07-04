"use client";

import {
  BadgeCheck,
  Gem,
  ShieldCheck,
  Sparkles,
  Gift,
  Crown,
} from "lucide-react";

const benefits = [
  {
    icon: Crown,
    title: "Genesis Member",
    description:
      "Become one of the first 500 Arcitex members.",
  },
  {
    icon: Sparkles,
    title: "Early Access",
    description:
      "Unlock new Arcitex products before public release.",
  },
  {
    icon: ShieldCheck,
    title: "Governance Rights",
    description:
      "Participate in community voting and protocol decisions.",
  },
  {
    icon: Gift,
    title: "Future Rewards",
    description:
      "Eligible for exclusive campaigns, rewards and airdrops.",
  },
  {
    icon: Gem,
    title: "Premium Badge",
    description:
      "Receive a permanent on-chain Early Access membership badge.",
  },
  {
    icon: BadgeCheck,
    title: "Official Membership",
    description:
      "Verified NFT membership issued by Arcitex.",
  },
];

export default function NFTBenefits() {
  return (
    <div className="space-y-3">

      <h3 className="text-lg font-semibold">
        Membership Benefits
      </h3>

      <div className="space-y-3">

        {benefits.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex
                items-start
                gap-4
                rounded-2xl
                border
                border-white/5
                bg-white/[0.03]
                p-4
                transition-all
                duration-300
                hover:border-sky-500/30
                hover:bg-sky-500/5
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-sky-500
                  to-violet-600
                  shadow-[0_0_20px_rgba(56,189,248,.25)]
                "
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <div>

                <h4 className="font-semibold text-white">
                  {item.title}
                </h4>

                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}