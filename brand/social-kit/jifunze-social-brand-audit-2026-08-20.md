# Jifunze — Social & Community Brand Audit

**Date:** 20 August 2026
**Approved brand system:** `brand/` — violet `#7C3AED`, Plus Jakarta Sans, tagline *"Your idea never sleeps."*
**Scope of this pass:** discovery + read-only audit. **No live profile was modified.**

---

## Headline finding

There is no single "outdated logo" problem. There are **three** problems, in descending order of damage:

1. **Four of your six live profiles describe a product you deleted.** `PROJECT_CONTEXT.md` says the social-content publishing subsystem was removed in May 2026 and Jifunze is a learning/tutoring platform. LinkedIn, TikTok, X and your own `index.html` still sell the old social-content tool.
2. **Nine different descriptions of the company are live simultaneously.** Not nine phrasings — nine different claims about what Jifunze does.
3. **Every profile uses pre-refresh artwork.** Zero profiles carry the violet kit you approved today. Instagram has no profile picture at all.

Fixing the logo without fixing #1 and #2 would make the inconsistency look deliberate.

---

## A. Existing accounts

| # | Platform | URL | Handle / ID | Your access | Status |
|---|---|---|---|---|---|
| 1 | Facebook Page | `facebook.com/profile.php?id=61593186673039` | *no vanity URL claimed* | **Full admin** (Manage Page) | Live, 0 followers, 0 posts |
| 2 | Instagram | `instagram.com/jifunze.ai` | `@jifunze.ai` | **Full admin** (Edit profile) | Live, 15 followers, **0 posts** |
| 3 | LinkedIn Page | `linkedin.com/company/jifunze-ai` (ID `114444495`) | `jifunze-ai` | **Full admin** (Page Admin) | Live, 1 follower, 0 posts |
| 4 | X | `x.com/JifunzeAI` | `@JifunzeAI` | **Not verified** — browser is signed in as `@CalmSignalHQ` | Live, 0 followers, 3 posts, joined Apr 2026 |
| 5 | TikTok | `tiktok.com/@jifunze_ai` | `@jifunze_ai` | **Not verified** — browser signed in as another account | Live, 0 followers, 1 video (232 views) |
| 6 | GitHub | `github.com/neuralbuildlabai` | `neuralbuildlabai` | **Full admin** (Edit profile) | Live, personal user account (not an org) |

**Two of these were undocumented.** The LinkedIn Page and the GitHub account appear nowhere in the repo, on the website, or in the brand docs. `src/components/PublicSocialLinks.tsx` lists only TikTok, Instagram and X.

### Not found (searched, no Jifunze presence)

YouTube · Threads · Bluesky · Reddit · Medium · Dev.to · Product Hunt · Crunchbase · Wellfound · GitLab · Pinterest · Twitch · Mastodon · Stack Overflow · Discord

---

## B. Audit detail — what is wrong on each profile

Legend: ✗ = wrong · ⚠ = risky/unclear · ✓ = correct

### 1. Facebook Page

| Field | Live value | Verdict |
|---|---|---|
| Profile photo | Old navy mark, no wordmark, sits off-centre in the circle | ✗ |
| Cover image | Navy/DejaVu artwork, *"Practical AI & career skills for the next billion online."* | ✗ superseded brand |
| Name | `Jifunze.ai` (lowercase `ai`) | ✗ inconsistent casing |
| Vanity URL | **Never claimed** — page is still `profile.php?id=…` | ✗ high priority |
| Bio | "Learn practical AI and career skills. Free courses and daily lessons. 🌍" | ⚠ 7th variant |
| Category | Education | ✓ (but LinkedIn says Software Development) |
| Website | `jifunze.ai` | ✓ |
| Contact email | `neuralbuild.ai@gmail.com` | ⚠ see D |
| Phone | `+1 281-380-5420` | ⚠ verify this should be public |
| Location | `Edgewick Elm St, 77545` | ✗ incomplete address, and X says "Kenya, Global" |
| Pinned / Featured | None | ✗ |
| Setup checklist | "Not started" | ✗ |

### 2. Instagram

| Field | Live value | Verdict |
|---|---|---|
| Profile photo | **None — default grey placeholder** | ✗ **worst single item in the audit** |
| Display name | `jifunze.ai` | ✗ should be a real name, not the handle |
| Handle | `@jifunze.ai` | ✓ |
| Bio | "AI-powered workspace for deep learning, revision, and smart content creation…" | ✗ copied from X, not the IG copy in your own doc |
| Link in bio | Not set / not visible | ✗ |
| Posts | 0, against 15 followers | ⚠ |

Your own `brand-assets/instagram/INSTAGRAM_PROFILE.md` specifies name `Jifunze.AI · AI Career Skills` and a three-line bio — **none of it was ever applied.**

### 3. LinkedIn Page

| Field | Live value | Verdict |
|---|---|---|
| Logo | Old horizontal lockup on a white card, letterboxed into the square slot | ✗ |
| Banner | Default beige placeholder — no artwork at all | ✗ |
| Name | `Jifunze.AI` | ✓ |
| Tagline | "Create smarter. Grow faster." | ✗ superseded |
| Overview | "…helps brands and creators generate smarter **social content** in seconds…" | ✗ **describes the removed product** |
| Industry | Software Development | ✗ conflicts with Facebook's "Education" |
| Website | `https://jifunze.ai` | ✓ |
| Location | Not set | ✗ |
| Company size / Founded | 2-10 · 2026 | ✓ |

### 4. X

| Field | Live value | Verdict |
|---|---|---|
| Avatar | Old grey/blue lockup, letterboxed inside the circle with white margins | ✗ |
| Header | Same old lockup on black, small and off-centre | ✗ |
| Name | `Jifunze.AI` | ✓ |
| Handle | `@JifunzeAI` | ✓ |
| Bio | "AI-powered workspace for deep learning… **Coming soon.**" | ⚠ "Coming soon" is stale |
| Website | `jifunze.ai/generate` | ✗ deep link, not the homepage |
| Location | `Kenya, Global` | ⚠ conflicts with Facebook's Texas address |
| Pinned post | None | ✗ |

The artwork on this profile carries a **fourth** tagline: *"Create smarter. Grow faster."*

### 5. TikTok

| Field | Live value | Verdict |
|---|---|---|
| Avatar | Old horizontal lockup crammed into a circle, edges clipped | ✗ |
| Name | `Jifunze.AI` | ✓ |
| Handle | `@jifunze_ai` | ✓ |
| Bio | "Create smarter social content in seconds. Try it free." | ✗ **removed product** |
| Website | Not set | ✗ |

### 6. GitHub

| Field | Live value | Verdict |
|---|---|---|
| Avatar | Default identicon | ✗ |
| Display name | Not set | ✗ |
| Bio / website / location | All empty | ✗ |
| Account type | **Personal user account**, not an organization | ⚠ see D |
| `jifunze-ai` repo description | "JifunzeAI — Self-learning AI system for intelligent content generation…" | ✗ removed product |

### 7. Your own website (found during discovery)

`index.html` `<title>` reads **`Jifunze.AI — AI social content`**. Also missing: `<meta name="description">`, Open Graph tags, and `og:image`. Every link anyone shares to jifunze.ai currently previews as the deleted product with no image.

`src/components/PublicSocialLinks.tsx` displays the X handle as `@Jifunze.AI` while linking to `x.com/JifunzeAI` — the label doesn't match the handle, and LinkedIn is missing from the list entirely.

---

## C. The nine live descriptions

| Where | What it says Jifunze is |
|---|---|
| `PROJECT_CONTEXT.md` (**source of truth**) | Learning, tutoring and applied-practice platform |
| `brand/README` (approved) | *"Your idea never sleeps."* |
| Facebook cover | *"Practical AI & career skills for the next billion online."* |
| Facebook bio | "Learn practical AI and career skills. Free courses and daily lessons." |
| Instagram + X bio | "AI-powered workspace for deep learning, revision, and smart content creation" |
| TikTok bio | "Create smarter social content in seconds. Try it free." |
| LinkedIn tagline | "Create smarter. Grow faster." |
| LinkedIn overview | "helps brands and creators generate smarter social content in seconds" |
| `index.html` title | "AI social content" |
| GitHub repo description | "Self-learning AI system for intelligent content generation" |

**Open decision you need to make:** the approved violet wordmark reads **`Jifunze`** (no `.AI`), but every live profile is named **`Jifunze.AI`**. Pick one before anything is applied — this is the single decision that gates the rest.

---

## D. Security & ownership findings

I did **not** open any account-security settings, so MFA and recovery details are unverified. Recording what is observable, plus what you need to check yourself.

| Account | Admin access observed | MFA | Risk | Note |
|---|---|---|---|---|
| Facebook Page | Yes — full Page admin | Unverified | **Medium** | Check Page roles for unknown admins; Meta Business Suite is linked |
| Instagram | Yes — account owner | Unverified | **Medium** | Linked to the Meta app; shares the FB security surface |
| LinkedIn Page | Yes — Page admin | Unverified | Low | Check "Admin tools → Manage admins" |
| X | **No** — session is `@CalmSignalHQ` | Unverified | **High** | You cannot currently prove control of this account from this machine |
| TikTok | **No** — different account signed in | Unverified | **High** | Same |
| GitHub `neuralbuildlabai` | Yes | Unverified | **High** | See below |

**GitHub is the highest-risk item.** The production repo and the Vercel deployment (`team_87xbNbTqnh5icgsvG45Z8XSd`) hang off a **personal user account**, not an organization. Given `docs/OWNERSHIP_AND_IP_NOTICE.md` asserts sole ownership and contract-only contribution, a personal account with no org boundary means no role separation, no audit log, and no clean way to transfer or revoke contributor access. Converting to a GitHub Organization is worth doing before you add anyone.

**Contact email is unresolved.** Both appear in the repo — `neuralbuildlabai@gmail.com` (5 occurrences) and `neuralbuild.ai@gmail.com` (3 occurrences, and it's the one live on the Facebook Page). You told me it may be "both and some more." Until you pick one, I'd recommend `hello@jifunze.ai` on the domain you already own: it survives you changing Gmail accounts, and it's the only option that doesn't leak which personal inbox runs the company.

**Also verify:** the Facebook Page publishes a phone number (`+1 281-380-5420`) and a partial street address to the world. Confirm both are intended to be public.

---

## E. Handle availability & conflicts

| Platform | `jifunze` | `jifunzeai` / `jifunze-ai` | Recommendation |
|---|---|---|---|
| **LinkedIn** | ✗ **Taken** — Jifunze, a Tanzanian education NGO in Kiteto, founded 1999, 20 followers | ✓ **You hold `jifunze-ai`** | Keep `jifunze-ai`. Do not contest — a 27-year-old education nonprofit with the same name in your market is a trademark risk worth a lawyer's opinion, not a handle grab. |
| **GitHub** | ✗ **Taken** — `github.com/Jifunze`, an organization with 5 forked repos, no bio | ✓ Both `jifunzeai` and `jifunze-ai` **free** | Claim `jifunze-ai` as an Organization |
| **YouTube** | ✓ `@jifunze` free | ✓ `@jifunzeai`, `@jifunze_ai` free | Claim `@jifunze` — highest-value free handle found |
| **Facebook** | vanity URL unclaimed on your own Page | — | Claim `facebook.com/jifunze.ai` |
| Reddit | ✓ `u/jifunzeai` free | — | Low priority |
| Medium, Dev.to, Product Hunt, Crunchbase, Wellfound | ✓ free | ✓ free | Claim when you have something to publish |

**Access limitations in this pass:** Threads and Pinterest are blocked by browser policy and could not be checked. Bluesky, Twitch, Mastodon, GitLab, Stack Overflow and Discord returned no usable public result and are best confirmed by you at signup.

---

## F. Recommended order of work

Highest damage-per-minute first.

1. **Decide `Jifunze` vs `Jifunze.AI`.** Everything else waits on this.
2. **Instagram profile picture** — the only fully blank avatar. 60 seconds.
3. **Rewrite LinkedIn overview + TikTok bio.** These actively describe a product that no longer exists.
4. **Fix `index.html`** — title, description, OG tags, `og:image`. Every share link is broken until this lands.
5. **Claim `facebook.com/jifunze.ai`** and `@jifunze` on YouTube. Free handles get taken.
6. **Swap all six avatars and three banners** using the kit in `jifunze-social-paste-kit.md`.
7. **Reconcile location** (Kenya vs Texas) and **contact email**.
8. **Convert GitHub to an Organization**, then set avatar/bio/website.
9. **Verify MFA** on all six accounts, and confirm you still control X and TikTok.

---

## Evidence

Screenshots of every profile in its pre-change state were captured during this pass and are available on request. Nothing was modified; every finding above is reproducible by opening the URLs in column 2 of table A.
