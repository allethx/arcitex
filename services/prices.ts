const API = "https://api.coingecko.com/api/v3";

const ids: Record<string, string> = {
  ETH: "ethereum",
  BTC: "bitcoin",
  WBTC: "wrapped-bitcoin",
  USDC: "usd-coin",
  USDT: "tether",
  DAI: "dai",
};

export async function getUsdPrice(symbol: string) {
  const id = ids[symbol];

  if (!id) {
    throw new Error("Unsupported token");
  }

  const response = await fetch(
    `${API}/simple/price?ids=${id}&vs_currencies=usd`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Price request failed");
  }

  const json = await response.json();

  return json[id].usd;
}