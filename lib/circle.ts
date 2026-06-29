import { AppKit } from "@circle-fin/app-kit";

export const circle = new AppKit();

export const CIRCLE = {
  environment:
    process.env.NEXT_PUBLIC_CIRCLE_ENVIRONMENT ??
    "sandbox",

  kitKey:
    process.env.NEXT_PUBLIC_CIRCLE_KIT_KEY ?? "",
} as const;

export function ensureCircleConfig() {
  if (!CIRCLE.kitKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_CIRCLE_KIT_KEY"
    );
  }

  return CIRCLE;
}