import "dotenv/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { defineConfig } from "hardhat/config";

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],

  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    arcTestnet: {
      type: "http",
      chainType: "l1",

      url: process.env.ARC_RPC_URL!,

      accounts: [
        process.env.PRIVATE_KEY!,
      ],
    },
  },
});