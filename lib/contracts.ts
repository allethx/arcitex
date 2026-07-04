import { getAddress } from "viem";

export const CONTRACTS = {
  USDC: getAddress(
    "0x3600000000000000000000000000000000000000"
  ),

  EURC: getAddress(
    "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a"
  ),

  TEX: getAddress(
    "0x7d64f1f63867fba73f66844321bbb85e792901e4"
  ),

  NFT: getAddress(
"0x71767c20316c71aea96468eb5e1750a419c9f207"
),
  CLAIM: getAddress(
    "0x95e746c28973012a0021b97dce7a39ab359363a9"
  ),

 GOVERNANCE: getAddress(
  "0x9932b6fae27598123bed886ff9af933673b5b190"
),

  ROUTER: getAddress(
    "0x710bC86046828fE73E0cbf45b7f02cdEa793FB3E"
  ),
} as const;