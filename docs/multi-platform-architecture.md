# Multi-platform architecture

## Principle

**Intelligence is shared; execution is per platform.** Trend detection, relevance, opportunities, autonomy, and brand logic stay channel-agnostic. **Formatting**, **adaptation**, **media packaging**, **scheduling rules**, and **publishing** vary by `SocialPlatformId` and per-`SocialAccount` policy.

## Layers

| Layer | Role |
|-------|------|
| `SocialPlatformId` | Closed set of channels (`x`, `instagram`, …) — extend the tuple + `PLATFORM_POLICIES`. |
| `PlatformPolicy` | Supported formats, media caps, caption guidance, posting expectations, auto-publish guardrails. |
| `SocialAccount` | Many handles per `BrandProfile`; automation + cadence + `blocked_trend_categories` + `publishing_eligibility`. |
| `adaptOpportunityToPlatforms` | One opportunity + brief + brand → **four distinct** `PlatformPostVariant`s (X, Instagram, TikTok, Facebook) — not duplicated captions. |
| `adaptContentForSocialAccounts` | Maps those variants onto **connected** handles (cadence, blocks). |
| `platformAdaptationPolicies` | Tone, hook style, hashtag behavior, CTA behavior, rough length, media expectations per surface. |
| `PublishingConnector` | Vendor-agnostic `validate` / `publish`; mock registry today, real SDKs behind `registerPublishingConnector` later. |

## Connectors (future)

- One connector implementation per platform (or per vendor API surface).
- Register at worker bootstrap; never branch “if X” inside the intelligence core.
- OAuth tokens and rate limits live with the account row in Postgres, not in the client preview.

## Scheduling

- Platform policies describe **expectations**; cron workers enforce **cadence** using `posting_cadence_per_day_max` and tenant timezone.

See also `docs/near-autonomous-content-operations.md` for jobs, retries, and safeguards.
