# Archival snapshot — pre-pivot WIP (2026-08-21)

This branch is an **unreviewed archival snapshot** of uncommitted work-in-progress
captured from the owner's working tree on 2026-08-21 as
`_xfer/jifunze-wip-2026-08-21.patch`
(SHA-256 `030b097f78f85fc0016e28ff3e08fe68e58a2765a719be0c7e5aec214e46d410`).

- Base: `78062b1` (tree-identical to `14b183e`, the commit the diff was taken from).
- Content: ~236 deletions + 25 modifications — primarily a retired-SaaS cleanup and an
  unfinished tenant/persistence detach refactor. It is **NOT** a correct Learn-removal
  implementation: it deletes at least ten files the 2026-08 audits classify as
  Preserve or Refactor-first (e.g. `src/auth/bootstrapTenant.ts`, `src/persistence/*`,
  `src/config/demoBrands.ts`, `src/config/demoSocialAccounts.ts`, kept types).
- **Do not merge this branch wholesale.** Individual files or hunks may be lifted into
  themed, reviewed PRs via `git show archive/wip-pre-pivot-2026-08-21:path`.
- See `docs/freeze/WIP_RECONCILIATION.md` on the pivot branch for the full comparison
  against the removal decision matrix.
