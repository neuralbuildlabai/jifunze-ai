# Real signal ingestion — deployment

Replaces the four mock providers with server-side fetching on a schedule. This is
the change that makes autonomous operation possible: nothing in the pipeline used
to happen unless somebody opened a browser tab.

## What ships

| File | Purpose |
|---|---|
| `supabase/migrations/20260818120000_real_signal_ingestion.sql` | `signal_sources` (feed registry + ETag state) and `ingested_signals` (normalized, deduped). RLS on both; **writes are service-role only**. |
| `supabase/functions/ingest-signals/index.ts` | The worker. POST ingests; GET returns latest signals in `ExternalSignal` shape. |
| `supabase/config.toml` | `verify_jwt = false` for the function — cron carries no user JWT. |

## Deploy

```bash
# 1. Apply the migration
supabase db push

# 2. Set the shared secret (generate a strong random value)
supabase secrets set INGEST_SECRET="$(openssl rand -hex 32)"

# 3. Deploy the function
supabase functions deploy ingest-signals

# 4. Verify manually before scheduling anything
curl -X POST "https://<project-ref>.supabase.co/functions/v1/ingest-signals" \
  -H "x-ingest-secret: <INGEST_SECRET>"
```

A healthy first run returns `{"ok":true,"sources":7,"inserted":<n>,"results":[...]}`.
Re-running within minutes should return mostly `not_modified` — that's the
conditional-request caching working, not a failure.

## Schedule it

In the Supabase SQL editor:

```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'ingest-signals-hourly',
  '17 * * * *',                       -- :17 past the hour, off the round-number stampede
  $$
  select net.http_post(
    url     := 'https://<project-ref>.supabase.co/functions/v1/ingest-signals',
    headers := jsonb_build_object('x-ingest-secret', '<INGEST_SECRET>', 'Content-Type', 'application/json'),
    body    := '{}'::jsonb
  );
  $$
);

-- Retention: prune nightly
select cron.schedule('prune-signals-nightly', '0 3 * * *',
  $$ select public.prune_ingested_signals(30); $$);
```

Hourly is deliberate. These are daily-content feeds, not a trading desk — polling
harder costs goodwill with publishers and buys nothing.

## Point the client at it

```
VITE_SIGNAL_PROVIDER_MODE=remote
VITE_SIGNAL_INGESTION_URL=https://<project-ref>.supabase.co/functions/v1/ingest-signals
```

The existing `remoteSignalsClient` already understands this mode, so no frontend
change is needed. **Vite inlines `VITE_*` at build time — a new deploy is required.**

## Seeded feeds

All seven were verified reachable and correctly parsed on 2026-08-18.

| Source | Kind | Why |
|---|---|---|
| TechCabal | rss | African tech and startups |
| Techpoint Africa | rss | African tech and startups |
| Capital FM Business | news | Kenyan business — one of the few Kenyan outlets with a working public feed |
| TechCrunch AI | news | AI industry volume |
| OpenAI News | rss | First-party tool announcements |
| Hugging Face Blog | rss | Open-source AI tooling |
| Hacker News front page | trends | Velocity signal |

**Not included, and why:** Business Daily (`/rss` 404s), The Star (`/rss` 404s),
Nation (403s to non-browser clients), ITWeb Africa (TLS chain fails). Kenyan
outlets are poor at public feeds. If Kenya-specific coverage matters more later,
the honest options are a licensed news API or a `web_monitoring` provider that
respects each site's robots.txt.

Add sources with a plain insert:

```sql
insert into public.signal_sources (id, kind, label, feed_url, topic_tags)
values ('rss_example', 'rss', 'Example', 'https://example.com/feed/', '{ai,careers}');
```

## Operational behaviour

- **Conditional requests** — stores `ETag` / `Last-Modified` and sends
  `If-None-Match` / `If-Modified-Since`. A `304` costs nothing.
- **Self-healing** — 5 consecutive failures auto-disables a source. Re-enable with
  `update public.signal_sources set enabled = true, consecutive_failures = 0 where id = '...'`.
- **Deduplication** — `canonical_url` is unique, with `utm_*`, `fbclid`, `gclid`,
  fragments, `www.` and trailing slashes stripped. The same article from two feeds
  becomes one row.
- **Bounded** — 25 items per feed, 12s timeout per feed, all feeds fetched in parallel.
- **Identifies itself** — `User-Agent: JifunzeAI-SignalIngest/1.0 (+https://jifunze.ai)`,
  so publishers can identify and contact you rather than silently blocking.

## Test coverage

The parser was unit-tested against RSS 2.0, Atom, and malformed feeds — 17 assertions
covering entity decoding, HTML stripping, URL canonicalization, both Atom link shapes,
date fallbacks, and items missing required fields. All passing.

## What this does *not* do yet

Ingestion only. Classification, relevance scoring and the autonomy decision still
run **client-side**, which per `signal-ingestion-architecture.md` should move to the
server before any decision is trusted unattended. That is the next piece of work.
