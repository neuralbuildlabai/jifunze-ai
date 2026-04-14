# JifunzeAI

JifunzeAI is an AI-powered SaaS platform that automates content creation, scheduling, and social media management for businesses.

Meaning:
"Jifunze" = Beautiful (Swahili)

Core Idea:
Make brands look beautiful, consistent, and powerful — automatically.

---

## PRODUCT DIRECTION (EVOLVED)

JifunzeAI is evolving into an **AI-powered brand intelligence and multi-platform social operating system** — not a single-network caption tool. One **shared intelligence layer** (signals → relevance → opportunities → autonomy) fans out to **many social accounts** via **platform policies**, **adaptation** (per-channel copy/media/scheduling hints), and **publishing connectors** (X, Instagram, Facebook, TikTok, LinkedIn — extensible).

It should be able to:

- Scan the wider web for relevant news, trends, and conversations (via pluggable providers)
- Detect topics that matter to a business or brand
- Recommend or generate timely social content from those signals
- Maintain brand voice and relevance as first-class inputs
- Support **autonomous brand operations** by default: low-risk, high-confidence work moves forward without a human gate; **escalate by exception** when confidence is low, risk is elevated, or policy requires review.

**Human-in-the-loop (exceptions only):** sensitive topics, hard safety hits, low-confidence or high-risk items, and anything blocked by profile automation settings. Normal opportunities can be **watched**, **drafted**, **queued**, or marked **ready to publish** per tenant policy — not every row needs a strategist click.

**Autonomy layer:** each opportunity carries an `autonomy_action` (`ignore` | `watch` | `draft` | `queue` | `publish` | `escalate_for_review`), `confidence_score`, `risk_level`, and `requires_human_review`. Brand profiles expose `automation` settings (draft/queue/publish toggles, confidence and priority floors, trend allow/block lists for auto-publish). Rule-based today; same types suit Edge jobs later.

**Lifecycle:** each opportunity and generated package can carry a `ContentLifecycleStatus` (`detected` … `published`, plus `escalated` / `rejected`). Autonomy maps into the first persistent stage; workers advance stages per `docs/near-autonomous-content-operations.md`. Placeholder `ContentAnalyticsFeedback` is attached to packages for future learning loops.

**Early-phase posting:** client previews do not call live publish APIs; “publish” is a **decision state** for connectors/schedulers to execute when wired.

**Safety & quality:** source validation, deduplication, staleness, misinformation and brand-safety hooks are part of the architecture (client preview today; authoritative checks on the server later).

**Future scheduling:** opportunities flow toward drafts → scheduled posts → multi-platform publishing.

**Specialized domains (five only):** JifunzeAI classifies every signal into **ai**, **beauty**, **lifestyle**, **entertainment**, or **music** — no open-ended domain list. Brand profiles use a **primaryDomain** plus optional **secondaryDomains**; relevance boosts in-domain signals and dampens off-domain noise (with optional `allow_cross_domain_signals`). Domain definitions live in `src/config/domains.ts`; classification uses `classifySignal()`.

**Trend categories:** each signal also gets a focused **TrendCategory** (`breaking_news`, `product_launch`, `viral_trend`, `meme`, `viral_audio`, etc.) via rule-based `classifyTrendCategory()` in `src/services/trends/`. Weights and format/urgency biases live in `src/config/trendCategoryBehavior.ts`. Opportunities carry **priority_score** and a plain-language **selection_reason** for queue review.

Creative planning turns opportunities into **creative briefs** and **mock media prompts** ahead of real asset generation on the server.

---

## IMPORTANT RULES

- This is a completely standalone project
- It is NOT related to any previous systems (including Skin Gallery)
- Do NOT reuse schemas, APIs, or architecture from other projects
- Build everything from scratch with clean, scalable structure

---

## GOAL

Build a digital growth engine that can:

- Generate social media content using AI
- Ingest and normalize external signals (news, trends, RSS, etc.)
- Score relevance to a brand profile
- Turn signals into structured content opportunities
- Schedule and publish posts (later)
- Manage multiple platforms (later)
- Maintain brand consistency
- Provide analytics and optimization (later)

---

## TECH STACK

Frontend:
- React (Vite + TypeScript)
- Tailwind CSS

Backend:
- Supabase (Postgres, Auth, Edge Functions)

AI Layer:
- OpenAI API (server-side only; never expose provider keys in the browser)

---

## PHASE 1 MVP

- Trend-aware **preview** pipeline (mock providers): signals → guards → relevance → opportunities → **autonomy decision** (ignore / watch / draft / queue / publish / escalate)
- **Multi-brand** demo profiles (`demoBrands`) with primary/secondary Jifunze domains, trend allowlists, formats, and creative risk; **multi-account** demo data via `demoSocialAccounts` / `resolveSocialAccountsForBrand`
- **Platform model:** typed `SocialPlatformId`, per-platform `PlatformPolicy` (`platformPolicies.ts`), `SocialAccount` rows (automation + eligibility), **`adaptOpportunityToPlatforms`** (`services/platforms/`) with central **`platformAdaptationPolicies`**, optional **`platform_adaptation`** on `ContentPackage`, account-aware **`adaptContentForSocialAccounts`**, and mock `PublishingConnector` registry (`services/publishing/`)
- Content generator (caption + hashtags) from manual topic or opportunity; **content packages** for caption-only through full brief + mock media prompts
- Creative layer: `CreativeBrief`, `MockMediaPrompts`, future `MediaGenerationRequest`
- Simple UI: brand selector, opportunities, creative studio, output stack
- Server-ready content API adapter (mock default; HTTP to Edge Function when configured)
- Basic structure for future scheduling and publishing

---

## CODING PRINCIPLES

- Keep code clean and modular
- Avoid over-engineering
- Build MVP-first, then scale
- Use clear naming and folder structure
- Prefer pluggable providers and swappable scorers over hardcoded vendor logic
