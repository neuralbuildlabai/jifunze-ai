# Social account inventory

**Date:** 20 August 2026 · **Verified against the live profiles in a browser on this date.**
**Amended 21 August 2026:** Bluesky added as the ninth official account (created and verified that day).
**Amended 22 August 2026:** Bluesky branding applied (approved avatar + 1500×500 banner) and the
domain handle `@jifunze.ai` adopted via the `/.well-known/atproto-did` verification (PR #8). Same
account, same DID; the public profile URL is now `https://bsky.app/profile/jifunze.ai`.
**Authority:** `OPERATIONS.md` · `docs/AMENDMENT_001_2026-08-18_PIVOT.md`
**Machine-readable source of truth:** `src/social/socialAccounts.ts` (the website, the JSON-LD, the
sitemap and the dashboard all read from it) and the `social_accounts` table seeded by
`supabase/migrations/20260820120000_social_ops_core.sql`.

> **GitHub is out of scope entirely.** It is not a social profile for this brand: not audited, not
> listed, not linked. `@calmsignalhq` and every other CalmSignal property are unrelated and were not
> touched. A test (`scripts/test-social-ops.ts`) fails if either ever appears in the account list.

---

## 1. The nine official accounts

| # | Platform | URL | Display name | Handle | Avatar | Cover | Bio / description | Website link | Category | Location | Contact |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Instagram | `https://www.instagram.com/jifunze.ai/` | ⚠ `jifunze.ai` — should be `Jifunze.AI` | `@jifunze.ai` | ✅ violet mark | n/a | ✅ career-skills, 106/150 | ❌ **none** | Professional account | — | — |
| 2 | TikTok | `https://www.tiktok.com/@jifunze_ai` | ✅ `Jifunze.AI` | `@jifunze_ai` | ✅ approved violet mark (owner, 20 Aug) | n/a | ✅ career-skills bio (owner, 20 Aug) | ❌ not eligible <1k followers | — | — | — |
| 3 | Threads | `https://www.threads.com/@jifunze.ai` | ✅ `Jifunze.AI` | `@jifunze.ai` | ✅ violet mark | n/a | ✅ career-skills + tagline | ❌ **none — desktop web will not save one** (see §2) | — | — | Instagram badge on |
| 4 | YouTube | `https://www.youtube.com/@jifunze-ai` | ⚠ `jifunze-ai` — should be `Jifunze.AI` | `@jifunze-ai` | ✅ violet mark | ✅ 2560×1440 | ✅ 277 chars, ends on the tagline | ✅ `https://www.jifunze.ai` | — | — | `hello@jifunze.ai` |
| 5 | Facebook Page | `https://www.facebook.com/profile.php?id=61593186673039` | ⚠ `Jifunze.ai` — should be `Jifunze.AI` | vanity URL unclaimed | ✅ violet mark | ✅ 1640×624 | ✅ 202/255 | ✅ `jifunze.ai` | ✅ Education | ✅ Nairobi (no street address) | `hello@jifunze.ai` · `+254 796 192425` |
| 6 | X | `https://x.com/JifunzeAI` | ✅ `Jifunze.AI` | `@JifunzeAI` | ✅ violet mark | ✅ 1500×500 | ✅ 119/160 | ✅ `jifunze.ai` | — | ✅ Nairobi, Kenya | — |
| 7 | LinkedIn | `https://www.linkedin.com/company/jifunze-ai/` | ✅ `Jifunze.AI` | `jifunze-ai` (org `114444495`) | ✅ violet mark | ✅ 1584×396 | ✅ tagline 84/120 + overview 493/2000 | ✅ `jifunze.ai` | ✅ Education | ✅ Nairobi, KE | `+254796192425` |
| 8 | Pinterest | `https://www.pinterest.com/jifunzeai/` | ✅ `Jifunze.AI` | `@jifunzeai` | ✅ violet mark | n/a | ✅ career-skills + tagline | ✅ `jifunze.ai` | ✅ Business · Publisher/media · Education | ✅ Kenya | — |
| 9 | Bluesky | `https://bsky.app/profile/jifunze.ai` | ✅ `Jifunze.AI` (set 21 Aug) | ✅ `@jifunze.ai` (domain handle, 22 Aug) | ✅ approved violet mark (22 Aug) | ✅ 1500×500 (22 Aug) | ✅ career-skills bio + tagline (set 21 Aug) | ✅ in bio (`www.jifunze.ai`) — Bluesky has no website field | — | — | — |

### Connected accounts and cross-links

| From | Links to |
|---|---|
| YouTube | Website, Instagram, X, LinkedIn, Facebook, **TikTok, Threads, Pinterest** (last three added 20 Aug) — 8 links, verified live |
| Threads | Instagram badge on; **no website link — see §2** |
| Instagram | Threads badge on |
| Website footer / `/social` | all nine, from `src/social/socialAccounts.ts` |

### Access, metrics and API status

| Platform | Browser access | Metrics visible in-app | API access possible today |
|---|---|---|---|
| Instagram | ✅ signed in as `@jifunze.ai` | ✅ | ✅ credentials exist; publishing gated by `IG_PUBLISH_ENABLED` |
| TikTok | ✅ owner signed in 20 Aug and completed the profile pass by hand; no agent browser session | ✅ (owner) | ❌ no developer app; client audit required |
| Threads | ✅ | ✅ | ❌ needs a separate Meta app + app review |
| YouTube | ✅ (Studio) | ✅ | ❌ no Google Cloud project; compliance audit required |
| Facebook | ✅ sole admin | ✅ | ⚠ same Meta app, no Page token issued to the server |
| X | ✅ | ✅ | ⚠ possible but **costs money per post** |
| LinkedIn | ✅ Page admin | ✅ | ❌ no developer app; vetted product |
| Pinterest | ✅ | ✅ | ❌ no developer app; Trial → Standard review |
| Bluesky | ✅ signed in as the owner (`neuralbuildlab.ai@gmail.com`) | ✅ | ✅ **reads need no credential at all; writes need only an app password — no developer app, no review, $0** |

### Existing public content

| Platform | Posts | Assessment |
|---|---|---|
| Instagram | 0 | clean |
| TikTok | 0 — the one obsolete video (16 Apr 2026, `Jifunze.AI is live 🚀`, `/generate` link) was **permanently deleted by the owner on 20 Aug 2026**; owner confirms no obsolete TikTok content remains | ✅ clean — see `docs/social/TIKTOK_DELETION_RECORD.md` |
| Threads | 0 | the CalmSignal post was deleted 20 Aug and has not returned |
| YouTube | 0 | clean |
| Facebook | 0 | clean |
| X | **3**, dated 6–7 May 2026 | promote the frozen learning platform: "Learn deeply. Create smarter.", "Jifunze.ai is coming soon — a smarter learning platform". Obsolete. **Owner must delete or hide — deleting public content is outside this assignment except for the one authorised TikTok video.** |
| LinkedIn | **2**, both 16 April 2026 | promote the removed SaaS: *"Jifunze.AI is live. Create smarter social content in seconds."* and *"…helps creators, brands, and businesses create smarter content faster"*, both linking to the retired product. **Owner must delete or hide.** |
| Pinterest | 0 Pins | clean |
| Bluesky | 0 | clean — account created 21 Aug 2026 |

---

## 2. Changes applied on 20 August 2026 (this session)

> **Owner-performed TikTok pass — 20 August 2026, confirmed and verified by the owner.**
> Display name corrected to `Jifunze.AI`; username left as `@jifunze_ai`; career-skills bio added;
> approved violet avatar applied; the obsolete 16 April 2026 `/generate` promotional video
> permanently deleted. No obsolete TikTok content remains. **No further TikTok change is to be
> attempted by any agent.** Full record: `TIKTOK_DELETION_RECORD.md`.


| Platform | Field | Before | After | Verified after reload |
|---|---|---|---|---|
| YouTube | Links | Website, Instagram, X, LinkedIn, Facebook (5) | + **TikTok, Threads, Pinterest** (8) | ✅ live profile shows "and 7 more links" |
| YouTube | Website link | `https://jifunze.ai` | `https://www.jifunze.ai` (the canonical host) | ✅ |

No agent changed anything else on any platform. No agent published anything, and no agent deleted
anything. The TikTok edits and the TikTok video deletion recorded above were performed by the owner.

### Attempted and NOT applied — Threads website link

The Threads *Links* section was **empty** when checked on 20 August, contradicting the earlier
report which recorded the link as applied. Adding it was attempted **twice**, with
`https://www.jifunze.ai` and again with `https://jifunze.ai`. Both times the link appeared on the
profile immediately and was **gone after a page reload**, and the *Links* editor was empty again.

The client renders it optimistically; the server discards it. `https://www.jifunze.ai` resolves
correctly, so the URL is not the problem. The most likely explanation is that Threads inherits
Instagram's constraint — Instagram's desktop web states plainly that *"Editing your links is only
available on mobile"* — and applies it to Threads without saying so.

**This is now an owner action in the Threads mobile app,** alongside the identical Instagram one.
It is recorded as attempted-and-failed rather than as done.

---

## 3. Verified-unchanged

- No username or handle was changed anywhere. Pinterest's earlier self-initiated rename to
  `jifunzeai` was left in place, as instructed.
- No password, MFA setting, recovery email or recovery phone number was viewed or altered.
- No security settings page was opened on any platform.
- No money was spent; no advertising was enabled anywhere.
- `@calmsignalhq` and every other CalmSignal property were left untouched.

---

## 4. Outstanding, by platform

| Platform | Outstanding | Who |
|---|---|---|
| Instagram | Display name → `Jifunze.AI`; add the website link. **Both are mobile-app-only** — desktop web states plainly that link editing is mobile-only and no longer exposes the Name field. Verified again 20 Aug. | Owner, in the app |
| TikTok | Sign the browser into `@jifunze_ai`; then the bio, avatar and the authorised video deletion can all be done in one pass | Owner |
| YouTube | Channel name → `Jifunze.AI`. Attempted 20 Aug; YouTube returned *"You entered too many names that can't be used. Try again in 24 hours."* The form saves atomically, so the name field was reverted to let the eight links save | Retry after the limit lifts |
| Facebook | Page name → `Jifunze.AI` (60-day lock once changed) and vanity URL `facebook.com/jifunze.ai` (never claimed). Also: "Hours: Always open" appeared automatically when the street address was cleared — remove it if the Page should not present as a business with opening hours | Owner approval |
| X | Delete or hide 3 obsolete posts | Owner |
| LinkedIn | Delete or hide 2 obsolete posts | Owner |
| Threads | Add the website link `https://www.jifunze.ai` **in the Threads mobile app**. Desktop web accepts it and silently discards it — verified twice | Owner, in the app |
| Pinterest | Domain claim — completes the moment the site with the `p:domain_verify` tag is deployed and *Claim* is pressed | After deploy |
| Bluesky | ~~Avatar and banner~~ — **Done 22 Aug 2026:** approved `avatar-400.png` and `x-header-1500x500.png` applied and verified on the public profile. | Done |
| Bluesky | ~~Domain handle~~ — **Done 22 Aug 2026:** `https://www.jifunze.ai/.well-known/atproto-did` deployed (PR #8) and the handle switched to `@jifunze.ai` (same DID `did:plc:hez3uufhzodbtwzuvvreri5l`; `@jifunze.bsky.social` remains reserved to the account). | Done |
| All | Confirm `hello@jifunze.ai` receives mail — it is now published on Facebook, LinkedIn and YouTube. **Cannot be verified without sending mail or opening the mailbox, so it is not claimed as verified here.** | Owner |
| All | Confirm MFA is on. No security setting was inspected or changed | Owner |
