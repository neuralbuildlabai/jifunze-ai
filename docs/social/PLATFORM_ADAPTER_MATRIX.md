# Platform adapter matrix

**Source of truth in code:** `src/social/platformMatrix.ts`. This document explains it; the file
governs. A test asserts that Instagram is the only platform classified `ready`.

## Readiness classification

| Class | Means |
|---|---|
| **Ready** | Credentials exist, the API is approved, the adapter works end to end |
| **Code-ready, credentials missing** | The adapter is written; a developer app, OAuth token or account link is absent |
| **API approval required** | A platform review or audit must be passed before real publishing is possible |
| **Paid access required** | The API works but costs money per call or per post — blocked by the no-spend rule |
| **Manual only** | No usable publishing API exists; a human posts it |
| **Unsupported** | Not supported and not planned |

> An adapter whose code is finished but which has no credentials is **never** `ready`. Pretending
> otherwise is how an operator ends up trusting a channel that cannot post.

## The matrix

| Platform | Read metrics | Publish | Credentials | Approval | Cost | Current status |
|---|---|---|---|---|---|---|
| Instagram | account + post | yes | ✅ present (`IG_ACCESS_TOKEN`, `IG_USER_ID`) | Standard Access already covers own assets | $0 | **Ready** — publishing still gated by `IG_PUBLISH_ENABLED=false` and by human approval |
| Facebook Page | account + post | yes | ❌ no Page token issued to the server | none beyond the existing Standard Access | $0 | **Code-ready, credentials missing** |
| Threads | account + post | yes | ❌ | **App review**, and a separate Meta app with the Threads use case — the Instagram app id does not work | $0 | **API approval required** |
| TikTok | account + post | yes | ❌ | **Client audit.** Unaudited clients force every posted video to `SELF_ONLY` and may serve at most 5 users/24h | $0 | **API approval required** — also no sign-in access to the account |
| YouTube Shorts | account + post | yes | ❌ no Google Cloud project | **Compliance audit** for quota and public uploads | $0 | **API approval required** |
| LinkedIn | account + post | yes | ❌ | **Vetted product.** Development Tier → Standard Tier via screencast review; app must be verified against the Page | $0 | **API approval required** |
| X | account + post | yes | ❌ | none beyond a developer account | **~$0.015/post, ~$0.200 with a link** | **Paid access required** — manual-only under the no-spend rule |
| Pinterest | account + post | yes | ❌ | Trial → Standard review; Trial Pins are sandbox-only | $0 | **API approval required** |
| Telegram | subscriber count only | yes | ❌ channel and bot do not exist | none | $0 | **Code-ready, credentials missing** — the cheapest new surface once approved |
| Bluesky | account + post | yes | ❌ no app password issued to the server | **none — no developer app, no OAuth, no review** | $0 | **Code-ready, credentials missing** — the lowest-friction surface in this table |
| WhatsApp Channel | — | **no** | — | — | $0 | **Manual only — no Channel API exists** |

## Why Bluesky is the outlier

Every other unready platform here is blocked by someone else's decision — an app review, an audit,
a vetted-product queue, a bill. Bluesky is blocked only by us not having created a credential yet:

- **Reads need no credential at all.** `public.api.bsky.app` serves profile and post views
  unauthenticated, so account and post metrics are readable the moment the account exists. No other
  platform in this table can say that.
- **Writes need one app password**, created by the owner in Settings → App Passwords and exchanged
  for a session via `com.atproto.server.createSession`. There is no developer app, no OAuth consent
  screen, no platform review and no cost.
- **The catch:** an app password is a *full-account* credential. It cannot be scoped to posting
  alone, and it can change the account's data. It therefore belongs in server-side secrets only
  (`BLUESKY_HANDLE`, `BLUESKY_APP_PASSWORD`), never in the browser bundle, and it should be revoked
  and reissued rather than reused across environments.

None of that weakens the publish path: Bluesky posts pass through the same fail-closed human
approval gate and the same prohibited-claims linter as Instagram. Being easy to connect is not the
same as being allowed to post.

## Cost note on X

X retired its free tier in 2026 and charges per use against prepaid credits: roughly $0.015 per
post created and about **$0.200 when the post contains a link**. One daily link post is about
**$6/month** before any read calls. `XAdapter.estimatedMonthlyCostUsd(postsPerDay, withLink)`
computes this so the number is in front of whoever approves it. Nothing was purchased.

## WhatsApp Channel — why it is manual, permanently, for now

Verified against Meta's own documentation: the WhatsApp Business Platform documents the Cloud API,
the On-Premises API, the Business Management API and Embedded Signup. **Channels are not part of
any of them.** Third-party vendors advertising a "WhatsApp Channel API" drive an unofficial client
and risk the number being banned; they must not be used.

`WhatsAppChannelAdapter.manualTask()` therefore produces a distribution queue item — the message,
the attachment and a five-step checklist a person follows on a phone — instead of pretending to
post. That is the entire capability, honestly expressed.

## The common interface

Every adapter implements `PlatformAdapter` (`orchestrator/social/types.ts`):

| Operation | Notes |
|---|---|
| `validateContent` | Static checks: required fields, prohibited claims, media presence |
| `mediaRequirements` | Dimensions, duration, format, and the platform's own gotchas |
| `validateConnection` | Env-var **presence** only. Never reads or returns a value |
| `prepare` | Pure platform-specific copy (see `orchestrator/social/transform.ts`) |
| `publish` | Upload → create → poll → return post id and URL |
| `fetchAccountMetrics` | Account-level numbers |
| `fetchPostMetrics` | Per-post numbers for the given post ids |

Anything a platform's current readiness does not permit throws `AdapterUnavailableError` carrying
the operator-facing blocker. Adapters never silently no-op, and never fabricate a success.

Instagram publishing is delegated to the existing `publish-instagram` Edge Function so the
long-lived token, the kill switch and the idempotency key all stay server-side — the adapter never
sees the Instagram token.

## Conscious non-goal

Browser scraping is not a publishing mechanism here and never will be. Official APIs only.
