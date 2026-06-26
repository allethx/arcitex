export type SwapRequest = {
  sellToken: string;
  buyToken: string;
  amount: string;
};

export async function executeSwap(data: SwapRequest) {
  const response = await fetch("/api/swap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Swap failed");
  }

  return response.json();
}