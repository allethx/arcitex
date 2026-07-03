import { Chain } from "wagmi/chains";
import { SupportedChain } from "./tokens";

export function getCurrentChain(
  chainId?: number,
): SupportedChain {
  switch (chainId) {
    case 11155111:
      return "Ethereum_Sepolia";

    case 84532:
      return "Base_Sepolia";

    case 5042002:
      return "Arc_Testnet";

    default:
      return "Arc_Testnet";
  }
}