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
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
