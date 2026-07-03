import { BRIDGE_TOKENS } from "./bridgeTokens";
import { SWAP_TOKENS } from "./swapTokens";
import { GOVERNANCE_TOKEN } from "./governanceToken";
import { SupportedChain } from "./types";

export function getBridgeToken(
  symbol: string,
  chain: SupportedChain,
) {
  return BRIDGE_TOKENS.find(
    (token) =>
      token.symbol === symbol &&
      token.chain === chain,
  );
}

export function getSwapToken(
  symbol: string,
) {
  return SWAP_TOKENS.find(
    (token) =>
      token.symbol === symbol,
  );
}

export function getGovernanceToken() {
  return GOVERNANCE_TOKEN;
}