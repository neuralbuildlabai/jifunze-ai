/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENT_GENERATION_MODE?: string
  readonly VITE_CONTENT_API_URL?: string
  /** `mock` (default): in-browser demo providers. `remote`: aggregated signals from `VITE_SIGNAL_INGESTION_URL`. */
  readonly VITE_SIGNAL_PROVIDER_MODE?: string
  /** When false, the UI skips loading trend opportunities (manual topic flow still works). */
  readonly VITE_ENABLE_TREND_OPPORTUNITIES?: string
  /** Future: Supabase Edge (or other) URL that returns normalized `ExternalSignal[]` JSON. */
  readonly VITE_SIGNAL_INGESTION_URL?: string
}
