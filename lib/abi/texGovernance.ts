export const texGovernanceAbi = [
  // ==========================================
  // Proposal Count
  // ==========================================

  {
    type: "function",
    name: "proposalCount",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256",
      },
    ],
  },

  // ==========================================
  // Get Proposal
  // ==========================================

  {
    type: "function",
    name: "getProposal",
    stateMutability: "view",
    inputs: [
      {
        name: "proposalId",
        type: "uint256",
      },
    ],
    outputs: [
      {
        type: "tuple",
        components: [
          {
            name: "id",
            type: "uint256",
          },
          {
            name: "title",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "deadline",
            type: "uint256",
          },
          {
            name: "yesVotes",
            type: "uint256",
          },
          {
            name: "noVotes",
            type: "uint256",
          },
          {
            name: "executed",
            type: "bool",
          },
        ],
      },
    ],
  },

  // ==========================================
  // Check if user already voted
  // ==========================================

  {
    type: "function",
    name: "voted",
    stateMutability: "view",
    inputs: [
      {
        name: "proposalId",
        type: "uint256",
      },
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

  // ==========================================
  // Vote
  // ==========================================

  {
    type: "function",
    name: "vote",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "proposalId",
        type: "uint256",
      },
      {
        name: "support",
        type: "bool",
      },
    ],
    outputs: [],
  },

  // ==========================================
  // Create Proposal
  // ==========================================

  {
    type: "function",
    name: "createProposal",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "description",
        type: "string",
      },
      {
        name: "duration",
        type: "uint256",
      },
    ],
    outputs: [],
  },
] as const;