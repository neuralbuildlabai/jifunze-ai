import { isSupabaseConfigured } from '../config/supabaseEnv'

/**
 * Client-side billing feature flags — server Edge Functions independently validate Stripe secrets.
 */
export function isBillingCheckoutEnabled(): boolean {
  return import.meta.env.VITE_BILLING_CHECKOUT_ENABLED === 'true'
}

/** True when Checkout can call real Edge Functions (Supabase configured + billing flag). */
export function isBillingLiveConfigured(): boolean {
  return isBillingCheckoutEnabled() && isSupabaseConfigured()
}

/**
 * Playwright-only: synthetic checkout responses without network (never enable in production builds).
 * Paired with `VITE_E2E_BILLING_INVOKE_MOCK` in `billingStripe.ts`.
 */
export function isBillingClientTestMockEnabled(): boolean {
  return import.meta.env.VITE_E2E_BILLING_INVOKE_MOCK === 'true'
}

/** Enables checkout CTAs — live wiring or opt-in E2E mock (demo workspace without Supabase). */
export function isBillingCheckoutInteractive(): boolean {
  return isBillingLiveConfigured() || isBillingClientTestMockEnabled()
}
