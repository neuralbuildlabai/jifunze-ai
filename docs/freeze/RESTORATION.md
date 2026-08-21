# Restoring Jifunze Learn

The Learn platform is preserved at commit `78062b1` behind the annotated tag
`jifunze-learn-frozen-2026-08-21` and the branch `archive/jifunze-learn` (both on `origin`).

## Inspect the frozen platform

```bash
git fetch origin --tags
git checkout jifunze-learn-frozen-2026-08-21          # detached HEAD at the frozen commit
# or
git switch archive/jifunze-learn
npm ci && npm run dev                                  # full Learn platform, locally
```

## Restore a single file or directory

```bash
git checkout jifunze-learn-frozen-2026-08-21 -- src/components/learn/
```

## Restore the whole platform to production (full rollback of the pivot)

1. Revert the pivot PR's merge commit on `main` (`git revert -m 1 <merge-sha>`), or branch from
   `archive/jifunze-learn` and open a restoration PR.
2. Redeploy on Vercel (the frozen commit builds as-is; no migration is needed because no
   migration was applied or removed by the pivot).
3. Re-deploy the Stripe Edge Functions **only** if course payments are being reactivated, and
   re-enable the Stripe webhook endpoint in the Stripe dashboard (it is expected to be disabled
   as an owner action — see `BACKUP_CHECKLIST.md`).

## What restoration does NOT require

- No database restore: course tables and rows were never dropped or modified by the pivot.
- No storage restore: `capstone_submissions` and its objects were never deleted.
- No migration replay: the active branch retained every migration file unchanged.

## Related archives

- `archive/wip-pre-pivot-2026-08-21` — unreviewed snapshot of the pre-pivot working-tree WIP
  (retired-SaaS cleanup + tenant-detach refactor). **Never merge wholesale**; see
  `WIP_RECONCILIATION.md`.
- `feat/jifunze-brand-refresh` (@`83029f0`, from `jifunze-brand-refresh.bundle`) — an earlier
  SVG-lockup brand experiment kept for reference.
