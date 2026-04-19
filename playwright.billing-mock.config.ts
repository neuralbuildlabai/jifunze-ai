import { defineConfig, devices } from '@playwright/test'

/**
 * Billing wiring E2E with **mocked** Supabase Edge Function responses (no live Stripe charges).
 * Uses a dedicated dev-server port so `reuseExistingServer` does not accidentally attach to the default guest suite (5173).
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: /billing-checkout-mocked\.spec\.ts$/,
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5174',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5174 --strictPort',
    url: 'http://127.0.0.1:5174',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      /** Same guest/demo posture as default `playwright.config.ts` — no live Supabase session in CI. */
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_ANON_KEY: '',
      VITE_BILLING_CHECKOUT_ENABLED: 'true',
      /** Synthetic checkout responses in `billingStripe.ts` — never ship `true` to production. */
      VITE_E2E_BILLING_INVOKE_MOCK: 'true',
      VITE_ACCESS_TIER_EMAIL_FALLBACK: 'false',
    },
  },
})
