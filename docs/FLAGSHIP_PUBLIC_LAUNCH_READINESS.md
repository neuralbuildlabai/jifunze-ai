# Public launch readiness — top candidate courses

**Date:** 2026-05-12 (updated)  
**Purpose:** Decide which offerings are safe to **feature more prominently** on public discovery (including future `/learn` flagship allowlist entries in `flagshipLearnerCatalogPolicy.ts`) **without** changing that policy in this document.

**See also:** [JIFUNZE_COURSE_PRODUCT_LADDER.md](./JIFUNZE_COURSE_PRODUCT_LADDER.md) — workflows / analytics positioning (BPA consolidated into Business Analytics).

**Sources:** [ACTIVE_COURSE_INVENTORY.md](./ACTIVE_COURSE_INVENTORY.md), [PHASE2_PAID_DEEP_SURFACE_AUDIT.md](./PHASE2_PAID_DEEP_SURFACE_AUDIT.md), [JIFUNZE_ACTIVE_COURSE_CLEANUP_STANDARD.md](./JIFUNZE_ACTIVE_COURSE_CLEANUP_STANDARD.md), [internal/COURSE1_AI_ESSENTIALS_PROMOTION_QA.md](./internal/COURSE1_AI_ESSENTIALS_PROMOTION_QA.md).

**Scoring:** Each dimension is **1–5** (1 = weak / high risk, 5 = strong / low risk). **Duplicate/overlap risk:** lower is worse (2 = high risk).

**Important mapping**

| User label | Canonical product in inventory | Primary public route | Type |
|------------|-------------------------------|----------------------|------|
| AI Essentials | AI Essentials | `/learn/courses/ai-essentials` | Flagship native (status **B** — not on flagship allowlist) |
| AI Productivity & Smart Workflows | AI Productivity and Smart Workflows | `/learn/courses/ai-productivity-smart-workflows` | Flagship paid + hosted interactive (**B**) |
| Business Analytics & Decision Making | Business Analytics **for Decision-Making** (free workshop) | `/learn/free/business-analytics-decision-making` | Free microlearning embedded (**A**). **Public lane for analytics + former BPA positioning** (see ladder doc). |
| Practical Mathematics | Practical Mathematics for Life, Work, and Business | `/learn/practical-mathematics-life-work-business` | Standalone full course, free (**A**) |

**Removed from public launch list:** Business Process Automation for Work — **consolidated** into Business Analytics; URLs redirect; not a separate marketed course.

---

## 1. Readiness table

| Course | Shell / page polish | Depth | Lessons / modules complete | Practical examples | Assessments / quizzes | Capstone / project | Certificate readiness | Visual quality | Duplicate / overlap risk | Production readiness | **Overall status** |
|--------|--------------------|-------|---------------------------|-------------------|----------------------|-------------------|------------------------|----------------|---------------------------|----------------------|-------------------|
| **AI Essentials** | 5 | 5 | 5 | 5 | 5 | 4 | 3 | 5 | 4 | 5 | **Needs minor polish** |
| **AI Productivity & Smart Workflows** | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 2 | 5 | **Needs content/depth work** |
| **Business Analytics (free workshop)** | 4 | 3 | 4 | 3 | 3 | 2 | 3 | 4 | 3 | 4 | **Needs minor polish** |
| **Practical Mathematics** | 4 | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 3 | 5 | **Ready to expose** |

**Score notes:** **AI Productivity** — overlap risk (2) vs free Smart Workflows + native sibling. **Business Analytics** — embedded iframe premium may need re-export for full visual bar.

### Status legend

| Status | Meaning |
|--------|--------|
| **Ready to expose** | Safe for broader discovery / featuring. |
| **Needs minor polish** | Targeted shell, copy, or marketing alignment. |
| **Needs content/depth work** | Curriculum or positioning before implying flagship depth. |

---

## 2. Recommended public emphasis (order)

1. **Practical Mathematics** — strongest native depth + certificate on `/learn`.  
2. **AI Essentials** — after checkout aligns with in-app / no-PDF messaging.  
3. **Business Analytics** — primary free analytics/decisions workshop; shell + iframe polish.  
4. **AI Productivity & Smart Workflows** — after workflows overlap narrative is stable in marketing.

---

## 3. Flagship `/learn` grid

- **`LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS`** remains empty until product allowlists.  
- **AI Productivity** and **AI-Powered Workflows** stay off public flagship cards until overlap comms + policy sign-off.

---

## 4. Blocking issues (summary)

| Course | Issues |
|--------|--------|
| **AI Essentials** | Credential story must match checkout (no PDF). |
| **AI Productivity** | Triple overlap with free starter + native sibling; hosted iframe re-export for premium feel. |
| **Business Analytics** | Starter depth; embedded package checklist. |
| **Practical Mathematics** | Slug variants; standalone hero density (Phase 2). |

---

## 5. Next cleanup order

1. Workflows ladder marketing (free → paid hosted → native).  
2. Practical Math slug + standalone hero polish.  
3. AI Essentials checkout alignment.  
4. Business Analytics embedded re-export.  
5. AI Productivity shell density after (1).

---

## 6. Policy note

**No change** to `src/data/learning/flagshipLearnerCatalogPolicy.ts` in this document.
