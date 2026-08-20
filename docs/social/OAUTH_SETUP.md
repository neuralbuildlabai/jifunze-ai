# OAuth and developer-app setup guide

One section per platform: what to register, which scopes to request, what review stands in the way,
and which **variable names** to set. No secret value appears here, and none ever should.

Work in this order — it is cheapest-first and each step is independently useful.

---

## 1. Facebook Page (no review needed — do this first)

The Meta app already exists: App ID `2103314297276618`, Business portfolio `1711314434327622`.

1. Graph API Explorer → select the app → select the Page **Jifunze.AI** (`61593186673039`).
2. Request `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `pages_manage_metadata`.
3. Exchange the short-lived user token for a long-lived one, then read `/me/accounts` to get the
   **Page** access token.
4. Better for an unattended job: create a **Business Manager system user**, assign the Page, and
   issue a system-user token — it does not expire.
5. Set `FB_PAGE_ID` and `FB_PAGE_ACCESS_TOKEN`.
6. Verify: `npm run social:sync:dry-run -- --platform=facebook`.

Standard Access already covers the brand's own assets. Business Verification is **not** required and
stays deferred.

## 2. Threads (app review required)

Threads needs its **own** Meta app with the Threads use case. The Instagram app id and secret do not
work — this trips people up.

1. developers.facebook.com → Create App → add the **Threads** use case.
2. Scopes: `threads_basic` (always), `threads_manage_insights`, and `threads_content_publish` only
   when publishing is actually wanted.
3. OAuth → short-lived token (1 hour) → exchange for long-lived (60 days) → refresh via
   `GET /refresh_access_token` before day 60. Permission grants last 90 days for public profiles.
4. `GET /me` returns the **Threads** user id — not the Instagram id.
5. Set `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN`.
6. **App review** is required before non-tester accounts can grant the publishing scopes. Insights
   for your own account work sooner; publishing does not.

## 3. YouTube (Google Cloud project + compliance audit)

1. Google Cloud Console → new project → enable **YouTube Data API v3** and **YouTube Analytics API**.
2. OAuth consent screen: External, add the channel's Google account as a test user.
3. Create an OAuth **Desktop** client; run the consent flow once with `access_type=offline` and
   `prompt=consent` to obtain a refresh token.
4. Scopes: `youtube.upload`, `youtube.readonly`, `yt-analytics.readonly`.
5. Set `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`,
   `YOUTUBE_CHANNEL_ID` (`UCnvVNH52XiLQoNryE1p74Yg`).

**Two traps.** While the consent screen is in *Testing*, refresh tokens expire after **7 days** — an
unattended loop will break weekly until the app is *Published*. And `videos.insert` costs ~1,600 of
a 10,000 unit/day quota, so ~6 uploads/day is the real ceiling; file the **YouTube API Services
Audit and Quota Extension Form** for more. Assume an unaudited project's uploads land private and
verify on the first real upload rather than trusting a doc.

## 4. Pinterest (Trial → Standard review)

1. developers.pinterest.com → create an app against the **business** account `jifunzeai`.
2. Scopes: `boards:read`, `boards:write`, `pins:read`, `pins:write`, `user_accounts:read`.
3. OAuth: access token ~30 days, refresh token ~365 days.
4. Set `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET`, `PINTEREST_REFRESH_TOKEN`.

**Trial access creates sandbox Pins that only you can see.** Standard access needs a working OAuth
flow, a published privacy policy (`/privacy` covers this once deployed) and a screen recording of
the app performing a real API action.

Separately, the **domain claim** completes the moment the deployed site serves the `p:domain_verify`
tag already in `index.html` and you press *Claim* in Pinterest settings. The alternative is a DNS
TXT record with the same value. That value is a public verification string, not a secret.

## 5. LinkedIn (vetted product)

1. developer.linkedin.com → create an app → **verify it against the Jifunze.AI Page** (an admin of
   the Page must approve; org `114444495`).
2. Request the **Community Management API** product.
3. Scopes: `r_organization_social`, `w_organization_social`, `rw_organization_admin`.
4. OAuth: access token 60 days, refresh token 365 days.
5. Set `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_REFRESH_TOKEN`,
   `LINKEDIN_ORG_URN` = `urn:li:organization:114444495`.

Development Tier first (500 requests per app, 100 per member per day), then Standard Tier via a
screencast demonstrating each use case.

## 6. TikTok (client audit — the hardest gate here)

1. developer.tiktok.com → create an app → add **Content Posting API** and **Display API**.
2. Scopes: `user.info.basic`, `video.upload`, `video.publish`.
3. OAuth with the `@jifunze_ai` account — **which first requires being able to sign into it**.
4. Set `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_REFRESH_TOKEN`.

Until the **client audit** passes, every video posted through the API is forced to `SELF_ONLY`
(private) and the client may serve at most 5 users per 24 hours. Query `creator_info` before each
post to read the privacy levels actually permitted, and obtain creator consent. Do not mark TikTok
ready without the audit.

## 7. Telegram (no review, no cost — but needs approval to create)

1. Create the channel `@jifunze_ai` (needs a phone number).
2. @BotFather → `/newbot` → get the bot token → add the bot as a **channel administrator**.
3. Set `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHANNEL_ID` (`@jifunze_ai`).

No OAuth, no app review, no per-post fee. The cheapest automation surface available — but an empty
channel with daily bot posts is not a win, so build it once there is an audience to route into it.

## 8. X — do not do this without a budget decision

X retired its free tier in 2026. Roughly $0.015 per post, ~$0.200 with a link, against prepaid
credits. One daily link post is about $6/month before reads. **Nothing was purchased and no
developer account was created.** X stays a manual channel until someone decides to spend.

## 9. WhatsApp Channel — nothing to set up

There is no Channel API. Do not use a third-party "WhatsApp Channel API" vendor: they drive an
unofficial client and risk the number being banned. Use the manual distribution queue.

---

## After any of the above

```bash
npm run social:sync:dry-run                 # connection report for every platform
npm run social:sync:dry-run -- --platform=<id>
```

The dry run prints exactly which variable names are still missing per platform, and never prints a
value.
