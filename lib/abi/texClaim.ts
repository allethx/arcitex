export const texClaimAbi = [
  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  {
    type: "function",
    name: "claimed",
    stateMutability: "view",
    inputs: [
      {
        name: "",
        type: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
      },
    ],
  },

  {
    type: "function",
    name: "canClaim",
    stateMutability: "view",
    inputs: [
      {
        name: "user",
        type: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
      },
    ],
  },
] as const;