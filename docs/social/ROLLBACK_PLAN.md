# Rollback plan

Ordered from cheapest to most drastic. Every step is reversible and none of them touches the frozen
learning platform.

## 1. Stop the two-hour sync (seconds, no deploy)

Set the repository variable `SOCIAL_SYNC_ENABLED` to anything other than `true`, or delete it. The
next scheduled run short-circuits in the `gate` job. Nothing else changes; existing snapshots stay.

## 2. Stop all publishing (seconds, no deploy)

`supabase secrets unset IG_PUBLISH_ENABLED` — or set it to any value other than `"true"`.
`publish-instagram` refuses on the next call. Every other platform adapter already refuses.

## 3. Close the dashboard (one deploy)

Delete the social-ops `<Route>` block from `src/App.tsx` and redeploy. The console disappears. The
data stays; nothing else in the app is affected.

## 4. Revert the public homepage (one deploy)

In `HomeEntryPage` (`src/App.tsx`), change the signed-out branch from `return <MediaHomePage />`
back to `return <Navigate to="/learn" replace />`. `/content`, `/topics/*`, `/social` and `/about`
keep working; only the front door reverts.

## 5. Revoke a platform credential (minutes)

Follow the revocation table in `docs/social/ENVIRONMENT_VARIABLES.md`. Revoking at the platform is
stronger than deleting the secret, because it invalidates any copy that leaked.

## 6. Undo the database (deliberate, and rarely right)

The migration is additive: it creates new tables and touches nothing that already existed. Rolling
it back means dropping those tables, which destroys the metric history.

```sql
-- Order matters (foreign keys). Only if the tables are genuinely unwanted.
drop table if exists public.publishing_attempts, public.publishing_jobs,
  public.content_approvals, public.social_alerts, public.social_metric_snapshots,
  public.content_publications, public.content_sources, public.content_items,
  public.sync_runs, public.social_account_connections, public.social_accounts cascade;
drop function if exists public.prune_social_ops();
```

Prefer leaving the tables in place and disabling the writers.

## 7. Restore the frozen learning platform

```bash
git checkout learning-platform-frozen-2026-08-18
```

This work does not modify `/learn`, `/admin`, billing, training or course assets, so this should
never be necessary because of it. It remains the backstop.

## What cannot be rolled back from here

- **A published post.** Nothing has been published, which is why this list is short. Once a post is
  live, deleting it is a platform action with its own consequences.
- **A profile edit already applied.** The three changes made on 20 August (Threads website link;
  three extra YouTube links; YouTube website link normalised to the `www` host) are ordinary
  reversible profile fields — undo them by hand.
- **The deleted Threads CalmSignal post**, deleted in an earlier session with owner approval.
