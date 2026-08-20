> ## ⚠ SUPERSEDED — 20 August 2026
>
> Superseded by `docs/social/SOCIAL_ACCOUNT_INVENTORY.md` and
> `docs/social/TIKTOK_DELETION_RECORD.md`, which are the current record.
>
> **One claim in section B below is wrong.** It reports the Threads website link as applied. The
> Threads *Links* section was **empty** when re-checked on 20 August 2026. Two attempts to add it
> from desktop web both vanished on reload — Threads appears to apply Instagram's mobile-only
> link-editing constraint without saying so. It is now an owner action in the Threads mobile app.
> Everything else in section B — display name, avatar, bio, deleted CalmSignal post, zero posts —
> was verified correct.

---

# Jifunze.ai — Social Presence, Part 2: TikTok, Threads and channel expansion

**Date:** 20 August 2026
**Continues:** `jifunze-social-final-report-2026-08-20.md` (Part 1 — the six accounts corrected earlier today)
**Authority:** `OPERATIONS.md` (18 Aug 2026) · `docs/AMENDMENT_001_2026-08-18_PIVOT.md`
**Scope note:** GitHub is entirely excluded from this assignment and does not appear anywhere in this document.

## Corrections to Part 1

Part 1 contained two errors. Both are corrected here and in the Part 1 file itself:

1. **Threads was reported as not existing.** It does exist — `https://www.threads.com/@jifunze.ai`. The 404 that produced
   that claim came from a browser session pointed at an unrelated account. Part 1's "Threads (NOT APPLIED — account does
   not exist)" section is wrong and is now superseded by section B below.
2. **The relevance filter was listed as a live blocker.** It is not. That finding was drawn from `decision.json`, an
   artefact dated 18 Aug 23:50 that pre-dates the hardening in `orchestrator/score.ts` and `orchestrator/select.ts`
   (19 Aug 02:15). The off-brand veto works; a regression test now proves it.

---

# A. TikTok audit — `@jifunze_ai`

**Public state, re-verified 20 August 2026:**

| Field | Live value | Correct value | Verdict |
|---|---|---|---|
| Display name | `Jifunze.AI` | `Jifunze.AI` | ✅ correct |
| Username | `jifunze_ai` | unchanged — do not change | ✅ correct |
| Bio | `Create smarter social content in seconds. Try it free.` | see below | ❌ **wrong product** |
| Avatar | not the current violet mark | `avatar-200.png` | ❌ off-brand |
| Website field | empty | leave empty | ✅ (not eligible below 1,000 followers) |
| Followers / Following / Likes | 0 / 3 / 8 | — | — |
| Posts | none | — | — |

**The bio is the most damaging single string in the whole public presence.** It advertises the multi-tenant social-content
SaaS that was removed in May 2026 and never launched. Section 6 of the amendment says any public claim that brands or
creators can use Jifunze.ai to generate social content is false today and must be corrected on sight. It is still live.

**Replacement bio (72/80 characters):**

```
Career, income & practical AI skills for job seekers and new freelancers.
```

**Status: NOT APPLIED — blocked, not skipped.**

The browser is signed into an unrelated TikTok account (`@calmsignalhq`, a different brand). TikTok's web UI offers only
*View profile* and *Log out* — there is no account switcher — so reaching `@jifunze_ai` means signing out of that account
and signing in with the Jifunze credentials. The brief forbids requesting passwords or authentication codes in chat and
forbids modifying unrelated accounts, so I stopped. I did not touch `@calmsignalhq`.

**To unblock:** sign the browser into `@jifunze_ai` yourself and say so, and I will apply the bio and avatar in one pass.
Both are ordinary reversible profile edits already covered by your batch approval.

---

# B. Threads audit — `@jifunze.ai`

The account exists, is owned, and inherits the Instagram handle.

| Field | Before | After | Status |
|---|---|---|---|
| Display name | `Calm Signal` | `Jifunze.AI` | ✅ applied |
| Handle | `jifunze.ai` | unchanged | ✅ |
| Avatar | Calm Signal mark | violet Jifunze mark (`avatar-1080.png`) | ✅ applied |
| Bio | Calm Signal copy | see below | ✅ applied |
| Link | none | `https://www.jifunze.ai` | ✅ applied |
| Posts | one Calm Signal post | none | ✅ deleted permanently |

**Bio, applied:**

```
Career, income & practical AI skills for job seekers, students and new freelancers. Your idea never sleeps.
```

**On the deleted post:** you chose *Delete permanently*. Threads confirmed with "If you delete this post, you won't be
able to restore it." and I proceeded. This was the only deletion performed in either session; no other post on any
platform has been deleted, including the old X and LinkedIn posts, which remain untouched pending your decision.

**On the intro post:** you chose *Hold until the profile is set*. Nothing has been published to Threads. Draft copy for a
first post, when you want it, is in the copy file.

**Re-verified 20 August 2026:** profile reads `Jifunze.AI` / `jifunze.ai`, correct bio, correct avatar, 0 posts, 1 follower.

---

# C. Missing channels — evaluation

Nothing in this section has been created. Each row is a recommendation awaiting your explicit approval.

## C.1 Summary table

| Channel | Exists? | Preferred handle | Available? | Audience fit | Engine can maintain it? | New credentials? | API for dashboard | Recommendation |
|---|---|---|---|---|---|---|---|---|
| **WhatsApp Channel** | No | *no handles exist on WhatsApp* | n/a | **Highest** — WhatsApp is the default messaging layer in Kenya | ❌ No — manual posting only | Yes — a phone number that becomes a channel admin | **None. No API exists.** | **Create — manually operated** |
| **Telegram Channel** | No | `@jifunze_ai` | ✅ free (verified) | Moderate — real in Kenya but far behind WhatsApp | ✅ Yes — trivially, via a bot | Yes — a phone number to create it, plus a BotFather bot | ✅ Bot API, free, no review | **Create in phase 2** |
| **Bluesky** | No | `jifunze.ai` (domain handle) | ✅ free (verified) | Low today for this audience | ✅ Yes — simplest API of all | Just an email and an app password | ✅ AT Protocol, free, no review | **Reserve the name only** |
| **Pinterest** | ✅ Yes | `jifunzeai` | — | Moderate — strong for "how to" and CV/interview visuals | ⚠ Partly — needs still images, not vertical video | Already owned | ✅ API v5, free, review-gated | **Already corrected — see C.5** |

## C.2 WhatsApp Channel — highest priority, but not automatable

**Audience fit is the strongest of any platform in this report.** WhatsApp is where the target audience — job seekers,
students and new freelancers in Kenya — already is, all day, on cheap data. A channel is one-way broadcast, followers are
anonymous to each other, and following costs nothing.

**Three things you need to know before deciding:**

1. **There is no handle to reserve.** WhatsApp Channels have no username. The channel gets an opaque link of the form
   `https://whatsapp.com/channel/<id>`, assigned at creation. There is nothing to squat and no risk of losing the name —
   which also means there is no urgency argument for creating it early.
2. **There is no API.** Verified against Meta's own documentation on 20 August 2026: the WhatsApp Business Platform
   documents the Cloud API, the On-Premises API, the Business Management API and Embedded Signup. Channels are not part
   of any of them and the word does not appear. Vendors advertising a "WhatsApp Channel API" are driving an unofficial
   client; using one risks the phone number being banned. **Do not use them.**
3. **It is therefore a human channel.** Every update is posted from a phone by a person. The content engine can *prepare*
   the update — it already produces a caption and a vertical video — but a human has to send it.

**Recommendation: create it, but only once someone has committed to posting to it.** An empty or stale WhatsApp channel
is worse than no channel, because it is the surface where the audience is most likely to notice neglect. The realistic
version is one repurposed post per weekday, taking about two minutes, using the video the engine already rendered.

**If you approve, this is what it needs:** a phone number that becomes the channel admin (the admin's number is not shown
to followers), the name `Jifunze.AI`, the violet avatar, and a description drawn from the standard positioning line.
I cannot create it — it requires the WhatsApp mobile app on your phone.

## C.3 Telegram Channel — phase 2, and the best automation candidate

`@jifunze_ai` is free — verified 20 August 2026 by comparing `t.me/jifunze_ai` and `t.me/jifunzeai` against a known-live
control (`t.me/telegram`, which renders a title and subscriber count; both Jifunze names render only the generic
"contact" fallback, meaning no public channel holds them).

**Why it is the strongest automation candidate:** a Telegram channel is the only new surface the content engine could
drive end-to-end today with zero approvals and zero cost. Create a bot with @BotFather, make it a channel administrator,
and `sendVideo` posts the rendered file. No OAuth, no app review, no per-post fee, no audit.

**Why it is still phase 2:** the audience is real in Kenya but much smaller than WhatsApp's, and a channel with no
followers and daily bot posts is not a win. Build it after there is an audience to route into it.

## C.4 Bluesky — reserve only

Both `jifunze.ai` and `jifunzeai.bsky.social` are unregistered (verified 20 August 2026 against the public handle
resolver, with a known-good handle as a control). Bluesky lets you use a domain you own as the handle by publishing a
`_atproto` DNS TXT record, so the account could be `@jifunze.ai` — free and self-verifying.

**Audience fit is low.** Bluesky's user base is overwhelmingly Western, English-language and tech/media-oriented. It is
not where Kenyan job seekers are.

**Recommendation: register the handle to hold the name, publish nothing.** It costs an email address and five minutes,
the API is the simplest of any platform here if the brand ever wants it, and it removes the risk of someone else taking
`jifunze.ai` on a network where domain handles are the identity system.

## C.5 Pinterest — already corrected this session

You asked for the existing account to be completed. It was, and it is now live and on-brand:

| Field | Value | Status |
|---|---|---|
| Profile URL | `https://www.pinterest.com/jifunzeai/` | ✅ |
| Display name | `Jifunze.AI` | ✅ applied |
| Avatar | violet Jifunze mark | ✅ applied |
| About | `Practical career, income and AI skills for job seekers, students and new freelancers. Your idea never sleeps.` | ✅ applied |
| Website | `jifunze.ai` | ✅ applied |
| Account type | Business (Publisher/media · Kenya · Education) | ✅ converted |
| Advertising | explicitly set to "No, I'm not planning to advertise" | ✅ |
| Domain claim | **not completed** | ⚠ needs a deploy |

**Two things you must know:**

- **Pinterest renamed the account username on its own.** Saving the display name caused Pinterest to change the username
  from `neuralbuildlabai` to `jifunzeai`. I did not request this and would not have done it without asking, since handle
  changes need separate approval. `pinterest.com/neuralbuildlabai` still redirects to the new URL. Say the word and I
  will change it back.
- **Pinterest normalised the website to `http://www.jifunze.ai`** when saving. The link works; the scheme is Pinterest's
  doing, not a typo.

**Domain claim:** the verification tag has been added to `index.html` in the repository. The claim completes the moment
that page is deployed and you press *Claim* in Pinterest settings. The alternative is a DNS TXT record
(`pinterest-site-verification=...`, same value). This is a public verification string, not a secret — it is meant to be
served to anyone who loads the page — which is why it lives in `index.html` and nowhere else.

## C.6 Channels deliberately not recommended

| Channel | Why not |
|---|---|
| Snapchat | Audience mismatch — the pillars are career and income, not entertainment |
| Reddit | Brand accounts posting daily career content read as spam and get banned |
| Mastodon | Bluesky already covers the "hold the name on a fediverse-adjacent network" job, more cheaply |
| Discord | A community server is a staffing commitment, not a content channel |
| Medium / Substack | Long-form is a different production pipeline; the engine renders vertical video |

---

# D. Final social network inventory

Every public Jifunze.ai channel as of 20 August 2026. GitHub is excluded from this assignment and is not listed.

| # | Platform | Handle / URL | Identifier | Owned | Brand-correct | Outstanding |
|---|---|---|---|---|---|---|
| 1 | Instagram | [`@jifunze.ai`](https://www.instagram.com/jifunze.ai) | IG Business `17841433836747759` | ✅ | ⚠ mostly | Display name + website — desktop web no longer exposes these fields; mobile app only |
| 2 | Threads | [`@jifunze.ai`](https://www.threads.com/@jifunze.ai) | inherits Instagram | ✅ | ✅ | Intro post held at your request |
| 3 | Facebook Page | [`Jifunze.AI`](https://www.facebook.com/profile.php?id=61593186673039) | Page `61593186673039` | ✅ | ⚠ mostly | Page name (60-day lock warning — stopped) and vanity URL `jifunze.ai` |
| 4 | YouTube | [`@jifunze-ai`](https://www.youtube.com/@jifunze-ai) | Channel `UCnvVNH52XiLQoNryE1p74Yg` | ✅ | ⚠ mostly | Channel name still `jifunze-ai` — YouTube rate-limited the change for 24h |
| 5 | X | [`@JifunzeAI`](https://x.com/JifunzeAI) | — | ✅ | ✅ | 3 old posts still describe the old product |
| 6 | LinkedIn | [`company/jifunze-ai`](https://www.linkedin.com/company/jifunze-ai/) | Org `114444495` | ✅ | ✅ | 2 old posts still describe the old product |
| 7 | TikTok | [`@jifunze_ai`](https://www.tiktok.com/@jifunze_ai) | — | ✅ | ❌ **no** | Bio still sells the SaaS; avatar off-brand; **no sign-in access** |
| 8 | Pinterest | [`@jifunzeai`](https://www.pinterest.com/jifunzeai/) | — | ✅ | ✅ | Domain claim pending a deploy |
| — | WhatsApp Channel | not created | — | — | — | Approval to create |
| — | Telegram | `@jifunze_ai` available | — | — | — | Phase 2 |
| — | Bluesky | `jifunze.ai` available | — | — | — | Reserve only |

**Brand constants applied everywhere:** wordmark `Jifunze`, public display name `Jifunze.AI`, website styling
`Jifunze.ai`, tagline **"Your idea never sleeps."** written exactly so, violet `#7C3AED`, near-black `#0B0B12`, white
`#FFFFFF`, Plus Jakarta Sans.

**Six of eight owned accounts are brand-correct.** TikTok is wrong and unreachable. The remainder are correct apart
from single fields blocked by platform rate limits, mobile-only editors or lock warnings.

---

# E. Launch-readiness verdict

# NOT READY

The presence is far better than it was this morning, but three things must be true before the engine publishes, and none
of them is true yet.

## E.1 Hard blockers

| # | Blocker | Why it blocks launch | Who can clear it |
|---|---|---|---|
| 1 | **TikTok bio still advertises a product that does not exist** | The engine's first public act would be posting career content to an account whose bio offers a social-content SaaS. It is the exact claim the amendment says must be corrected on sight. | You — sign the browser into `@jifunze_ai` |
| 2 | **No human has approved a first live post** | `OPERATIONS.md` requires it. `IG_PUBLISH_ENABLED` is `false` and I have not touched it. | You |
| 3 | **The website still contradicts the social profiles** | `index.html` has been corrected in the repository but nothing is deployed. Until it is, the site's title and preview cards describe the old product. | You — approve a deploy |

## E.2 Cleared since Part 1

| Item | State |
|---|---|
| Free Kazi Kit CTA promising a dead link | ✅ removed from captions, briefs, video end cards, and enforced by the quality gate |
| Captions rendering in DejaVu Sans instead of the brand typeface | ✅ fixed — exact TTF family names, verified in `ffmpeg` font selection logs |
| Captions using the retired blue `#78B9DC` | ✅ fixed — violet `#7C3AED` (`&HED3A7C&`), covered by a regression test |
| "Relevance filter is broken" | ✅ was never true — a stale artefact; a regression test now proves the off-brand veto works |
| Brand mark assets stale | ✅ rebuilt from the current lockup, originals preserved in `_legacy-pre-2026-08-20/` |
| Threads carrying another brand's content | ✅ corrected and cleared |
| Pinterest half-configured personal account | ✅ corrected and converted to Business |
| Engine test suite | ✅ **38 passed, 0 failed** |

## E.3 Not blocking, but decide soon

- **X automation now costs money.** X retired its free tier in 2026 and charges per post — around $0.015, or $0.20 if the
  post contains a link. One daily link post is roughly $6/month before any read calls. Under the current no-spend rule,
  X is a manual channel. This is new information that changes the channel plan.
- **Old posts on X and LinkedIn** still describe the learning platform and the SaaS. Nothing has been deleted. Hiding
  rather than deleting keeps the record intact.
- **`PublicSocialLinks.tsx` is dead code** — it is not imported anywhere, so the public site links to no social accounts
  at all. Its list has been corrected (all eight channels, and the X handle typo `@Jifunze.AI` → `@JifunzeAI`), but
  someone has to render it.
- **`hello@jifunze.ai`** is now published on Facebook, LinkedIn and YouTube. Confirm someone reads it.
- **MFA** on each platform — confirm it is on. I have not inspected or changed any security setting.

## E.4 The shortest path to READY

1. Sign the browser into TikTok → I fix the bio and avatar in one pass (~5 minutes).
2. Approve the `index.html` deploy → fixes the website contradiction and completes the Pinterest domain claim at once.
3. Retry the YouTube channel name after the 24-hour limit lifts.
4. Decide on the Facebook Page name, given the 60-day lock.
5. Approve a first live post, then flip `IG_PUBLISH_ENABLED`.

Steps 1 and 2 are the only ones that block. Everything else can follow the first post.

---

## Constraints honoured

No passwords, recovery details or MFA settings were touched or requested. No usernames were changed by me — Pinterest
changed one on its own and it is reported above. No accounts were created. No money was spent and no advertising was
enabled; Pinterest's ads question was deliberately answered "No". Nothing was published on any platform.
`IG_PUBLISH_ENABLED` remains `false`. No frozen learning-platform code was modified. The unrelated TikTok and Threads
accounts belonging to another brand were not modified. No token, secret or credential appears in this report or in any
committed file. GitHub was not audited, opened, modified or included.
