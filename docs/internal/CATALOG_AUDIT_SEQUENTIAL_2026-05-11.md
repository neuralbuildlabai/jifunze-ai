# Jifunze.ai — Sequential Catalog Audit (factual report only)

**Date:** 2026-05-11
**Mode:** Read-only factual report. No code edits performed.
**Method:** Each numbered audit (1–11) was run in sequence. Findings below cite exact files, line numbers, slugs, and routes.

---

## Audit 1 — All course / catalog data sources

### Files containing course definitions or catalog data

#### `src/data/courses/` (native standalone full courses)
- `src/data/courses/index.ts` — re-export hub. Exports `STANDALONE_LEARNER_CATALOG`, `findStandaloneCourseBySlug`, helpers.
- `src/data/courses/standaloneCoursesCatalog.ts` — exports `STANDALONE_LEARNER_CATALOG` (3 entries: Practical Math, BPA, Business Analytics).
- `src/data/courses/standaloneCourseLearnPaths.ts` — slug → first-lesson route helpers.
- `src/data/courses/practicalMathematicsCourse.ts` (+ `…CourseModules01_04.ts` … `09_12.ts`, `13_16.ts`, `…Constants.ts`, `…Types.ts`, `…Progression.ts`, `…CapstoneRubric.ts`, `…FlagshipAdapter.ts`).
- `src/data/courses/businessProcessAutomationCourse.ts` (+ `…Modules.ts`, `…Constants.ts`, `…Slides.ts`, `…Narration.ts`).
- `src/data/courses/businessAnalyticsDecisionMakingCourse.ts` (+ `…Ids.ts`, `…Modules.ts`, `…Slides.ts`, `…Narration.ts`).
- `src/data/courses/courseNarrationTypes.ts`, `narrationHelpers.ts` — supporting types.

#### `src/data/learning/` (curricula, libraries, flagship catalogs, policies)
Catalog/policy files (not lesson-content files):
- `src/data/learning/availablePublicLearnCatalog.ts` — the canonical "available now" honest catalog (drives `/`, `/learn`, `/my-learning`).
- `src/data/learning/freeStarterRiseCoursesCatalog.ts` — 2 hosted-Rise micros (slugs `smart-workflows-with-ai`, `ai-at-work-chatgpt`).
- `src/data/learning/flagshipCoursesCatalog.ts` — 16 flagship marketing entries.
- `src/data/learning/flagshipLearnerCatalogPolicy.ts` — public allowlist (currently `new Set<string>()` — empty).
- `src/data/learning/learningDiscoveryCatalog.ts` — 8 category/topic browse pages.
- `src/data/learning/extendedPublicLibraryConfigs.ts` — 5 extended libraries + 5 standalone-course library wrappers.
- `src/data/learning/extendedLibrariesSpecs.ts`, `extendedLibrariesCurricula.ts` — specs / compiled curricula for the 5 extended libraries.
- `src/data/learning/standaloneCoursesCatalog.ts`, `standaloneCoursesSpecs.ts`, `standaloneCoursesSpecsWave2.ts`, `standaloneCoursesCompiler.ts`, `standaloneCourseDiscoveryMeta.ts`, `standaloneCourseScanStats.ts` — course-as-library specs (different from `src/data/courses/`).
- `src/data/learning/plannedCoursesCatalog.ts` — 15 placeholder/coming-soon entries.
- `src/data/learning/aiCurriculumSpec.ts` + `aiEverydayWorkCurriculum.ts` — AI Foundations family.
- `src/data/learning/mlCurriculumSpec.ts` + `mlLibraryCatalog.ts` + `machineLearningCurriculum.ts` — ML family.
- `src/data/learning/chatbotLibrarySpec.ts` + `chatbotLibraryCatalog.ts` + `chatbotEverydayCurriculum.ts` — Chatbot family.
- `src/data/learning/flagshipCourseCurricula.ts`, `flagshipCourseCurriculaExtended.ts`, `flagshipCourseCurriculaExtended2.ts` — flagship curricula bodies.
- `src/data/learning/flagshipCourseSessions.ts`, `flagshipSessionContentResolve.ts`, `flagshipSessionContentOverrides*.ts` — session resolution and overrides.
- `src/data/learning/aiEssentialsLessonOverridesM10M16.ts`, `aiEssentialsCourse1Modules.ts`.
- `src/data/learning/homepageChatbotLibraryFeatured.ts`, `homepageMlLibraryFeatured.ts` — deep-link helpers (read by workspace pages, not by `/`).

#### `src/data/publicStarterLibraries/`
- `src/data/publicStarterLibraries/aiFoundations.ts` — AI Foundations public starter library (`PUBLIC_AI_FOUNDATIONS_BASE_PATH = '/library/ai-foundations'`).

#### `src/data/teaching/`
- `src/data/teaching/teachingLabsCatalog.ts` — `TEACHING_LABS = [...AI_CURRICULUM_LABS, ...NON_AI_TEACHING_LABS]`.
- `src/data/teaching/aiLabsCurriculum.ts` — AI labs surfaced at `/library/ai-labs`.
- `src/data/teaching/nonAiTeachingLabs.ts`.
- `src/data/teaching/teachingKnowledgeBase*.ts` — KB content (not learner-facing catalog).

#### Other relevant files
- `src/lib/paidFlagshipCertificateConfig.ts` — paid flagship hosted-Rise config (only `ai-productivity-smart-workflows` today).
- `src/lib/risePilotCourseProgress.ts` — Rise progress localStorage keys.

### Notable static-package directories
- `public/course-assets/rise/ai-at-work-chatgpt/` (74 files, 13 MB; `content/index.html` present)
- `public/course-assets/rise/smart-workflows-with-ai/` (78 files, 14 MB; `content/index.html` present)
- `public/course-assets/rise/ai-productivity-smart-workflows/` (120 files, 27 MB; `content/index.html` present)
- `public/course-assets/business-analytics-decision-making/` and `public/course-assets/business-process-automation-for-work/` (companion native-course assets)
- `dist/course-assets/rise/...` — mirrors the three Rise packages

---

## Audit 2 — Complete course inventory

Slug source-of-truth notes are quoted exactly. Slug spelling differences across files are flagged in Audit 9.

### A. Public, on-catalog (5 items)

| # | Title | Slug | Route | Type | Access | Source | Progress | Cert | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Smart Workflows with AI (Free Starter Workshop) | `smart-workflows-with-ai` | `/learn/free/smart-workflows-with-ai` | Microlearning | Free | Hosted Rise (iframe) | localStorage `rise_pilot_smart_workflows_with_ai` | none | Working |
| 2 | AI at Work (Free Starter Course) | `ai-at-work-chatgpt` | `/learn/free/ai-at-work-chatgpt` | Microlearning | Free | Hosted Rise (iframe) | localStorage `rise_pilot_ai_at_work_chatgpt` | none | Working |
| 3 | Practical Mathematics for Life, Work, and Business | `practical-mathematics-life-work-business` (also seen as `practical-mathematics-for-life-work-business`) | `/learn/practical-mathematics-life-work-business` | Standalone (16 modules) | Free | Native | Account-backed | `/learn/<slug>/certificate` | Working |
| 4 | Business Process Automation for Work | `business-process-automation-for-work` | `/learn/business-process-automation-for-work` | Standalone (5 modules) | Free | Native | Account-backed | yes | Working |
| 5 | Business Analytics for Decision-Making | `business-analytics-decision-making` (also seen as `business-analytics-for-decision-making`) | `/learn/business-analytics-decision-making` | Standalone (6 modules) | Free | Native | Account-backed | yes | Working |

### B. Direct-link only — content exists, no public card surfaces them

| Title | Slug / Library key | Route | Type | Access | Source |
|---|---|---|---|---|---|
| Learn ChatGPT for Everyday Work | `course_chatgpt_everyday` | `/courses/learn-chatgpt-everyday-work` | Standalone-as-library | Free | Native |
| Prompt Engineering Across ChatGPT, Claude, and Gemini | `course_prompt_engineering_models` | `/courses/prompt-engineering-models` | Standalone-as-library | Free | Native |
| Gemini for Productivity and Google Workspace | `course_gemini_workspace` | `/courses/gemini-workspace-productivity` | Standalone-as-library | Free | Native |
| Claude for Writing, Research, and Deep Thinking | `course_claude_writing` | `/courses/claude-writing-research-deep-thinking` | Standalone-as-library | Free | Native |
| Agentic AI and AI Agents for Real Work | `course_agentic_ai_real_work` | `/courses/agentic-ai-real-work` | Standalone-as-library | Free | Native |
| Networking and Modern Infrastructure | `networking` | `/library/networking-and-infrastructure` | Extended library | Free | Native |
| Cybersecurity Foundations to Practical Defense | `cybersecurity` | `/library/cybersecurity-defense` | Extended library | Free | Native |
| Cloud, DevOps, and Platform Operations | `cloud_devops` | `/library/cloud-devops-platform` | Extended library | Free | Native |
| Monitoring, Observability, and Incident Response | `monitoring` | `/library/monitoring-observability` | Extended library | Free | Native |
| Content Creation and Knowledge Publishing | `content_publishing` | `/library/content-creation` | Extended library | Free | Native |
| AI Foundations for Everyday Work | (family library) | `/library/ai-foundations` | Family library | Free | Native |
| AI Teaching Labs | (labs index) | `/library/ai-labs` | Labs index | Free | Native |
| Building Everyday Chatbots with AI | (family library) | `/library/everyday-chatbots` | Family library | Free | Native |
| Machine Learning Foundations and Practical ML | (family library) | `/library/machine-learning-foundations` | Family library | Free | Native |

### C. Hidden by policy — flagship courses (16 entries; allowlist empty)

Source: `src/data/learning/flagshipCoursesCatalog.ts` (16 entries) + `flagshipCourseCurricula.ts` + `flagshipCourseCurriculaExtended.ts` + `flagshipCourseCurriculaExtended2.ts`.

Slugs (school → slug):
- `ai_digital`: `ai-essentials`, `smart-workflows-with-ai`, `ai-productivity-smart-workflows`, `data-and-decisions`, `web-and-software-foundations`, `digital-safety`
- `business_growth`: `marketing-and-growth`, `business-builder`, `money-and-finance`, `product-thinking`, `project-execution`
- `career_intellect`: `career-launch`, `clear-communication`, `research-and-critical-thinking`
- `leadership_learning`: `leadership-and-teams`, `teaching-and-facilitation`

All 16 currently hidden because `LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS = new Set<string>()` in `src/data/learning/flagshipLearnerCatalogPolicy.ts`. Detail pages still resolve via direct link at `/learn/courses/:slug`.

`ai-productivity-smart-workflows` is a special case: its native curriculum is aliased to `smart-workflows-with-ai` (`flagshipCourseCurricula.ts:1300`, `flagshipSessionContentResolve.ts:173`); its hosted Rise launch path is `/course-assets/rise/ai-productivity-smart-workflows/content/index.html` via `paidFlagshipCertificateConfig.ts:40`.

### D. Placeholders (15 entries)

Source: `src/data/learning/plannedCoursesCatalog.ts`. Every entry carries `intro: 'Placeholder catalog entry…'` and `availability: 'planned' | 'coming_soon'`. None has a route.

Slugs: `digital-work-readiness`, `excel-google-sheets-business-reporting`, `data-analytics-excel-sql-dashboards`, `software-development-foundations`, `no-code-low-code-app-building`, `cloud-hosting-devops-foundations`, `cybersecurity-work-small-business`, `ai-office-productivity`, `ai-entrepreneurs-small-businesses`, `digital-marketing-social-media-management`, `freelancing-remote-work-online-income`, `customer-service-virtual-assistant-skills`, `sales-negotiation-client-management`, `monitoring-evaluation-impact-reporting`, `kenya-financial-literacy-tax-business-compliance`.

### E. Internal "premium track" ids (no routes)

- ML premium track ids in `mlLibraryCatalog.ts`: `applied-ml-production`, `eval-metrics-deep-dive`, `fairness-oversight-pack`.
- Chatbot premium track ids in `chatbotLibraryCatalog.ts`: `chatbot-eval-lab`, `workflow-bot-kits`, `rag-bot-deep-dive`, `community-support-bot-pack`.

These are subscription-marketing ids, not learner-facing courses; they have no routes today.

---

## Audit 3 — Active routes verified against `src/App.tsx`

`src/App.tsx` defines the following learner-relevant routes (line numbers from the read):

| Route | Component | Notes |
|---|---|---|
| `/` | `HomeEntryPage` (→ `PublicHomePage` or `SignedInHomePage`) | Working |
| `/learn` | `LearningDiscoveryHubPage` | Working |
| `/learn/free/ai-at-work-chatgpt` | `AiAtWorkChatgptFreeStarterPage` | Working — iframes Rise |
| `/learn/free/smart-workflows-with-ai` | `SmartWorkflowsWithAiFreeStarterPage` | Working — iframes Rise |
| `/learn/school/:schoolId` | `LearningSchoolCatalogPage` | Working but **always redirects to `/learn`** because `learnerPublicCatalogCoursesForSchool(id)` returns `[]` |
| `/learn/category/:slug` | `LearningCategoryPage` | Working but renders **only orientation/FAQ — no concrete course cards**, even though catalog has `featuredCourses` data |
| `/learn/courses/:slug` | `FlagshipCourseDetailPage` | Working for all 16 flagship slugs (direct link only — no card surfaces them) |
| `/learn/courses/:slug/session/:sessionId` | `FlagshipCourseSessionPage` | Working |
| `/learn/courses/:slug/capstone` | `FlagshipCapstoneSubmissionPage` | Working |
| `/learn/courses/business-process-automation-for-work` | `<Navigate to="/learn/business-process-automation-for-work" />` | Hard-coded redirect (because BPA is a standalone, not a flagship) |
| `/learn/checkout` | `LearnerCheckoutPage` | Working but contains visible "dev simulation" copy |
| `/learn/readiness/:slug` | `ReadinessChallengePage` | Working |
| `/learn/:standaloneCourseSlug` | `StandaloneCourseDetailPage` | Working — resolves Practical Math, BPA, Business Analytics |
| `/learn/:standaloneCourseSlug/modules/:moduleSlug` | `StandaloneModuleDetailPage` | Working |
| `/learn/:standaloneCourseSlug/modules/:moduleSlug/lessons/:lessonSlug` | `StandaloneLessonDetailPage` | Working |
| `/learn/:standaloneCourseSlug/modules/:moduleSlug/quiz` | `StandaloneQuizPage` | Working |
| `/learn/:standaloneCourseSlug/certificate` | `StandaloneCertificatePage` | Working |
| `/library/ai-foundations` (+ `/:lessonSlug`) | `PublicAiFoundationsLibraryPage` / `PublicAiFoundationsLessonPage` | Working |
| `/library/ai-labs` | `PublicAiTeachingLabsPage` | Working |
| `/library/everyday-chatbots` (+ `/:lessonSlug`) | `PublicChatbotLibraryPage` / `PublicChatbotLessonPage` | Working |
| `/library/machine-learning-foundations` (+ `/:lessonSlug`) | `PublicMlLibraryPage` / `PublicMlLessonPage` | Working |
| 5 × `EXTENDED_PUBLIC_LIBRARY_CONFIGS.<lib>.publicBasePath` (+ `/:lessonSlug`) | `PublicExtendedCatalogLibraryPage` / `PublicExtendedCatalogLessonPage` | Working |
| 5 × `…course_*.publicBasePath` + landing path | `PublicStandaloneCourseLandingPage` / `PublicExtendedCatalogLibraryPage` / lesson page | Working — `/courses/...` routes |
| `/libraries/ai-foundations` (+ `/:lessonSlug`) | Redirect to `/library/ai-foundations` | Working |
| `/paths`, `/paths/:pathwaySlug` | Redirect to `/learn#available-now` | Working |
| `/lab`, `/learning/labs` | Redirect to `/learn` | Working |
| `*` | `NotFoundPage` | Working |

The four routes specifically called out in your brief:
- **`/learn`** → `LearningDiscoveryHubPage` — confirmed.
- **`/learn/free/*`** → `AiAtWorkChatgptFreeStarterPage` and `SmartWorkflowsWithAiFreeStarterPage` — confirmed.
- **`/learn/courses/*`** → flagship detail/session/capstone routes — confirmed; all flagship slugs reach the page (but no card surfaces them).
- **`/learn/practical-mathematics-life-work-business`**, **`/learn/business-process-automation-for-work`**, **`/learn/business-analytics-decision-making`** — confirmed via `/learn/:standaloneCourseSlug` with `findStandaloneCourseBySlug` lookup.
- **`/course-assets/rise/*/content/index.html`** — confirmed for all three packages (see Audit 4).

A course is considered "available" only if it satisfies all of: (a) reachable route exists, (b) content present, (c) opens for a learner, (d) not a placeholder card, (e) not relying on missing static assets. Under that definition, the **5 items in Audit 2.A** plus the **direct-link-only items in Audit 2.B** all qualify; the 16 flagships qualify only by direct link (no card on any public page); the 15 placeholders qualify on none of the criteria.

---

## Audit 4 — Static / hosted course packages

### Disk inventory under `public/course-assets/rise/`

| Folder | `content/index.html` present | File count | Disk size |
|---|---|---|---|
| `ai-at-work-chatgpt` | YES | 74 | 13 MB |
| `smart-workflows-with-ai` | YES | 78 | 14 MB |
| `ai-productivity-smart-workflows` | YES | 120 | 27 MB |

### Cross-references

- `ai-at-work-chatgpt` — referenced by `freeStarterRiseCoursesCatalog.ts:64`, `App.tsx:177`, `AiAtWorkChatgptFreeStarterPage.tsx:152` (`<iframe src=…>`), discovery/standalone sections, e2e specs.
- `smart-workflows-with-ai` — referenced by `freeStarterRiseCoursesCatalog.ts:111`, `App.tsx:178`, `SmartWorkflowsWithAiFreeStarterPage.tsx:153`, plus appears in `flagshipCoursesCatalog.ts:116` and `flagshipCourseCurricula.ts` as a flagship slug. Slug duplication noted.
- `ai-productivity-smart-workflows` — referenced by `paidFlagshipCertificateConfig.ts:40` (`hostedRiseIndexPath`), `PaidHostedRiseFlagshipSection.tsx:24/56/173`, `FlagshipCourseDetailPage.tsx:49/153/178` (gated by `isHostedRiseCompactCourse(slug)`), `flagshipCoursesCatalog.ts:155`, alias in `flagshipCourseCurricula.ts:1300`, alias in `flagshipSessionContentResolve.ts:173`.

### `dist/course-assets/rise/`
Mirrors `public/`. All three `content/index.html` files present (1090 / 1070 / 1064 bytes). `verify:hosted-rise-dist` script (`scripts/verify-hosted-rise-dist.ts`) expects exactly these three paths and would pass.

### Orphans / broken catalog references
- Orphan packages: **none**.
- Catalog entries pointing to missing assets: **none**.

### Public-facing Rise catalog
- `freeStarterRiseCoursesCatalog.ts` declares **only 2 entries** (the two free starters).
- `ai-productivity-smart-workflows` is **not** in that catalog; it is exposed via `paidFlagshipCertificateConfig.ts` and the flagship detail page.

---

## Audit 5 — Public catalog surfaces (what each page actually shows)

| Surface | Component | Cards/links surfaced | Notes |
|---|---|---|---|
| `/` | `PublicHomePage` (`src/components/landing/PublicHomePage.tsx`) | 3 cards via `getHomepageAvailablePreviewItems()`: `smart-workflows-with-ai` (micro), `ai-at-work-chatgpt` (micro), Practical Math | Uses `AvailableLearnHero` (NOT `DiscoveryHero`). Top nav: Courses → `/learn#available-now`, About, Contact. |
| `/learn` | `LearningDiscoveryHubPage` | 5 cards (2 micros + 3 standalones) via `getMicrolearningCatalogItems()` and `getFullCourseCatalogItems()` | "Learning Areas" section shows 4 area cards (no per-card links). |
| `/learn#available-now` | (anchor on `/learn`) | Same 5 | — |
| `/my-learning` (learner variant) | `MyLearningPage` | Same 5 + empty "Your courses" / "Recommended next" panels (allowlist empty) | — |
| `/my-learning` (operator variant) | `MyLearningPage` | "Browse courses → /learn", "Library → /library", `SignedInContinueLearning`, assignments board, empty `catalogCourses` | — |
| `/` (signed-in non-learner) | `SignedInHomePage` | No static course cards; nav + continue-learning + quick-create + ops tools strip | — |
| `/learn/category/:slug` | `LearningCategoryPage` | Eyebrow + intro + FAQ + "use main catalog" pointer. **No course cards rendered**, even though `featuredCourses` data exists. | 8 slugs: `chatgpt`, `prompting`, `gemini`, `claude`, `agentic-ai`, `ai-and-ml`, `cybersecurity`, `cloud-devops`. |
| `/learn/school/:schoolId` | `LearningSchoolCatalogPage` | Always redirects to `/learn` (allowlist empty) | 4 IDs: `ai_digital`, `business_growth`, `career_intellect`, `leadership_learning`. |
| `/learn/courses/:slug` | `FlagshipCourseDetailPage` | Single flagship detail; not surfaced by any public list | Special cases: `ai-essentials` → `AiEssentialsCourseOverview`; `ai-productivity-smart-workflows` → hosted Rise compact rendering. |
| `/learn/<slug>` and drilldown | `StandaloneCourseDetailPage` and children | Course detail / module / lesson / quiz / certificate | — |
| `/learn/free/ai-at-work-chatgpt` | `AiAtWorkChatgptFreeStarterPage` | Single iframe page | Header nav: Catalog → `/learn`, Free courses → `/learn#available-now`. |
| `/learn/free/smart-workflows-with-ai` | `SmartWorkflowsWithAiFreeStarterPage` | Single iframe page | — |
| `/courses/learn-chatgpt-everyday-work` (+ 4 siblings) | `PublicStandaloneCourseLandingPage` | Single course landing | Reachable by direct link only. |
| `/library/ai-foundations` | `PublicAiFoundationsLibraryPage` | Iterates `AI_EVERYDAY_WORK_CURRICULUM` (lessons) | Direct-link only. |
| `/library/ai-labs` | `PublicAiTeachingLabsPage` | All public labs grouped by `appliedTrack` | "Paid lab tiers are not listed in this release." (under flag) |
| `/library/everyday-chatbots` | `PublicChatbotLibraryPage` | Iterates `CHATBOT_LIBRARY_CURRICULUM` | — |
| `/library/machine-learning-foundations` | `PublicMlLibraryPage` | Iterates `ML_LIBRARY_CURRICULUM` | — |
| `/library/<extended>` (5 routes) | `PublicExtendedCatalogLibraryPage` | Iterates the passed config | — |
| Footer | `DiscoveryFooter` | Available courses → `/learn#available-now`, About, Contact + Terms / Privacy / Refunds / Disclaimer | — |
| Workspace nav | `WorkspaceNav` | Operator: Dashboard, Members, Catalog (`/learn`), **Schools (`/learn#available-now`)**, Assignments, Training plans, Reports, Growth Intelligence. Learner: My Learning, Catalog, Reports, Account. Super-admin: + Platform ops, Insights. | "Schools" is a misnomer because the schools surface always redirects. |

### Dead-code surfaces (defined, not imported anywhere)
- `DiscoveryHero` (in `discoveryHubSections.tsx:370`) — the alternate hero with "X+ Flagship Courses / 4 Schools / Beginner to Pro" stat strip.
- `FeaturedCoursesSection` (`discoveryHubSections.tsx:464`) — uses `FEATURED_CARD_CHROME` fake ratings.
- `SchoolsSection` (`discoveryHubSections.tsx:544`).
- `StandaloneCoursesSection.tsx` — entire file is exported but never imported.

---

## Audit 6 — Group classification

### Group A — Keep public now (already on `/learn`)
- Smart Workflows with AI · `smart-workflows-with-ai` · `/learn/free/smart-workflows-with-ai`
- AI at Work · `ai-at-work-chatgpt` · `/learn/free/ai-at-work-chatgpt`
- Practical Mathematics for Life, Work, and Business · `practical-mathematics-life-work-business` · `/learn/practical-mathematics-life-work-business`
- Business Process Automation for Work · `business-process-automation-for-work` · `/learn/business-process-automation-for-work`
- Business Analytics for Decision-Making · `business-analytics-decision-making` · `/learn/business-analytics-decision-making`

### Group B — Keep direct-link only (not marketed yet)
- All 5 `/courses/...` standalone-as-library landing pages (Learn ChatGPT, Prompt Engineering, Gemini, Claude, Agentic AI).
- All 5 extended libraries (`/library/networking-and-infrastructure`, `/library/cybersecurity-defense`, `/library/cloud-devops-platform`, `/library/monitoring-observability`, `/library/content-creation`).
- All family libraries: `/library/ai-foundations`, `/library/ai-labs`, `/library/everyday-chatbots`, `/library/machine-learning-foundations`.

### Group C — Hide from public discovery (already hidden by policy; keep that way)
- All 16 flagship slugs (allowlist must remain `Set<string>()` until commercial launch). Detail pages still reachable by direct link, which is acceptable.
- 5 standalone-as-library titles in B should NOT be added to `/learn` cards yet.

### Group D — Remove later / delete candidates
- `FEATURED_CARD_CHROME` map + `FeaturedCoursesSection` + `SchoolsSection` + `DiscoveryHero` in `src/components/learn/discoveryHubSections.tsx` (dead code; contains fabricated ratings/learner counts).
- `src/components/learn/StandaloneCoursesSection.tsx` (dead code; hardcoded `'5.0'` ratings).
- 15 placeholder entries in `src/data/learning/plannedCoursesCatalog.ts` (no routes; owner decision).
- `homepage-files.txt` (~45 KB, repo-root) — looks like a manual notes file.

### Group E — Needs decision
- **Pathways** (`/paths`, `/paths/:pathwaySlug`) — currently redirect to `/learn`, but `PathwayDetailPage`, `EmployablePathwaysHomeSection`, `EmployablePathwayCard`, `DashboardPathwaysPanel` still exist with copy referencing "flagship courses" and "Coming soon"/"Planned" labels. Decide: complete removal or restore.
- **Schools surface** (`/learn/school/:schoolId`) — always redirects today. Decide: rename the operator nav link "Schools → /learn#available-now" or re-enable the surface.
- **Category pages** (`/learn/category/:slug`) — exist but show no concrete course cards. Decide: render `featuredCourses` cards or replace with redirects.
- **`/learn/checkout`** — gated by `LEARNER_MONETIZATION_UI_DISABLED` but the route is registered and contains visible "dev simulation" copy.
- **Slug aliasing** between `smart-workflows-with-ai` (free) and `ai-productivity-smart-workflows` (paid) — keep, but the curriculum alias in `flagshipCourseCurricula.ts:1300` deserves a documented decision.

---

## Audit 7 — Recommended current public catalog

### Free Microlearning
- **Smart Workflows with AI** — `/learn/free/smart-workflows-with-ai` — Working Rise package, in-place progress tracking, valid for public use.
- **AI at Work** — `/learn/free/ai-at-work-chatgpt` — Working Rise package, in-place progress tracking, valid for public use.

### Free Full Courses
- **Practical Mathematics for Life, Work, and Business** — `/learn/practical-mathematics-life-work-business` — 16 native modules, lessons + quizzes + capstone + certificate; the most production-ready native course.
- **Business Process Automation for Work** — `/learn/business-process-automation-for-work` — 5 native modules; verifier script `verify:business-process-automation` exists.
- **Business Analytics for Decision-Making** — `/learn/business-analytics-decision-making` — 6 native modules; verifier script `verify:business-analytics` exists.

### Hidden for now (do not market publicly yet)
- 16 flagship courses — quality / commercial readiness not validated; allowlist policy already keeps them off `/learn`.
- 5 standalone-as-library `/courses/...` titles — content exists but not vetted as the official catalog.
- 5 extended libraries — direct-link only.
- All `/library/...` family pages — direct-link only.
- 15 `plannedCoursesCatalog.ts` placeholders — never surface.

### Direct-link only
- Same as the "Hidden for now" set above. They render correctly when accessed but should not appear on the catalog page.

### Delete candidates
- `DiscoveryHero`, `FeaturedCoursesSection`, `SchoolsSection`, `FEATURED_CARD_CHROME` (in `discoveryHubSections.tsx`) — fabricated ratings/learners; never imported.
- `StandaloneCoursesSection.tsx` — entire file dead; hardcodes `'5.0'`.
- `homepage-files.txt` (root file) — manual notes; not part of code.

---

## Audit 8 — Tool / vendor / marketing wording leaks

### A. Confirmed user-facing leaks (rendered text)

| File:line | Text | Notes |
|---|---|---|
| `src/components/learn/PaidHostedRiseFlagshipSection.tsx:170` | "The full Rise experience opens in a new tab—return here anytime…" | Vendor name leak ("Rise"). |
| `src/components/learn/LearnerCheckoutPage.tsx:156` | `USD (dev simulation)` | Internal-state copy. |
| `src/components/learn/LearnerCheckoutPage.tsx:185` | `/ month (dev simulation)` | Internal-state copy. |
| `src/components/learn/StandaloneModuleDetailPage.tsx:117` | Button label `Save dev score` | Internal-state copy. |
| `src/components/learn/JifunzeSlidePlayer.tsx:135` | Status pill `Voiceover coming soon` | "Coming soon" label. |
| `src/components/pathways/PathwayDetailPage.tsx:254` | `{… ? 'Coming soon' : 'Planned'}` | "Coming soon" / "Planned". |
| `src/components/pathways/EmployablePathwayCard.tsx:12` | `label: 'Coming soon'` | "Coming soon". |

### B. "Flagship" usage as marketing claim (intentional brand term — flag for review)
Notable occurrences include `discoveryHubSections.tsx:442` (`{flagshipCount}+ Flagship Courses`, in dead code), `LearnerCheckoutPage.tsx:182, 188`, `PaidHostedRiseFlagshipSection.tsx:47`, `FlagshipCourseDetailPage.tsx:262`, `MyLearningPage.tsx:138, 259`, `SignedInContinueLearning.tsx:174`, `PathwayDetailPage.tsx:204`, `EmployablePathwaysHomeSection.tsx:24`, `DashboardPathwaysPanel.tsx:147`, `DashboardTrainingWidget.tsx:55`, `LearningCategoryPage.tsx:112, 114`. Decide whether "flagship" remains a brand term.

### C. Hardcoded marketing/numeric values

- **Fake ratings + learner counts** in `src/components/learn/discoveryHubSections.tsx` (`FEATURED_CARD_CHROME`, lines ~99–144):
  - `ai-essentials`: `learners: '2.3k'`, `rating: '4.9'`
  - `smart-workflows-with-ai`: `'1.8k'`, `'4.9'`
  - `data-and-decisions`: `'1.5k'`, `'4.8'`
  - `business-builder`: `'1.2k'`, `'4.8'`
  - `marketing-and-growth`: `'2.7k'`, `'4.9'`
  - `career-launch`: `'1.4k'`, `'4.7'`
  - Render site `discoveryHubSections.tsx:527` displays `{course.rating} <span>({course.learners})</span>` next to a star icon. **Used only by `FeaturedCoursesSection`, which is currently NOT imported anywhere — not rendered today, but a regression risk.**
- **`rating: '5.0'` and `learners: 'Open to all'`** in `src/components/learn/StandaloneCoursesSection.tsx` (`STANDALONE_CARD_CHROME`, `FREE_STARTER_CARD_CHROME`, fallback). Same status — file not imported anywhere.
- **Hero stat strip in unused `DiscoveryHero`** (`discoveryHubSections.tsx:442–450`): `{flagshipCount}+ Flagship Courses`, `4 Schools`, `Beginner to Pro` — the `+` after a known integer is marketing-style.
- **Hardcoded module counts:** `AiEssentialsCourseOverview.tsx:111` (`16 modules`), `StandaloneCourseDetailPage.tsx:15` (`'Complete all 16 modules in order'`).

### D. Internal-only occurrences (counted, not shown to users)
- `status: 'pilot'` on the two free starters (`freeStarterRiseCoursesCatalog.ts:23, 51, 98`) — explicitly internal.
- `progressInternalKey: 'rise_pilot_…'` — internal localStorage keys.
- `internalProductionMeta.source = 'Articulate Rise export'` (×2) — internal metadata.
- `// Not SCORM; learner-declared only.` — code comment only (`risePilotCourseProgress.ts:9`).
- `<iframe>` JSX elements — code, not visible label text.
- "external package" / "hosted package" / "raw package" — **0 occurrences anywhere**.

---

## Audit 9 — Duplication / naming conflicts

| # | Pair | Where | Recommendation |
|---|---|---|---|
| 1 | `smart-workflows-with-ai` (Free Starter Rise micro) **AND** `smart-workflows-with-ai` (Flagship full course) | `freeStarterRiseCoursesCatalog.ts` + `flagshipCoursesCatalog.ts` + `flagshipCourseCurricula.ts` | **Rename one.** Keep the micro at `smart-workflows-with-ai`; rename the flagship to a distinct slug. Same display title is acceptable, but the slug must differ. |
| 2 | `smart-workflows-with-ai` (flagship) **AND** `ai-productivity-smart-workflows` (flagship) | `flagshipCoursesCatalog.ts:155–190` + alias in `flagshipCourseCurricula.ts:1300` and `flagshipSessionContentResolve.ts:173` | **Keep both, document.** They share curriculum (alias) but ship different hosted Rise bundles. Add a header comment explaining the alias is intentional. |
| 3 | Two Rise bundles: `smart-workflows-with-ai` (14 MB, free) **AND** `ai-productivity-smart-workflows` (27 MB, paid flagship) | `public/course-assets/rise/...` | **Keep both.** Different access tier; both have valid `content/index.html`. |
| 4 | "AI at Work" (`ai-at-work-chatgpt`, micro) **vs** "AI Essentials" (`ai-essentials`, flagship) | `freeStarterRiseCoursesCatalog.ts` + `flagshipCoursesCatalog.ts` | Keep both. Different scopes; no slug collision. |
| 5 | "Business Analytics for Decision-Making" (standalone) **vs** "Data and Decisions" (flagship) | Standalone + flagship | Keep both. No slug collision. |
| 6 | "Business Process Automation for Work" (standalone) **vs** "Smart Workflows with AI" (flagship) | Standalone + flagship | Keep both. Adjacent topics; distinct slugs. |
| 7 | Practical Math slug spelling: `practical-mathematics-life-work-business` (active route) **vs** `practical-mathematics-for-life-work-business` (used in some catalog entries) | `availablePublicLearnCatalog.ts` + `practicalMathematicsCourse.ts` | **Normalize to one canonical spelling.** `findStandaloneCourseBySlug` currently masks the inconsistency. |
| 8 | Business Analytics slug spelling: `business-analytics-decision-making` (active route) **vs** `business-analytics-for-decision-making` (used elsewhere) | `availablePublicLearnCatalog.ts` + `businessAnalyticsDecisionMakingIds.ts` | **Normalize to one canonical spelling.** |
| 9 | Two parallel "standalone" namespaces — `src/data/courses/` (3 native full courses) **vs** `src/data/learning/standaloneCoursesCatalog.ts` (5 course-as-library wrappers) | Both folders | **Document both, or rename one.** They are NOT duplicates of each other in content, but the term "standalone" is overloaded. Suggest renaming the latter to `standaloneCourseLibrariesCatalog.ts` to make the distinction structural. |
| 10 | `LearningSchoolCatalogPage` uses `/learn#available-now` **as its "Schools" link** in the operator nav | `WorkspaceNav.tsx` + `LearningSchoolCatalogPage.tsx` | **Fix or remove the "Schools" nav label.** It points to a section that contains microlearning + standalones, not schools. |

---

## Audit 10 — Verification commands

| Command | Result |
|---|---|
| `npm run lint` | **PASS** — no errors. |
| `npx tsc -b --force` | **PASS** — no errors. |
| `npm run build` | **BLOCKED in this Linux ARM64 sandbox** — `Error: Cannot find module '@rolldown/binding-linux-arm64-gnu'` (rolldown binary is platform-specific; `node_modules` was installed on macOS). This is an environment issue, not a code issue. |
| `npm run verify:hosted-rise-dist` | **BLOCKED in this sandbox** by an `esbuild` Linux binary issue inside `tsx`. **Functional equivalent:** the three required files in `dist/course-assets/rise/<pkg>/content/index.html` (1090 / 1070 / 1064 bytes) all exist on disk; the script's only assertion would pass. |
| `npx playwright test e2e/learning-discovery.spec.ts e2e/home-pathways.spec.ts e2e/public.spec.ts e2e/practical-math-discovery.spec.ts e2e/pathways-smoke.spec.ts` | **NOT RUN** — Playwright browser binaries are not available in this sandbox. All five spec files exist (`e2e/learning-discovery.spec.ts`, `e2e/home-pathways.spec.ts`, `e2e/public.spec.ts`, `e2e/practical-math-discovery.spec.ts`, `e2e/pathways-smoke.spec.ts`). Recommend running on macOS before launch. |

The lint and tsc passes mean there are no compile-time, type-check, or lint failures. The build/Playwright items above are sandbox-environment failures, not failures of the codebase.

---

## Audit 11 — Final report (Sections A–L)

(Full detail also lives at `docs/CATALOG_AUDIT_2026-05-11.md`; this document mirrors the data in step-by-step form.)

### A. Executive summary
- 5 items publicly visible on `/` and `/learn`.
- All 16 flagship courses hidden by an empty allowlist.
- 15 placeholder entries exist in data but never route.
- All 3 Rise packages on disk are wired and have valid `content/index.html`.
- Lint and tsc pass. Local `npm run build` and Playwright must be run on macOS.
- Biggest risks: the `smart-workflows-with-ai` slug collision; the dead-code components carrying fabricated ratings/learner counts; user-visible "Rise" wording in `PaidHostedRiseFlagshipSection.tsx:170`; user-visible "dev simulation" / "Save dev score" copy.

### B. Public catalog surfaces
- `/`: 3 cards (Smart Workflows micro, AI at Work micro, Practical Math).
- `/learn`: 5 cards (the 3 above + BPA + Business Analytics) + 4 area cards (no per-card course links).
- `/my-learning`: same 5 cards; "Your courses" / "Recommended next" empty.
- `/learn/category/:slug`: orientation + FAQ only — no course cards.
- `/learn/school/:schoolId`: always redirects.
- All `/library/...` and `/courses/...` pages: reachable only by direct link.

### C. Course inventory table
See Audit 2. Key headcounts: 5 public, 14 direct-link only, 16 hidden flagships, 15 placeholders.

### D. Keep public now
The 5 entries in Audit 2.A (no other items qualify as production-ready and on-catalog).

### E. Hide from public discovery
- 16 flagship courses (already hidden by policy; do not change).
- 15 placeholder entries (already hidden; do not surface).

### F. Direct-link only
All 14 entries in Audit 2.B (5 standalone-as-library + 5 extended libraries + 4 family libraries).

### G. Delete / cleanup candidates
- `FEATURED_CARD_CHROME`, `FeaturedCoursesSection`, `SchoolsSection`, `DiscoveryHero` in `src/components/learn/discoveryHubSections.tsx`.
- `src/components/learn/StandaloneCoursesSection.tsx` (entire file).
- 15 placeholder entries in `src/data/learning/plannedCoursesCatalog.ts` (after owner decision).
- Root file `homepage-files.txt`.

### H. Duplicates / naming conflicts
See Audit 9 (10 entries with explicit recommendations).

### I. Broken or risky routes / assets
- No broken routes or missing Rise packages.
- Risks: `/learn/school/:schoolId` always redirects; `/learn/category/:slug` half-built; `/learn/checkout` shows "dev simulation" copy when reached; `/learn/courses/business-process-automation-for-work` is a hard-coded redirect (intentional but a sign of namespace overlap); `/paths`, `/paths/:pathwaySlug`, `/lab`, `/learning/labs` are all redirects (legacy).

### J. Tool / vendor wording found
See Audit 8 (sections A–D).

### K. Recommended clean catalog going forward
See Audit 7.

### L. Next implementation plan (staged; do not execute now)
1. **Hide / remove public placeholders.** Delete dead-code components carrying fabricated ratings/learners (`FEATURED_CARD_CHROME`, `FeaturedCoursesSection`, `SchoolsSection`, `DiscoveryHero`, entire `StandaloneCoursesSection.tsx`). Replace user-visible "Rise" string in `PaidHostedRiseFlagshipSection.tsx:170` with neutral phrasing or hide. Gate or rename "dev simulation" / "Save dev score" copy.
2. **Rename / disambiguate confusing slugs.** Rename the flagship `smart-workflows-with-ai` to a distinct slug; update `flagshipCoursesCatalog.ts`, `flagshipCourseCurricula.ts:1300` alias, `flagshipSessionContentResolve.ts:173` alias, `paidFlagshipCertificateConfig.ts`, all session-content override files. Normalize the two Practical Math and two Business Analytics slug spellings to one canonical form per course. Add a documenting comment to the `'ai-productivity-smart-workflows': 'smart-workflows-with-ai'` alias.
3. **Keep only clean courses visible.** Verify `getMicrolearningCatalogItems()` and `getFullCourseCatalogItems()` continue to return only the audited 5. Decide on the operator nav "Schools" label, the `/learn/school/:schoolId` and `/learn/category/:slug` half-built pages, and the residual Pathways UI.
4. **Add missing route tests.** Playwright tests asserting `/learn`, `/`, `/my-learning` show exactly the expected items and no hidden flagship slugs leak; unit test that the flagship allowlist is empty; "no-leak" test scanning rendered output for "Rise", "Articulate", "SCORM", "iframe", "pilot", "placeholder", "coming soon", "dev simulation".
5. **Add future paid gating later.** Once ready, add specific flagship slugs to `LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS` and unlock the `/learn/checkout` flow. At launch, decide whether to surface the `/courses/...` library-style standalones on `/learn`.

---

*End of sequential audit. No code modifications were performed.*
