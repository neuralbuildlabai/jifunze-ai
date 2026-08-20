# Quarantined Edge Functions — obsolete social-content SaaS

**Quarantined:** 20 August 2026
**Authority:** `docs/AMENDMENT_001_2026-08-18_PIVOT.md` §6 — any public claim that brands or creators
can use Jifunze.ai to generate social content is false today and must be corrected on sight.

These two functions are the server side of the multi-tenant social-content generator that was
removed from the product in May 2026 and never launched. Nothing in the application invokes either
of them — verified by searching for `functions.invoke` and `functions/v1/` across `src`, `e2e`,
`orchestrator` and `scripts`.

| Function | What it did | Why it is here |
|---|---|---|
| `generate-public` | **Unauthenticated** endpoint that generated a social caption + hashtags for a topic/platform/tone, calling OpenAI on every request behind a durable rate limiter | It is the removed product's public demo. It is also an unauthenticated spend vector: every call costs OpenAI credit. |
| `generate-content` | Authenticated variant of the same generator (`verify_jwt = false`, validates the caller itself) | Same removed product. Orphaned — no caller. |

## They are moved, not deleted

The source is preserved here and in git history. Nothing about the May 2026 decision is being
erased; this records that the code is no longer part of the product.

## ✅ Both functions have been deleted remotely — 20 August 2026

Moving source does not undeploy a function, so this had to be done separately against the Supabase
project. It is done.

| Function | Was deployed | Runtime caller | Outcome |
|---|---|---|---|
| `generate-public` | Yes | none | **Deleted, verified absent** |
| `generate-content` | Yes | none — verified before deletion | **Deleted, verified absent** |

The remote function list for project `jifunze-ai` (`gkhvhisuvcfbsicwjdvm`) is now exactly:

- `ingest-signals`
- `publish-instagram`
- `refresh-ig-token`

No current autonomous-engine function was removed, modified or redeployed. The last local
references were cleaned the same day. Full record:
`docs/social/EDGE_FUNCTION_CLEANUP_2026-08-20.md`.

**This source stays here** until the full code review is finished. Do not delete this folder.

### One thing deliberately left behind

`supabase/migrations/20260428110000_public_generate_daily_usage.sql` created the
`public_generate_daily_usage` rate-limit table for `generate-public`. It is left exactly as it is:
**a migration must never be edited after it has run.** The table is now orphaned; dropping it is a
separate, deliberate decision.
