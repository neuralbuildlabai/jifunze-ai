# Signal ingestion architecture (JifunzeAI)

This document describes how **external signals** flow through JifunzeAI today and how that should evolve in production.

## Current (Phase 1) client

- **Collect:** `collectExternalSignals` loads data either from in-browser **mock providers** (`VITE_SIGNAL_PROVIDER_MODE=mock`, default) or from a **remote aggregate endpoint** (`VITE_SIGNAL_PROVIDER_MODE=remote` + `VITE_SIGNAL_INGESTION_URL`).
- **Normalize:** `normalizeExternalSignals` trims and canonicalizes fields so downstream steps see a stable shape.
- **Guard:** `applySignalGuards` applies lightweight checks (stale, duplicate, banned overlap, URL sanity). Treat these as **preview-only** until backed by server rules.
- **Score:** `scoreSignalForBrand` runs a simple keyword/freshness scorer (swappable later).
- **Rank + opportunities:** `buildRankedOpportunitiesForBrand` sorts scored signals, then maps them to `ContentOpportunity` for human review (no auto-posting).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_SIGNAL_PROVIDER_MODE` | `mock` (default) or `remote`. |
| `VITE_SIGNAL_INGESTION_URL` | Full URL of an aggregate endpoint that returns a JSON array of `ExternalSignal`-shaped objects. |
| `VITE_ENABLE_TREND_OPPORTUNITIES` | `true` / `false` — toggles the trend opportunities UI section. |

## Provider kinds (code)

Each connector implements `SignalSourceProvider` with a `kind` of:

- `news` — licensed headlines / articles APIs
- `rss` — RSS / Atom feeds
- `trends` — trends indices or approved social velocity inputs
- `web_monitoring` — public pages / mentions (robots.txt and site ToS apply)

Register mocks in `providerRegistry.ts`; register production workers on the server.

## Recommended production backend

Real-time or near–real-time **internet-scale** ingestion should **not** run entirely in the browser. A robust setup typically includes:

1. **Supabase Edge Functions** or **dedicated workers** that fetch from third-party APIs and feeds.
2. **Scheduled jobs** (cron, queues) instead of firing all sources on every page load.
3. **Caching** (database, KV) keyed by source + time window to reduce cost and respect rate limits.
4. **Rate limiting** per provider and global circuit breakers.
5. **Source compliance**: contracts, attribution, paywalls, robots.txt, and regional rules.
6. **Safety pipeline**: dedupe, staleness, misinformation heuristics, brand-safety — **authoritative** on the server; the client may mirror a subset for UX only.

The frontend then calls a **single aggregate** (or a small number of bounded endpoints) and renders opportunities and drafts for **human-in-the-loop** approval before scheduling.
