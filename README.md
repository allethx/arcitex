# Arcitex

**Trade Faster. Pay Smarter.**

Arcitex is a unified stablecoin commerce layer built natively for **Arc** and powered by **Circle's** stablecoin infrastructure. It brings every core DeFi action — swap, bridge, send, track, hold, and govern — into a single fast, secure, non-custodial interface.

🔗 **Live app:** [arcitex.vercel.app](https://arcitex.vercel.app/) — live on **Arc Testnet**

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Smart Contracts](#smart-contracts)
- [Network](#network)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Smart Contract Development](#smart-contract-development)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

Stablecoin commerce today is fragmented — users bounce between separate apps just to swap, bridge, or send a single dollar of value. **Arcitex** solves this by unifying the entire flow into one non-custodial interface, built from the ground up on **Arc** (an EVM-compatible L1 with sub-second finality and USDC-native gas) and Circle's stablecoin stack (USDC, EURC).

## Features

| Module | Description |
|---|---|
| 🔄 **Swap** | Fast token swaps with smart routing across the Arc ecosystem. |
| 🌉 **Bridge** | Secure cross-chain USDC transfers between Arc, Ethereum Sepolia, and Base Sepolia, backed by Circle's CCTP. |
| 📤 **Send** | Instant wallet-to-wallet stablecoin payments. |
| 📊 **Portfolio** | Real-time balances, positions, and full transaction history. |
| 🗳️ **Governance** | Vote on protocol proposals and claim TEX rewards, enforced entirely onchain. |
| 💎 **NFT Membership** | Arcitex Early Access NFT (Genesis Collection) — 500 supply, 55 USDC mint — unlocking governance weight, a premium badge, and gated ecosystem rewards. |

## Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [wagmi](https://wagmi.sh/) + [viem](https://viem.sh/) for wallet/contract interaction
- [Reown AppKit](https://reown.com/appkit) for wallet connection
- [Circle App Kit](https://developers.circle.com/) for Circle-native flows
- Tailwind CSS, Radix UI, shadcn/ui, Framer Motion, Recharts

**Smart Contracts**
- Solidity (`^0.8.24` / `^0.8.28`)
- [Hardhat](https://hardhat.org/) + Hardhat Ignition
- [OpenZeppelin Contracts](https://www.openzeppelin.com/contracts) (ERC20, ERC721, Ownable, ReentrancyGuard)

## Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm / bun
- A wallet (e.g. MetaMask) connected to Arc Testnet for using onchain features

### Installation

```bash
git clone https://github.com/allethx/arcitex.git
cd arcitex
npm install
```

### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the landing page by modifying `app/page.tsx`, or the in-app experience under `app/app/*`. Pages auto-update as you edit.

## Environment Variables

Create a `.env` file in the project root for contract deployment and Circle integration:

```bash
# Required for deploying/interacting with contracts via Hardhat
PRIVATE_KEY=your_deployer_wallet_private_key
ARC_RPC_URL=https://rpc.testnet.arc.network

# Circle App Kit (frontend)
CIRCLE_KIT_KEY=your_circle_app_kit_key
CIRCLE_ENVIRONMENT=sandbox
```


## Roadmap

| Phase | Module | Status |
|---|---|---|
| 01 | Swap | ✅ Completed |
| 02 | Bridge | ✅ Completed |
| 03 | Send | ✅ Completed |
| 04 | Portfolio | ✅ Completed |
| 05 | NFT Membership | 🟢 Live |
| 06 | Governance | 🟢 Live |
| 07 | Liquidity Pools | 🔜 Coming Soon |
| 08 | Arcitex Pay | 🔜 Coming Soon |

## License

This project is built by allathif https://x.com/muflihabdull  