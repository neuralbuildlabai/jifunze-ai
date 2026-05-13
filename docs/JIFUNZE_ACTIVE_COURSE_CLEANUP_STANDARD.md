# Jifunze.ai — active course cleanup standard

This document defines the **platform-wide** learner experience standard for courses, catalogs, and embedded interactive packages. It complements the per-package note [SMART_WORKFLOWS_INTERACTIVE_RE_AUTHORING_CHECKLIST.md](./SMART_WORKFLOWS_INTERACTIVE_RE_AUTHORING_CHECKLIST.md) (staging-safe shell vs source re-export).

---

## 1. Course page quality bar

- **Premium and calm:** warm surfaces, clear hierarchy, one hero idea, no stacked redundant boxes unless each box has a distinct job.
- **Outcome-first hero:** short description; avoid repeating the same paragraph in hero, overview, player intro, and completion.
- **Typography:** normal letter-spacing and word-spacing on long prose; comfortable line height; no cramped legal-style walls of text.
- **Layout:** avoid persistent empty half-columns on core teaching layouts (fix in **authoring** for embedded courses; fix in **components** for React pages).

---

## 2. One access label (Free / paid / included)

- On each **course detail** surface, learners should see **one** primary access affordance for tier (e.g. a single **Free** pill or a single checkout label), not the same tier repeated in hero, metadata, nav, and body.
- **Catalog cards** use their pill (`publicLabel`) **once** on the card; the `/learn` section headings already say “Free Microlearning” / “Free Full Courses”, so card copy must not re-stack redundant “free” sentences.
- **Navigation** helpers should say **“More courses”** (or “Catalog”), not a second “Free courses” link next to a Free badge.

---

## 3. No external builder labels (learner-visible)

In **Jifunze React shells** (not inside minified Rise bundles), learner-visible copy must not include product names or packaging such as:

- Articulate, Rise, Storyline, SCORM, “360”, external builder URLs as **readable text**.

**Boundary:** internal progress keys, webpack chunk names, and CDN image URLs inside exported `public/course-assets/interactive/**/content/lib/**` are **not** learner UI. Clean them only via **re-export** or narrowly scoped metadata edits — never bulk edits to minified JS.

---

## 4. No technical sync / completion clutter

- Do not tell learners about **account-wide sync**, **device vs server** implementation, or **debug completion** states.
- **Completion:** short, positive, device-local wording only (see shared copy on free starters in `freeStarterRiseCoursesCatalog.ts`).
- Avoid **“Marked complete — … sync …”** style strings in shell UI.

---

## 5. Microlearning vs flagship

| Surface | Depth | Learner promise |
|--------|-------|-----------------|
| **Free microlearning** (`/learn/free/...`) | Short interactive starters | Practical habits, workshop flow, honest time range — **not** “full degree” depth. |
| **Standalone full courses** (`/learn/:slug`) | Structured modules, quizzes, certificate path where applicable | Deeper guided path; checklist expectations may be longer. |
| **Flagship** (`/learn/courses/:slug`) | Long-form sessions, mastery checkpoints, capstone | Serious depth; avoid thinning flagship copy to microlearning tone. |
| **Extended libraries / standalone course readers** (`/library/...`, `/courses/...`) | Reader + labs | Libraries are **not** a single course page but still follow the same chrome and terminology rules. |

---

## 6. Embedded package safe-edit boundary

- **Safe:** `content/index.html` metadata, thin host-only CSS next to it, optional **validated** JSON/string updates in `runtime-data.js` **only** with parse checks and **no** routine dependency on ad hoc patches.
- **Unsafe:** editing `content/lib/**` minified bundles, blind vendor string replace, blind CDN URL rewrites.
- **Premium layout/assets** inside the iframe: **source re-authoring + re-export** (see Smart Workflows checklist).

---

## 7. Source re-authoring requirement

Anything that requires changing **block layout**, **imagery**, **lesson mix**, or **removing vendor CDN thumbnails** must be done in the **authoring tool** and re-exported. The Jifunze repo hosts the **static export** and the **shell** around it.

---

## 8. Verification commands

Recommended for CI and before merge:

```bash
npm run lint
npx tsc -b --force
npm run build
npm run audit:active-courses
npm run verify:active-course-cleanup
npm run verify:embedded-course-packages
npm run verify:paid-course-shells
npm run verify:smart-workflows-microlearning-page
npx playwright test e2e/active-course-pages.spec.ts e2e/learning-discovery.spec.ts e2e/paid-course-pages.spec.ts e2e/standalone-course-pages.spec.ts
```

**Also run** course-specific verifiers when those paths change (e.g. `npm run verify:ai-productivity-smart-workflows`, `npm run verify:practical-math`). **`npm run verify:business-process-automation`** validates **archived** BPA courseware only (BPA is not a separate public catalog course).

---

## 9. Active course inventory

The **machine-generated** inventory (titles, slugs, routes, types, access, data files, components, embedded paths, status **A–E**, cleanup notes) is maintained at:

**[ACTIVE_COURSE_INVENTORY.md](./ACTIVE_COURSE_INVENTORY.md)**

Regenerate after catalog or route changes:

```bash
npm run audit:active-courses
```

**Status legend (summary)**

| Code | Meaning |
|------|--------|
| **A** | Active and intended for learners (primary catalog, public route, or library). |
| **B** | Active but not on the primary `/learn` flagship grid (deep links, paid-only, or session-only embed). |
| **C** | Duplicate / legacy / redirect — keep for compatibility. |
| **D** | Broken / missing-asset **candidate** — confirm manually (automated checks cover common embed paths). |
| **E** | Draft / backup / non-production (e.g. `_backup_*` under `public/course-assets/interactive/`). |

---

## 10. Cleanup status (by course group)

| Group | Shell / catalog | Embedded package | Notes |
|-------|-----------------|------------------|-------|
| Free microlearning (3) | **Improved** — single Free pill, no sync clutter, aligned player headings | Smart Workflows: prior verified package; **AI at Work / Business analytics:** re-export for true premium inside iframe | Apply same shell patterns to all three; iframe premium per re-authoring checklist. |
| Standalone full (1 public) | Routed from `/learn`; detail pages use `StandaloneCourseDetailPage` | Narrated / in-app players per course data | **Practical Mathematics** only on public cards. **Business Process Automation** consolidated into Business Analytics — see [JIFUNZE_COURSE_PRODUCT_LADDER.md](./JIFUNZE_COURSE_PRODUCT_LADDER.md). |
| Flagship (16 catalog entries) | **Not** listed on main `/learn` grid today (`flagshipLearnerCatalogPolicy` allowlist empty); deep links + checkout | **One** paid hosted Rise bundle: `ai-productivity-smart-workflows` | Workflows ladder: [JIFUNZE_COURSE_PRODUCT_LADDER.md](./JIFUNZE_COURSE_PRODUCT_LADDER.md). |
| Extended libraries + course SKUs | Discovery + direct routes | N/A | Enforce same “no builder terms” and access clarity on landings/readers. |
| Redirects | Legacy paths → canonical free starters; **BPA → Business Analytics** | N/A | Document only; do not remove without traffic review. |

---

## 11. Duplicate / deprecated candidates (manual approval)

| Item | Recommendation | Implemented? |
|------|----------------|--------------|
| Business Process Automation for Work | **Consolidated** into Business Analytics public workshop; redirects in `App.tsx`; `verify:business-process-automation` = archived assets only. | Yes |
| `ai-powered-workflows-and-productivity` vs `ai-productivity-smart-workflows` | **Ladder:** free starter → paid hosted+certificate SKU → native deep flagship. Marketing + nav must not collapse the three. Canonical copy: [JIFUNZE_COURSE_PRODUCT_LADDER.md](./JIFUNZE_COURSE_PRODUCT_LADDER.md). | Doc + catalog copy |
| Legacy `/learn/business-analytics-*` and `/courses/learn-chatgpt-everyday-work` | **Keep redirects** (already in `App.tsx`) | Yes |
| `public/.../interactive/_backup_*` | **Archive (E)** — exclude from verify scripts; delete only after retention sign-off | Excluded from `verify:embedded-course-packages` |

---

## 12. Intentionally left for manual / product approval

- **Flagship public catalog allowlist** (`flagshipLearnerCatalogPolicy.ts`): which flagship slugs appear as cards on `/learn` when you intentionally launch them.
- **Free starter pages** must not show internal ladder / “native vs hosted” architecture copy to learners — keep that in [JIFUNZE_COURSE_PRODUCT_LADDER.md](./JIFUNZE_COURSE_PRODUCT_LADDER.md) and QA docs only.
- **Removal of backup trees** under `public/course-assets/interactive/_backup_*`.
- **Full embedded** vendor CDN independence — requires re-export + local assets (see Smart Workflows re-authoring doc).

---

## 13. Shared utilities (implemented vs planned)

| Utility | Role | Status |
|---------|------|--------|
| `FREE_STARTER_HERO_ACCESS_BADGE`, `FREE_STARTER_COMPLETION_*`, `FREE_STARTER_BODY_PROSE` | Consistent free-starter access + completion copy | **In** `src/data/learning/freeStarterRiseCoursesCatalog.ts` |
| `scripts/verify-active-course-cleanup.ts` | Forbidden substrings + embed `index.html` exists for free starters + paid hosted path | **Added** |
| `scripts/verify-embedded-course-packages.mjs` | All interactive packages: relative `href`/`src` resolve | **Added** |
| `scripts/audit-active-course-inventory.ts` | Regenerate `ACTIVE_COURSE_INVENTORY.md` | **Added** |
| Further React abstractions (`CoursePlayerFrame`, etc.) | Optional refactors when touching multiple shells | **Deferred** — avoid over-engineering until a third identical shell appears |
