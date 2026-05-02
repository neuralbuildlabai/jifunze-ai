/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_LOCAL_DEV_TENANT_ID?: string
  /** When `true`, synthetic learning rows may seed UUID workspaces (default off for real tenants). */
  readonly VITE_SEED_DEMO_LEARNING_IN_WORKSPACE?: string
  /** `false` disables localStorage-backed demo persistence (in-memory only). */
  readonly VITE_BROWSER_PERSISTENCE?: string
  readonly VITE_CONTENT_API_URL?: string
  /** Preferred: `mock` | `http` (falls back to legacy URL / VITE_CONTENT_GENERATION_MODE). */
  readonly VITE_CONTENT_MODE?: string
  readonly VITE_CONTENT_GENERATION_MODE?: string
  /** Preferred: `mock` | `remote` (falls back to VITE_SIGNAL_PROVIDER_MODE). */
  readonly VITE_SIGNAL_MODE?: string
  readonly VITE_SIGNAL_PROVIDER_MODE?: string
  readonly VITE_SIGNAL_INGESTION_URL?: string
  readonly VITE_ENABLE_TREND_OPPORTUNITIES?: string
  /** When `true`, shows DB health RPC warnings in the shell (INTERNAL UAT / debug). */
  readonly VITE_INTERNAL_UAT_DIAGNOSTICS?: string
  /**
   * When `true`, or in dev unless `false`: use email allowlists for tier if `my_effective_access_tier` fails.
   */
  readonly VITE_ACCESS_TIER_EMAIL_FALLBACK?: string
  /**
   * When `true`, client shows live Checkout / Customer Portal actions (Edge Functions must be deployed with secrets).
   */
  readonly VITE_BILLING_CHECKOUT_ENABLED?: string
  /** Comma-separated domain suffixes for student-discount eligibility (e.g. ".edu,.ac.uk,.ac.ke"). */
  readonly VITE_BILLING_STUDENT_DOMAIN_SUFFIXES?: string
  /** Comma-separated domain suffixes for team/org discount eligibility. */
  readonly VITE_BILLING_TEAM_ORG_DOMAIN_SUFFIXES?: string
  /**
   * When `true`, `startStripeCheckout` returns synthetic URLs for Playwright (no Edge Function / Stripe network).
   * Must remain `false`/unset in production builds.
   */
  readonly VITE_E2E_BILLING_INVOKE_MOCK?: string
  /**
   * `true` | `false` only (other values ignored → dev default off, prod default on).
   * Dev: omit/`false` = full public app; `true` = test maintenance locally.
   * Prod build: omit/`true` = gated; `false` = explicit public-open bundle.
   */
  readonly VITE_MAINTENANCE_MODE?: string
  /**
   * Optional secret for internal preview: append `?jf_maintenance_bypass=<token>` once per tab.
   * Leave unset in production public builds so the bypass cannot be activated.
   */
  readonly VITE_MAINTENANCE_BYPASS_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
