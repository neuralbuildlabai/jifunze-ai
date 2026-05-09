# Business Analytics for Decision-Making — Companion Source

**Course slug:** `business-analytics-decision-making`  
**Product tier:** Professional micro-course / workshop (not a flagship course)  
**Case study:** GlowCare Beauty & Retail  

This document mirrors the learner-facing structure in the Jifunze app and expands speaker-facing detail. The authoritative slide visuals live in `business_analytics_decision_making_serious_deck.pptx`.

---

## Positioning

This course teaches **business diagnosis and decision-making** using performance data—not decorative chart reading. Learners triangulate financial, customer, and operational metrics before recommending action.

---

## GlowCare — Business summary

| Field | Detail |
|-------|--------|
| Business | GlowCare Beauty & Retail |
| Type | Beauty retail + services |
| Revenue streams | Skincare products, hair products, nail services, facial services, delivery orders |
| Channels | Walk-in, online store, social media, referrals |
| Central problem | Strong January–June story overall, but **May** shows coordinated deterioration |

### May warning pattern (learning narrative)

Across the case narrative, May exhibits (among others):

- Revenue drop vs prior months  
- Cost increase  
- Profit and margin compression  
- Rising complaints  
- Declining repeat customer rate  
- Higher stockouts  
- Increased late deliveries  
- Worse complaint resolution time  

Learners must avoid single-cause conclusions and instead build a **ranked, evidence-weighted** explanation.

---

## Dataset tables (representative structure)

> Numbers below are **illustrative** for pedagogy. Treat them as teaching scaffolding, not a real company extract.

### Monthly P&amp;L summary (example schema)

| Month | Revenue | Cost of sales | Gross profit | Gross margin % |
|-------|---------:|---------------:|-------------:|---------------:|
| Jan | 118 | 62 | 56 | 47% |
| Feb | 122 | 63 | 59 | 48% |
| Mar | 128 | 65 | 63 | 49% |
| Apr | 132 | 67 | 65 | 49% |
| May | 121 | 72 | 49 | 41% |
| Jun | 135 | 70 | 65 | 48% |

### Operational KPIs (example schema)

| Month | Stockout rate | Late delivery % | Avg resolution hours (complaints) |
|-------|-------------:|----------------:|----------------------------------:|
| Apr | 2.1% | 4.8% | 18 |
| May | 4.6% | 9.1% | 31 |
| Jun | 3.9% | 7.4% | 26 |

### Customer health (example schema)

| Month | Repeat customer rate | Complaints per 1k orders |
|-------|--------------------:|-------------------------:|
| Apr | 38% | 6.2 |
| May | 31% | 11.4 |
| Jun | 33% | 9.0 |

Use these tables in class to practice **alignment**: when did operational pain accelerate relative to margin?

---

## Slide map (40 slides → 6 modules)

| Module | Slides | Focus |
|--------|--------:|-------|
| 1 | 1–7 | Foundations, vocabulary, GlowCare framing |
| 2 | 8–12 | Dataset reading, KPI dashboard literacy |
| 3 | 13–19 | Trends, May drop, variance, waterfall |
| 4 | 20–27 | Channel, mix, funnel, retention vs complaints |
| 5 | 28–33 | Diagnosis, root cause, chart integrity |
| 6 | 34–40 | Insight → recommendation, matrix, practice, quiz, roadmap |

---

## Learner practice — Analyze the May performance drop

**Artifact title:** GlowCare Business Analytics Recommendation  

**Task:** Write a short executive-style recommendation covering:

1. What happened (facts tied to metrics)  
2. Likely contributing drivers (hypotheses, explicitly labeled)  
3. What is **not** proven yet  
4. Recommended management actions (owners, sequencing, 30-day plan)  
5. Weekly monitoring metrics after changes  

**Required metric lenses:** revenue trend, cost trend, profit margin, complaints, repeat customer rate, stockouts, late deliveries, average order value (AOV).

---

## Mini quiz — 12 questions (application-focused)

**Passing:** 75% (9 or more correct of 12).  
**Principle:** Interpretation and decision discipline, not memorization.

The live interactive version ships in the app (`Module 6` quiz). Question stems and correct answers match `src/data/courses/businessAnalyticsDecisionMakingModules.ts` (`QUIZ_MODULE6`).

### Quick reference (do not ship answer key to learners as a shortcut)

| # | Topic |
|---|--------|
| 1 | Profitability triangulation before action |
| 2 | Headline KPI green vs operational deterioration |
| 3 | Revenue + margin joint movement |
| 4 | Complaints + retention joint interpretation |
| 5 | Channel-specific funnel follow-up |
| 6 | AOV vs volume diagnostic |
| 7 | Visualization ethics (scale) |
| 8 | Operational hypotheses vs proof |
| 9 | Multi-cause executive narrative |
| 10 | Decision matrix purpose |
| 11 | Insight vs recommendation definitions |
| 12 | Attribution humility and testing |

Each item includes a post-submit explanation in the app.

---

## Facilitator notes

- Keep learners in **hypothesis language** until evidence supports stronger claims.  
- Push for **paired metrics** (example: margin + mix; conversion + traffic quality).  
- Use the deck visuals as the shared “evidence board” during live workshops.  

---

## License / use

Instructional material for Jifunze.ai. Do not represent the GlowCare scenario as factual data about any real business.
