# Deployment checklist

Nothing in this repository has been deployed, pushed, merged or enabled by the work of
20 August 2026. This is the sequence to follow when someone decides to.

## 0. Before anything

- [ ] Review the diff. Start with `src/App.tsx` (routing), then
      `supabase/migrations/20260820120000_social_ops_core.sql`, then
      `src/components/social-ops/RequireSocialOpsAccess.tsx`.
- [ ] Confirm the frozen tag still restores cleanly:
      `git checkout learning-platform-frozen-2026-08-18` in a scratch worktree.
- [ ] `npm ci && npm run lint && npm run typecheck:pipeline && npm run test && npm run social:test && npm run build`
- [ ] `npx playwright test` — expect 138 passed, 0 failed, 2 skipped.

## 1. Database (reversible, do this first)

- [ ] Read the migration end to end. It creates 11 tables, enables RLS on all of them and grants
      **no** write policy to any role.
- [ ] Verify it locally against a throwaway Postgres: `npm run social:verify-migration`.
- [ ] Apply to **staging** first if a staging project exists.
- [ ] Apply to production: `supabase db push` (or the project's usual path).
- [ ] Confirm: `select count(*) from public.social_accounts;` → 10.
- [ ] Confirm a non-admin session reads zero rows from `social_metric_snapshots`.

## 2. Edge Function

- [ ] `supabase functions deploy social-ops-admin`
- [ ] Confirm `verify_jwt = false` is intended — the function validates the caller itself.
- [ ] Smoke test as an admin: `{ "action": "publish_state" }` should return booleans only.
- [ ] Smoke test as a non-admin: must return **403**.

## 3. Website

- [ ] `npm run seo:generate` and commit the result if the lesson set changed.
- [ ] Deploy the front end as usual (Vercel).
- [ ] Verify on the live domain:
  - [ ] `/` renders the career-skills homepage, not the course catalog
  - [ ] `/content`, one `/content/<slug>`, every `/topics/<pillar>`, `/social`, `/about`
  - [ ] `/learn` is unchanged and still serves the catalog
  - [ ] `/generate` redirects to `/` — this is the link in the old launch posts
  - [ ] `/robots.txt`, `/sitemap.xml`, `/feed.xml` all serve
  - [ ] `/og-image.png` serves; share one lesson URL and look at the preview
  - [ ] `/admin/social-ops` is **not** reachable while signed out
  - [ ] `/admin/dashboard` still behaves exactly as before
- [ ] Submit `sitemap.xml` in Search Console.
- [ ] Press **Claim** in Pinterest settings — the verification tag is now live.

## 4. Two-hour sync — do NOT enable yet

- [ ] Add whichever platform secrets exist (`docs/social/ENVIRONMENT_VARIABLES.md`).
- [ ] Run the workflow manually with `dry_run: true`. Read the whole log.
- [ ] Only then set the repository variable `SOCIAL_SYNC_ENABLED=true`.
- [ ] Watch the first two scheduled runs before trusting any number on the dashboard.

## 5. Publishing — separate decision, later

- [ ] `IG_PUBLISH_ENABLED` stays unset until the launch-readiness report's blockers are cleared
      **and** a human has approved a specific first post.
- [ ] The first 3–5 posts go out manually, under supervision.
- [ ] Only then consider a limited autonomous pilot: one post a day, kill switch armed, failures
      alerting.

## Explicitly out of scope for this deployment

Pushing code · merging · enabling the autonomous publishing cron · turning on `IG_PUBLISH_ENABLED` ·
publishing any generated content · buying X API access · creating a WhatsApp, Telegram or Bluesky
account.

**No longer outstanding:** undeploying the retired `generate-public` and `generate-content` Edge
Functions was completed on 20 August 2026 — see `docs/social/EDGE_FUNCTION_CLEANUP_2026-08-20.md`.
