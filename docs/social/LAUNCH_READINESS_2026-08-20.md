# Launch-readiness report — 20 August 2026

**Scope of this assessment:** the code in this branch, the eight official social profiles, and the
current credential state. It does not assess anything that has been deployed, because nothing has.

# Verdict: READY FOR CODE REVIEW

That is the highest verdict available for this work, and it is reached honestly rather than by
default: deployment, publishing and pushing were all excluded from the assignment, so no higher
verdict was reachable.

## What "ready for code review" means here

- Every check passes: format, lint, type-check (both projects), unit tests, adapter tests, the
  migration verifier, the full end-to-end suite, and a production build.
- The end-to-end suite went from **105 passing / 12 failing** to **138 passing / 0 failing**. Twelve
  of those were pre-existing failures, unrelated to this work, that are now fixed.
- Nothing was published, deployed, pushed, merged, purchased or enabled.
- Every gate that was on is still on. `IG_PUBLISH_ENABLED` is untouched. The new cron is gated off.

## What still blocks a public launch

| # | Blocker | Who clears it | Severity |
|---|---|---|---|
| ~~1~~ | ✅ **CLEARED — 20 Aug 2026, by the owner.** TikTok display name, bio and avatar corrected, and the obsolete `/generate` video permanently deleted. No obsolete TikTok content remains | Owner (done) | — |
| 2 | **Instagram has no bio link** — the primary publishing target's funnel terminates nowhere. Desktop web cannot set it | Owner, in the Instagram app | **Blocking** |
| 2b | **Threads has no website link either**, for what appears to be the same mobile-only reason | Owner, in the Threads app | Should clear before launch |
| 3 | **Nothing is deployed.** The site, the metadata and the Pinterest domain claim all wait on one deploy | Owner | **Blocking** |
| 4 | **Five obsolete posts** (2 LinkedIn, 3 X) still advertise the removed SaaS and the frozen learning platform | Owner | **Blocking** — a new visitor scrolling back sees a different company |
| 5 | **No human has approved a first live post** | Owner | Blocking, by policy |
| 6 | **Music licensing is unverified.** The render pipeline refers to music; no licence record or documented platform-permitted source was found | Owner | Blocking before any video ships |
| 7 | **`hello@jifunze.ai` is unverified.** It is published on three profiles. It cannot be verified without sending mail or opening the mailbox | Owner | Should clear before launch |

## Cleared since the previous assessment

| Item | State |
|---|---|
| Rendered videos off-brand (DejaVu Sans, retired blue `#78B9DC`) | ✅ Fixed and covered by regression tests. A frame was rendered and inspected: near-black ground, violet keyword accent, Plus Jakarta Sans ExtraBold, brand mark in the safe area, 1080×1920 |
| "The relevance filter is broken" | ✅ Was never true — a stale artefact. The news gate rejects 5 of 8 off-brand stories and accepts 3 career-relevant ones, with a regression test |
| Free Kazi Kit CTA promising a dead link | ✅ Removed from captions, briefs and end cards, and now enforced in three more places: `ctaEligible()`, per-platform transformation warnings, and adapter content validation |
| `PublicSocialLinks` was dead code | ✅ Rewritten and rendered in the footer of every public page, on the homepage and on `/social`; reads from one canonical module |
| The website contradicted the profiles | ✅ Fixed in the repository — six new public routes, correct metadata, sitemap, RSS. **Still needs a deploy** |
| `/generate` returned a 404 to visitors from the old launch posts | ✅ Redirects to the public homepage |
| Obsolete SaaS Edge Functions still deployed | ✅ **Fully closed 20 Aug 2026.** Source quarantined, and both `generate-public` and `generate-content` confirmed deployed and **deleted remotely**. Remaining remote functions are only `ingest-signals`, `publish-instagram`, `refresh-ig-token`. Local references cleaned. See `docs/social/EDGE_FUNCTION_CLEANUP_2026-08-20.md` |
| No canonical content record | ✅ Ledger built, in code and in Postgres, with RLS |
| No operational visibility | ✅ `/admin/social-ops` built, isolated from the frozen admin |
| No metrics history | ✅ Two-hour sync built, tested, dry-run verified, gated off |
| TikTok profile and obsolete video | ✅ **Closed 20 Aug 2026 by the owner.** Display name `Jifunze.AI`, career-skills bio, approved violet avatar, obsolete 16 Apr `/generate` video permanently deleted. No agent touched TikTok |
| Threads website link | ⚠ **Not applied.** The earlier report's claim that it was set was wrong — the field was empty. Adding it was attempted twice; Threads' desktop web accepts the link, shows it, and discards it on reload. Now an owner action in the Threads mobile app |

## Path to the next verdict

**READY FOR DEPLOYMENT REVIEW** needs: code review passed, the migration reviewed, and blockers 2–4
cleared (blocker 1, TikTok, is cleared).

**READY FOR SUPERVISED PILOT** additionally needs: the site deployed, music licensing documented, a
week of `DRY_RUN=true` loop output reviewed post by post, and a human approving a specific first
post.

**READY FOR LIMITED AUTONOMOUS PUBLISHING** additionally needs: 3–5 posts published manually and
reviewed, `IG_PUBLISH_ENABLED=true`, the kill switch rehearsed, and failure alerts confirmed to
actually reach a human.

## The honest summary

The engineering is in good shape and the profiles are almost right. What stands between here and a
first post is not code — it is one Instagram app edit, one Threads app edit, five old posts, one
deploy and one licensing answer. TikTok is done. None of the rest can be done from this machine.
