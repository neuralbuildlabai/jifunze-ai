# Social operations dashboard

**Route:** `/admin/social-ops` (+ `/accounts`, `/pipeline`, `/safety`)
**Not linked from anywhere public.** A test asserts the public site contains no link to it.

## Isolation from the frozen learning platform — read this first

`/admin` is frozen at `learning-platform-frozen-2026-08-18`. The social-ops console therefore:

- is mounted as a **sibling** route in `src/App.tsx`, not inside `<AdminShell>`, and not inside
  `RequireEmailVerified` / `RequireDisclaimerAcknowledged`;
- uses its own guard, `RequireSocialOpsAccess`, not `RequireAdminAccess`;
- uses its own shell, `SocialOpsShell`, not `AdminShell`;
- imports nothing from `components/admin/platform/`, `components/learn*` or `components/training`.
  A test enumerates the import specifiers of every console file and fails if that changes.

**Deleting the social-ops route block from `src/App.tsx` restores the frozen admin behaviour
exactly.** Nothing else would need to be undone.

The only shared code is read-only tier resolution — `useAppAccess`, `isAdminTier` — which is not
modified.

### One deliberate difference from the frozen admin guard

`RequireAdminAccess` has a Playwright bypass for its no-Supabase test bundle. `RequireSocialOpsAccess`
**does not**. A bypass on an operations console is a bigger risk than a gap in end-to-end coverage.
Without Supabase the console renders a closed state and no data, which the e2e suite asserts.

## Authorization

Three layers, and the browser is never the boundary:

1. **UI routing** — `RequireSocialOpsAccess` checks `isAdminTier(tier)`. Convenience only.
2. **Row Level Security** — every social-ops table gates `SELECT` on `public.is_admin()`. A
   non-admin session reaching the data layer gets zero rows.
3. **Server-side re-check** — `social-ops-admin` validates the session with `auth.getUser()`, then
   re-evaluates `public.is_admin()` for that user, then applies a rate limit. The browser's opinion
   of its own tier is never trusted.

## What it shows

### Executive overview
Total audience · follower growth over 7/30/90 days · total views · reach/impressions · engagement ·
engagement rate · top content · top platform · top content pillar · last two-hour sync status ·
open alerts.

Two figures are deliberately shown as `—` with an explanation rather than as a number:
**website traffic from social** (no analytics source is connected) and **Kazi Kit conversions**
(the Kazi Kit does not exist). Inventing either would be worse than an empty cell.

**A dash means "no reading exists", not zero.** `sumLatest()` returns `null` when nothing has
synced, and `formatMetric(null)` renders `—`. `growthSince()` returns `null` unless both ends of the
comparison exist, because a single reading is not a trend.

### Account health
Per platform: connected / disconnected / manual-only / approval-pending · token status and expiry
(with a warning inside 7 days and an explicit "expired") · last successful sync with a stale label ·
last publish attempt and last successful publication · current profile URL · profile completeness ·
errors · required action. Plus the full capability matrix.

### Content pipeline
Ledger totals · awaiting approval · approved-but-unpublished · published · blocked by safety ·
publications queued and failed · recent sync runs (dry run vs live) · publication records.

### Safety controls
`IG_PUBLISH_ENABLED` · the global kill switch · per-platform enable state · approval requirement ·
duplicate protection · broken-link protection · prohibited-CTA checks · relevance checks ·
failed-publication alerts.

**The safety page is read-only by construction.** It contains no button that acts. It shows where
each switch lives and the exact command to change it. A browser control that could flip a production
kill switch would put it one mis-click from off. A test asserts the page has no acting button.

The one mutating control anywhere in the console is *Refresh metrics now*, which calls
`social-ops-admin` — server-authorized, rate limited to one manual refresh every 5 minutes across
all operators, and incapable of publishing anything.

## Data flow

```
Postgres ──RLS: is_admin()──> loadSocialOpsSnapshot() ──> pure derivations ──> React
                                (anon key, browser)      socialOpsSummary.ts
```

Every derivation lives in `src/services/socialOps/socialOpsSummary.ts` as a plain function over
plain data, so the arithmetic is unit-tested with no browser and no network. The React layer only
renders what those functions return.

## Remaining integrations

| Integration | Blocked on |
|---|---|
| Facebook, Threads, YouTube, LinkedIn, Pinterest, TikTok tiles | the platform approvals and credentials in the adapter matrix |
| Website traffic from social | choosing and connecting an analytics source |
| Kazi Kit conversions | the Kazi Kit existing |
| Signal-ingestion counts | surfacing `ingested_signals` in the pipeline tab |
| Alert resolution from the UI | a server action; deliberately not built until alerts actually fire |
