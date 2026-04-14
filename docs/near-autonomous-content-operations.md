# Near-autonomous content operations

This document describes how JifunzeAI’s **preview** client pipeline aligns with a future **near-autonomous** production stack: ingestion → classification → relevance → opportunities → **autonomy** → **lifecycle** → draft / queue / publish → **analytics feedback**.

Types live in `src/types/contentLifecycle.ts`, `src/types/contentAnalytics.ts`, and autonomy/lifecycle services under `src/services/autonomy/` and `src/services/lifecycle/`.

---

## Lifecycle model

`ContentLifecycleStatus` applies to **opportunities** (work items) and **generated packages** (artifacts):

| Status        | Meaning (preview today) |
|---------------|-------------------------|
| `detected`    | Reserved for two-phase ingest (signal classified; autonomy not yet applied). |
| `ignored`     | Autonomous skip — no downstream work. |
| `shortlisted` | On radar (e.g. autonomy `watch`). |
| `drafted`     | Draft track or materialized package (caption/brief exists). |
| `queued`      | Work or publish-ready queue (autonomy `queue` or `publish`). |
| `scheduled`   | Slot assigned — future scheduler worker. |
| `published`   | Confirmed live — future publisher connector. |
| `escalated`   | Human or policy gate (autonomy `escalate_for_review`). |
| `rejected`    | Explicit human/system rejection. |

**Autonomy → lifecycle:** `opportunityLifecycleFromAutonomy()` in `src/services/lifecycle/mapAutonomyToLifecycle.ts` sets the initial row when opportunities are built. Further moves use `transitionOpportunityLifecycle()` in `transitionLifecycle.ts` (for future Edge jobs).

---

## Scheduled background jobs

- **Ingestion cron:** fetch per source with budgets; write normalized rows to Postgres; emit `detected` then run autonomy in the same transaction or a follow-up queue message.
- **Draft workers:** consume “draft” intents; call the content API; emit `content_package_created`; attach `ContentPackage` metadata (`lifecycle_status`, `source_opportunity_id`, placeholder `analytics_feedback`).
- **Publish workers:** consume `queued` publish-ready items; respect rate limits and per-platform windows; move `scheduled` → `published` only after API success + idempotency key.
- **Analytics rollup:** nightly or streaming jobs fill `ContentAnalyticsFeedback` from warehouse or vendor APIs.

---

## Provider integrations

- Keep **provider adapters** behind the same shapes as `ExternalSignal` / `collectExternalSignals`.
- Run **classification and relevance** server-side for authoritative scores; the browser preview may lag.
- Version provider payloads and store raw JSON in object storage for audit.

---

## Source caching

- Cache normalized signals by `(source, canonical_url, published_at)` in KV or Postgres with TTL aligned to source ToS.
- Use **ETag / If-Modified-Since** for RSS and HTTP providers where allowed.
- Invalidate cache on explicit “refresh” or when dedupe detects superseding items.

---

## Publishing safeguards

- **Double confirmation** for first-time auto-publish per brand (feature flag).
- **Hard blocks:** banned topics, blocked trend categories, missing `minimum_confidence_for_auto_publish`, dry-run mode per environment.
- **Canary:** percentage rollout of auto-publish by brand segment.
- **Attribution:** persist source links and license metadata on every outbound post.

---

## Retry logic

- **Idempotent publish:** store provider post id; retries must PATCH not duplicate.
- **Exponential backoff** with jitter on 429/5xx from platforms and LLM APIs.
- **DLQ:** after max attempts, set lifecycle `escalated` and notify humans — do not spin forever.

---

## Rollback / pause controls

- **Per-brand `automation`:** `automation_enabled` and per-channel toggles already gate autonomy; extend with `pause_all_outbound: boolean` in future schema.
- **Rollback:** delete or unpublish using stored provider ids; log reversals in an audit table.
- **Kill switch:** global env or remote config to force all autonomy outputs to `escalated` or `queued` + `requires_human_review`.

---

## Analytics feedback (placeholder)

`ContentAnalyticsFeedback` holds nullable fields: impressions, clicks, engagement, conversion_hint, publish_time_performance. Until wired:

- Packages created from opportunities set `EMPTY_CONTENT_ANALYTICS_FEEDBACK`.
- Closed-loop learning can later adjust autonomy thresholds or trend allowlists from aggregated performance (separate service; do not block MVP).

---

## End state

The product should read as **signal → decision → lifecycle → execution → learn**, with humans only on **escalated**, **rejected**, or **paused** paths — not on every row.
