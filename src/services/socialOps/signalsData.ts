/**
 * Read-only loader for the admin Signals inbox.
 *
 * Runs with the browser ANON key under RLS. If the `ingested_signals` policies do not grant
 * the signed-in admin read access (or the table is empty because ingestion has never been
 * connected), the page shows that state honestly instead of inventing rows.
 */
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../../lib/supabaseClient'

export type SignalRow = {
  id: string
  provider_id: string | null
  source_label: string | null
  title: string
  summary: string | null
  url: string
  published_at: string | null
  topic_tags: string[] | null
}

export type SignalsInbox = {
  configured: boolean
  loadedAt: string
  signals: SignalRow[]
  error: string | null
}

const WINDOW_DAYS = 14

export async function loadSignalsInbox(): Promise<SignalsInbox> {
  const base: SignalsInbox = {
    configured: isSupabaseConfigured(),
    loadedAt: new Date().toISOString(),
    signals: [],
    error: null,
  }
  if (!base.configured) return base

  const db = getSupabaseBrowserClient()
  const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000).toISOString()
  const { data, error } = await db
    .from('ingested_signals')
    .select('id, provider_id, source_label, title, summary, url, published_at, topic_tags')
    .gte('published_at', since)
    .order('published_at', { ascending: false })
    .limit(200)

  if (error) {
    base.error = error.message
    return base
  }
  base.signals = (data ?? []) as SignalRow[]
  return base
}
