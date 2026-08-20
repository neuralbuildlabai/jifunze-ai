# Jifunze.ai — Social Presence Audit, Correction & Launch-Readiness Report

> ## ⚠ SUPERSEDED — 20 August 2026
>
> Superseded by `docs/social/SOCIAL_ACCOUNT_INVENTORY.md` (account state and outstanding actions),
> `docs/social/PLATFORM_COPY.md` (approved copy), `docs/social/TIKTOK_DELETION_RECORD.md` (TikTok)
> and `docs/social/LAUNCH_READINESS_2026-08-20.md` (the current verdict). Retained as the record of
> what was changed on each profile and why.
>
> Section F's website recommendations are implemented and superseded by
> `docs/social/WEBSITE_CONTENT_HUB.md` — in particular, `PublicSocialLinks` is now rendered, lists
> all eight accounts, and reads from a single canonical module.
>
> ## ⚠ Part 1 of 2 — two findings below were wrong and are corrected in Part 2
>
> Continued in **`jifunze-social-audit-part2-2026-08-20.md`** (TikTok, Threads, channel expansion, final inventory,
> launch verdict). Where the two documents disagree, **Part 2 governs.**
>
> 1. **Threads exists.** This document says the account does not exist. That was a 404 returned while the browser was
>    pointed at an unrelated account. `https://www.threads.com/@jifunze.ai` is owned, and was corrected and cleared on
>    20 August 2026. Every "Threads does not exist" statement below is void.
> 2. **The relevance filter is not broken.** Items 14 and E-2 below were drawn from `decision.json`, an artefact dated
>    18 Aug 23:50 that pre-dates the hardening in `orchestrator/score.ts` and `orchestrator/select.ts` (19 Aug 02:15).
>    The off-brand veto works and a regression test now proves it. Those items are void.

**Date:** 20 August 2026
**Source of truth:** `OPERATIONS.md` (18 Aug 2026)
**Scope:** branding, public positioning, official social profiles. **GitHub excluded entirely — not audited, not opened, not changed.**
**Approvals used:** one batch approval for reversible profile corrections on Instagram, Facebook, X, LinkedIn and YouTube; location = Nairobi, Kenya; public email = `hello@jifunze.ai`; public phone = `+254 796 192425`; remove the Free Kazi Kit CTA from the content engine.

---

## Confirmed understanding

Jifunze.ai is currently a career-skills media brand powered by an internal autonomous content engine. It serves job seekers, students and new freelancers in Kenya and other emerging markets. Its official tagline is "Your idea never sleeps." The learning platform is frozen, the multi-tenant SaaS is not yet the public offering, YouTube is now part of the official social presence, and GitHub is entirely outside this assignment.

---

## A. Account audit

| Platform | Profile URL | Access confirmed | Original state | Changes made | Final state | Remaining action |
|---|---|---|---|---|---|---|
| **Instagram** | `instagram.com/jifunze.ai` | ✅ Yes | No profile photo at all; bio "AI-powered workspace for deep learning… Coming soon."; no website link; display name = handle | Avatar → approved violet mark; bio → 3-line career-skills copy | Avatar live; bio live; 0 posts, 15 followers | Display name and bio link **cannot be edited on desktop web** — owner must set them in the Instagram app |
| **Facebook Page** | `facebook.com/profile.php?id=61593186673039` | ✅ Yes (sole admin) | Old blue/black mark; navy cover with a fourth tagline; bio "Free courses and daily lessons"; Texas street address; US phone; gmail contact | Avatar, cover, bio, email → `hello@jifunze.ai`, phone → `+254 796 192425`, Texas address removed | All corrected; name still `Jifunze.ai` | Name casing → `Jifunze.AI` **blocked by a 60-day lock warning** (needs approval); vanity URL still unclaimed (needs approval); "Hours: Always open" appeared after the address was cleared — remove if unintended |
| **X** | `x.com/JifunzeAI` | ✅ Yes | Default/blank avatar and header; bio "AI-powered workspace… Coming soon."; website `jifunze.ai/generate`; location "Kenya, Global" | Avatar, header, bio, location → Nairobi Kenya, website → `https://jifunze.ai` | Fully corrected | No pinned post (needs publishing approval) |
| **LinkedIn** | `linkedin.com/company/jifunze-ai` (`114444495`) | ✅ Yes | Old lockup logo; default beige banner; tagline "Create smarter. Grow faster."; overview sold a multi-tenant SaaS; industry "Software Development"; no location; no specialties | Logo, cover, tagline, overview, industry → Education, location → Nairobi KE, phone, 8 specialties | Fully corrected and verified in member view | Two posts from 4 months ago still advertise "Create smarter social content in seconds" — I am not permitted to delete posts |
| **YouTube** | `youtube.com/@jifunze-ai` (`UCnvVNH52XiLQoNryE1p74Yg`) | ✅ Yes | Default pink "j"; no banner; empty description; no links; no contact; no watermark | Avatar, banner, description, 5 links, contact email, 150×150 watermark (entire video) | All live | Channel name still `jifunze-ai` — **YouTube returned "You entered too many names that can't be used. Try again in 24 hours."** Retry after 24h |
| **TikTok** | `tiktok.com/@jifunze_ai` | ❌ **No** | Old clipped lockup avatar; bio **"Create smarter social content in seconds. Try it free."**; no website | **None** — browser is signed in as `@calmsignalhq` | Unchanged, still selling an unlaunched SaaS | Owner must sign into `@jifunze_ai`; copy is ready |
| **Threads** | `threads.com/@jifunze.ai` | ✅ Yes *(corrected — see Part 2)* | Display name `Calm Signal`, Calm Signal avatar and bio, one Calm Signal post, no link | Name → `Jifunze.AI`, avatar, bio, link `https://www.jifunze.ai`; Calm Signal post deleted with your approval | Fully corrected, 0 posts | Intro post held at your request |
| **Website** | `jifunze.ai` | ✅ Yes (repo) | `<title>` "Jifunze.AI — AI social content"; no meta description, no OG/Twitter tags, no structured data | **None deployed** (§18) | Unchanged | See §F — needs approval to deploy |

**No other official Jifunze account exists.** Nothing beyond the above appears in the repo, in `OPERATIONS.md`, or on the live site. A `10 WhatsApp Profile.png` asset sits in the logo kit but no WhatsApp Business account is documented.

---

## B. Final profile copy

Full paste-ready copy is in the accompanying **`jifunze-social-final-copy-2026-08-20.md`**. Summary:

| Platform | Display name | Handle | Website | Category | CTA |
|---|---|---|---|---|---|
| Instagram | `Jifunze.AI · Career Skills` *(pending)* | `@jifunze.ai` — keep | `https://jifunze.ai` *(pending)* | Education | none until the Kazi Kit is live |
| Facebook | `Jifunze.AI` *(pending approval)* | vanity `jifunze.ai` *(pending approval)* | `jifunze.ai` | Education | Message |
| X | `Jifunze.AI` ✅ | `@JifunzeAI` — keep | `https://jifunze.ai` ✅ | — | none |
| LinkedIn | `Jifunze.AI` ✅ | `jifunze-ai` — keep | `https://jifunze.ai` ✅ | Education | Follow |
| YouTube | `Jifunze.AI` *(pending, 24h)* | `@jifunze-ai` — keep | `https://jifunze.ai` ✅ | — | Subscribe |
| TikTok | `Jifunze.AI` (already correct) | `@jifunze_ai` — keep | not eligible <1k followers | — | none |
| Threads | `Jifunze.AI` | inherits `@jifunze.ai` | `https://jifunze.ai` | — | none |

**Handle-change recommendations:** none. `@jifunze.ai`, `@JifunzeAI`, `@jifunze_ai`, `jifunze-ai` and `@jifunze-ai` are all established and consistent enough with the approved system. The only handle worth claiming is the **Facebook vanity URL `facebook.com/jifunze.ai`**, which has never been set — that is a new claim, not a change, and needs your approval.

Do **not** contest `linkedin.com/company/jifunze` — it belongs to an unrelated Tanzanian education nonprofit founded in 1999. Same name, same sector, same region: that is a trademark question for a lawyer, not a handle to grab.

---

## C. Asset inventory

All exports live in `brand/social-kit/exports/` on your machine, generated from the approved masters in `brand/`. No competing logo or visual system was created.

| Filename | Platform | Dimensions | Purpose | Status |
|---|---|---|---|---|
| `avatar-1080.png` | Instagram, YouTube, Threads | 1080×1080 | Profile picture — stacked lockup on violet | ✅ Applied (IG, YT) |
| `avatar-800.png` | spare | 800×800 | Large-slot fallback | ✅ Available |
| `avatar-500.png` | Facebook | 500×500 | Facebook's native profile size | ✅ Applied |
| `avatar-400.png` | X, LinkedIn | 400×400 | Avatar / company logo | ✅ Applied (both) |
| `avatar-200.png` | TikTok | 200×200 | Avatar | ⏳ Ready, blocked on access |
| `avatar-98.png` | small slots | 98×98 | Minimum-size fallback | ✅ Available |
| `facebook-cover-1640x624.png` | Facebook | 1640×624 | Page cover | ✅ Applied |
| `x-header-1500x500.png` | X | 1500×500 | Header | ✅ Applied |
| `linkedin-cover-1128x191.png` | LinkedIn | 1128×191 | Legacy cover ratio | ⚠ Rejected by LinkedIn (too small for the current cover crop) |
| `linkedin-cover-1584x396.png` | LinkedIn | 1584×396 | **New** — built for LinkedIn's current cover crop | ✅ Applied |
| `youtube-banner-2560x1440.png` | YouTube | 2560×1440 | Channel art — lockup verified inside the 1546×423 all-devices safe area | ✅ Applied |
| `youtube-watermark-150.png` | YouTube | 150×150 | **New** — video watermark, resampled from `brand/icon/jifunze-icon-1024.png` | ✅ Applied (entire video) |
| `og-image-1200x630.png` | Website | 1200×630 | Share preview → `public/og-image.png` | ⏳ Ready, needs deploy approval |
| `lockup-violet-icon-2400.png` | any | 2400×888 | Transparent horizontal lockup, source for derived exports | ✅ Available |

**Verification performed on every applied asset:** correct dimensions; artwork inside each platform's safe area (YouTube crop preview confirmed the lockup sits in "Viewable on all devices"; Instagram, X, Facebook and LinkedIn circular/square crops confirmed in each platform's own cropper); text legible at profile size; no stretching or distortion; violet `#7C3AED` on near-black `#0B0B12`; tagline rendered exactly as "Your idea never sleeps."; no gradients, shadows or 3D effects; minimal text in profile images.

**Still missing (not required for the corrections just made):** Instagram post template, Story/Reel cover template, reusable vertical-video end card, reusable Free Kazi Kit CTA card. The last two are deliberately deferred — see §E.

---

## D. Change log — 20 August 2026

### YouTube — `youtube.com/@jifunze-ai`
| Field | Before | After |
|---|---|---|
| Profile picture | Default pink "j" placeholder | `avatar-1080.png` (violet squircle + chevron + wordmark) |
| Banner | *(none)* | `youtube-banner-2560x1440.png` |
| Description | *(empty)* | "Jifunze.ai shares practical career, income and AI skills for job seekers, students and new freelancers in Kenya and other emerging markets. / Expect useful Shorts on CVs, interviews, job applications, practical AI, money skills and professional growth. / Your idea never sleeps." (277 chars) |
| Links | *(none)* | Website `https://jifunze.ai`, Instagram, X, LinkedIn, Facebook |
| Contact email | *(empty)* | `hello@jifunze.ai` |
| Watermark | *(none)* | `youtube-watermark-150.png`, display: entire video |
| Channel name | `jifunze-ai` | **Not changed.** Platform warning: *"You entered too many names that can't be used. Try again in 24 hours."* The whole form saves atomically, so this also silently blocked the description on the first two attempts; reverting the name field let everything else publish. |

### LinkedIn — `linkedin.com/company/jifunze-ai`
| Field | Before | After |
|---|---|---|
| Logo | Old horizontal lockup, letterboxed | `avatar-400.png` |
| Cover | Default beige placeholder | `linkedin-cover-1584x396.png` |
| Tagline | "Create smarter. Grow faster." | "Career, income and practical AI skills for job seekers, students and new freelancers." (84/120) |
| Overview | "Jifunze.AI helps **brands and creators generate smarter social content in seconds**, with AI designed to learn, adapt, and grow into full automation." | Full career-skills overview ending "Your idea never sleeps." (493/2000) |
| Industry | Software Development | Education |
| Phone | *(empty)* | `+254796192425` |
| Location | *(none)* | Nairobi, KE (primary HQ, no street address) |
| Specialties | *(none)* | career skills, CV writing, interview preparation, job applications, practical AI, freelancing, money skills, professional development |

**Platform warnings hit:** *"Another admin is trying to make changes to this page at the same time as you"* — LinkedIn saves cover images on a separate transaction from the rest of the form, which invalidates the form's version token; each section had to be reloaded and saved separately. **One error I made and corrected:** while opening the cover dialog a stock ocean photograph was momentarily selected and saved as the cover; it was replaced with the brand cover within the same minute. **"Share your page edits" was declined every time** — no post was published.

### X — `x.com/JifunzeAI`
| Field | Before | After |
|---|---|---|
| Avatar | Default / blank | `avatar-400.png` |
| Header | Default / blank | `x-header-1500x500.png` |
| Bio | "AI-powered workspace for deep learning, revision, and smart content creation. Helping learners turn knowledge into useful outputs. Coming soon." | "Practical career, income and AI skills for job seekers, students and new freelancers in Kenya and other emerging markets." (119/160) |
| Location | "Kenya, Global" | "Nairobi, Kenya" |
| Website | `jifunze.ai/generate` | `https://jifunze.ai` |

### Instagram — `@jifunze.ai`
| Field | Before | After |
|---|---|---|
| Profile photo | **None — grey placeholder** | `avatar-1080.png` |
| Bio | "AI-powered workspace for deep learning, revision, and smart content creation. Helping learners turn knowledge into useful outputs. Coming soon." (143/150) | "Career, income & practical AI skills / For job seekers, students & new freelancers / Kenya & emerging markets" (106/150) |
| Display name | `jifunze.ai` | **Not changed** — Instagram's desktop web Edit profile no longer exposes Name or Username |
| Website | *(not set)* | **Not changed** — Instagram states *"Editing your links is only available on mobile."* The field is disabled on desktop |

### Facebook Page — ID `61593186673039`
| Field | Before | After |
|---|---|---|
| Profile photo | Old blue/black square mark | `avatar-500.png` |
| Cover photo | Navy artwork: *"Practical AI & career skills for the next billion online."* | `facebook-cover-1640x624.png` |
| Bio | "Learn practical AI and career skills. Free courses and daily lessons. 🌍" (72/255) | "Practical career, income and AI skills for job seekers, students and new freelancers in Kenya and other emerging markets. CVs, interviews, applications, practical AI, money skills and professional growth." (202/255) |
| Phone | `+1 281-380-5420` | `+254 796 192425` |
| Email | `neuralbuild.ai@gmail.com` | `hello@jifunze.ai` |
| Address | `Edgewick Elm St, 77545` | *(removed)* |
| Page name | `Jifunze.ai` | **Not changed — stopped.** Facebook warned: *"If you change your name on Facebook, you can't change it again for 60 days."* Under the agreed rules a platform restriction warning stops the change and returns it to you |

### Content engine (approved: remove the Free Kazi Kit CTA)
| File | Change |
|---|---|
| `orchestrator/contentBank.ts` | Stripped " Free Kazi Kit — link in bio" from all 15 evergreen captions |
| `orchestrator/brief.ts` | LLM system rule now forbids any CTA/link phrase; news fallback caption no longer appends the CTA |
| `orchestrator/scriptQuality.ts` | Added `CTA_REQUIRED = false`; the gate now **rejects** any caption containing "link in bio" while the destination is dead |
| `render/src/captions.ts` | `END_CTA = ''`; the end-card dialogue line is omitted entirely rather than promising a dead link |
| `scripts/test-content-engine.ts` | Three tests inverted to assert the CTA is absent; fixtures updated |

**Verification:** the full content-engine suite was executed — **36 passed, 0 failed.** (Run in an isolated copy because the repo's `node_modules` contains a macOS-arm64 esbuild binary that cannot execute in the connected-folder VM.)

### Documentation
| File | Change |
|---|---|
| `brand/social-kit/jifunze-social-paste-kit.md` | ⚠ SUPERSEDED banner added at the top — its copy is written in the frozen learning-platform voice and must not be applied |

**Screenshots** of the final state of YouTube, LinkedIn, X, Instagram and Facebook were captured and are attached alongside this report.

**Nothing was published, deleted, purchased, or security-related. No post was made on any platform. `@CalmSignalHQ`, `@calmsignalhq`, `linkedin.com/company/jifunze` and GitHub were not touched.**

---

## E. Blockers

### Requires your action

1. **Instagram display name and bio link.** Instagram's desktop web no longer exposes the Name or Username fields, and states plainly that link editing is mobile-only. In the Instagram app: Edit profile → Name → `Jifunze.AI · Career Skills`; Links → add `https://jifunze.ai`. **The bio currently drives nobody anywhere** — this is the single highest-value five minutes left.
2. **TikTok access.** The browser is signed in as `@calmsignalhq`. Until you sign into `@jifunze_ai`, the bio still reads *"Create smarter social content in seconds. Try it free."* — the most damaging live sentence anywhere, because it sells a product that does not exist.
3. ~~**Threads does not exist.**~~ **Void — this was wrong.** The account exists and was corrected on 20 August 2026. See Part 2, section B.
4. **`hello@jifunze.ai` must actually receive mail.** It is now published on Facebook and YouTube. If the mailbox isn't provisioned on the domain, every inbound message is lost.
5. **Two LinkedIn posts from May 2026** still say "Create smarter social content in seconds" and link to the removed product. I cannot delete posts. Delete or hide them yourself.
6. **MFA is unverified on all accounts.** I did not open any security settings. Please confirm two-factor is on for the Meta account, X, TikTok, LinkedIn and the Google account behind YouTube.

### Requires separate approval

7. **Facebook Page name** `Jifunze.ai` → `Jifunze.AI` — locked for 60 days once changed.
8. **Facebook vanity URL** `facebook.com/jifunze.ai` — never claimed, free today.
9. **YouTube channel name** → `Jifunze.AI` — retry after the 24-hour rate limit expires.
10. **Any pinned post, first video, or website deploy.**

### Product blocker

11. **The Free Kazi Kit does not exist.** `jifunze.ai/kazi-kit` returns the app's 404. Until it exists, no caption, end card or bio may promise it — that is now enforced in code by the quality gate.

### Observations worth a decision

12. Facebook now shows **"Hours: Always open"**, which appeared automatically when the street address was cleared. Remove it if you don't want the Page presenting as a business with opening hours.
13. **Rendered videos are off-brand.** `render/src/captions.ts` sets `Style: Cap,DejaVu Sans` and accent `&HDCB978&` = `#78B9DC`, the blue from the retired ".AI" wordmark. The CI workflow installs `fonts-dejavu-core`. Every rendered frame therefore violates §8 (Plus Jakarta Sans, violet `#7C3AED`). Fix before any video is published: install `brand/fonts/PlusJakartaSans-ExtraBold.ttf` in the render job and change the accent constant to `&HED3A7C&`.
14. ~~**The relevance filter let a non-career story through.**~~ **Void — based on a stale artefact.** The veto in `orchestrator/score.ts` blocks this exact story and a regression test proves it. Original text retained for the record: `decision.json` records the last pick as *"OpenAI launches a safer ChatGPT for teens"* with `relevance: 1`, producing the caption *"OpenAI's new ChatGPT helps teens learn safely and responsibly. Explore its features."* That is general AI news with no action for a job seeker. Tighten the bar in `orchestrator/select.ts` before enabling publishing.

---

## F. Website recommendations (nothing deployed)

| File | Existing | Proposed |
|---|---|---|
| `index.html` | `<title>Jifunze.AI — AI social content</title>` and **no** description, OG, Twitter or structured data | Full head block below |
| `src/components/PublicSocialLinks.tsx` | Lists TikTok, Instagram, X only; X label `@Jifunze.AI` doesn't match the handle it links to; LinkedIn, YouTube and Facebook missing | `SOCIALS` array below |
| `public/og-image.png` | **Missing** — every shared link previews with no image | Copy `brand/social-kit/exports/og-image-1200x630.png` here |
| `public/robots.txt` | **Missing** — returns the SPA shell | Add a real `robots.txt` |

**`index.html` head — proposed**
```html
<title>Jifunze.ai — Career, Income and Practical AI Skills</title>
<meta name="description" content="Practical career, income and AI skills for job seekers, students and new freelancers in Kenya and other emerging markets." />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Jifunze.AI" />
<meta property="og:title" content="Jifunze.ai — Career, Income and Practical AI Skills" />
<meta property="og:description" content="Practical career, income and AI skills for job seekers, students and new freelancers in Kenya and other emerging markets." />
<meta property="og:url" content="https://jifunze.ai" />
<meta property="og:image" content="https://jifunze.ai/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@JifunzeAI" />

<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png" />
```

**`src/components/PublicSocialLinks.tsx` — proposed**
```ts
const SOCIALS = [
  { name: 'Instagram', handle: '@jifunze.ai',  href: 'https://www.instagram.com/jifunze.ai' },
  { name: 'YouTube',   handle: '@jifunze-ai',  href: 'https://www.youtube.com/@jifunze-ai' },
  { name: 'TikTok',    handle: '@jifunze_ai',  href: 'https://www.tiktok.com/@jifunze_ai' },
  { name: 'X',         handle: '@JifunzeAI',   href: 'https://x.com/JifunzeAI' },
  { name: 'LinkedIn',  handle: 'Jifunze.AI',   href: 'https://www.linkedin.com/company/jifunze-ai' },
  { name: 'Facebook',  handle: 'Jifunze.AI',   href: 'https://www.facebook.com/profile.php?id=61593186673039' },
] as const
```

Also: `PublicSocialLinks` is not rendered on `/learn`, so the site currently shows **no** social links on its most-visited public page. Worth placing in the global footer.

**Structured data** — optional but cheap: an `Organization` JSON-LD block with `name: "Jifunze.AI"`, `url`, `logo`, `sameAs` listing all six profiles, `slogan: "Your idea never sleeps."`

**Deployment status: not deployed.** No website change was made. The frozen learning-platform functionality (`/learn`, `/admin`, billing, training) was not touched.

---

## G. Governance amendment

Delivered as a separate ready-to-paste file: **`AMENDMENT_2026-08-18_PIVOT.md`**.

It documents the conflict between `docs/JIFUNZE_MASTER_PLAN.md` (18 May 2026) and `OPERATIONS.md` (18 Aug 2026) without concealing or rewriting either; records the previous direction, the 18 August pivot and its reason, what is frozen and at which tag, the current direction, audience, six pillars, own-handles-first strategy, the uncommitted multi-tenant possibility, current non-goals, the freeze table, and owner approval. Save it as `docs/AMENDMENT_001_2026-08-18_PIVOT.md` and add the one-line pointer at the top of the master plan; do not delete the master plan.

---

## H. Launch-readiness verdict

# NOT READY

Jifunze.ai must not begin autonomous publishing. `IG_PUBLISH_ENABLED` stays `false`.

**Blocking reasons, in order of severity:**

1. **Every rendered video would be off-brand.** Captions render in DejaVu Sans with a retired blue accent instead of Plus Jakarta Sans and violet `#7C3AED`. The first thing an audience would see is a violation of the approved identity.
2. ~~**The relevance filter has demonstrably failed once.**~~ **Void — see the banner at the top.** Original text retained for the record: The most recent recorded decision picked a general AI news story about teenagers and ChatGPT and scored it `relevance: 1`. Publishing on that basis makes Jifunze a general-news account, which §6 explicitly forbids.
3. **One of eight official channels is outside your control from this machine.** TikTok is signed in as an unrelated account and still advertises a product that does not exist. *(Corrected: Threads was reachable and has since been fixed.)* Publishing while a live profile contradicts the brand does more damage than not publishing.
4. **Instagram — the primary publishing target — has no bio link.** Even with the profile corrected, there is no destination. The engine's whole funnel currently terminates nowhere.
5. **Music licensing is unverified.** `OPERATIONS.md` and the render pipeline both refer to music, but I found no licence record or documented platform-permitted source. Publishing unlicensed audio risks takedowns on every channel at once.
6. **Nothing has ever been rendered end-to-end and reviewed by a human.** `decision.json` shows `dry_run: true` and one artefact. There is no reviewed batch.

**Not blocking, now resolved:** the Free Kazi Kit CTA no longer appears in any caption or end card, and the quality gate actively rejects it, so the engine can no longer promise a 404.

**Recommended path to launch**

1. Fix the caption font and accent colour; re-render three evergreen scripts and look at them.
2. Tighten `orchestrator/select.ts` until the ChatGPT-for-teens class of story is rejected, and add it as a regression test.
3. Build the Free Kazi Kit landing page; verify mobile, the signup flow, the data-collection notice and basic analytics; then restore the CTA in `contentBank.ts`, `brief.ts`, `captions.ts` and flip `CTA_REQUIRED` back to `true`.
4. Set the Instagram bio link and display name from the app; recover TikTok. *(Threads is done.)*
5. Document the music source and licence.
6. Run the loop with `DRY_RUN=true` for a week. Review the batch — every hook, every caption, every frame.
7. Publish the first 3–5 posts **manually**, under supervision.
8. Only then run a limited autonomous pilot (one post a day, kill switch armed, failures alerting).
9. Review performance and failures; expand only after the system proves stable.

---

*Prepared 20 August 2026. GitHub was excluded from this assignment in full: not audited, not opened, not recommended on, not modified.*
