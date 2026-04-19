import { defineConfig, devices } from '@playwright/test'
import { mergeEnvFile } from './e2e/loadRepoEnv'
import { assertUatSupabaseTarget } from './scripts/guardUatSupabaseTarget.ts'

/**
 * Live UAT: real Vite env from `.env` + optional `.env.smoke.local` (SMOKE_EMAIL / SMOKE_PASSWORD).
 * Uses a separate dev port so it does not collide with demo E2E (5173).
 *
 * Loads real Supabase credentials — must match `JIFUNZE_UAT_SUPABASE_PROJECT_REF`
 * unless `JIFUNZE_ALLOW_UAT_NONMATCH=1` (see scripts/guardUatSupabaseTarget.ts).
 */
mergeEnvFile('.env', false)
mergeEnvFile('.env.smoke.local', true)
assertUatSupabaseTarget('playwright.live.config')

export default defineConfig({
  testDir: './e2e',
  testMatch: /live-uat\.spec\.ts/,
  timeout: 180_000,
  expect: { timeout: 45_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5174',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5174',
    url: 'http://127.0.0.1:5174',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { ...process.env },
  },
})
