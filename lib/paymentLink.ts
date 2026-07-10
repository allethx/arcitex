export type BillLinkPayload = {
  id: string;

  title: string;

  description?: string;

  category: string;

  recipient: string;

  amount: string;

  token: string;

  dueDate?: string;

  createdAt: number;
};

// ==========================================
// Encode a bill into a URL-safe, self
// contained payload. Since this project has
// no backend/database, the bill data travels
// inside the link itself — whoever opens it
// can read and pay it, without needing
// access to the creator's local storage.
// ==========================================

export function encodeBillPayload(
  bill: BillLinkPayload,
): string {
  const json = JSON.stringify(bill);

  const base64 =
    typeof window !== "undefined"
      ? btoa(
          unescape(
            encodeURIComponent(json),
          ),
        )
      : Buffer.from(
          json,
          "utf-8",
        ).toString("base64");

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeBillPayload(
  payload: string,
): BillLinkPayload | null {
  try {
    let base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    while (base64.length % 4 !== 0) {
      base64 += "=";
    }

    const json =
      typeof window !== "undefined"
        ? decodeURIComponent(
            escape(atob(base64)),
          )
        : Buffer.from(
            base64,
            "base64",
          ).toString("utf-8");

    const data = JSON.parse(json);

    if (
      !data?.id ||
      !data?.recipient ||
      !data?.amount ||
      !data?.token
    ) {
      return null;
    }

    return data as BillLinkPayload;
  } catch {
    return null;
  }
}

export function buildBillPaymentLink(
  bill: BillLinkPayload,
): string {
  const encoded =
    encodeBillPayload(bill);

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "";

  return `${origin}/pay/${encoded}`;
}
