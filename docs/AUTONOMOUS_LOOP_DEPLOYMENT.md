# Autonomous loop — deployment

> **Day-to-day operation, commands, quality tiers and troubleshooting live in
> [`video-pipeline.md`](./video-pipeline.md).** This document covers setup/status only.

The loop that runs unattended: **score → brief → render → upload → publish**,
daily, in GitHub Actions (free runtime). Signal ingestion is a separate Supabase
cron (see SIGNAL_INGESTION_DEPLOYMENT.md); the workflow also pokes it first.

Proven working 2026-08-18: score/brief/render chain passed a 10-assertion test
(off-brand filtering, ranking, brief shape, 1080×1920 render).

## One-time setup

1. **Apply migrations + deploy functions**
   ```bash
   supabase db push
   supabase functions deploy ingest-signals
   supabase functions deploy publish-instagram
   supabase functions deploy refresh-ig-token
   ```

2. **Supabase secrets** (values you hold; never commit)
   ```bash
   supabase secrets set INGEST_SECRET="$(openssl rand -hex 32)"
   supabase secrets set PUBLISH_SECRET="$(openssl rand -hex 32)"
   supabase secrets set IG_ACCESS_TOKEN="<from Meta token step>"
   supabase secrets set IG_USER_ID="17841433836747759"
   supabase secrets set OPENAI_API_KEY="<optional; omit to run $0 template briefs>"
   # DO NOT set IG_PUBLISH_ENABLED yet — leave it unset so nothing posts.
   ```

3. **GitHub → Settings → Secrets and variables → Actions**
   - Secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `PUBLISH_SECRET`,
     `INGEST_SECRET`, `OPENAI_API_KEY` (optional), `PEXELS_API_KEY` (optional, free).
   - Variables: `DRY_RUN=true` (start here), `VISUAL_PROVIDER=stock`.

## Rehearse safely (nothing posts)

- With `DRY_RUN=true`: the loop scores, writes a brief, renders, and stops before
  upload/publish. Check the Action logs and the rendered artifact.
- Then set `DRY_RUN=false` but leave `IG_PUBLISH_ENABLED` unset: it uploads and
  calls publish-instagram, which **refuses to post** (returns skipped) — so you
  see the full chain including a real public video URL, still without posting.

## Go live

- Set the Supabase secret `IG_PUBLISH_ENABLED=true`. From the next run, it posts
  one Reel/day to @jifunze.ai. Flip it back to remove/`false` to pause instantly.

## Cost
- GitHub Actions minutes: free tier.
- OpenAI: pennies/run (omit the key to run $0 template briefs).
- Pexels / FFmpeg / Supabase free tier / Meta API: free.
- AI visuals stay OFF unless `VISUAL_PROVIDER=ai`.

## Schedule
- Loop: `.github/workflows/autonomous-loop.yml` cron `0 16 * * *` (~19:00 Nairobi).
- Token refresh: run refresh-ig-token weekly (pg_cron or a second GH cron); it
  reports when the token must be rotated into secrets.
- Prune: `select public.prune_ingested_signals(30); select public.prune_reels(7);`
