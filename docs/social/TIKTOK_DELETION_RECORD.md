# TikTok — correction and authorised deletion: record

**Date opened:** 20 August 2026
**Date closed:** 20 August 2026
**Account:** `https://www.tiktok.com/@jifunze_ai`
**Authorisation:** the owner explicitly authorised permanent deletion of ONE specific obsolete
video from `@jifunze_ai`, and instructed that this deletion not be paused on for a second
confirmation.

## Outcome

# COMPLETED — PERFORMED MANUALLY BY THE OWNER, 20 AUGUST 2026

The automated attempt on 20 August was **blocked on sign-in** (the browser available to the agent
was signed into an unrelated brand, `@calmsignalhq`, and TikTok's web UI has no account switcher).
The owner then signed in and completed the whole pass by hand, and has confirmed and verified the
final state.

## Final verified state — owner-confirmed

| Item | State | Confirmed by |
|---|---|---|
| Account | `https://www.tiktok.com/@jifunze_ai` | Owner |
| Display name | ✅ corrected to `Jifunze.AI` | Owner |
| Username | ✅ unchanged — `@jifunze_ai` | Owner |
| Bio | ✅ career-skills bio applied (replaces the copy that sold the removed social-content SaaS) | Owner |
| Avatar | ✅ approved violet mark applied | Owner |
| Obsolete video (16 April 2026, `Jifunze.AI is live 🚀`, link to `/generate`) | ✅ **permanently deleted** | Owner |
| Any other TikTok content | ✅ none remains that is obsolete | Owner |
| Replacement content published during the pass | ❌ none — as instructed | Owner |

**No further TikTok change is to be attempted by any agent.** This record is closed.

## What the agent did and did not do

- The agent made **no** TikTok change, before or after the owner's pass.
- Nothing on `@calmsignalhq` was viewed beyond the sidebar link needed to establish which account
  was signed in, and nothing on it was modified.
- This file is a record of an owner-performed action. It is not an agent attestation of the live
  profile: the agent has not re-opened TikTok to re-verify, and does not claim to have.

## Why the automated attempt failed (retained for the audit trail)

| Check | Result at the time |
|---|---|
| Correct account reachable in the browser | ❌ signed into `@calmsignalhq`; `/@jifunze_ai` rendered with a *Follow* button |
| Account switching available | ❌ TikTok web offers only *View profile* and *Log out* |
| Video identified by date / caption / `/generate` link | ❌ not verifiable — no video publicly listed to a third-party viewer |
| Video identified by metrics (232 plays, 8 likes) | ⚠ partially corroborated — 8 likes against 0 listed videos |

Three of the four identifying details could not be checked from that machine, so the agent
declined to delete public content permanently on corroboration alone. That judgement stands; the
owner, signed in, could see all four and completed it.

## Corroborating evidence found elsewhere

The two obsolete LinkedIn posts on the Jifunze.AI Page are dated **16 April 2026** — the same date
as the deleted video — and one begins *"Jifunze.AI is live. Create smarter social content in
seconds."* with a link to the retired product. Same launch campaign. **Those two LinkedIn posts and
three X posts are still live and remain an owner action** (see `MANUAL_PLATFORM_ACTIONS.md`).

## Still open on TikTok — not blocking

- **Website field** → `https://www.jifunze.ai`. Normally requires 1,000 followers, so expect the
  field to be unavailable. Optional.
- **Connect Instagram and YouTube** where TikTok supports it. Optional.
- **API access** → TikTok has no developer app for this brand. Unaudited clients can only post
  `SELF_ONLY`, so a client audit is required before anything posted through the API can be public.
  Tracked in `PLATFORM_ADAPTER_MATRIX.md` and `MANUAL_PLATFORM_ACTIONS.md` #15.

## Note on the `/generate` link in the deleted post

`/generate` now redirects to the public career-skills homepage (`src/App.tsx`, retired-routes
block) instead of returning the app's 404. That redirect still matters for the obsolete LinkedIn
and X posts, which link to the same retired surfaces and are still live.
