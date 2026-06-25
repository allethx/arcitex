export type QuoteParams = {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
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
}: QuoteParams): Promise<QuoteResult> {
  const params = new URLSearchParams({
    sellToken,
    buyToken,
    sellAmount,
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  return response.json();
}