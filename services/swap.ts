import { getUsdPrice } from "./prices";

export async function getSwapRate(
  from: string,
  to: string
) {
  const fromPrice = await getUsdPrice(from);

  const toPrice = await getUsdPrice(to);

  return fromPrice / toPrice;
}

export async function calculateSwap(
  amount: number,
  from: string,
  to: string
) {
  const rate = await getSwapRate(from, to);

  return {
    rate,
    output: amount * rate,
  };
}