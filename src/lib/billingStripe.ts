import type { SupabaseClient } from '@supabase/supabase-js'

export type StripeCheckoutStartResult =
  | { ok: true; url: string }
  | { ok: false; message: string }

/** SessionStorage key used by Playwright to simulate invoke failures (see `isBillingClientTestMockEnabled`). */
export const E2E_BILLING_INVOKE_STORAGE_KEY = 'jifunze:e2e:billing-invoke'

/**
 * Starts Stripe Checkout for an internal SKU key (see `pricingSkuRegistry.ts`).
 * Edge Function accepts `{ skuKey }` (legacy `{ planKey }` alias for creator/team).
 */
export async function startStripeCheckout(
  supabase: SupabaseClient | null,
  skuKey: string,
): Promise<StripeCheckoutStartResult> {
  if (import.meta.env.VITE_E2E_BILLING_INVOKE_MOCK === 'true') {
    const mode =
      typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(E2E_BILLING_INVOKE_STORAGE_KEY) : null
    if (mode === 'missing_url') {
      return {
        ok: false,
        message: 'Checkout URL missing — verify Edge Functions deployment and Stripe secrets.',
      }
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return { ok: true, url: `${origin}/settings/subscription?checkout=success` }
  }

  if (!supabase) {
    return { ok: false, message: 'Billing checkout requires an authenticated workspace with Supabase configured.' }
  }

  const { data, error } = await supabase.functions.invoke<{ url?: string }>('stripe-checkout', {
    body: { skuKey },
  })

  if (error) {
    return { ok: false, message: error.message ?? 'Checkout failed to start.' }
  }
  const url = data?.url
  if (!url) {
    return { ok: false, message: 'Checkout URL missing — verify Edge Functions deployment and Stripe secrets.' }
  }
  return { ok: true, url }
}

export type StripePortalResult =
  | { ok: true; url: string }
  | { ok: false; message: string }

export async function openStripeBillingPortal(supabase: SupabaseClient): Promise<StripePortalResult> {
  const { data, error } = await supabase.functions.invoke<{ url?: string }>('stripe-portal', {
    body: {},
  })

  if (error) {
    return { ok: false, message: error.message ?? 'Billing portal failed to open.' }
  }
  const url = data?.url
  if (!url) {
    return { ok: false, message: 'Portal URL missing — complete checkout once or verify billing setup.' }
  }
  return { ok: true, url }
}
