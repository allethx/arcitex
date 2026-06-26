export type QuoteParams = {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  taker: string;
};

export type QuoteResult = {
  buyAmount: string;
  price: string;
  estimatedGas: string;
};

const BASE_URL = "/api/quote";

export async function getQuote({
  sellToken,
  buyToken,
  sellAmount,
  taker,
}: QuoteParams): Promise<QuoteResult> {
  const params = new URLSearchParams({
    sellToken,
    buyToken,
    sellAmount,
    taker,
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      error || "Failed to fetch quote"
    );
  }

  return response.json();
}