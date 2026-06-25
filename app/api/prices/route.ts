import { NextResponse } from "next/server";

const TOKEN_IDS: Record<string, string> = {
  ETH: "ethereum",
  BTC: "bitcoin",
  WBTC: "wrapped-bitcoin",
  USDC: "usd-coin",
  USDT: "tether",
  DAI: "dai",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const from = searchParams.get("from") ?? "ETH";
    const to = searchParams.get("to") ?? "USDC";

    const fromId = TOKEN_IDS[from];
    const toId = TOKEN_IDS[to];

    if (!fromId || !toId) {
      return NextResponse.json(
        {
          error: "Unsupported token",
        },
        {
          status: 400,
        }
      );
    }

    const ids = `${fromId},${toId}`;

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      {
        next: {
          revalidate: 30,
        },
      }
    );

    if (!response.ok) {
      throw new Error("CoinGecko request failed");
    }

    const prices = await response.json();

    const fromPrice = prices[fromId]?.usd;
    const toPrice = prices[toId]?.usd;

    if (!fromPrice || !toPrice) {
      throw new Error("Price not found");
    }

    const rate = fromPrice / toPrice;

    return NextResponse.json({
      from,
      to,
      fromPrice,
      toPrice,
      rate,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch prices",
      },
      {
        status: 500,
      }
    );
  }
}