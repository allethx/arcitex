import { NextRequest, NextResponse } from "next/server";

const PRICE_MAP: Record<string, number> = {
  ETH: 2500,
  BTC: 105000,
  USDC: 1,
  USDT: 1,
  DAI: 1,
};

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;

  const sellToken = search.get("sellToken") ?? "ETH";
  const buyToken = search.get("buyToken") ?? "USDC";
  const sellAmount = Number(search.get("sellAmount") ?? "0");

  const sellPrice = PRICE_MAP[sellToken];
  const buyPrice = PRICE_MAP[buyToken];

  if (!sellPrice || !buyPrice) {
    return NextResponse.json(
      {
        error: "Unsupported token",
      },
      {
        status: 400,
      }
    );
  }

  const usdValue = sellAmount * sellPrice;

  const buyAmount = usdValue / buyPrice;

  return NextResponse.json({
    buyAmount: buyAmount.toFixed(6),
    price: (sellPrice / buyPrice).toFixed(6),
    estimatedGas: "0.002",
  });
}