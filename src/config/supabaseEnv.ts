/**
 * Supabase browser configuration from Vite env.
 *
 * Evaluated **once at module load** (build-time `import.meta.env`); the result does not change
 * during a session. Use `isSupabaseConfigured()` / `getSupabaseBrowserEnv()` everywhere instead of
 * re-reading `import.meta.env` with ad-hoc trimming.
 */
function trimEnv(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value.trim()
  return String(value).trim()
}

const url = trimEnv(import.meta.env.VITE_SUPABASE_URL)
const anonKey = trimEnv(import.meta.env.VITE_SUPABASE_ANON_KEY)

/** True iff both URL and anon key are non-empty after trim. */
export const SUPABASE_CONFIGURED = Boolean(url && anonKey)

const result = SUPABASE_CONFIGURED
console.log('Supabase config check:', {
  url,
  anonKeyPresent: Boolean(anonKey),
  result,
})

export function isSupabaseConfigured(): boolean {
  return SUPABASE_CONFIGURED
}

/** Non-null only when {@link isSupabaseConfigured} is true; same trimmed strings as the check. */
export function getSupabaseBrowserEnv(): { url: string; anonKey: string } | null {
  if (!SUPABASE_CONFIGURED) return null
  return { url, anonKey }
}
