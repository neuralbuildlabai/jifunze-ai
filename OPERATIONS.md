# OPERATIONS.md — Jifunze autonomous content engine

**Purpose:** the memory file. Every session reads this first and updates it last.
It captures what's built, the identifiers, where secrets live (names only, never
values), and what's next — so no session re-derives state.

_Last updated: 2026-08-21 (Instagram-first pivot branch)._

---

## What this is

Jifunze is an **Instagram-first, faceless, AI-assisted social learning media system**
(Amendment 003, 2026-08-21): detect signals → score → select → research & verify → generate →
render faceless vertical video → quality/safety gates → **human review (enforced in code)** →
publish → sync engagement → insights. Own handles only (`@jifunze.ai`); it is not a SaaS.
Editorial pillars (single source `src/social/pillars.ts`): practical_ai, career_growth,
income_business, digital_tools, productivity, opportunities.

The **learning platform was REMOVED from the active application on 2026-08-21** and is fully
preserved at `78062b1` (tag `jifunze-learn-frozen-2026-08-21`, branch `archive/jifunze-learn`);
see `docs/freeze/`. `/admin` now belongs to the social operations console; `/learn`, billing and
training no longer exist in active code. Production course data is preserved untouched with no
remaining callers.

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
| `VISUAL_PROVIDER` | GH env | `designed`(default) \| `stock` \| `ai`(paid, off) |
| `SOCIAL_SYNC_ENABLED` | GH repo variable | **kill switch** — the two-hour metrics sync no-ops unless `"true"`. Currently unset |
| Platform credentials (Facebook, Threads, TikTok, YouTube, LinkedIn, X, Pinterest, Telegram) | none exist yet | names only — see `docs/social/ENVIRONMENT_VARIABLES.md` |

**Never** print or commit secret values. The token never passes through chat or logs.

---

## What's built (Edge Functions + render)

| Component | Path | Status |
|---|---|---|
| Signal ingestion (RSS/Atom, cron) | `supabase/functions/ingest-signals` | ✅ built, tested |
| Public career-skills website + content hub | `src/components/media/`, `src/social/` | ✅ built, tested — **not deployed** |
| Social operations console | `src/components/social-ops/` at `/admin/social-ops` | ✅ built, tested — **not deployed** |
| Social ops schema (11 tables) | `supabase/migrations/20260820120000_social_ops_core.sql` | ✅ built, verified locally — **not applied** |
| Platform adapters (10) | `orchestrator/social/adapters/` | ✅ built — only Instagram is `ready` |
| Two-hour metrics sync | `orchestrator/social/sync.ts`, `.github/workflows/social-metrics-sync.yml` | ✅ built, dry-run verified — **cron gated OFF** |
| Admin server route | `supabase/functions/social-ops-admin` | ✅ built — **not deployed** |
| Instagram publish (Reels) | `supabase/functions/publish-instagram` | ✅ built |
| IG token refresh | `supabase/functions/refresh-ig-token` | ✅ built |
| Video render (captions+music) | `render/` | ✅ built, render verified |
| Server-side scoring | `orchestrator/score.ts` | ✅ built, tested |
| Brief generator | `orchestrator/brief.ts` | ✅ built, tested (offline fallback) |
| CI loop (DRY_RUN default) | `.github/workflows/autonomous-loop.yml` | ✅ built — publish gated OFF |
| Human-approval publish gate | `orchestrator/approvalGate.ts` | ✅ enforced, fail-closed, no bypass — review UI still missing |
| Admin console (`/admin`) | `src/components/admin-app/` | ✅ built — honest module labels |
| Public latest-post feed foundation | `src/services/publicFeed/` | ✅ built — honest states; data after connection |

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

## Where the current detail lives

| Topic | Document |
|---|---|
| Every official account, field by field | `docs/social/SOCIAL_ACCOUNT_INVENTORY.md` |
| Approved copy per platform | `docs/social/PLATFORM_COPY.md` |
| TikTok deletion record | `docs/social/TIKTOK_DELETION_RECORD.md` |
| Website + content hub | `docs/social/WEBSITE_CONTENT_HUB.md` |
| Social-ops console | `docs/social/SOCIAL_OPS_DASHBOARD.md` |
| Database schema | `docs/social/SOCIAL_OPS_SCHEMA.md` |
| Two-hour sync | `docs/social/TWO_HOUR_SYNC.md` |
| Adapter matrix | `docs/social/PLATFORM_ADAPTER_MATRIX.md` |
| OAuth setup | `docs/social/OAUTH_SETUP.md` |
| Env var reference | `docs/social/ENVIRONMENT_VARIABLES.md` |
| Manual owner actions | `docs/social/MANUAL_PLATFORM_ACTIONS.md` |
| Deploy / rollback / incident | `docs/social/DEPLOYMENT_CHECKLIST.md`, `ROLLBACK_PLAN.md`, `INCIDENT_AND_KILL_SWITCH.md` |
| Launch verdict | `docs/social/LAUNCH_READINESS_2026-08-20.md` |
| Capability truth table (27 stages) | `docs/social/CAPABILITY_TRUTH_TABLE.md` |
| Connection sequence (all deferred) | `docs/social/DEFERRED_CONNECTIONS.md` |
| Active routes + retired behaviour | `docs/ROUTES.md` |
| Learn freeze + restoration | `docs/freeze/` |
| Governance | `docs/AMENDMENT_003_2026-08-21_INSTAGRAM_FIRST.md` (governs), 001/002 (historical) |

---

## Safety switches
- The publish path REFUSES any item without an explicit recorded human approval in
  `content_approvals` (`orchestrator/approvalGate.ts`, fail-closed, no bypass env).
- `IG_PUBLISH_ENABLED` must be `"true"` before anything posts publicly. Deploying
  the code does NOT start posting.
- `publish-instagram` dedupes by `idempotency_key` — an item never double-posts.
- Standard Access only (own account). Advanced Access / other accounts needs
  Business Verification (deferred until there's a paying customer).
- `SOCIAL_SYNC_ENABLED` must be `"true"` before the two-hour metrics sync does anything. Unset.
  The workflow's schedule fires and short-circuits in a visible `gate` job, deliberately.
- The social-ops console is READ-ONLY over secrets. No browser control can flip a kill switch.
- Every platform adapter except Instagram refuses every call, with the blocker as the reason.

---

## Access / operational notes
- This cloud session can CLONE the repo but the egress proxy BLOCKS `git push`
  and the GitHub API for it. To let a session push/PR, the repo must be added to
  the session's authorized sources. Until then, work ships as git patches
  (`git am < *.patch`).
- Deploy Edge Functions: `supabase functions deploy <name>`; secrets via
  `supabase secrets set`. Cron via pg_cron (see each function's deploy doc).

---

## Next steps (priority order, 20 Aug 2026)

**Only the owner can do 1–4.**
1. Sign the browser into TikTok `@jifunze_ai` — unblocks the authorised video deletion, the bio and
   the avatar in one five-minute pass.
2. Set the Instagram display name and bio link in the mobile app. Desktop web cannot.
3. Delete or hide the 2 obsolete LinkedIn posts and 3 obsolete X posts.
4. Review this branch, then the migration, then deploy. The deploy also completes the Pinterest
   domain claim.

**Then:**
5. Add whatever platform credentials exist; run `npm run social:sync:dry-run` and read the report.
6. Run the sync workflow manually with `dry_run: true`; only then set `SOCIAL_SYNC_ENABLED=true`.
7. Document the music licence for the render pipeline.
8. Rehearse the content loop with `DRY_RUN=true` for a week and review every hook, caption and frame.
9. Publish the first 3–5 posts manually, under supervision.
10. Only then flip `IG_PUBLISH_ENABLED=true` for a limited autonomous pilot.

Deferred, each needing its own decision: Facebook Page token · Threads app + review · Google Cloud
project + YouTube audit · LinkedIn app verification · Pinterest Trial → Standard · TikTok client
audit · paid X access · Telegram channel · WhatsApp Channel.
