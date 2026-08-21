# Jifunze Learn — Freeze record

**Status:** Authoritative freeze record · **Date:** 2026-08-21
**Frozen commit:** `78062b19944a5ade5d1c6fae5557f77204f3fcee` ("Merge pull request #4 … chore/harden-autonomous-content-loop")

## 1. What is frozen

The complete Jifunze Learn platform as it existed at `78062b1`: course catalog and detail pages,
lesson players, free starter micro-courses, flagship courses, standalone courses, public course
libraries, learning pathways, learner dashboards and workspace, learner registration and
authentication surfaces, SME/instructor-adjacent authoring tooling, course reviews and
certificates, Stripe course payments (checkout, portal, webhook Edge Functions), coupons,
subscription surfaces, the 13-page Learn admin console, course scripts, course e2e suites and the
148 MB of hosted course assets under `public/course-assets/`.

## 2. Where it is preserved

| Ref | Type | Points to | Verified |
|---|---|---|---|
| `jifunze-learn-frozen-2026-08-21` | Annotated tag (tag object `e4bbcf8`) | `78062b1` | `git ls-remote` from an independent clone, 2026-08-21 |
| `archive/jifunze-learn` | Branch | `78062b1` | Same `ls-remote` verification |
| `learning-platform-frozen-2026-08-18` | Earlier annotated tag | `fc901a0` | Present on origin |

Both current refs exist **on `origin`** (github.com/neuralbuildlabai/jifunze-ai), not only
locally. Verification transcript (2026-08-21, independent clone):

```
78062b19944a5ade5d1c6fae5557f77204f3fcee  refs/heads/archive/jifunze-learn
78062b19944a5ade5d1c6fae5557f77204f3fcee  refs/heads/main
e4bbcf8fe551509c47d2ca5fc759ffc7e8340846  refs/tags/jifunze-learn-frozen-2026-08-21
78062b19944a5ade5d1c6fae5557f77204f3fcee  refs/tags/jifunze-learn-frozen-2026-08-21^{}
```

## 3. Known-working vs incomplete at the freeze point

Working at `78062b1` (per the 2026-08 audits): public course catalog and free starter courses,
standalone course pages, public libraries, learner sign-in/sign-up, learner dashboard, progress
persistence (Supabase-backed when configured), Learn admin console pages, course e2e suites.
Incomplete or dormant at freeze: paid checkout was behind `LEARNER_MONETIZATION_UI_DISABLED`
(default on → purchase UI hidden), the schools surface was unpublished, and pathway surfaces
redirected into `/learn`.

## 4. Database and storage at freeze

See `DB_AND_STORAGE_INVENTORY.md`. Nothing in the pivot implementation applies migrations, drops
tables, deletes rows, or touches storage buckets. Course tables, Stripe records and the
`capstone_submissions` bucket remain in production Supabase, frozen with RLS in place, with no
remaining callers in the active application after the pivot branch.

## 5. Test state at freeze

The five CI checks (`PR checks / Lint and type-check`, `PR checks / Unit suites`,
`PR checks / Build and secret-boundary scan`, `PR checks / Playwright`,
`PR checks / Migration verification`) were green on `main` at `78062b1` (PR #4 merge).

## 6. Rules

1. The tag and the archive branch are never rewritten, deleted or force-pushed.
2. Applied Supabase migrations are never edited or deleted; the active branch keeps every
   migration file. Only *callers* are removed by the pivot.
3. Restoration is always possible via `RESTORATION.md`.
4. Course data removal from production is a separately authorized future operation
   (see `BACKUP_CHECKLIST.md` and `DB_AND_STORAGE_INVENTORY.md`).
