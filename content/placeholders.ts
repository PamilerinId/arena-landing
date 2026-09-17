/**
 * Founder policy numbers. Set either back to null and it renders as "[X]"
 * on the page. Never invent a value here.
 */
export const CANCELLATION_HOURS: number | null = 24;
export const TAKE_RATE_PCT: number | null = 10;

/** Renders a placeholder token when the decision is still open. */
export function ph(value: number | null): string {
  return value === null ? "[X]" : String(value);
}

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348000000000";

export const SOCIAL = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://tiktok.com",
  x: process.env.NEXT_PUBLIC_X_URL ?? "https://x.com",
} as const;
