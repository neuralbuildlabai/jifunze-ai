# Two-hour metrics synchronisation

**Schedule:** `0 */2 * * *` — every two hours, on the hour, UTC.
**Constant:** `SOCIAL_SYNC_CRON` in `orchestrator/social/sync.ts`. A test asserts the workflow file
and the constant agree, so documentation cannot drift from the code.
**Workflow:** `.github/workflows/social-metrics-sync.yml`
**Entry point:** `npm run social:sync` / `npm run social:sync:dry-run`

> ## NOT ACTIVE
> Every job in the workflow is gated on the repository variable `SOCIAL_SYNC_ENABLED == 'true'`,
> which is intentionally unset. The schedule fires and the run short-circuits in a visible `gate`
> job. That is deliberate: it proves the cron works before it is allowed to do anything.

## What a run does

1. Load the enabled social accounts and the publications worth refreshing.
2. For each platform, validate the credentials it needs — **presence only, never a value**.
3. Fetch account metrics, then post metrics for that platform's tracked post ids.
4. Match results to canonical publication records by `(platform, platform_post_id)`.
5. Store a timestamped snapshot keyed to the two-hour window.
6. Update `last_sync_attempt_at`, `last_successful_sync_at`, `last_sync_status`, `last_error_summary`.
7. Detect anomalies; write alerts.
8. Close the run with per-platform ok / skipped / failed counts.

## The guarantees, and how each is met

| Guarantee | Implementation |
|---|---|
| **Per-platform failure isolation** | Each platform runs inside its own try/catch. A failure is recorded and the loop continues. A test asserts every platform is still attempted after earlier ones fail |
| **Rate-limit handling and backoff** | `isRetryable()` treats 429/5xx/timeouts as retryable; `backoffMs()` is exponential with deterministic jitter, capped at 30s; three attempts by default |
| **Idempotency** | Snapshots are keyed on `(platform, subject_type, subject_id, window_start)`. `snapshotWindow()` floors to a two-hour boundary, so a re-run in the same window upserts |
| **Structured logs** | One JSON line per event: `social_sync.start`, `.platform_error`, `.platform_done`, `.finish` |
| **No secret logging** | Every error goes through `safeErrorSummary()`. A test injects a fake token into the environment and asserts it never appears in the log stream |
| **Stale-data labelling** | `freshness()` marks anything older than 1.5 windows stale; the dashboard shows the age, and a platform keeps its last snapshot rather than being blanked |
| **Manual refresh endpoint** | `social-ops-admin` with `action: refresh_metrics` |
| **Manual refresh rate limit** | One every 5 minutes across all operators, enforced server-side against `sync_runs`; returns HTTP 429 |
| **Clear "last updated" timestamps** | `captured_at` on every snapshot, `last_successful_sync_at` per platform, surfaced on the dashboard |
| **Unit + integration tests** | `scripts/test-social-ops.ts` — dry run writes nothing, isolation, skip-not-failure, restricted runs, backoff, retryability, window idempotency, anomaly detection, secret-free logs |
| **Dry-run mode** | `--dry-run` or `DRY_RUN=true`. Performs every decision and writes nothing |

## A missing credential is a SKIP, not a failure

This matters more than it looks. Nine of ten platforms have no credentials today. If that were a
failure, the job would alert every two hours forever and the alerts would be ignored within a day.

An `AdapterUnavailableError` — no credential, unpassed approval, paid access — is classified
`skipped`, with the adapter's own message naming the missing variables and the blocker. Only an
unexpected error is `failed`, and only a `failed` writes an alert. A test asserts that a run with an
entirely empty environment produces zero alerts.

The CLI exits 0 when platforms are merely skipped, and 1 only when something actually failed.

## Anomaly detection

Deliberately conservative — two rules, both of which almost certainly mean an API fault rather than
a real event:

- Follower count halved or worse since the previous reading.
- Follower count reported as zero after a non-zero reading.

A first reading is never an anomaly. Better to miss a subtle problem than to train an operator to
ignore the alert stream.

## Dry-run result, 20 August 2026

```
run sync-2026-08-20T04:00:00.000Z (dry run — nothing written)
  refreshed : none
  skipped   : instagram, facebook, threads, tiktok, youtube, linkedin, x, pinterest, telegram
  failed    : none
```

Every platform skipped with a specific, actionable reason. Zero failures, zero alerts, nothing
written. That is the correct outcome for the current credential state.

## Activating it (owner, after review)

1. Review and apply `supabase/migrations/20260820120000_social_ops_core.sql`.
2. Add the secrets in `docs/social/ENVIRONMENT_VARIABLES.md` for whichever platforms are connected.
3. Run the workflow manually with `dry_run: true` and read the log.
4. Set `SOCIAL_SYNC_ENABLED=true`.
5. Watch the first two scheduled runs before trusting the dashboard numbers.

Steps 1–3 are safe. Step 4 is the activation.
