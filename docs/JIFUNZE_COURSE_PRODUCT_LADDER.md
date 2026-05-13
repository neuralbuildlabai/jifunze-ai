# Jifunze.ai — course product ladder (workflows & analytics)

**Date:** 2026-05-12 (updated)  
**Status:** Active product reference. Does **not** change `flagshipLearnerCatalogPolicy.ts`.

**Related:** [ACTIVE_COURSE_INVENTORY.md](./ACTIVE_COURSE_INVENTORY.md), [JIFUNZE_ACTIVE_COURSE_CLEANUP_STANDARD.md](./JIFUNZE_ACTIVE_COURSE_CLEANUP_STANDARD.md), [FLAGSHIP_PUBLIC_LAUNCH_READINESS.md](./FLAGSHIP_PUBLIC_LAUNCH_READINESS.md).

---

## Consolidation: Business Process Automation for Work (BPA)

**Business Process Automation for Work is no longer a separate public product.** It overlapped with the analytics and decision lane; learner-facing positioning and public catalog entries are **consolidated into Business Analytics for Decision-Making** (the free interactive workshop at `/learn/free/business-analytics-decision-making`).

- **Do not** market BPA as its own course on `/learn` or in launch materials.  
- **Courseware** (`businessProcessAutomationCourse.ts`, slide assets, `verify:business-process-automation`) may remain for archival and continuity checks.  
- **URLs** `/learn/business-process-automation-for-work` and `/learn/courses/business-process-automation-for-work` **redirect** to the Business Analytics free workshop (`src/App.tsx`).

---

## 1. Course ladder table (public + paid workflows)

| Rung | Course | Canonical route | Format | Access | Role in one line |
|------|--------|-----------------|--------|--------|------------------|
| **1 — Workflows (free)** | Smart Workflows with AI | `/learn/free/smart-workflows-with-ai` | Embedded workshop | Free | Short workshop: map repeat work, use AI with review, draft a small workflow plan. |
| **2 — Analytics & decisions (free)** | Business Analytics for Decision-Making | `/learn/free/business-analytics-decision-making` | Embedded course | Free | Short workshop: metrics, charts, and clear recommendations—**the** public entry for this lane (includes former BPA audience). |
| **3 — Paid guided + certificate** | AI Productivity and Smart Workflows | `/learn/courses/ai-productivity-smart-workflows` | Hosted interactive + native capstone + review | Paid / Learning Hub | Deeper guided path with formal completion and certificate rules. |
| **4 — Native deep mastery (not on public flagship grid)** | AI-Powered Workflows and Productivity | `/learn/courses/ai-powered-workflows-and-productivity` | Native flagship | Paid / subscription | Deepest in-app workflows mastery—distinct from the free workshop and from the paid hosted SKU. |

**ChatGPT “AI at Work”** remains a separate free microlearning product in **AI & Productivity**; it is not part of the workflows-vs-analytics split above but follows the same **premium free page** standard (no internal “ladder” copy on the page).

---

## 2. Learner-facing copy standard (free starters)

Public free starter pages should **not** expose internal product architecture (ladders, “native vs hosted,” “not a flagship,” Learning Hub positioning, etc.). Keep that language in **this doc and internal QA only**. On the page: one **Free** badge, title, short promise, metadata, CTA, optional one-line note, outcomes, lesson flow, player.

---

## 3. Redirects (summary)

| From | To |
|------|-----|
| `/learn/business-analytics-decision-making` | `/learn/free/business-analytics-decision-making` |
| `/learn/business-analytics-native-modules` | `/learn/free/business-analytics-decision-making` |
| `/learn/business-process-automation-for-work` (+ subpaths) | `/learn/free/business-analytics-decision-making` |
| `/learn/courses/business-process-automation-for-work` | `/learn/free/business-analytics-decision-making` |

---

## 4. Maintenance

When routes or consolidation policy change: update this file, run `npm run audit:active-courses`, and keep [ACTIVE_COURSE_INVENTORY.md](./ACTIVE_COURSE_INVENTORY.md) in sync.
