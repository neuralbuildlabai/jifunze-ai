import { defineConfig, devices } from '@playwright/test'

/** Default E2E: deterministic UI (no Supabase in webServer env) + Vite dev server. */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5173',
    url: 'http://127.0.0.1:5173',
    /** Avoid attaching to a random local `npm run dev` unless `PLAYWRIGHT_REUSE_DEV_SERVER=1`. */
    reuseExistingServer: process.env.CI ? false : process.env.PLAYWRIGHT_REUSE_DEV_SERVER === '1',
    timeout: 120_000,
    env: {
      ...process.env,
      // Deterministic guest/demo behavior (no real Supabase session in CI/local E2E).
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_ANON_KEY: '',
      VITE_ACCESS_TIER_EMAIL_FALLBACK: 'false',
      VITE_LEARNER_MONETIZATION_UI_DISABLED:
        process.env.VITE_LEARNER_MONETIZATION_UI_DISABLED === 'false' ? 'false' : 'true',
    },
  },
})
