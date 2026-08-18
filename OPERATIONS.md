# OPERATIONS.md — Jifunze autonomous content engine

**Purpose:** the memory file. Every session reads this first and updates it last.
It captures what's built, the identifiers, where secrets live (names only, never
values), and what's next — so no session re-derives state.

_Last updated: 2026-08-18._

---

## What this is

Jifunze's **autonomous social content engine**: ingest real trend signals →
score them server-side → turn the best into a production brief → render a
faceless vertical video (captions + music, no voiceover) → publish to Instagram.
Runs unattended on a schedule. Own handles first (`@jifunze.ai`); multi-tenant
SaaS later.

The **learning platform** in this same repo is FROZEN at tag
`learning-platform-frozen-2026-08-18` (commit fc901a0). Do not touch
`/learn`, `/admin`, billing, or training code. Restore with
`git checkout learning-platform-frozen-2026-08-18` if anything breaks.

---

## Identifiers (all public, safe to record)

| Thing | Value |
|---|---|
| GitHub repo | `neuralbuildlabai/jifunze-ai` (private) |
| Supabase project | `gkhvhisuvcfbsicwjdvm` |
| Meta App ID | `2103314297276618` |
| Meta App name | Jifunze AI Publisher |
| Instagram App ID | `38317360154514318` |
| Instagram Business Account ID | `17841433836747759` |
| Instagram handle | `@jifunze.ai` (Business, linked to the FB Page) |
| Facebook Page | Jifunze.ai — ID `61593186673039` |
| Business portfolio (Meta) | jifunze.ai — business_id `1711314434327622` |
| App contact email | neuralbuild.ai@gmail.com |

## Secrets (NAMES ONLY — values live in Supabase secrets / GH Actions secrets)

| Name | Where | What |
|---|---|---|
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | repo `.env` (public by design) | browser Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase env | service role (server only) |
| `IG_ACCESS_TOKEN` | Supabase secret | long-lived IG token (~60d, auto-refreshed) |
| `IG_USER_ID` | Supabase secret | `17841433836747759` |
| `PUBLISH_SECRET` | Supabase secret | gates publish-instagram / refresh-ig-token |
| `INGEST_SECRET` | Supabase secret | gates ingest-signals |
| `IG_PUBLISH_ENABLED` | Supabase secret | **kill switch** — must be `"true"` to post publicly |
| `OPENAI_API_KEY` | Supabase secret / GH secret | brief generation (the one real cost) |
| `PEXELS_API_KEY` | GH secret | free stock video (optional; falls back to generated) |
| `VISUAL_PROVIDER` | GH env | `stock`(default) \| `generated` \| `ai`(paid, off) |

**Never** print or commit secret values. The token never passes through chat or logs.

---

## What's built (Edge Functions + render)

| Component | Path | Status |
|---|---|---|
| Signal ingestion (RSS/Atom, cron) | `supabase/functions/ingest-signals` | ✅ built, tested |
| Instagram publish (Reels) | `supabase/functions/publish-instagram` | ✅ built |
| IG token refresh | `supabase/functions/refresh-ig-token` | ✅ built |
| Video render (captions+music) | `render/` | ✅ built, render verified |
| Server-side scoring | `orchestrator/` | 🔨 in progress |
| Brief generator | `orchestrator/` | 🔨 in progress |
| CI cron (the loop) | `.github/workflows/` | 🔨 in progress |

### Supabase tables added
- `signal_sources`, `ingested_signals` (ingestion)
- `instagram_publish_log`, `instagram_token_state` (publishing)
- `content_opportunities` (scoring output) — see orchestrator migration
- All RLS-on, service-role-only writes.

---

## Cost posture (money is a priority)

$0 by default. The only things that ever bill:
- **OpenAI** for brief generation — pennies per post.
- **AI visual provider** — OFF unless `VISUAL_PROVIDER=ai`.
Everything else (Meta API, Pexels, FFmpeg, GitHub Actions minutes, Supabase free
tier) is free at this scale.

---

## Safety switches
- `IG_PUBLISH_ENABLED` must be `"true"` before anything posts publicly. Deploying
  the code does NOT start posting.
- `publish-instagram` dedupes by `idempotency_key` — an item never double-posts.
- Standard Access only (own account). Advanced Access / other accounts needs
  Business Verification (deferred until there's a paying customer).

---

## Access / operational notes
- This cloud session can CLONE the repo but the egress proxy BLOCKS `git push`
  and the GitHub API for it. To let a session push/PR, the repo must be added to
  the session's authorized sources. Until then, work ships as git patches
  (`git am < *.patch`).
- Deploy Edge Functions: `supabase functions deploy <name>`; secrets via
  `supabase secrets set`. Cron via pg_cron (see each function's deploy doc).

---

## Next steps (priority order)
1. Finish server-side scoring + brief generator (`orchestrator/`).
2. GitHub Actions cron chaining: ingest → score → brief → render → upload → publish.
3. Supabase Storage bucket for the public `video_url`.
4. Rehearse the full loop with `IG_PUBLISH_ENABLED` unset (renders + logs, no post).
5. Flip `IG_PUBLISH_ENABLED=true` when a human approves the first live post.
6. Decide the video-visual default (stock vs generated) after seeing a few renders.
