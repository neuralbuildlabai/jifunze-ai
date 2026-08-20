> ## ⚠ SUPERSEDED IN PART — 20 August 2026
>
> The platform research below stands and is still the reference for scopes, limits and costs. Two
> things about it are now out of date:
>
> 1. **"Nothing built" is no longer true.** The dashboard, the schema, the adapters and the
>    two-hour sync exist in this branch. See `docs/social/SOCIAL_OPS_DASHBOARD.md`,
>    `docs/social/SOCIAL_OPS_SCHEMA.md`, `docs/social/PLATFORM_ADAPTER_MATRIX.md` and
>    `docs/social/TWO_HOUR_SYNC.md`.
> 2. **§14's first open decision is decided.** `/admin/social-ops` is mounted *outside* the frozen
>    tree, with its own guard and shell. `/admin` stays frozen. See
>    `docs/AMENDMENT_002_2026-08-20_SOCIAL_OPS.md` §1.3.
>
> The secrets rule at the top of this document is unchanged and still absolute.

---

# Social Ops — API readiness

**Purpose:** the reference sheet for the planned internal dashboard at `https://www.jifunze.ai/admin/social-ops`.
**Date:** 20 August 2026 · **Status:** research and design only — nothing built, no app registered beyond the existing Meta app.
**Authority:** `OPERATIONS.md` (18 Aug 2026) and `docs/AMENDMENT_001_2026-08-18_PIVOT.md`.

> ## Secrets rule — non-negotiable
>
> - No token, app secret, client secret, refresh token, verification code or password is ever written into
>   client-side code, a `VITE_*` variable, a committed file, or any report including this one.
> - Every value below is either public (account URL, numeric ID, scope name) or a *description* of a secret,
>   never the secret itself.
> - Tokens live in GitHub Actions secrets and the server-side environment only. The dashboard reads them through
>   a server route; the browser never sees them.
> - `/admin/social-ops` sits under `/admin`, which is **frozen** at `learning-platform-frozen-2026-08-18`.
>   Building it requires a deliberate decision to unfreeze or to mount the route outside the frozen tree.
>   This document does not authorise that work.

---

## 1. At a glance

| Platform | Read metrics | Publish via API | Free | Approval needed | Ready today |
|---|---|---|---|---|---|
| Instagram | Yes | Yes | Yes | Already have Standard Access | **Yes** |
| Facebook Page | Yes | Yes | Yes | Already have Standard Access | **Yes** |
| Threads | Yes | Yes | Yes | App review for non-testers | Near |
| YouTube | Yes | Yes | Yes (quota-capped) | Audit for quota / public uploads | Near |
| TikTok | Yes | Yes, but private until audited | Yes | Client audit | No |
| Pinterest | Yes | Yes, sandbox until upgraded | Yes | Trial → Standard review | No |
| LinkedIn | Yes | Yes | Yes | Community Management API vetting | No |
| X | Yes | Yes | **No — pay per post** | Account + credits | Blocked by cost |
| Bluesky | Yes | Yes | Yes | None | **Yes, if account created** |
| Telegram | Partial | Yes | Yes | None | **Yes, if channel created** |
| WhatsApp Channel | No | **No API exists** | — | — | Manual only |

---

## 2. Instagram — `@jifunze.ai`

| Field | Value |
|---|---|
| Public URL | `https://www.instagram.com/jifunze.ai` |
| Identifier | IG Business Account ID `17841433836747759` |
| API | Instagram Graph API (Content Publishing + Insights) |
| Developer app | Meta App ID `2103314297276618` (existing), Business `1711314434327622` |
| Scopes | `instagram_basic`, `instagram_content_publish`, `instagram_manage_insights`, `pages_show_list`, `pages_read_engagement` |
| Token | Long-lived Page access token, 60 days, refreshable. A Business Manager **system user** token does not expire and is the right choice for an unattended loop. Stored as a GitHub Actions secret. |
| Profile metrics | followers, reach, profile views, accounts engaged |
| Post metrics | reach, likes, comments, saves, shares, plays / watch time for Reels |
| Publishing | Yes — two-step container then publish. Rolling limit **25 published posts per 24 hours** per account (Meta has used 25 and 50 at different times; read `content_publishing_limit` before each run rather than trusting a constant). |
| Webhooks | Yes — `comments`, `mentions`. Not needed for v1. |
| Cost | $0 |
| Review | Standard Access already covers the brand's own assets. Advanced Access / Business Verification is **not** required and stays deferred. |
| Connection status | Credentials exist. Publishing is gated by `IG_PUBLISH_ENABLED=false`. |

## 3. Facebook Page — `Jifunze.AI`

| Field | Value |
|---|---|
| Public URL | `https://www.facebook.com/profile.php?id=61593186673039` (vanity URL still pending) |
| Identifier | Page ID `61593186673039` |
| API | Facebook Graph API — Pages |
| Developer app | same Meta app as Instagram |
| Scopes | `pages_manage_posts`, `pages_read_engagement`, `pages_manage_metadata`, `pages_show_list` |
| Token | Page access token (60 days) or system user token (no expiry) |
| Profile metrics | page follows, page impressions, page views |
| Post metrics | impressions, reactions, comments, shares, video views |
| Publishing | Yes — text, photo, link, video and Reels |
| Webhooks | Yes — `feed`, `mention` |
| Cost | $0 |
| Review | Covered by the same Standard Access |
| Connection status | Same app, same token family as Instagram. Not yet wired. |

## 4. Threads — `@jifunze.ai`

| Field | Value |
|---|---|
| Public URL | `https://www.threads.com/@jifunze.ai` |
| Identifier | Threads user ID — retrieve via `GET /me` after OAuth (not the Instagram ID) |
| API | Threads API |
| Developer app | **A separate Meta app with the Threads use case.** The Instagram app ID and secret do not work here. |
| Scopes | `threads_basic` (always), `threads_content_publish`, `threads_manage_insights`, `threads_manage_replies`, `threads_read_replies` |
| Token | Short-lived 1 hour → exchange for long-lived **60 days**, refreshable via `GET /refresh_access_token`. Permission grants last 90 days for public profiles. |
| Profile metrics | views, likes, replies, reposts, quotes, follower count |
| Post metrics | views, likes, replies, reposts, quotes |
| Publishing | Yes — text, image, video, carousels, replies |
| Webhooks | Limited; poll instead |
| Cost | $0 |
| Review | App review required before non-tester users can grant the publishing scopes |
| Connection status | Account exists and is corrected. No Threads app registered yet. |

## 5. YouTube — `@jifunze-ai`

| Field | Value |
|---|---|
| Public URL | `https://www.youtube.com/@jifunze-ai` |
| Identifier | Channel ID `UCnvVNH52XiLQoNryE1p74Yg` |
| API | YouTube Data API v3 (+ YouTube Analytics API for deeper metrics) |
| Developer app | Google Cloud project + OAuth client — **does not exist yet** |
| Scopes | `youtube.upload`, `youtube.readonly`, `yt-analytics.readonly` |
| Token | OAuth 2.0 refresh token. While the OAuth consent screen is in *Testing*, refresh tokens expire after 7 days — the app must be moved to *Published* for an unattended loop to survive. |
| Profile metrics | subscribers, views, watch time (Analytics API) |
| Post metrics | views, likes, comments, average view duration, retention |
| Publishing | Yes — `videos.insert`. Default quota is **10,000 units/day plus 100 `videos.insert` calls/day**; an upload costs ~1,600 units, so quota, not the call cap, is the real limit (~6 uploads/day). |
| Webhooks | PubSubHubbub push notifications for new uploads |
| Cost | $0 |
| Review | A **compliance audit** (YouTube API Services Audit and Quota Extension Form) is required for extra quota. Unaudited projects are also restricted in what upload privacy they may set — assume uploads land private until audited and verify on the first real upload. |
| Connection status | Channel exists and is corrected. No Google Cloud project yet. |

## 6. TikTok — `@jifunze_ai`

| Field | Value |
|---|---|
| Public URL | `https://www.tiktok.com/@jifunze_ai` |
| Identifier | `open_id` returned after OAuth |
| API | TikTok Content Posting API + Display API |
| Developer app | developer.tiktok.com app — does not exist yet |
| Scopes | `user.info.basic`, `video.upload`, `video.publish` |
| Token | OAuth access token 24 hours, refresh token 365 days |
| Profile metrics | follower count, profile views (Display API, limited) |
| Post metrics | views, likes, comments, shares |
| Publishing | Yes — **but every video posted by an unaudited client is forced to `SELF_ONLY` (private)**, and an unaudited client may serve at most 5 users per 24 hours. Per-creator caps of roughly 15 posts/day apply either way. |
| Webhooks | Yes, for post status |
| Cost | $0 |
| Review | Client audit required before anything published through the API can be public. This is the single hardest gate of any platform here. |
| Connection status | **No access at all** — the browser is signed into an unrelated account and the Jifunze TikTok credentials are not available. |

## 7. Pinterest — `@jifunzeai`

| Field | Value |
|---|---|
| Public URL | `https://www.pinterest.com/jifunzeai/` |
| Identifier | account username `jifunzeai`; board IDs returned by the API |
| API | Pinterest API v5 |
| Developer app | developers.pinterest.com app — does not exist yet |
| Scopes | `boards:read`, `boards:write`, `pins:read`, `pins:write`, `user_accounts:read` |
| Token | OAuth access token ~30 days, refresh token ~365 days |
| Profile metrics | impressions, saves, outbound clicks, follower count |
| Post metrics | per-Pin impressions, saves, pin clicks, outbound clicks |
| Publishing | Yes — **Trial access creates sandbox Pins visible only to the creator.** Real Pins need Standard access. |
| Webhooks | No |
| Cost | $0 |
| Review | Trial → Standard requires a screen recording of the app performing a real API action, a working OAuth flow and a published privacy policy |
| Connection status | Business account converted 20 Aug 2026. Domain claim **not** completed — needs the verification meta tag deployed (now staged in `index.html`) or a DNS TXT record. |

## 8. LinkedIn — `company/jifunze-ai`

| Field | Value |
|---|---|
| Public URL | `https://www.linkedin.com/company/jifunze-ai/` |
| Identifier | Organization ID `114444495` → URN `urn:li:organization:114444495` |
| API | Community Management API (Posts API + Organization analytics) |
| Developer app | LinkedIn developer app verified against the Page — does not exist yet |
| Scopes | `w_organization_social`, `r_organization_social`, `rw_organization_admin` |
| Token | OAuth access token 60 days, refresh token 365 days |
| Profile metrics | follower count and demographics, page views, unique visitors |
| Post metrics | impressions, clicks, reactions, comments, shares, engagement rate |
| Publishing | Yes — text, image, video, article, document |
| Webhooks | No |
| Cost | $0 |
| Review | Vetted product. Development Tier first (500 requests per app, 100 per member), then Standard Tier, which requires a screencast demonstrating each use case. |
| Connection status | Page exists and is corrected. No developer app. |

## 9. X — `@JifunzeAI`

| Field | Value |
|---|---|
| Public URL | `https://x.com/JifunzeAI` |
| Identifier | numeric user ID via `GET /2/users/me` |
| API | X API v2 |
| Developer app | developer.x.com project — does not exist yet |
| Scopes | `tweet.read`, `tweet.write`, `users.read`, `offline.access` |
| Token | OAuth 2.0 user-context token, 2 hours, refresh token with `offline.access` |
| Profile metrics | followers, public metrics |
| Post metrics | impressions, likes, reposts, replies, bookmarks (owner context) |
| Publishing | Yes |
| Webhooks | Enterprise only |
| **Cost** | **Not free.** X moved to pay-per-usage in 2026: roughly **$0.015 per post created, and $0.200 if the post contains a link**, with credits purchased up front. There is no free tier. |
| Review | None beyond a developer account and prepaid credits |
| Connection status | Account exists and is corrected. **Automation is blocked by the no-spend rule** — a link post costs 20 cents, so one daily link post is about $6/month before any read calls. Treat X as manual-post-only until there is a budget decision. |

## 10. Bluesky — not created

| Field | Value |
|---|---|
| Proposed handle | `jifunze.ai` via DNS (`_atproto` TXT record), verified free — no separate `.bsky.social` name needed |
| API | AT Protocol XRPC (`com.atproto.repo.createRecord`, `app.bsky.feed.post`) |
| Developer app | None — no app registration, no review |
| Auth | App password created in account settings, exchanged for a session token. Store the app password as a server-side secret. |
| Metrics | likes, reposts, replies, follower count |
| Publishing | Yes — text, images, video |
| Rate limits | ~5,000 points/hour and 35,000/day; a create costs 3 points — thousands of posts/day, effectively unlimited here |
| Cost | $0 |
| Review | None |
| Connection status | Account does **not** exist. `jifunze.ai` and `jifunzeai.bsky.social` both resolve to nothing (verified 20 Aug 2026). |

## 11. Telegram — not created

| Field | Value |
|---|---|
| Proposed handle | `@jifunze_ai` (verified free 20 Aug 2026) |
| API | Telegram Bot API |
| Developer app | A bot created through @BotFather, added as an administrator of the channel |
| Auth | Bot token from BotFather. Server-side secret only. |
| Metrics | Telegram exposes subscriber count and per-post view counts in the app; the Bot API itself gives limited analytics (`getChatMemberCount`) |
| Publishing | Yes — `sendMessage`, `sendVideo`, `sendPhoto` to `@channelusername` |
| Rate limits | ~30 messages/second overall, ~20 messages/minute to one chat — far above need |
| Cost | $0 |
| Review | None |
| Connection status | Channel does **not** exist. Requires a phone number to create (the owner's, or +254 796 192425). |

## 12. WhatsApp Channel — not created

| Field | Value |
|---|---|
| Proposed URL | assigned by WhatsApp: `https://whatsapp.com/channel/<opaque-id>` — **channels have no username, so there is no handle to reserve** |
| API | **None.** The WhatsApp Business Platform documents Cloud API, On-Premises API, Business Management API and Embedded Signup. Channels are not part of any of them, verified against Meta's own documentation on 20 Aug 2026. |
| Developer app | N/A |
| Metrics | Follower count and per-update reactions/views are visible in the app only. No programmatic export. |
| Publishing | **Manual, from a phone, by a human.** Third-party "WhatsApp Channel API" vendors exist but they drive an unofficial client and risk the number being banned — do not use them. |
| Cost | $0 |
| Review | N/A |
| Connection status | Not created. If created, it is a manual channel with no dashboard integration beyond a link and a manually entered follower count. |

---

## 13. What the dashboard should do first

Build in this order, because each step is independently useful and the first two need no new approvals:

1. **Read-only tiles for Instagram and Facebook** using the existing Meta app and a system user token. Proves the server-side secret path works.
2. **A publish-state panel**: current value of `IG_PUBLISH_ENABLED`, the last `decision.json`, the last render, and the last publish attempt. This is the operator's kill-switch view and needs no platform API at all.
3. **Threads**, once a Threads-use-case app is registered and reviewed.
4. **YouTube**, once a Google Cloud project exists and the compliance audit is filed.
5. Everything else — TikTok, Pinterest, LinkedIn — only after their respective reviews.
6. **X stays read-only or manual** until someone decides to spend money.

## 14. Open decisions for the owner

| Decision | Why it matters |
|---|---|
| Unfreeze `/admin`, or mount `/admin/social-ops` outside the frozen tree | `/admin` is frozen; the dashboard cannot be built without resolving this |
| Register a Threads-use-case Meta app | Threads is the cheapest new publishing surface and the account already exists |
| Create a Google Cloud project and file the YouTube audit | Without it, uploads are quota-starved and likely forced private |
| Accept or reject X per-post costs | Determines whether X is automated or manual forever |
| Recover TikTok access | Nothing on TikTok — audit, correction or automation — can proceed without it |
