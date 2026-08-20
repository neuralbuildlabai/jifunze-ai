# Amendment 002 — The website, the content ledger and social operations

**Status:** Proposed · **Date:** 20 August 2026
**Extends:** `docs/AMENDMENT_001_2026-08-18_PIVOT.md`
**Authority:** `OPERATIONS.md` (18 Aug 2026), owner-approved direction
**Governs:** where Amendment 001 is silent. Where it and Amendment 001 conflict, **Amendment 001
governs**. Where `OPERATIONS.md` and this document conflict, **`OPERATIONS.md` governs** and this
should be updated to match.

---

## 1. What changed on 20 August 2026

Amendment 001 recorded the pivot to a career-skills media brand. It did not say what the website
should be, where content lives, or how the brand's own channels are operated. Four live profiles
and the website still described a product that no longer exists.

This amendment records four decisions taken on 20 August 2026.

### 1.1 The website is the canonical reference point, and `/` is no longer the course catalog

`jifunze.ai` now explains the career-skills brand: who it serves, the six pillars, the lessons, the
official accounts, how content is chosen, and what automation does and does not do.

**`/` no longer redirects a signed-out visitor to `/learn`.** The learning platform is frozen and
must not be presented as the primary product (Amendment 001 §4, §8). `/learn` is unchanged and
still serves the catalog to anyone who goes there; it is simply no longer the front door.

Signed-in routing is untouched: an authenticated admin still lands on `/admin/dashboard`, an
authenticated learner on their default path.

### 1.2 The content ledger is the source of truth — not any platform

Every piece of content has one canonical record: internal id, slug, title, summary, full readable
text, pillar, sources with attribution, approval and publication status, per-platform publication
records, safety status, corrections and SEO fields.

Platform APIs **enrich** that record with publication results and metrics. **Nothing is ever created
by scraping a platform.** The public site renders only records that are both approved and published,
enforced in the client and again by RLS.

Consequence: the website does not depend on third-party embeds. A lesson survives a deleted post, a
rate-limited embed and a platform outage, because the lesson lives here.

### 1.3 Social operations gets its own console, isolated from the frozen admin

`/admin/social-ops` exists. `docs/SOCIAL_OPS_API_READINESS.md` §14 listed "unfreeze `/admin`, or
mount `/admin/social-ops` outside the frozen tree" as an open decision. **The decision is: mount it
outside.**

`/admin` stays frozen at `learning-platform-frozen-2026-08-18`. The console has its own route
block, its own guard, its own shell, and imports nothing from the frozen tree. Deleting its route
block from `src/App.tsx` restores the frozen admin behaviour exactly. The boundary is enforced by a
test that reads the import specifiers of every console file.

### 1.4 Platform readiness is stated honestly, or not at all

Every platform adapter carries a readiness classification describing **what is true today**:
`ready`, `credentials missing`, `API approval required`, `paid access required`, `manual only`,
`unsupported`.

An adapter whose code is finished but which has no credentials is never `ready`. An adapter asked to
do something its readiness does not permit refuses loudly with the operator-facing blocker; it never
silently no-ops and never fabricates a success. Today exactly one platform is `ready`: Instagram —
and its publishing is still gated by `IG_PUBLISH_ENABLED` and by human approval.

---

## 2. What this amendment does NOT authorise

- Publishing anything, on any platform.
- Deploying anything.
- Pushing or merging code.
- Enabling the two-hour cron (`SOCIAL_SYNC_ENABLED` stays unset).
- Turning on `IG_PUBLISH_ENABLED`.
- Spending money — X automation in particular stays blocked by the no-spend rule.
- Creating any new account (WhatsApp Channel, Telegram, Bluesky all remain proposals).
- Unfreezing any part of the learning platform.
- Building or marketing the multi-tenant SaaS. Amendment 001 §6 stands unchanged.

---

## 3. Obsolete product surfaces

Two Supabase Edge Functions — `generate-public` (unauthenticated, calls OpenAI on every request)
and `generate-content` — are the server side of the removed social-content SaaS. Neither is invoked
by any application code. Their source has been moved to `_quarantined_functions/`, preserved not
deleted.

**Moving source does not undeploy a function**, so removing them remotely was a separate owner
action. **That action is now complete.** On 20 August 2026 both functions were confirmed deployed in
project `gkhvhisuvcfbsicwjdvm` and deleted; `generate-content` was verified to have no runtime
caller first. The remote function list is now exactly `ingest-signals`, `publish-instagram` and
`refresh-ig-token` — no current autonomous-engine function was removed. The last local references
(`.env.local`, `src/vite-env.d.ts`, `supabase/config.toml`, `src/lib/envCheck.ts`) were cleaned the
same day. Full record: `docs/social/EDGE_FUNCTION_CLEANUP_2026-08-20.md`.

The `public_generate_daily_usage` rate-limit table that backed `generate-public` is now orphaned.
Its migration stays untouched — a migration must never be edited after it has run — and dropping the
table is a separate decision.

The retired product routes (`/generate`, `/ideas`, `/studio`, `/trends`, `/insights`, `/platform`,
`/training`, `/team/*`) had been answering 404 since May 2026. They now redirect to the public
homepage. `/generate` matters most: Jifunze.ai's own April 2026 launch posts still link to it.

---

## 4. Documents superseded, not deleted

| Document | Status |
|---|---|
| `PROJECT_CONTEXT.md` | **Superseded.** Describes the learning platform as the product. Retained as the record of the May 2026 plan |
| `docs/JIFUNZE_MASTER_PLAN.md` | Superseded in part by Amendment 001. Unchanged here |
| `docs/SOCIAL_OPS_API_READINESS.md` | **Superseded in part.** Its research stands; its §14 open decision on `/admin` is now decided (§1.3 above) and its "nothing built" framing is out of date |
| `brand/social-kit/jifunze-social-final-report-2026-08-20.md` (Part 1) | Superseded by Part 2 and by the reports in `docs/social/` |
| `brand/social-kit/jifunze-social-audit-part2-2026-08-20.md` (Part 2) | **Superseded in part.** Its claim that the Threads website link was applied was wrong — the field was empty on 20 Aug, and two attempts to set it from desktop web did not persist. It is now an owner action in the Threads mobile app |
| `brand/social-kit/jifunze-social-paste-kit.md` | Already banner-marked superseded. `docs/social/PLATFORM_COPY.md` replaces it |

Nothing above is deleted. Each carries a banner pointing at what governs.

---

## 5. Owner approval

The 20 August 2026 direction recorded here is submitted for owner approval alongside the code. It
takes effect when the branch is reviewed and merged, not before.
