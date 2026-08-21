# Reconciliation of the pre-pivot WIP against the removal decision matrix

**Date:** 2026-08-21
**WIP source:** `_xfer/jifunze-wip-2026-08-21.patch`
(SHA-256 `030b097f78f85fc0016e28ff3e08fe68e58a2765a719be0c7e5aec214e46d410`, 2,911,677 bytes)
**Preserved as:** branch `archive/wip-pre-pivot-2026-08-21` (base `78062b1`; the patch was diffed
from `14b183e`, whose tree is byte-identical to `78062b1` — verified with `git diff 14b183e 78062b1`
returning empty). `git apply --check` passed cleanly in an isolated worktree.
**Shape:** 261 paths — 236 deletions, 25 modifications; +431 / −35,774 lines.

## Verdict

The WIP is **not** a Learn-removal implementation. It is a *retired-SaaS cleanup* (deleting
`src/services` 91, `src/types` 32, `src/config` 17, `src/persistence` 8, `src/trends` 4, plus
retired-SaaS docs) combined with an **unfinished, unreviewed tenant/persistence detach refactor**
(25 modifications across `AuthContext`, access, hooks, lib, and Learn pages). It deletes no Learn
application code (`src/components/learn/`, `src/data/learning/`, `public/course-assets/` are all
untouched). It must never be merged wholesale.

## (a) WIP deletions that AGREE with the decision matrix (candidates for reuse)

The bulk of the 236 deletions match the matrix's "Delete — retired SaaS orphans" row
(`src/services/{autonomy,content,signals,publishing,platforms,conversion,creative,lifecycle,`
`opportunities,pipeline,mediaPlanning,simulation,trends,domains}`, `src/trends/`, most retired
types/config, retired-SaaS docs). The pivot branch performs these deletions independently from
the audit's own list — the WIP served as a cross-check, not as a source.

## (b) WIP deletions that CONFLICT with the matrix (must stay in the active tree)

| Path | Matrix class | Why it must stay |
|---|---|---|
| `src/auth/bootstrapTenant.ts` | Preserve | Imported by the kept `AuthContext` |
| `src/persistence/` (all 8 incl. `queries/`) | Investigate → keep | Shared via the kept type graph / `AuthContext` persistence backends |
| `src/config/demoBrands.ts`, `src/config/demoSocialAccounts.ts` | Preserve | 2 of the 3 kept config files |
| `src/services/relevance/` (5 files) | Investigate → keep (4 of 5) | Kept per audit |
| `src/types/brand.ts`, `src/types/content.ts` (and other kept types among the 32 deleted) | Preserve | Kept type graph |

## (c) WIP modifications (25) — competing refactor, deferred

The modifications (`AuthContext.tsx`, `src/access` 2, 8 components incl. Learn pages,
4 hooks, 4 lib, 2 training, `LearningAccessContext`, `teachingSignals`, persistence docs)
implement a tenant-layer detach that the audits never reviewed. The pivot branch does **not**
reuse any of these hunks. If the detach is wanted later, lift individual hunks from
`archive/wip-pre-pivot-2026-08-21` into a dedicated reviewed PR:
`git diff 78062b1 archive/wip-pre-pivot-2026-08-21 -- <path>`.

## (d) Untracked survivors — classification

| Path | Class | Disposition |
|---|---|---|
| `docs/IMPLEMENTATION_PLAN_2026-08-21.md` | Planning artifact | Committed (this branch) |
| `docs/JIFUNZE_MASTER_PLAN.md` | Governance doc (README references it) | Committed (this branch) |
| `docs/PREFLIGHT_2026-08-21.md` | Planning artifact | Committed (this branch) |
| `docs/internal/` wave reports + plans (6) + `BASELINE_2026-05-18/` | Historical planning | Committed under `docs/internal/` (frozen historical record) |
| `docs/social/PLAN_PR_CI_AND_WORKFLOW_HARDENING.md` | Planning artifact | Committed |
| `jifunze-brand-refresh.bundle` | Brand work (git bundle, branch `feat/jifunze-brand-refresh` @ `83029f0`) | Branch extracted locally for preservation/push; bundle file itself not committed (binary; branch supersedes it) |
| `_quarantined_migrations/20260518120000_drop_trends_and_tenancy.sql` | Never-applied destructive draft | Committed under `_quarantined_migrations/` with its quarantine intact (documentation value; must never move into `supabase/migrations/`) |
| `src/services/learnerState/` (7 files) | Learn-only remote persistence drafts (untracked, unused) | **Not** added to the active tree (Learn is being removed); preserved on `archive/wip-pre-pivot-2026-08-21` |
| `src/data/learning/courses/.gitkeep` | Empty placeholder | Not added (directory is deleted by the pivot); preserved on the WIP archive branch |
| `decision.json` | Generated loop artifact (one dry-run output) | Not committed (generated output; reproducible via `npm run autonomous:offline`); preserved on the WIP archive branch |
| `CLAUDE.md` (untracked local, 0 bytes) | Empty | Left alone; owner decides |
| `_xfer/**` | Transfer artifacts | Git-ignored; never committed |

## (e) Brand-refresh bundle

`feat/jifunze-brand-refresh` (@`83029f0`, 2 commits over `7b9868d`) replaced the raster ".AI"
lockups with SVG marks (`jifunze-mark.svg`, `jifunze-lockup-{light,dark}.svg`) and rewrote
`JifunzeBrandLogo.tsx`. The pivot's branding commit implements the approved `brand/` kit
directly (per the brand spec in `brand/README-jifunze-brand.md`), so the bundle branch is kept
for reference only. Push it so it stops depending on one file on one laptop:
`git push origin feat/jifunze-brand-refresh`.
