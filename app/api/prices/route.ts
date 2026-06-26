import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;

  const sellToken = search.get("sellToken");
  const buyToken = search.get("buyToken");
  const sellAmount = search.get("sellAmount");

  if (!sellToken || !buyToken || !sellAmount) {
    return NextResponse.json(
      {
        error: "Missing parameters",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    message: "Price endpoint ready",
    sellToken,
    buyToken,
    sellAmount,
  });
}