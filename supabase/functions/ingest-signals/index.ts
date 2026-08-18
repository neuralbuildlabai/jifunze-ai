/**
 * Real signal ingestion worker.
 *
 * Replaces the in-browser mock providers with server-side fetching, so the
 * pipeline runs on a schedule instead of on page load. This is the single
 * change that makes autonomous operation possible.
 *
 * Invocation:
 *   POST /functions/v1/ingest-signals
 *   Header: x-ingest-secret: <INGEST_SECRET>
 *
 * `verify_jwt` is false (cron has no user JWT); the shared secret is the gate.
 * Set secrets: INGEST_SECRET (required), SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
 *
 * GET returns the most recent signals as an `ExternalSignal[]`, which is the
 * shape `VITE_SIGNAL_INGESTION_URL` expects — so the existing client works
 * unchanged with `VITE_SIGNAL_PROVIDER_MODE=remote`.
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { XMLParser } from 'npm:fast-xml-parser@4'

// --- tuning -----------------------------------------------------------------
const MAX_ITEMS_PER_FEED = 25
const FEED_TIMEOUT_MS = 12_000
const FAILURES_BEFORE_DISABLE = 5
const READ_LIMIT = 200
const USER_AGENT = 'JifunzeAI-SignalIngest/1.0 (+https://jifunze.ai)'

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-ingest-secret',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

type SignalSource = {
  id: string
  kind: string
  label: string
  feed_url: string
  topic_tags: string[]
  etag: string | null
  last_modified: string | null
  consecutive_failures: number
}

type NormalizedSignal = {
  provider_id: string
  kind: string
  source_label: string
  title: string
  summary: string
  url: string
  canonical_url: string
  published_at: string
  topic_tags: string[]
  raw: Record<string, unknown>
}

// --- helpers ----------------------------------------------------------------

/** Strip tracking params, fragments and trailing slashes so the same article
 *  arriving from two feeds dedupes to one row. */
function canonicalizeUrl(raw: string): string {
  try {
    const u = new URL(raw.trim())
    u.hash = ''
    u.hostname = u.hostname.toLowerCase().replace(/^www\./, '')
    u.protocol = 'https:'
    const drop: string[] = []
    u.searchParams.forEach((_v, k) => {
      const lk = k.toLowerCase()
      if (lk.startsWith('utm_') || ['fbclid', 'gclid', 'mc_cid', 'mc_eid', 'ref', 'source'].includes(lk)) drop.push(k)
    })
    drop.forEach((k) => u.searchParams.delete(k))
    let s = u.toString()
    if (s.endsWith('/') && u.pathname !== '/') s = s.slice(0, -1)
    return s
  } catch {
    return raw.trim()
  }
}

function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function toIso(value: unknown): string | null {
  if (!value) return null
  const d = new Date(String(value))
  if (Number.isNaN(d.getTime())) return null
  // Reject absurd future dates — some feeds emit broken timestamps.
  if (d.getTime() > Date.now() + 86_400_000) return null
  return d.toISOString()
}

function asArray<T>(v: T | T[] | undefined): T[] {
  if (v === undefined || v === null) return []
  return Array.isArray(v) ? v : [v]
}

/** Pull a usable link out of the many shapes RSS and Atom use. */
function extractLink(entry: Record<string, any>): string | null {
  const link = entry.link
  if (typeof link === 'string' && link.trim()) return link.trim()
  for (const l of asArray<any>(link)) {
    if (typeof l === 'string' && l.trim()) return l.trim()
    const href = l?.['@_href']
    const rel = l?.['@_rel']
    if (href && (!rel || rel === 'alternate')) return String(href).trim()
  }
  if (typeof entry.guid === 'string' && entry.guid.startsWith('http')) return entry.guid.trim()
  const guidText = entry.guid?.['#text']
  if (typeof guidText === 'string' && guidText.startsWith('http')) return guidText.trim()
  return null
}

function parseFeed(xml: string, source: SignalSource): NormalizedSignal[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    trimValues: true,
  })
  const doc = parser.parse(xml)
  const entries: Record<string, any>[] =
    asArray(doc?.rss?.channel?.item).length > 0
      ? asArray(doc.rss.channel.item)
      : asArray(doc?.feed?.entry).length > 0
        ? asArray(doc.feed.entry)
        : asArray(doc?.['rdf:RDF']?.item)

  const out: NormalizedSignal[] = []
  for (const entry of entries.slice(0, MAX_ITEMS_PER_FEED)) {
    const title = stripHtml(String(entry.title?.['#text'] ?? entry.title ?? '')).slice(0, 500)
    const url = extractLink(entry)
    if (!title || !url) continue

    const rawSummary =
      entry.description ?? entry.summary?.['#text'] ?? entry.summary ??
      entry['content:encoded'] ?? entry.content?.['#text'] ?? entry.content ?? ''
    const summary = stripHtml(String(rawSummary)).slice(0, 1200)

    const published =
      toIso(entry.pubDate) ?? toIso(entry.published) ??
      toIso(entry.updated) ?? toIso(entry['dc:date']) ?? new Date().toISOString()

    const categories = asArray<any>(entry.category)
      .map((c) => stripHtml(String(c?.['#text'] ?? c ?? '')).toLowerCase())
      .filter((c) => c && c.length < 40)
      .slice(0, 8)

    out.push({
      provider_id: source.id,
      kind: source.kind,
      source_label: source.label,
      title,
      summary,
      url,
      canonical_url: canonicalizeUrl(url),
      published_at: published,
      topic_tags: Array.from(new Set([...source.topic_tags, ...categories])),
      raw: { author: entry.author ?? entry['dc:creator'] ?? null, guid: entry.guid ?? null },
    })
  }
  return out
}

async function fetchFeed(source: SignalSource): Promise<{
  status: 'ok' | 'not_modified' | 'error'
  signals: NormalizedSignal[]
  etag?: string | null
  lastModified?: string | null
  detail?: string
}> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS)
  try {
    const headers: Record<string, string> = { 'User-Agent': USER_AGENT, Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8' }
    if (source.etag) headers['If-None-Match'] = source.etag
    if (source.last_modified) headers['If-Modified-Since'] = source.last_modified

    const res = await fetch(source.feed_url, { headers, signal: controller.signal, redirect: 'follow' })
    if (res.status === 304) return { status: 'not_modified', signals: [] }
    if (!res.ok) return { status: 'error', signals: [], detail: `http_${res.status}` }

    const xml = await res.text()
    if (!xml.trim()) return { status: 'error', signals: [], detail: 'empty_body' }

    const signals = parseFeed(xml, source)
    if (signals.length === 0) return { status: 'error', signals: [], detail: 'no_items_parsed' }

    return {
      status: 'ok',
      signals,
      etag: res.headers.get('etag'),
      lastModified: res.headers.get('last-modified'),
    }
  } catch (err) {
    const detail = err instanceof Error && err.name === 'AbortError' ? 'timeout' : 'fetch_failed'
    return { status: 'error', signals: [], detail }
  } finally {
    clearTimeout(timer)
  }
}

// --- handler ----------------------------------------------------------------

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) return json({ error: 'Server misconfigured' }, 500)

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

  // GET = read the latest signals in ExternalSignal shape (aggregate endpoint).
  if (req.method === 'GET') {
    const limit = Math.min(Number(new URL(req.url).searchParams.get('limit') ?? 60), READ_LIMIT)
    const { data, error } = await admin
      .from('ingested_signals')
      .select('id, provider_id, kind, source_label, title, summary, url, published_at, topic_tags')
      .order('published_at', { ascending: false })
      .limit(limit)
    if (error) return json({ error: 'Read failed' }, 500)
    return json(
      (data ?? []).map((r) => ({
        id: r.id,
        source: r.provider_id,
        source_label: r.source_label,
        title: r.title,
        summary: r.summary,
        url: r.url,
        published_at: r.published_at,
        topic_tags: r.topic_tags ?? [],
      })),
    )
  }

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const expected = Deno.env.get('INGEST_SECRET')
  if (!expected) return json({ error: 'Server misconfigured' }, 500)
  if (req.headers.get('x-ingest-secret') !== expected) return json({ error: 'Unauthorized' }, 401)

  const { data: sources, error: srcErr } = await admin
    .from('signal_sources')
    .select('id, kind, label, feed_url, topic_tags, etag, last_modified, consecutive_failures')
    .eq('enabled', true)
  if (srcErr) return json({ error: 'Could not load sources' }, 500)
  if (!sources?.length) return json({ ok: true, sources: 0, inserted: 0, results: [] })

  const results = await Promise.all(
    (sources as SignalSource[]).map(async (source) => {
      const outcome = await fetchFeed(source)
      const now = new Date().toISOString()

      if (outcome.status === 'error') {
        const failures = source.consecutive_failures + 1
        await admin.from('signal_sources').update({
          last_fetched_at: now,
          last_status: outcome.detail ?? 'error',
          consecutive_failures: failures,
          enabled: failures < FAILURES_BEFORE_DISABLE,
        }).eq('id', source.id)
        return { source: source.id, status: 'error', detail: outcome.detail, inserted: 0, disabled: failures >= FAILURES_BEFORE_DISABLE }
      }

      if (outcome.status === 'not_modified') {
        await admin.from('signal_sources').update({
          last_fetched_at: now, last_success_at: now, last_status: 'not_modified', consecutive_failures: 0,
        }).eq('id', source.id)
        return { source: source.id, status: 'not_modified', inserted: 0 }
      }

      // Dedupe within the batch before hitting the unique index.
      const seen = new Set<string>()
      const rows = outcome.signals.filter((s) => {
        if (seen.has(s.canonical_url)) return false
        seen.add(s.canonical_url)
        return true
      })

      const { data: upserted, error: insErr } = await admin
        .from('ingested_signals')
        .upsert(rows, { onConflict: 'canonical_url', ignoreDuplicates: true })
        .select('id')

      await admin.from('signal_sources').update({
        last_fetched_at: now,
        last_success_at: now,
        last_status: insErr ? 'insert_failed' : 'ok',
        consecutive_failures: insErr ? source.consecutive_failures + 1 : 0,
        etag: outcome.etag ?? null,
        last_modified: outcome.lastModified ?? null,
      }).eq('id', source.id)

      return {
        source: source.id,
        status: insErr ? 'insert_failed' : 'ok',
        fetched: rows.length,
        inserted: upserted?.length ?? 0,
      }
    }),
  )

  const inserted = results.reduce((sum, r: any) => sum + (r.inserted ?? 0), 0)
  console.info('[JifunzeAI ingest-signals]', { sources: sources.length, inserted })
  return json({ ok: true, sources: sources.length, inserted, results })
})
