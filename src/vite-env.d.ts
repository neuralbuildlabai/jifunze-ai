/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  /** `false` disables localStorage-backed demo persistence (in-memory only). */
  readonly VITE_BROWSER_PERSISTENCE?: string
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
   * When `true` with no Supabase URL, unlocks `/admin/*` for Playwright `test:e2e:access-forced` only.
   * Must stay unset in production — never combine with live Supabase keys.
   */
  readonly VITE_PLAYWRIGHT_BUILD?: string
  readonly VITE_FORCE_PLATFORM_TOOLS?: string
  readonly VITE_FORCE_PRO_TOOLS?: string
  readonly VITE_BUILD_SHA?: string
  /**
   * `true` | `false` only (other values ignored → dev default off, prod default on).
   * Dev: omit/`false` = full public app; `true` = test maintenance locally.
   * Prod build: omit/`true` = gated; `false` = explicit public-open bundle.
   */
  readonly VITE_MAINTENANCE_MODE?: string
  /**
   * Dev/bootstrap tier allowlists (comma/space separated emails). Read statically in
   * `src/access/appAccess.ts`. Not an authorization boundary — the server RPC
   * `my_effective_access_tier` and RLS are.
   */
  readonly VITE_SUPER_ADMIN_EMAILS?: string
  readonly VITE_PLATFORM_ADMIN_EMAILS?: string
  readonly VITE_WORKSPACE_ADMIN_EMAILS?: string
  readonly VITE_PRO_USER_EMAILS?: string
  /** Injected on Vercel builds. */
  readonly VERCEL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
