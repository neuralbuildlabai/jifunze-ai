/**
 * Public-facing subscription story (USD) — illustrative until Stripe promo phases are wired end-to-end.
 * Standard monthly matches the canonical all-access SKU list price; launch month pricing is communicated claim-safely as time-limited.
 */

export const PUBLIC_STANDARD_MONTHLY_USD = 49
export const PUBLIC_LAUNCH_MONTHLY_USD = 29
/** Public pricing page displays this as the monthly offer (flexible access). */
export const PUBLIC_MONTHLY_DISPLAY_USD = PUBLIC_LAUNCH_MONTHLY_USD
/** Launch promotion applies only to the first two paid monthly invoice periods (product framing). */
export const PUBLIC_LAUNCH_MONTH_COUNT = 2
/** Single standalone course — public anchor price (USD one-time). */
export const PUBLIC_SINGLE_COURSE_USD = 59
/**
 * Current public annual anchor (reset for buyer clarity). Compare against 12× standard monthly list for context.
 * $49 × 12 = $588 list-stake reference; $199/yr is the current annual offer.
 */
export const PUBLIC_ANNUAL_USD = 199

export function formatUsdWhole(amount: number): string {
  return `$${amount}`
}

/** Effective monthly when paying annual lump sum — rounded for readability (not a separate SKU). */
export function annualEffectiveMonthlyUsd(annualUsd: number): number {
  return Math.round((annualUsd / 12) * 100) / 100
}
