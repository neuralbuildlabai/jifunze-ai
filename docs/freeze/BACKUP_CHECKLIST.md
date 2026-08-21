# Owner-run backup checklist (before merging the pivot PR)

These steps need production credentials and are therefore owner-run. Nothing in the pivot
branch performs them. Check each off before merging.

- [x] `supabase db dump -f jifunze-learn-freeze-2026-08-21.sql` (schema + data) from the
      production project, stored somewhere durable outside the repo. **Never commit it.**
- [x] Export the `capstone_submissions` storage bucket (Supabase Studio → Storage → download, or
      `supabase storage cp` per object) to the same durable location.
- [ ] Stripe dashboard: **disable the webhook endpoint** that pointed at the
      `stripe-webhook` Edge Function; optionally rotate the webhook signing secret.
- [x] Confirm (read-only) that no pg_cron jobs exist for course or social workloads:
      `select jobid, jobname, schedule from cron.job;`
- [x] Record completion of the above in this file (date + initials) via a follow-up commit.

Nothing here deletes anything. Deletion of course data is a separate, future, explicitly
approved operation (see `DB_AND_STORAGE_INVENTORY.md` §"Future removal sequence").

---

**Completion record — 2026-08-21 (owner: Mzalendo/omoke)**

- DB dump: `jifunze-learn-freeze-2026-08-21.sql` (public schema, 49 tables, 2.9 MB),
  SHA-256 `d208c9bb033ab9cec309f22270cc3f022c0d71e5b6e14d93698ac914027600c8`, stored outside the repo in a dated backup folder (plus a second copy).
- pg_cron check: pg_cron not installed - no scheduled jobs (PASS)
- `capstone_submissions` bucket: bucket empty at freeze date - nothing to export (PASS)
- Stripe webhook item: still open — tracked as step 3 of the release-readiness sequence.
