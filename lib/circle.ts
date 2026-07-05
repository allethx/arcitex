import { AppKit } from "@circle-fin/app-kit";

export const circle = new AppKit();

export const CIRCLE = {
  environment:
    process.env.CIRCLE_ENVIRONMENT ??
    "sandbox",

  // NOTE: this is intentionally NOT the real kit key.
  //
  // The real kit key lives server-side only as `CIRCLE_KIT_KEY`
  // (no NEXT_PUBLIC_ prefix) and is injected by
  // `app/api/circle-proxy/[...path]/route.ts`, which overwrites
  // the Authorization header on every request to api.circle.com
  // regardless of what the browser sends.
  //
  // Client-side SDK calls (swap/send/bridge) still need to pass
  // *something* shaped like a kit key, so we hand them this
  // placeholder. It has no real permissions attached to it.
  kitKey: "KIT_KEY:proxied:proxied",
} as const;

export function ensureCircleConfig() {
  return CIRCLE;
}