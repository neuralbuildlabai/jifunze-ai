import { defineConfig, devices } from '@playwright/test'

/**
 * Requires a **production build** with `VITE_FORCE_PRO_TOOLS` / `VITE_FORCE_PLATFORM_TOOLS`
 * (see `npm run test:e2e:access-forced`). Serves `dist/` via `vite preview`.
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: /access-forced-positive\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_ANON_KEY: '',
    },
  },
})
