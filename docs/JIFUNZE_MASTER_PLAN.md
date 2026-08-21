# Jifunze.ai — Master Plan

**Status:** Authoritative. This document defines the product, the architecture, and the sequence of work. Once committed to, deviations require an explicit amendment to this document — not a side decision in a PR.

**Owner:** Godfrey Maseno (see `docs/OWNERSHIP_AND_IP_NOTICE.md` and `docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md`). All contributions are strictly contract-based; no ownership rights are conferred by contribution.
**Last updated:** 2026-05-18.
**Supersedes:** every prior planning, audit, and architecture document in this repo. The legacy docs were deleted on 2026-05-18 to eliminate confusion and stale references.

---

## 1. Product definition

Jifunze.ai is a **learning, tutoring, and applied-practice platform** that combines:

- **Academic-grade structured courses** authored to a consistent standard, organized into schools and tiers (free, flagship, standalone, library).
- **AI tutoring** integrated into every lesson — a course-context-aware assistant that explains, quizzes, escalates.
- **Human tutoring** as a later marketplace layer — 1:1 sessions with subject experts, AI-tutor → human-tutor handoff.
- **Interactive labs** for hands-on practice — a browser-based math lab for computation and a partner-provided cloud-sandbox environment for technical projects.
- **Market-responsive curriculum** — a signals pipeline that monitors job-market and skill-demand signals and proposes curriculum updates through the same AI-assisted authoring loop that produces new courses.
- **Individual and team learning** — built first for individual learners; teams (organizations enrolling cohorts) layered on once the individual product is solid.

**Audience.** Adult learners (university, professional, lifelong-learning) are the primary audience. High-school learners are a welcome secondary audience for on-demand subject-mastery courses (math, sciences, foundational skills); see §2 non-goal #3 for the policy boundaries that come with serving minors.

The product is positioned as "Harvard online with tutoring and applied labs" — academic-quality content at growing catalog scale, with the personalization and applied-practice depth that academic credentials alone do not provide.

### 1.1 Why this combination, in plain terms

Most learning platforms pick a single corner of the market. Coursera scales the catalog and sacrifices quality. MasterClass invests in production and sacrifices depth. Khan Academy targets K-12 mastery. Outlier offers degree-adjacent courses but stays narrow. Pluralsight and Cloud Guru focus on technical labs but with thin pedagogy. No platform combines academic quality, growing catalog, AI tutoring, applied labs, and market responsiveness. That is the wedge.

### 1.2 The trilemma we will not pretend to avoid

Three goals are in tension: **many courses**, **market-responsive curriculum**, **academic-grade quality**. No platform has solved all three at scale. Our explicit sequencing is **quality + responsive on a narrow catalog first**, then scale to "many" once the publishing pipeline produces consistently high-quality output. We do not chase catalog breadth before the pipeline is proven.

---

## 2. Non-goals (locked)

The following are explicitly out of scope. We will not build them, and we will reject feature requests that would pull us toward them.

1. **No social media publishing, brand-content generation, or content marketing automation.** The previous trends/opportunities/autonomy subsystem is being removed entirely.
2. **No multi-brand or multi-account social management.** Brand profiles, social account models, platform-adaptation logic, publishing connectors are all gone.
3. **No K-12 replacement curriculum, school-district product, or accredited K-12 program.** On-demand subject-mastery courses (especially math and sciences) are in scope and serve learners of any age — including high schoolers supplementing schoolwork — provided platform usage policies (parental consent for minors, age-appropriate AI tutor moderation, billing routed through guardians for under-18 learners) are properly designed. We are not a school replacement; we are a subject-mastery layer alongside whatever school the learner attends.
4. **No accredited degree program.** Certificates of completion only; no university partnerships for degree credit before Wave 6 at the earliest, possibly never.
5. **No native mobile app before Wave 6.** The web product must be excellent on mobile browsers; a native app is not a substitute.
6. **No live-streamed instructor classes.** Asynchronous lessons + AI tutor + (later) scheduled human-tutor sessions. We do not build a webinar product.
7. **No proprietary cloud-lab infrastructure.** Cloud labs are integrated from a partner (Instruqt, KodeKloud, Skillable, or similar). We are not building VM provisioning, network isolation, or sandbox abuse mitigation.
8. **No general-purpose LMS for third parties.** We are not selling Jifunze as a white-label LMS to other course providers.

If a future feature lands inside one of these non-goals, the decision is to amend this document explicitly or refuse the feature.

---

## 3. Architecture principles

1. **Polymorphic lessons.** A lesson is not a single content type. It is one of: `reading`, `interactive_rise`, `math_lab`, `cloud_lab`, `ai_tutor_chat`, `capstone`, `assessment`. The course/module/lesson skeleton is shared; the lesson body is type-specific.
2. **Authoring as code.** Content lives in a single canonical source format (`content/courses/<slug>/` with `course.yaml` and per-lesson MDX). A compiler emits whatever each surface needs. No hand-edited downstream artifacts.
3. **AI-first authoring with human review.** Lessons are drafted by AI from a brief, reviewed by a human, approved by commit. Style and quality enforced by a prompt-level style guide + a structural compiler contract.
4. **Course content stays in-repo; learner state in Supabase.** Prose, structure, and lab specs are TypeScript / MDX. Progress, attempts, capstone submissions, certificates, tutor session transcripts go to Supabase.
5. **Buy infrastructure where it is cheaper than building.** Cloud labs from a partner. AI models from Anthropic/OpenAI. Auth from Supabase. Payments from Stripe. We build what is differentiating (publishing pipeline, AI tutor, math lab, curriculum signal-to-author loop). We integrate everything else.
6. **One source of truth per concept.** No duplicate catalogs, no parallel curriculum files, no shadow lesson stores. If the compiler emits multiple files, only one is hand-edited.
7. **Naming reflects reality.** No `src/services/learning/` containing trends-loop code. If a folder name is wrong, rename it. The rewrite ends naming collisions.
8. **Surfaces composed of primitives.** A flagship course detail page is a composition of catalog data + curriculum data + progress data — not a bespoke schema. New tiers are configurations of existing primitives, not new code paths.

---

## 4. Lesson type taxonomy (locked)

Every lesson in every course is exactly one of these types. New course tiers can mix them freely.

| Type | Surface | Author input | Runtime |
|---|---|---|---|
| `reading` | Prose lesson rendered in the library reader / flagship session page | MDX body | React component rendering MDX |
| `interactive_rise` | Embedded Articulate Rise (or equivalent) package | Pre-built HTML package dropped at `public/course-assets/interactive/<slug>/` | iframe in the course page |
| `math_lab` | Browser-based math/computation environment | MDX with `<MathLab problem="..." solution="..." />` components | Pyodide-backed runtime, in-browser |
| `cloud_lab` | Embedded third-party cloud sandbox (Instruqt / KodeKloud / similar) | MDX with `<CloudLab provider="..." trackId="..." />` | iframe + completion webhook |
| `ai_tutor_chat` | Conversation with course-context-aware AI tutor | MDX with `<AITutorChat objective="..." rubric="..." />` | LLM call with lesson context |
| `capstone` | Submission of a learner-produced artifact, reviewed | MDX with `<Capstone prompt="..." evidence="..." rubricRef="..." />` | Submission form + admin review queue |
| `assessment` | Graded quiz; can gate module completion | MDX with `<Assessment questions="..." threshold="..." />` | Quiz runtime + grading |

All seven types share: title, outcomes, estimated duration, prerequisites, and progress tracking. They differ only in body content and runtime.

---

## 5. Data model (high-level, locked at the boundary)

Three layers:

**Content (in-repo, compiled).** `course.yaml` per course → emits `Course`, `Module`, `Lesson` typed records. Source-of-truth for prose, structure, lab specs.

**Learner state (Supabase).** One row per `(learner_id, lesson_id)` capturing started/completed/score/duration. One row per `(learner_id, course_id)` for course-level progress. One row per capstone submission. One row per AI tutor session. One row per lab run. Existing migrations for course progress, capstone submissions, and learner artifacts survive; brand/content/social tables are dropped.

**Identity & billing (Supabase + Stripe).** Auth via Supabase. Subscription state via Stripe webhooks. Single-tenant per individual learner. Team tenancy (multi-learner organizations) does not exist in the data model until Wave 6 — when it lands, it lands as a new schema, not a refactor of the old brand tenancy.

The detailed schema lives in `docs/persistence-supabase.md` (to be rewritten in Wave 1 Phase 7). This document defines only the boundary: what is in-repo, what is in DB, what is third-party.

---

## 6. The six waves

This is the sequence. Each wave has a clear scope and acceptance criteria. We do not start a wave until the previous wave's acceptance criteria are met.

### Wave 1 — Strip-and-clean rewrite

**Goal.** Remove every line of code that exists to serve a non-goal. Normalize naming. Rewrite top-level documentation to reflect the real product.

**In scope.**
- Delete the trends / opportunities / autonomy / brand-publishing subsystems entirely. (Identified files documented in the Phase 1 inventory.)
- Delete the multi-brand workspace and tenant model. (Rebuilt cleanly in Wave 6 when teams are introduced.)
- Delete the four legacy redirects (`/trends`, `/ideas`, `/studio`, `/insights`). 404 is acceptable for stale links.
- Disambiguate `src/services/learning/`. Real course-progress code moves into `src/services/learnerState/`. The trends-loop code in that folder is deleted.
- Delete the dormant `src/components/ContentGenerator.tsx`, `HomePublicGeneratePanel.tsx`, `PublicGeneratePage.tsx`, `InternalUatDiagnostics.tsx`, `WorkspaceOpportunityCard.tsx`. (`homepage-files.txt` already deleted on 2026-05-18 as part of doc cleanup.)
- Inventory `learning_lab_runs` and related migrations. **Preserve** anything that is a viable substrate for Wave 4 (math lab) and Wave 5 (cloud lab); delete only what is brand-trends-flavored.
- Drop Supabase migrations producing `brands`, `content`, `social_*`, `tenants` tables. Confirmed no production data.
- Rewrite `PROJECT_CONTEXT.md` and `README.md` to point to this document. *(Done 2026-05-18.)*
- Purge dead docs from prior planning, audit, and architecture work. *(Done 2026-05-18. Only this document, the legal/IP docs, `PROJECT_CONTEXT.md`, and `README.md` remain.)*
- Create `docs/persistence-supabase.md` fresh during Phase 7 of Wave 1, describing only the learner-state schema (course progress, capstones, certificates, lab runs, AI tutor sessions). No trends content carried over.
- One PR, one branch (`chore/learning-only-rewrite`), squash merge.

**Out of scope (deferred to later waves).**
- Building the publishing pipeline.
- Authoring any new course content.
- Building AI tutor / math lab / cloud lab.
- Rebuilding multi-tenancy.
- Changing the existing flagship session player, capstone flow, certificate generator, or Rise embedding.

**Acceptance criteria.**
- `npm run typecheck`, `npm run build`, `npm run lint` clean.
- All e2e suites pass.
- `grep -rE "TrendCategory|ContentOpportunity|BrandProfile|SocialPlatformId|signalOrchestrator|tenant" src/` returns no live code matches.
- Existing learner flows verified by manual smoke: home, discovery, free starter (Rise loads), flagship landing, flagship session, library reader, standalone course, sign-in, checkout, admin dashboard, capstone submission, certificate generation.
- One-week preview-deploy dogfooding window with no regressions filed.

**Detailed phase plan.** See `docs/internal/WAVE_1_REWRITE_PLAN.md` (created during Phase 1 of Wave 1, supersedes the phased plan in `JIFUNZE_REVIEW_AND_PUBLISHING_PIPELINE.md`).

### Wave 2 — Publishing pipeline + first AI-authored course

**Goal.** Build the canonical authoring → compile → publish pipeline. Author one real flagship course through it end-to-end. Prove the loop.

**In scope.**
- `content/courses/<slug>/` directory convention: `course.yaml` + `lessons/*.mdx` + optional `rubric.yaml`.
- `content/STYLE.md` — voice and pedagogy guidelines, prepended as system prompt to every AI authoring call.
- `scripts/compile-course.ts` — reads `content/courses/<slug>/`, emits typed TS into `src/data/learning/courses/<slug>/`. Targets: native flagship curriculum, library reader sections, catalog entry. Embedded Rise packages are written by hand (not compiled).
- Two authoring CLI scripts: `npm run author:outline -- --brief <path>` (drafts `course.yaml`) and `npm run author:lessons -- --slug <slug>` (drafts MDX files). Server-side LLM calls; never exposes keys.
- Three human review gates: outline, lesson (per-file), compile-clean.
- Refactor of existing courses: pick one (recommend `ai-essentials`, the only fully-authored flagship) and round-trip it through the new format. The compiler must produce equivalent output to today's hand-written files.
- Author one *new* flagship course through the pipeline. Recommended: "AI with Claude for Everyday Work" under `ai_digital`. Four modules, 12–16 lessons, one capstone, status `pilot`. Targets `flagship` + `library` surfaces; no Rise package for v1.
- Documentation: `docs/AUTHORING.md` covering the brief template, style guide, the three review gates.
- Build against the **locked 50-course catalog** in `docs/internal/COURSE_CATALOG_PLAN.md` (locked 2026-05-18). Wave 2 authors all 50 courses across eight sequential phases; Pass 5 and Pass 6 are paced with Wave 4 (math lab).

**Out of scope.**
- AI tutor on lessons (Wave 3).
- Math lab content (Wave 4).
- Cloud lab content (Wave 5).
- Multi-tenant or team features (Wave 6).
- Migrating the `training/` markdown corpus (Wave 2.5 — separate effort, after the pipeline is proven on the new course).

**Acceptance criteria.**
- One existing course round-trips through the pipeline without learner-facing regression.
- One new course is live at `/learn/courses/ai-with-claude-everyday` and `/library/ai-with-claude-everyday`.
- A non-engineer reviewer (you) can read a draft lesson MDX, request a change, and re-run the AI author CLI to produce a revision.
- The compiler fails loudly on any structural contract violation (missing outcomes, missing module summary, missing capstone evidence filename, etc.).
- All audit and verify scripts pass against both courses.

### Wave 3 — AI tutor on every lesson

**Goal.** Add a sidebar AI tutor to every lesson. Course-context-aware. Lifts course completion and learner satisfaction without requiring any new content.

**In scope.**
- `<AITutorChat>` component, embeddable in MDX or rendered as a persistent sidebar on lesson pages.
- Context assembly: current lesson content, learner's prior progress in this course, course prerequisites, lesson outcomes, capstone rubric (if applicable).
- LLM provider abstraction with one implementation. **Decision deferred to start of wave**: Anthropic Claude vs OpenAI. Likely Claude for cost and pedagogy quality.
- Server-side proxy (no client-side keys), rate limiting, daily token caps per learner.
- Supabase `ai_tutor_sessions` table — one row per session, with transcript and token usage.
- Admin view of recent tutor sessions for QA.
- A standalone "Ask the tutor about this course" entry point from each course landing page.
- Lesson type `ai_tutor_chat` for lessons that *are* a guided tutor conversation (vs the always-on sidebar that applies to every lesson).

**Out of scope.**
- Human tutor escalation (Wave 6).
- Tutor that has full course catalog memory across all courses (start with single-course context; cross-course retrieval is a Wave 3.5 follow-up if needed).
- Voice tutoring (deferred indefinitely; flagged as a non-goal unless explicitly added).

**Acceptance criteria.**
- AI tutor sidebar appears on every flagship session page and every library reader page.
- A learner can ask "explain this differently" on any lesson and get a context-aware response.
- Token costs measured; daily cap enforced; sessions logged.
- 50+ real tutor sessions reviewed in QA before declaring acceptance.

### Wave 4 — Math lab

**Goal.** Add a browser-based math lab as a first-class lesson type. Plug it into the existing `practical-mathematics-life-work-business` course as the pilot.

**In scope.**
- Pyodide runtime in-browser. SymPy, NumPy, Matplotlib pre-loaded.
- `<MathLab problem="..." starterCode="..." solution="..." verification="..." />` component.
- Lesson type `math_lab` in the publishing pipeline. MDX authoring; compiler treats math labs as a distinct emit target.
- Per-attempt state in Supabase `learner_lab_runs` (extended from the existing `learning_lab_runs` migration if viable).
- Solution verification: structural (did they call the right function), numeric (does their output match within tolerance), or symbolic (does SymPy say their expression equals the reference).
- Refactor `practical-mathematics-life-work-business` to use math labs for module-level exercises. Existing capstone rubric preserved.

**Out of scope.**
- Stat/probability labs requiring R or specialized runtimes (defer until use case is real).
- Compute-heavy ML labs (those go to cloud lab, Wave 5).
- A custom math notation editor (use LaTeX rendering via KaTeX; learners type expressions in Python syntax for SymPy).

**Acceptance criteria.**
- A learner can complete at least 10 math lab exercises in the math course in-browser, with verification working in all three modes.
- Pyodide loads in under 4 seconds on a normal connection.
- Lab runs persisted, resumed across sessions.
- One new math-heavy course authored through the pipeline using math labs (TBD topic at start of Wave 4).

### Wave 5 — Cloud lab via partner

**Goal.** Add cloud-sandbox lab capability via a third-party partner. Integrate, do not build.

**In scope.**
- Vendor selection: evaluate Instruqt, KodeKloud, Skillable, Strigo. **Decision deferred to start of wave.** Evaluation rubric: AWS/GCP/Azure coverage, embedding flexibility, pricing per learner-hour, completion-webhook reliability, content authoring model.
- `<CloudLab provider="..." trackId="..." />` component. Iframe embed + completion webhook handler.
- Lesson type `cloud_lab` in the pipeline. Authoring is two-step: lab content authored in the vendor's tool, lab spec referenced in MDX.
- Supabase `learner_lab_runs` extended for cloud lab runs (start time, completion, vendor session ID).
- Cost monitoring: per-course, per-learner, per-month caps.
- One new technical course authored using cloud labs. Likely topic: "AWS Cloud Foundations" or "Kubernetes Operations." The existing `aws-cloud-hosting-fundamentals` and `cloud_devops` library suggest the audience is anticipated.

**Out of scope.**
- Building proprietary VM provisioning, network isolation, or quota systems.
- Free unlimited lab access (cloud labs cost real money per learner-hour; pricing/access model must reflect this).

**Acceptance criteria.**
- A learner can complete a multi-step cloud lab from inside Jifunze, with progress and completion reflected in their course progress.
- Cost per completed cloud-lab course measured and within the price envelope set at start of wave.
- Lab abandonment / cost runaway scenarios tested and mitigated (forced session timeouts, cost alerts).

### Wave 6 — Teams + human tutoring marketplace

**Goal.** Open the B2B and human-tutor channels. Rebuild tenancy from scratch around the learner-organization concept.

**In scope.**
- New tenant model: `organizations`, `organization_memberships`, role-based access (org admin, manager, learner). Designed from a clean slate; not a refactor of the deleted brand tenancy.
- Org-level course assignment, cohort enrollment, manager dashboards (progress aggregates, completion rates, certificate exports).
- Per-seat billing via Stripe (already integrated).
- Human tutor marketplace: tutor profiles, scheduling (Calendar integration), session bookings, post-session ratings, payouts.
- AI tutor → human tutor handoff: when the AI tutor's confidence is low or the learner explicitly requests, surface "Book a human tutor" in-context.
- Org SSO support (Supabase + SAML).

**Out of scope.**
- White-label LMS for third-party course providers (non-goal #8).
- Tutoring for K-12 (non-goal #3).
- A degree program (non-goal #4).

**Acceptance criteria.**
- An organization can enroll 50+ learners, assign them a course path, view manager dashboards.
- A learner can book a human tutor session, the tutor receives the booking, the session happens, payment is processed, the rating is recorded.
- At least 100 real human-tutor sessions completed before declaring acceptance.

---

## 7. Cross-cutting concerns

Things that span multiple waves and need consistent decisions.

### 7.1 Authentication & identity

Supabase Auth is the foundation. Wave 1 keeps the current setup. Wave 6 adds org SSO via SAML. No other identity stack is contemplated.

### 7.2 Billing

Stripe is the only billing integration. Subscriptions are the default model for individual learners. Per-seat billing for orgs. Pay-per-session for human tutoring. Cloud lab access is bundled into subscription tiers with cost caps (no hidden metered billing for learners). Existing Stripe migrations and entitlement code survive Wave 1.

### 7.3 Certificates

Existing certificate generator survives Wave 1 unchanged. Wave 2 extends it to support multiple course-completion paths through the new pipeline. No third-party credentialing partners before Wave 6.

### 7.4 Market signals → curriculum updates

This is the platform's long-term differentiator and the conceptual descendant of the trends subsystem we are deleting. **Scope and timing:** rebuilt as a narrow, server-side service in a wave between 5 and 6 (call it Wave 5.5 for now; promote to a formal wave if it grows). Inputs: job-posting feeds (LinkedIn Jobs API, Indeed, Adzuna), skill-taxonomy sources (O*NET, Lightcast). Output: drafts of curriculum updates fed into the same AI authoring pipeline. Not part of any earlier wave; explicitly deferred so we do not repeat the original mistake of fusing market-intelligence with content delivery.

### 7.5 Tech stack (locked)

| Layer | Choice |
|---|---|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| Auth & DB | Supabase (Postgres + Auth + Edge Functions) |
| Payments | Stripe |
| Hosting | Vercel |
| AI providers (authoring + tutor) | OpenAI and/or Anthropic; pluggable provider abstraction |
| Math runtime | Pyodide (Wave 4) |
| Cloud lab vendor | TBD at start of Wave 5 |
| Content authoring | MDX + per-course YAML |
| Embedded interactive | Articulate Rise (existing); no plans to replace |

Adding any new layer (new DB, new auth provider, new hosting, new frontend framework) requires an amendment to this document.

---

## 8. Governance

### 8.1 What this document controls

This document defines the product, the architecture, the wave sequence, and the non-goals. Anything inside scope is subject to engineering judgment. Anything that crosses the boundary (a new lesson type, a new tier, a new third-party integration, a new wave, a change to a non-goal) requires editing this document first.

### 8.2 What does not require an amendment

Implementation details inside a wave. File naming. Internal type structure. Choice of testing library. Choice of LLM provider within an already-committed AI integration. Visual design. Copy.

### 8.3 How to amend

Edit the document in a PR titled `amend(master-plan): <one-line summary>`. The PR description states what changed and why. The owner approves before merge. The PR is the audit trail.

### 8.4 Working agreement during execution

We do not start a wave until the previous wave is accepted.
We do not include Wave N+1 features inside Wave N "while we're in there."
We do not delete code that is currently working unless it is on the deletion list in this document or its referenced sub-plans.
We do not add a third-party integration that is not in this document without an amendment.

---

## 9. Open decisions (tracked here so they do not get lost)

These are decisions deferred to the start of the relevant wave. Listed so they are not forgotten.

1. **Wave 3.** LLM provider for AI tutor (Anthropic Claude vs OpenAI vs both). Default lean: Claude.
2. **Wave 4.** Whether to use Pyodide or a Jupyter-kernel approach for the math lab. Default lean: Pyodide.
3. **Wave 5.** Cloud lab vendor (Instruqt vs KodeKloud vs Skillable vs Strigo). Default lean: Instruqt.
4. **Wave 5.** Whether cloud lab access is bundled in subscription or sold as add-on credits.
5. **Wave 6.** Whether tutor scheduling uses an off-the-shelf system (Calendly Embed, Cal.com) or is built in-house.
6. **Wave 5.5.** Whether market signals come from open APIs or paid data sources (Lightcast is paid, O*NET is free).

These are *all* the deferred decisions of consequence. New decisions added here must be amended into this document.

---

## 10. What we do not know yet

Honest list of unknowns that may force re-planning:

- Whether AI-authored lessons consistently hit "academic-grade quality" without heavy human editing. If not, Wave 2 may need to bring in subject-matter experts earlier than planned, slowing course growth.
- Whether Pyodide is fast enough for the math lab on average learner hardware. If not, Wave 4 may need a server-side compute fallback.
- Whether any cloud lab vendor's pricing is compatible with a subscription model. If unit economics don't work, Wave 5 may be reshaped around per-course paid labs.
- Whether the existing `learning_lab_runs` migration is usable as a Wave 4/5 substrate or will be replaced.
- Whether market-signal data sources are reliable enough to drive curriculum updates without producing noise. Worst case, Wave 5.5 becomes a manual curation tool rather than an automated pipeline.

We will know more after each wave's acceptance review. This list is updated at each review.

---

## 11. Pointers

- Wave 1 detailed plan: `docs/internal/WAVE_1_REWRITE_PLAN.md` (to be created at the start of Wave 1)
- Inventory of files slated for deletion in Wave 1: `docs/internal/TRENDS_REMOVAL_INVENTORY.md` (to be created at the start of Wave 1)
- **Locked 50-course catalog:** `docs/internal/COURSE_CATALOG_PLAN.md` (locked 2026-05-18)
- Repository entry point: `README.md`
- Short product context: `PROJECT_CONTEXT.md` (points to this document)
- Ownership and contributor terms: `docs/OWNERSHIP_AND_IP_NOTICE.md`, `docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md`
- Legal and policies status: `docs/legal-and-policies-status.md`

End of master plan.
