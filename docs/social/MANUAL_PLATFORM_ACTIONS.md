# Manual platform actions

Only actions that genuinely require the owner: a login this machine does not have, an approval only
a human can give, a payment, or an irreversible platform change.

## Blocks the launch

| # | Action | Platform | Why it needs you | Time |
|---|---|---|---|---|
| ~~1~~ | ✅ **DONE — 20 Aug 2026, by the owner.** TikTok is closed: display name → `Jifunze.AI`, username unchanged (`@jifunze_ai`), career-skills bio added, approved violet avatar applied, and the obsolete 16 Apr 2026 `/generate` promotional video **permanently deleted**. No obsolete TikTok content remains. **No agent is to attempt any further TikTok change.** See `TIKTOK_DELETION_RECORD.md` | TikTok | — | done |
| 2 | **Set the Instagram display name and bio link in the app** | Instagram | Instagram's desktop web no longer exposes the Name field and states that link editing is mobile-only. Verified again 20 Aug. Until this is done the bio drives nobody anywhere, and Instagram is the primary publishing target | 3 min |
| 2b | **Add the Threads website link in the app** — `https://www.jifunze.ai` | Threads | Desktop web accepts the link, displays it, then discards it on reload. Verified twice, with and without the `www` host. Threads appears to inherit Instagram's mobile-only link-editing constraint | 1 min |
| 3 | **Delete or hide 2 LinkedIn posts and 3 X posts** | LinkedIn, X | They still sell the removed SaaS ("Jifunze.AI is live. Create smarter social content in seconds.") and the frozen learning platform. Same 16 Apr launch campaign as the TikTok video you already deleted. Deleting public content on your behalf is outside this assignment | 5 min |

## Needed before automation

| # | Action | Why |
|---|---|---|
| 4 | Confirm `hello@jifunze.ai` receives mail | It is published on Facebook, LinkedIn and YouTube. It cannot be verified without sending mail or opening the mailbox, so it is not claimed as verified |
| 5 | Confirm MFA is on for Meta, X, TikTok, LinkedIn, Pinterest and the Google account behind YouTube | No security setting was inspected or changed by this work |
| 6 | Retry the YouTube channel name → `Jifunze.AI` | Rate-limited 20 Aug: *"You entered too many names that can't be used. Try again in 24 hours."* |
| 7 | Decide the Facebook Page name → `Jifunze.AI` | Changing it locks the name for 60 days |
| 8 | Decide the Facebook vanity URL `facebook.com/jifunze.ai` | Never claimed, free today. A new claim, not a change |
| 9 | Decide whether to remove Facebook's "Hours: Always open" | It appeared automatically when the street address was cleared |

## Developer access (each is its own decision)

| # | Action | Cost | Unblocks |
|---|---|---|---|
| 10 | Issue a Facebook Page access token (ideally a system-user token) | $0 | Facebook metrics and publishing — the cheapest next platform |
| 11 | Register a Threads-use-case Meta app and file app review | $0 | Threads insights, then publishing |
| 12 | Create a Google Cloud project, publish the consent screen, file the YouTube audit | $0 | YouTube analytics and uploads |
| 13 | Verify a LinkedIn developer app against the Page, request Community Management API | $0 | LinkedIn analytics and publishing |
| 14 | Create a Pinterest app, then Trial → Standard review | $0 | Real Pins rather than sandbox Pins |
| 15 | Pass the TikTok client audit | $0 | Public posts through the API |
| 16 | **Approve paid X access** | ~$6/month for one daily link post | X automation. Currently manual-only under the no-spend rule |
| 17 | Approve creating a Telegram channel + bot | $0 | The cheapest new automated surface |
| 18 | Approve creating a WhatsApp Channel | $0 | The highest-fit audience — but manual posting forever, no API exists |

## Code and infrastructure

| # | Action |
|---|---|
| 19 | **Review this branch** |
| 20 | **Review the migration** `20260820120000_social_ops_core.sql` before applying it |
| 21 | **Push `chore/harden-autonomous-content-loop`** — see `FINAL_REVIEW_2026-08-20.md` §Push. The commits exist locally; neither this session's sandbox nor the local agent VM has network access to GitHub, so the push is a one-line owner action |
| 22 | **Deploy** the site (also completes the Pinterest domain claim) |
| 23 | Deploy the `social-ops-admin` Edge Function |
| 24 | **Activate the two-hour cron** by setting `SOCIAL_SYNC_ENABLED=true` — after a manual dry run |
| 25 | **Approve the first supervised post** |
| 26 | **Enable `IG_PUBLISH_ENABLED`** — later, and only after 25 |
| ~~27~~ | ✅ **DONE — 20 Aug 2026.** `generate-public` and `generate-content` were confirmed deployed in project `gkhvhisuvcfbsicwjdvm` and have been deleted; `generate-content` was verified to have no runtime caller first. The remote list is now exactly `ingest-signals`, `publish-instagram`, `refresh-ig-token` — no current engine function was removed. Local references cleaned. See `docs/social/EDGE_FUNCTION_CLEANUP_2026-08-20.md` |
| 28 | *(Optional, separate decision)* Drop the now-orphaned `public_generate_daily_usage` table. It was the rate limiter for the deleted `generate-public`. Its migration stays as-is — a migration must never be edited after it has run |
