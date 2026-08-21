# Deferred production connections — the supervised activation sequence

**Nothing in this document has been executed.** The 2026-08-21 pivot branch deliberately made
no production change: no migration applied, no Edge Function deployed, no OAuth configured, no
cron created, no switch enabled, no credential added. Each step below is owner-authorized,
in order, with its runbook.

## 0. Preconditions (owner)

- [ ] `docs/freeze/BACKUP_CHECKLIST.md` completed (DB dump, storage export, Stripe webhook off).
- [ ] Branch protection on `main` verified (see `docs/social/PLAN_PR_CI_AND_WORKFLOW_HARDENING.md`;
      the five checks: `PR checks / Lint and type-check`, `PR checks / Unit suites`,
      `PR checks / Build and secret-boundary scan`, `PR checks / Playwright`,
      `PR checks / Migration verification`).

## 1. Apply the social-ops migration

`supabase/migrations/20260820120000_social_ops_core.sql` (11 tables + RLS + prune fn) has
**never been applied to production**. Verify locally first (`npm run social:verify-migration`),
then apply via the Supabase CLI against the linked project. Rollback: the migration only adds
objects; a reviewed down-script would drop them — nothing existing is touched.

## 2. Deploy Edge Functions

`social-ops-admin` (console actions), then `ingest-signals`. Set `INGEST_SECRET`. The Stripe
functions are gone from the active branch and must never be redeployed outside a Learn
restoration.

## 3. Signal ingestion cron

Create the documented pg_cron jobs (`docs/SIGNAL_INGESTION_DEPLOYMENT.md`) only after 1–2.

## 4. Instagram connection

`docs/social/OAUTH_SETUP.md`: business-account token, `IG_USER_ID`, `IG_ACCESS_TOKEN`,
`PUBLISH_SECRET` as Supabase secrets; deploy `publish-instagram` + `refresh-ig-token`.
**`IG_PUBLISH_ENABLED` stays unset.**

## 5. Metrics sync (read-only first)

Manual workflow run with `dry_run: true`; verify snapshots; then set `SOCIAL_SYNC_ENABLED=true`
(GitHub variable) for the 2-hourly workflow. This also feeds the public latest-post feed.

## 6. Supervised dry-run week

≥1 week of `DRY_RUN=true` loop runs with every hook/caption/frame reviewed via CI artifacts.
Complete the P0 gaps first (research stage, source attribution, review UI writing
`content_approvals` — the publish gate already refuses items without an approval).

## 7. Pilot publishing

3–5 manual supervised posts, then `IG_PUBLISH_ENABLED=true` for a limited pilot. Every item
still requires a recorded human approval; the code-level gate has no bypass.

## Kill switches / rollback at every step

`docs/social/INCIDENT_AND_KILL_SWITCH.md` and `docs/social/ROLLBACK_PLAN.md` govern. Each
switch reverts independently; unset `IG_PUBLISH_ENABLED` or rotate `PUBLISH_SECRET` to stop
publishing instantly; Vercel instant rollback covers the site; `docs/freeze/RESTORATION.md`
covers Learn.

## Also deferred (code work, not connections)

Research/verification stage · review UI · signal lifecycle columns (additive migration,
reviewed) · ledger + source writes from the loop · `transform.ts` wired into the loop ·
scheduling/queue · image/carousel formats · insights + audit table · WIP tenant-detach
refactor evaluation (`archive/wip-pre-pivot-2026-08-21`).
