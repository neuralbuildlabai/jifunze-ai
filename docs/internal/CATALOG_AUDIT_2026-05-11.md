# Jifunze.ai — Course & Catalog Factual Audit

**Date:** 2026-05-11
**Scope:** All course/workshop/microlearning items, course routes, static course packages, and public catalog surfaces currently in the codebase.
**Status:** Audit-only. No code changes made.

---

## A. Executive summary

- **Total distinct course/library items defined in data:** ~52
  - 2 Free Starter Rise microlearning workshops
  - 3 standalone full courses (native, with full lesson/module/quiz data)
  - 5 "course-as-library" wrappers under `/courses/...`
  - 5 extended public libraries (Networking, Cybersecurity, Cloud/DevOps, Monitoring, Content Publishing)
  - 3 family libraries (AI Foundations, ML, Everyday Chatbots)
  - 1 teaching labs surface (`/library/ai-labs`)
  - 16 flagship courses (gated/hidden from public browse by policy)
  - 15 placeholder/coming-soon catalog entries (not routed)
  - Several premium track ids in ML/Chatbot catalogs (no routes)

- **Items publicly discoverable from `/` and `/learn` today:** **5**
  Smart Workflows with AI (Rise micro), AI at Work (Rise micro), Practical Mathematics, Business Process Automation for Work, Business Analytics for Decision-Making.

- **Items reachable only via direct/deep link:** ~25 library/landing/course pages (no homepage or `/learn` card surfaces them).

- **Items defined but never surfaced to learners at all (gated/hidden):** All 16 flagship courses (empty allowlist) plus all 15 planned/coming-soon entries.

- **Verification commands result (in this environment):**
  - `npm run lint`: PASS (no errors)
  - `npx tsc -b --force`: PASS (no errors)
  - `npm run build`: BLOCKED in this Linux ARM64 sandbox (missing native rolldown binary; this is an environment issue, not a code issue — the build runs on macOS where node_modules was installed).
  - `npm run verify:hosted-rise-dist`: equivalent file-existence check PASSES against the existing `dist/` — all three required `content/index.html` files are in place.
  - Playwright e2e tests: not runnable in this sandbox (no browser binaries); spec files all exist.

### Biggest risks

1. **Slug collision: `smart-workflows-with-ai`** is simultaneously a Free Starter Rise micro AND a flagship course slug. Routes `/learn/free/smart-workflows-with-ai` (micro) and `/learn/courses/smart-workflows-with-ai` (flagship deep-link) both resolve. Sets the stage for "which one is the real one?" confusion.
2. **Twin paid/free packages: `smart-workflows-with-ai` (14 MB, free) vs `ai-productivity-smart-workflows` (27 MB, paid flagship Rise bundle).** Catalog aliases the paid slug back to the free curriculum (`flagshipCourseCurricula.ts:1300`).
3. **Fabricated social proof in dead code.** `FEATURED_CARD_CHROME` in `discoveryHubSections.tsx` hardcodes fake ratings (`'4.9'`, `'4.8'`) and learner counts (`'2.3k'`, `'1.8k'`). The `FeaturedCoursesSection` that renders them is exported but **not currently imported anywhere**, so it doesn't display today — but the constants sit in the repo and are a regression risk.
4. **`StandaloneCoursesSection`** similarly hardcodes `rating: '5.0'` and `learners: 'Open to all'` for cards. It is also exported but **not imported anywhere** — dead code now, but a future regression vector.
5. **One actual user-visible "Rise" leak:** `PaidHostedRiseFlagshipSection.tsx:170` reads "The full Rise experience opens in a new tab…".
6. **User-visible "dev simulation" wording** in `LearnerCheckoutPage.tsx` (suppressed only when `LEARNER_MONETIZATION_UI_DISABLED`; checkout page itself is reachable via direct link).
7. **15 placeholder/coming-soon entries** in `plannedCoursesCatalog.ts` — none currently routed but exported as data, with `intro: 'Placeholder catalog entry…'` strings.

---

## B. Current public catalog surfaces

### B.1 `/` (PublicHomePage, unauthenticated)
File: `src/components/landing/PublicHomePage.tsx`. Renders only `AvailableLearnHero` + `HomepageAvailablePreviewSection`.
Shown cards (`getHomepageAvailablePreviewItems`):
1. **Smart Workflows with AI** (Free Starter Workshop) → `/learn/free/smart-workflows-with-ai`
2. **AI at Work** (Free Starter Course) → `/learn/free/ai-at-work-chatgpt`
3. **Practical Mathematics for Life, Work, and Business** → `/learn/practical-mathematics-life-work-business`

Top nav links: Courses → `/learn#available-now`, About, Contact.

### B.2 `/learn` (LearningDiscoveryHubPage)
File: `src/components/learn/LearningDiscoveryHubPage.tsx`. Renders `AvailableLearnHero`, `AvailableNowSection`, `AvailableLearningAreasSection`, `AboutStrip`.
"Available Now" shows 2 microlearning + 3 full courses = **5 items**:
- Smart Workflows with AI (micro)
- AI at Work (micro)
- Practical Mathematics for Life, Work, and Business
- Business Process Automation for Work
- Business Analytics for Decision-Making

"Available Learning Areas" shows 4 area cards (no per-card course links): `ai_productivity`, `business_operations`, `mathematics`, `data_decisions`.

### B.3 `/my-learning` (MyLearningPage)
Same 2+3 set repeats under "Free Microlearning" and "Free Full Courses". The "Your courses" and "Recommended next" panels are blank because `learnerPublicCatalogFlagshipCourses()` returns `[]` (the flagship allowlist is intentionally empty).

### B.4 `/learn/school/:schoolId` (LearningSchoolCatalogPage)
4 school IDs exist (`ai_digital`, `business_growth`, `career_intellect`, `leadership_learning`). All routes immediately `<Navigate to="/learn" replace />` because the policy allowlist is empty. Effectively unreachable.

### B.5 `/learn/category/:slug` (LearningCategoryPage)
8 category slugs exist: `chatgpt`, `prompting`, `gemini`, `claude`, `agentic-ai`, `ai-and-ml`, `cybersecurity`, `cloud-devops`. Pages render eyebrow / FAQ / "use main catalog" pointer only — **no concrete course cards** are rendered, even though the catalog data contains `featuredCourses` arrays.

### B.6 Standalone-course landing pages (`/courses/...`)
Five routes wired through `PublicStandaloneCourseLandingPage` and `PublicExtendedCatalogLibraryPage`:
- `/courses/learn-chatgpt-everyday-work`
- `/courses/prompt-engineering-models`
- `/courses/gemini-workspace-productivity`
- `/courses/claude-writing-research-deep-thinking`
- `/courses/agentic-ai-real-work`
These are reachable by direct link but are **not surfaced by any homepage/learn card** today.

### B.7 Library pages (`/library/...`)
- `/library/ai-foundations` (curriculum surface for AI Foundations family)
- `/library/ai-labs` (AI Teaching Labs)
- `/library/everyday-chatbots`
- `/library/machine-learning-foundations`
- `/library/networking-and-infrastructure`
- `/library/cybersecurity-defense`
- `/library/cloud-devops-platform`
- `/library/monitoring-observability`
- `/library/content-creation`
All reachable via direct link. No public homepage/learn card lists them.

### B.8 Flagship pages (`/learn/courses/:slug`)
`FlagshipCourseDetailPage` resolves all 16 flagship slugs. No homepage or `/learn` UI lists them. Reachable only via direct link or via legacy redirects.

### B.9 Standalone course detail / drilldown
- `/learn/:standaloneCourseSlug`
- `/learn/:standaloneCourseSlug/modules/:moduleSlug`
- `/learn/:standaloneCourseSlug/modules/:moduleSlug/lessons/:lessonSlug`
- `/learn/:standaloneCourseSlug/modules/:moduleSlug/quiz`
- `/learn/:standaloneCourseSlug/certificate`
- `/learn/:standaloneCourseSlug/capstone` (note: route is `/learn/courses/:slug/capstone`)

### B.10 Header / footer
- Public nav (unauthenticated): "Courses → /learn#available-now", "About", "Contact".
- Footer default links: `/learn#available-now`, About, Contact, plus Terms/Privacy/Refunds/Disclaimer.
- Workspace learner top nav: My Learning / Catalog / Reports / Account.
- Workspace admin nav: Dashboard, Members, Catalog, Schools (→ `/learn#available-now`, misnomer), Assignments, Training plans, Learning reports, Growth Intelligence, Settings.

### B.11 Dead-code surfaces (defined but unimported anywhere)
- `DiscoveryHero` (alt hero with "9+ Flagship Courses / 4 Schools / Beginner to Pro" stat strip and fabricated counts) — **NOT rendered**.
- `FeaturedCoursesSection` (uses `FEATURED_CARD_CHROME` fake ratings/learners) — **NOT rendered**.
- `SchoolsSection` — **NOT rendered**.
- `StandaloneCoursesSection` (uses hardcoded `rating: '5.0'` / `learners: 'Open to all'`) — **NOT rendered**.

---

## C. Full course inventory

Legend for **Visibility**: `Home` = on `/`, `Learn` = on `/learn` available-now, `MyL` = `/my-learning`, `Direct` = direct link only, `Hidden` = no surface or always-redirected.

| # | Title | Slug | Route | Type | Visibility | Access | Source | Progress | Cert | Route status | Recommendation |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Smart Workflows with AI (Free Starter Workshop) | `smart-workflows-with-ai` | `/learn/free/smart-workflows-with-ai` | Microlearning | Home, Learn, MyL | Free | Hosted Rise (iframe) | Internal localStorage (`rise_pilot_…`) | None public | Working | **Keep public** |
| 2 | AI at Work (Free Starter Course) | `ai-at-work-chatgpt` | `/learn/free/ai-at-work-chatgpt` | Microlearning | Home, Learn, MyL | Free | Hosted Rise (iframe) | Internal localStorage | None public | Working | **Keep public** |
| 3 | Practical Mathematics for Life, Work, and Business | `practical-mathematics-life-work-business` *(also referenced as `practical-mathematics-for-life-work-business` in `availablePublicLearnCatalog.ts`)* | `/learn/practical-mathematics-life-work-business` | Standalone full course (16 modules) | Home, Learn, MyL | Free | Jifunze-native | Account-backed | Certificate route present (`/learn/<slug>/certificate`) | Working | **Keep public** |
| 4 | Business Process Automation for Work | `business-process-automation-for-work` | `/learn/business-process-automation-for-work` | Standalone (5 modules, `professional_micro`) | Learn, MyL | Free | Jifunze-native | Account-backed | Certificate route | Working (legacy `/learn/courses/...` redirects here) | **Keep public** |
| 5 | Business Analytics for Decision-Making | `business-analytics-decision-making` *(also `business-analytics-for-decision-making` in catalog list)* | `/learn/business-analytics-decision-making` | Standalone (6 modules, `professional_micro`) | Learn, MyL | Free | Jifunze-native | Account-backed | Certificate route | Working | **Keep public** |
| 6 | Learn ChatGPT for Everyday Work | `course_chatgpt_everyday` (libraryKey) | `/courses/learn-chatgpt-everyday-work` (+ `/learn` library reader) | Standalone course-as-library (6 modules) | Direct | Free | Jifunze-native (extended library spec) | Reader-based | None visible | Working | Direct-link only |
| 7 | Prompt Engineering Across ChatGPT, Claude, and Gemini | `course_prompt_engineering_models` | `/courses/prompt-engineering-models` | Standalone course-as-library | Direct | Free | Jifunze-native | Reader-based | None | Working | Direct-link only |
| 8 | Gemini for Productivity and Google Workspace | `course_gemini_workspace` | `/courses/gemini-workspace-productivity` | Standalone course-as-library | Direct | Free | Jifunze-native | Reader-based | None | Working | Direct-link only |
| 9 | Claude for Writing, Research, and Deep Thinking | `course_claude_writing` | `/courses/claude-writing-research-deep-thinking` | Standalone course-as-library | Direct | Free | Jifunze-native | Reader-based | None | Working | Direct-link only |
| 10 | Agentic AI and AI Agents for Real Work | `course_agentic_ai_real_work` | `/courses/agentic-ai-real-work` | Standalone course-as-library | Direct | Free | Jifunze-native | Reader-based | None | Working | Direct-link only |
| 11 | Networking and Modern Infrastructure | `networking` | `/library/networking-and-infrastructure` | Extended library | Direct | Free | Jifunze-native | Reader | None | Working | Direct-link only |
| 12 | Cybersecurity Foundations to Practical Defense | `cybersecurity` | `/library/cybersecurity-defense` | Extended library | Direct | Free | Jifunze-native | Reader | None | Working | Direct-link only |
| 13 | Cloud, DevOps, and Platform Operations | `cloud_devops` | `/library/cloud-devops-platform` | Extended library | Direct | Free | Jifunze-native | Reader | None | Working | Direct-link only |
| 14 | Monitoring, Observability, and Incident Response | `monitoring` | `/library/monitoring-observability` | Extended library | Direct | Free | Jifunze-native | Reader | None | Working | Direct-link only |
| 15 | Content Creation and Knowledge Publishing | `content_publishing` | `/library/content-creation` | Extended library | Direct | Free | Jifunze-native | Reader | None | Working | Direct-link only |
| 16 | AI Foundations for Everyday Work | (library family, no single slug) | `/library/ai-foundations` (+ `/library/ai-foundations/:lessonSlug`) | Family library | Direct | Free | Jifunze-native | Reader | None | Working | Direct-link only |
| 17 | AI Teaching Labs | (labs, no single slug) | `/library/ai-labs` | Labs index | Direct | Free | Jifunze-native | n/a | n/a | Working | Direct-link only |
| 18 | Building Everyday Chatbots with AI | (library family) | `/library/everyday-chatbots` | Family library | Direct | Free | Jifunze-native | Reader | None | Working | Direct-link only |
| 19 | Machine Learning Foundations and Practical ML | (library family) | `/library/machine-learning-foundations` | Family library | Direct | Free | Jifunze-native | Reader | None | Working | Direct-link only |
| 20 | AI Essentials | `ai-essentials` | `/learn/courses/ai-essentials` | Flagship | Hidden (allowlist empty) | Gated | Jifunze-native (flagship curriculum) | Account-backed | Capstone route present | Page works; no card surface | **Hide from public discovery (already hidden)** |
| 21 | Smart Workflows with AI *(flagship variant)* | `smart-workflows-with-ai` | `/learn/courses/smart-workflows-with-ai` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | **Hide from public discovery; resolve slug collision** |
| 22 | AI Productivity and Smart Workflows | `ai-productivity-smart-workflows` | `/learn/courses/ai-productivity-smart-workflows` | Flagship (paid hosted Rise + native sessions aliased to `smart-workflows-with-ai`) | Hidden | Paid | Hybrid: native sessions + hosted Rise 27 MB bundle | Account-backed | Capstone | Page works | **Hide from public discovery** |
| 23 | Data and Decisions | `data-and-decisions` | `/learn/courses/data-and-decisions` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 24 | Web and Software Foundations | `web-and-software-foundations` | `/learn/courses/web-and-software-foundations` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 25 | Digital Safety | `digital-safety` | `/learn/courses/digital-safety` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 26 | Marketing and Growth | `marketing-and-growth` | `/learn/courses/marketing-and-growth` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 27 | Business Builder | `business-builder` | `/learn/courses/business-builder` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 28 | Money and Finance | `money-and-finance` | `/learn/courses/money-and-finance` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 29 | Product Thinking | `product-thinking` | `/learn/courses/product-thinking` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 30 | Project Execution | `project-execution` | `/learn/courses/project-execution` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 31 | Career Launch | `career-launch` | `/learn/courses/career-launch` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 32 | Clear Communication | `clear-communication` | `/learn/courses/clear-communication` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 33 | Research and Critical Thinking | `research-and-critical-thinking` | `/learn/courses/research-and-critical-thinking` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 34 | Leadership and Teams | `leadership-and-teams` | `/learn/courses/leadership-and-teams` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 35 | Teaching and Facilitation | `teaching-and-facilitation` | `/learn/courses/teaching-and-facilitation` | Flagship | Hidden | Gated | Jifunze-native | Account-backed | Capstone | Page works | Hide |
| 36-50 | 15 placeholder entries in `plannedCoursesCatalog.ts` (Digital Work Readiness, Excel/Sheets, Data Analytics, Software Dev Foundations, No-Code/Low-Code, Cloud Hosting/DevOps Foundations, Cybersecurity for Small Business, AI Office Productivity, AI for Entrepreneurs, Digital Marketing/Social Media, Freelancing/Remote Work, Customer Service/VA, Sales/Negotiation, M&E/Impact Reporting, Kenya Financial Literacy) | various | none (data only) | Placeholder | Hidden | n/a | Metadata only — `intro: 'Placeholder catalog entry…'` | n/a | n/a | No route | **Delete candidate / decide owner** |

### Notes on slug exactness

The catalog has **two spellings** of the Practical Math slug in different files:
- `PRACTICAL_MATH_SLUG = 'practical-mathematics-life-work-business'` (active route)
- `practical-mathematics-for-life-work-business` (appears in `availablePublicLearnCatalog.ts` listing entry)

Two spellings of the Business Analytics slug:
- `business-analytics-decision-making` (active route, defined in `businessAnalyticsDecisionMakingIds.ts`)
- `business-analytics-for-decision-making` (used elsewhere in `availablePublicLearnCatalog.ts`)

These appear to be by-design dual-slug fallbacks at the StandaloneCourseDetailPage lookup (it calls `findStandaloneCourseBySlug` which accepts both), but they create real confusion in the data layer.

---

## D. Keep public now (Group A)

1. **Smart Workflows with AI** — Rise package exists, route works, has progress tracking. Genuinely useful 75–120 min workshop.
2. **AI at Work** — Rise package exists, route works, complementary 45–60 min beginner intro.
3. **Practical Mathematics for Life, Work, and Business** — 16 native modules with full lesson/quiz/capstone/certificate data. Most complete native course.
4. **Business Process Automation for Work** — 5 native modules, complete, route validated by `verify:business-process-automation` script.
5. **Business Analytics for Decision-Making** — 6 native modules, complete, route validated by `verify:business-analytics` script.

These are the 5 items already surfaced on `/` (top 3) and `/learn` available-now (all 5). They are the only items the audit can confirm as production-ready and learner-facing.

---

## E. Hide from public discovery (Group C)

Already hidden by policy (do not change, but note that they SHOULD remain hidden):

- **All 16 flagship courses** — currently hidden via empty `LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS` set in `flagshipLearnerCatalogPolicy.ts`. They have detail pages that work via direct link, but no public surface lists them. This is correct behavior. Confirm policy stays empty until the courses are commercially launched.

Should be hidden (not yet adequately protected):

- **5 standalone course-as-library landing pages** under `/courses/...` (Learn ChatGPT, Prompt Engineering, Gemini, Claude, Agentic AI). They are individually reachable. They have content but no public catalog card. They should either remain direct-link-only (Group B) or, if the content is rough or pilot, be moved off the public route set. Recommendation: **Group B (direct-link only)** until a deliberate launch decision.

- **5 extended public libraries** (`/library/networking-and-infrastructure`, `/library/cybersecurity-defense`, `/library/cloud-devops-platform`, `/library/monitoring-observability`, `/library/content-creation`). Same situation — content exists, route works, but no public card surfaces them. Group B.

- **All 15 entries in `plannedCoursesCatalog.ts`** — these are placeholder intros with no routes. They should not be linked anywhere learner-facing. Already not surfaced; keep that way.

---

## F. Direct-link only (Group B)

- `/library/ai-foundations` and `/library/ai-foundations/:lessonSlug` — large lesson library, no public card surface.
- `/library/ai-labs` — AI Teaching Labs.
- `/library/everyday-chatbots` and `/library/machine-learning-foundations` — family libraries.
- The 5 extended libraries listed in E.
- The 5 `/courses/...` standalone-course library landing pages.
- `/learn/courses/:slug` for all 16 flagships (deep link works; no card).
- `/learn/checkout` (paywall surface; gated under `LEARNER_MONETIZATION_UI_DISABLED`).
- `/learn/readiness/:slug` (readiness challenge for any slug, no public surfacing).
- `/learn/category/:slug` (8 category pages) — these don't currently show cards, so they're more "informational orientation" pages.
- `/learn/school/:schoolId` (4 IDs) — currently always redirect because the flagship allowlist is empty.

---

## G. Delete / cleanup candidates (Group D)

- **`FEATURED_CARD_CHROME` constant in `src/components/learn/discoveryHubSections.tsx` (lines ~99–144).** Fabricated ratings (`'4.9'`, `'4.8'`) and learner counts (`'2.3k'`, `'1.8k'`). Used only by the unused `FeaturedCoursesSection`. Should be deleted as a regression-prevention step.
- **`FeaturedCoursesSection`** in `discoveryHubSections.tsx` — never imported. Dead code.
- **`SchoolsSection`** in `discoveryHubSections.tsx` — never imported. Dead code.
- **`DiscoveryHero`** in `discoveryHubSections.tsx` — never imported. Contains the "`{flagshipCount}+ Flagship Courses` / `4 Schools` / `Beginner to Pro`" stat strip. Dead code.
- **`STANDALONE_CARD_CHROME`, `FREE_STARTER_CARD_CHROME`, and inline fallbacks in `src/components/learn/StandaloneCoursesSection.tsx`** — never imported. Hardcodes `rating: '5.0'`. Dead code; delete the file.
- **15 placeholder entries in `src/data/learning/plannedCoursesCatalog.ts`** — currently exported as data but never routed. Decide per-item whether to keep as roadmap metadata or remove entirely.
- **`/Users/omoke/projects/jifunze-ai/homepage-files.txt`** at the repo root — appears to be a manual notes file (45 KB). Not part of code, but should be reviewed and possibly removed from version control.

---

## H. Duplicates / naming conflicts

| Pair | Files | Recommendation |
|---|---|---|
| `smart-workflows-with-ai` (Free Starter Rise micro, 75–120 min) AND `smart-workflows-with-ai` (Flagship full course, 55–80 h) | `freeStarterRiseCoursesCatalog.ts` + `flagshipCoursesCatalog.ts` + `flagshipCourseCurricula.ts` | **Rename one.** Suggest renaming flagship to a distinct slug (e.g. `smart-workflows-deep-course` or `smart-workflows-flagship`) and keep the micro at the free slug. Same display title is acceptable, but slug must differ. |
| `smart-workflows-with-ai` AND `ai-productivity-smart-workflows` | `flagshipCoursesCatalog.ts` + `flagshipCourseCurricula.ts:1300` alias | **Keep both, but document.** They share curriculum (alias) but ship different hosted Rise bundles. Add a comment header in `flagshipCoursesCatalog.ts` clarifying this is intentional. |
| Free `smart-workflows-with-ai` Rise (14 MB) AND paid `ai-productivity-smart-workflows` Rise (27 MB) | `public/course-assets/rise/...` | **Keep both.** Different bundle, different access tier. |
| "AI at Work" (`ai-at-work-chatgpt`, micro) vs "AI Essentials" (`ai-essentials`, flagship) | `freeStarterRiseCoursesCatalog.ts` + `flagshipCoursesCatalog.ts` | Keep both — different slugs, different scopes. No collision. |
| "Business Analytics for Decision-Making" (standalone) vs "Data and Decisions" (flagship) | `businessAnalyticsDecisionMakingCourse.ts` + flagship catalog | **Keep both, monitor.** Free entry-level vs flagship deep dive. No slug collision. |
| "Business Process Automation for Work" (standalone) vs "Smart Workflows with AI" (flagship) | Standalone + flagship | Adjacent topics but distinct. No collision. |
| Native standalone "Practical Mathematics for Life, Work, and Business" AND any school/category listing | Only standalone — no flagship duplicate exists. | No conflict. |
| Practical Math slug spellings: `practical-mathematics-life-work-business` vs `practical-mathematics-for-life-work-business` | Two spellings in different files | **Normalize.** Pick one canonical spelling (the active route is `practical-mathematics-life-work-business`) and update `availablePublicLearnCatalog.ts` lookup to match. Currently masked by `findStandaloneCourseBySlug` fuzzy lookup. |
| Business Analytics slug spellings: `business-analytics-decision-making` vs `business-analytics-for-decision-making` | Two spellings | **Normalize.** Same fix pattern. |

---

## I. Broken or risky routes / assets

No broken routes or missing Rise packages were found.

Risk items only:

1. **`/learn/school/:schoolId`** — always redirects to `/learn`. Either intentional (then OK) or the operator nav link labeled "Schools → `/learn#available-now`" is misleading. Decision needed.
2. **`/learn/category/:slug`** — shows no concrete course cards even though `featuredCourses` data exists. Pages feel half-built. Decision: either render cards or remove from public discovery.
3. **`/learn/checkout`** — gated by `LEARNER_MONETIZATION_UI_DISABLED` but the route is registered. Direct visitors will see `LearnerCheckoutPage` with "dev simulation" text visible in the current build. Should be hidden when monetization UI is disabled.
4. **`/learn/courses/business-process-automation-for-work`** — explicit redirect to `/learn/business-process-automation-for-work` (intentional, but a sign of the standalone-vs-flagship namespace overlap).
5. **`/lab`, `/learning/labs`** — both redirect to `/learn`. Legacy.
6. **`/paths`, `/paths/:pathwaySlug`** — both redirect to `/learn#available-now`. The "Pathways" concept appears half-removed (see "flagship" references in `PathwayDetailPage.tsx`, `EmployablePathwaysHomeSection.tsx`, `DashboardPathwaysPanel.tsx`). Decision needed: complete the removal or restore.

Build verifier status: the three required `dist/course-assets/rise/<pkg>/content/index.html` files exist, so `verify:hosted-rise-dist` would pass once the local build runs successfully.

---

## J. Tool / vendor wording leaks (factual list)

### J.1 Confirmed user-facing leaks

| File:line | Snippet |
|---|---|
| `src/components/learn/PaidHostedRiseFlagshipSection.tsx:170` | "The full Rise experience opens in a new tab—return here anytime for sessions, checks, and capstone submission." |
| `src/components/learn/LearnerCheckoutPage.tsx:156` | `USD (dev simulation)` |
| `src/components/learn/LearnerCheckoutPage.tsx:185` | `/ month (dev simulation)` |
| `src/components/learn/StandaloneModuleDetailPage.tsx:117` | Button label `Save dev score` |
| `src/components/learn/JifunzeSlidePlayer.tsx:135` | Status pill `Voiceover coming soon` |
| `src/components/pathways/PathwayDetailPage.tsx:254` | `{meta.availability === 'coming_soon' ? 'Coming soon' : 'Planned'}` |
| `src/components/pathways/EmployablePathwayCard.tsx:12` | `label: 'Coming soon'` |

### J.2 "Flagship" usage as marketing claim (intentional brand term — flag for review)

The product uses "flagship courses" as a tier name across pricing, checkout, dashboard, and pathways copy. Notable instances: `discoveryHubSections.tsx:442`, `LearnerCheckoutPage.tsx:182, 188`, `PaidHostedRiseFlagshipSection.tsx:47`, `FlagshipCourseDetailPage.tsx:262`, `MyLearningPage.tsx:138, 259`, `SignedInContinueLearning.tsx:174`, `PathwayDetailPage.tsx:204`, `EmployablePathwaysHomeSection.tsx:24`, `DashboardPathwaysPanel.tsx:147`, `DashboardTrainingWidget.tsx:55`, `LearningCategoryPage.tsx:112, 114`. Decision: keep as brand term or rename across the board.

### J.3 Hardcoded marketing/numeric values

- **Fabricated ratings & learner counts** in `src/components/learn/discoveryHubSections.tsx` (`FEATURED_CARD_CHROME`, lines ~99–144):
  - `ai-essentials`: `'2.3k' learners`, `'4.9' rating`
  - `smart-workflows-with-ai`: `'1.8k'`, `'4.9'`
  - `data-and-decisions`: `'1.5k'`, `'4.8'`
  - `business-builder`: `'1.2k'`, `'4.8'`
  - `marketing-and-growth`: `'2.7k'`, `'4.9'`
  - `career-launch`: `'1.4k'`, `'4.7'`
  - Used only by `FeaturedCoursesSection` (currently NOT imported anywhere). Not rendered today. Risk of regression.
- **`rating: '5.0'` and `learners: 'Open to all'`** in `src/components/learn/StandaloneCoursesSection.tsx` (`STANDALONE_CARD_CHROME`, `FREE_STARTER_CARD_CHROME`, fallback). Also not imported anywhere.
- **`{flagshipCount}+ Flagship Courses` / `4 Schools` / `Beginner to Pro`** in `discoveryHubSections.tsx:442–450`, inside the unused `DiscoveryHero`. The `+` after a known integer is marketing-style.
- **Hardcoded module counts**:
  - `src/components/learn/AiEssentialsCourseOverview.tsx:111` — `16 modules` (matches actual content but hardcoded).
  - `src/components/learn/StandaloneCourseDetailPage.tsx:15` — `'Complete all 16 modules in order'` (in success checklist for Practical Math).

### J.4 Internal-only occurrences (counted, not user-visible)

- `status: 'pilot'` on the two Rise free starters (`freeStarterRiseCoursesCatalog.ts:23, 51, 98`) — explicitly internal; learner UI uses the public `label` field instead.
- `progressInternalKey: 'rise_pilot_ai_at_work_chatgpt'` / `'rise_pilot_smart_workflows_with_ai'` — internal localStorage keys.
- `internalProductionMeta.source = 'Articulate Rise export'` (×2) — internal metadata, never rendered.
- `// Not SCORM; learner-declared only.` — code comment in `src/lib/risePilotCourseProgress.ts:9`.
- `iframe` — only appears as JSX `<iframe>` element in the two free starter pages; not visible text.
- "external package" / "hosted package" / "raw package": **0 occurrences anywhere**.

---

## K. Recommended clean catalog going forward

### Free Microlearning (keep visible)
- **Smart Workflows with AI** — `/learn/free/smart-workflows-with-ai` — production-ready Rise package, working route, valid progress tracking.
- **AI at Work** — `/learn/free/ai-at-work-chatgpt` — production-ready Rise package, working route, valid progress tracking.

### Free Full Courses (keep visible)
- **Practical Mathematics for Life, Work, and Business** — `/learn/practical-mathematics-life-work-business` — 16 native modules, full lessons/quizzes/capstone/certificate.
- **Business Process Automation for Work** — `/learn/business-process-automation-for-work` — 5 native modules, complete.
- **Business Analytics for Decision-Making** — `/learn/business-analytics-decision-making` — 6 native modules, complete.

### Hidden for now (do not market publicly yet)
- **All 16 flagship courses** — already hidden via empty allowlist; commercial gating not yet active.
- **5 standalone course-as-library titles** (`/courses/learn-chatgpt-everyday-work`, etc.) — content exists but not vetted for launch; keep as direct-link.
- **5 extended public libraries** (Networking, Cybersecurity, Cloud/DevOps, Monitoring, Content Publishing) — content exists, no catalog card.
- **Family libraries** (`/library/ai-foundations`, `/library/ai-labs`, `/library/everyday-chatbots`, `/library/machine-learning-foundations`) — direct-link only.

### Direct-link only (intentional, but no marketing surface)
Same as the "Hidden" block above.

### Delete candidates
- `DiscoveryHero`, `FeaturedCoursesSection`, `SchoolsSection`, `FEATURED_CARD_CHROME` in `discoveryHubSections.tsx` (fabricated ratings/learners; unused).
- `StandaloneCoursesSection.tsx` (entire file; unused; contains hardcoded ratings).
- 15 placeholder entries in `plannedCoursesCatalog.ts` (owner decision: roadmap metadata vs. remove).

---

## L. Next implementation plan (staged)

Stage 1 — Hide / remove public placeholders (one PR)
1. Delete unused dead-code components that contain fabricated ratings/learners: `FEATURED_CARD_CHROME`, `FeaturedCoursesSection`, `SchoolsSection`, `DiscoveryHero` in `discoveryHubSections.tsx`; entire `StandaloneCoursesSection.tsx`.
2. Remove the user-visible "Rise experience" wording in `PaidHostedRiseFlagshipSection.tsx:170` (replace with neutral phrasing or hide under flag).
3. Gate `LearnerCheckoutPage` "dev simulation" text behind `LEARNER_MONETIZATION_UI_DISABLED` (or change copy to "Sample pricing").
4. Hide the "Save dev score" button label / rename to "Save score" in `StandaloneModuleDetailPage.tsx`.

Stage 2 — Rename / disambiguate confusing slugs (separate PR)
1. Rename the flagship `smart-workflows-with-ai` to a distinct slug (e.g. `smart-workflows-flagship`) and update `flagshipCoursesCatalog.ts`, `flagshipCourseCurricula.ts`, `flagshipSessionContentResolve.ts:173` aliasing, all session-content override files, and the `paidFlagshipCertificateConfig.ts` mapping. Keep `/learn/free/smart-workflows-with-ai` untouched.
2. Normalize the two Practical Math slug spellings to one canonical form across `availablePublicLearnCatalog.ts` and any test fixtures.
3. Normalize the two Business Analytics slug spellings to one canonical form.
4. Add a code comment in `flagshipCourseCurricula.ts:1300` explaining the `'ai-productivity-smart-workflows': 'smart-workflows-with-ai'` curriculum alias.

Stage 3 — Keep only clean courses visible (separate PR)
1. Confirm `getMicrolearningCatalogItems()` and `getFullCourseCatalogItems()` continue to return only the 5 audited items.
2. Verify the operator nav "Schools → /learn#available-now" label — either rename to "Catalog" or remove since the allowlist is empty.
3. Decide what to do with `/learn/school/:schoolId` and `/learn/category/:slug` half-built pages: either render concrete course cards or replace the routes with redirects to `/learn`.
4. Decide what to do with `/paths` and `/paths/:pathwaySlug` redirects (and the residual "flagship paths" wording in MyLearning / dashboards) — complete removal or restore pathways.

Stage 4 — Add missing route tests
1. Add Playwright e2e for `/learn` showing exactly the 5 expected cards.
2. Add Playwright e2e asserting that hidden flagship slugs do NOT appear in `/learn`, `/`, or `/my-learning` DOM.
3. Add a unit test that `LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS` is `size === 0`.
4. Add a unit test that the Rise free-starter `lessonPlayerSrc` paths match the disk-existing packages (extend `verify:hosted-rise-dist` style check).
5. Add a "no-leak" test that scans rendered output of homepage / `/learn` / `/my-learning` for: "Rise", "Articulate", "SCORM", "iframe" (as text), "pilot", "placeholder", "coming soon", "dev simulation".

Stage 5 — Add future paid gating later (out of scope today)
1. When ready, introduce per-flagship `LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS` allowlist additions plus the `/learn/checkout` flow.
2. At launch time, also unlock the `/courses/...` library landing pages by adding their cards to `/learn` and the homepage preview helper.

---

*End of audit report. No code modifications were performed.*
