
import { getTokenBySymbol } from "@/lib/tokens";
interface EstimateParams {
  from: {
    address: string;
    chain: string;
  };

  tokenIn: string;
  tokenOut: string;
  amountIn: string;
}

export async function estimateCircleSwap({
  from,
  tokenIn,
  tokenOut,
  amountIn,
}: EstimateParams) {

  console.log("========== ESTIMATE CALLED ==========");
console.log({
  from,
  tokenIn,
  tokenOut,
  amountIn,
});

  const fromToken = getTokenBySymbol(tokenIn);
const toToken = getTokenBySymbol(tokenOut);

  if (!fromToken || !toToken) {
    throw new Error("Unsupported token");
  }

  const body = {
    tokenInChain: fromToken.chain,
    tokenInAddress: fromToken.address,

    tokenOutChain: toToken.chain,
    tokenOutAddress: toToken.address,

    fromAddress: from.address,
    toAddress: from.address,

    amount: String(
      Math.floor(Number(amountIn) * 10 ** fromToken.decimals)
    ),
  };

  console.log("Circle Estimate Request");
  console.log(body);

  const res = await fetch(
    "/api/circle-proxy/v1/stablecoinKits/swap",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("Estimate failed");
  }

  const json = await res.json();

  console.log("Circle Estimate Success");
  console.log(json);

  return json;
}