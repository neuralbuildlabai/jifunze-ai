# Owner-run backup checklist (before merging the pivot PR)

These steps need production credentials and are therefore owner-run. Nothing in the pivot
branch performs them. Check each off before merging.

- [ ] `supabase db dump -f jifunze-learn-freeze-2026-08-21.sql` (schema + data) from the
      production project, stored somewhere durable outside the repo. **Never commit it.**
- [ ] Export the `capstone_submissions` storage bucket (Supabase Studio → Storage → download, or
      `supabase storage cp` per object) to the same durable location.
- [ ] Stripe dashboard: **disable the webhook endpoint** that pointed at the
      `stripe-webhook` Edge Function; optionally rotate the webhook signing secret.
- [ ] Confirm (read-only) that no pg_cron jobs exist for course or social workloads:
      `select jobid, jobname, schedule from cron.job;`
- [ ] Record completion of the above in this file (date + initials) via a follow-up commit.

Nothing here deletes anything. Deletion of course data is a separate, future, explicitly
approved operation (see `DB_AND_STORAGE_INVENTORY.md` §"Future removal sequence").
