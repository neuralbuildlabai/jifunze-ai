import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseBrowserEnv } from '../config/supabaseEnv'

let client: SupabaseClient | undefined
let didLogSupabaseDebug = false

/**
 * Browser Supabase client (anon key only). RLS enforces tenant boundaries.
 * Never embed service role keys in the client bundle.
 *
 * Reads credentials via {@link getSupabaseBrowserEnv} in `config/supabaseEnv` (same trim rules as
 * {@link isSupabaseConfigured}). This is the **sole** `createClient` entry point for the app.
 *
 * There is **no** placeholder/demo client: use `isSupabaseConfigured()` from `config/supabaseEnv`
 * before calling this, or expect a thrown error when vars are absent.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  const env = getSupabaseBrowserEnv()
  if (!env) {
    console.error(
      '[JifunzeAI Supabase] Cannot initialize client: missing or empty environment variables.',
    )
    console.error(
      'Add both to `.env` at the project root, then restart `npm run dev` (Vite only exposes `VITE_*` vars).',
    )
    console.error('[JifunzeAI Supabase]', {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL?.trim() ? '(set)' : 'MISSING_OR_EMPTY',
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
        ? '(set)'
        : 'MISSING_OR_EMPTY',
    })
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env',
    )
  }

  if (!client) {
    if (!didLogSupabaseDebug) {
      didLogSupabaseDebug = true
      console.log('SUPABASE URL:', import.meta.env.VITE_SUPABASE_URL)
      console.log('SUPABASE ANON KEY PRESENT:', Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY))
    }
    client = createClient(env.url, env.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }
  return client
}
