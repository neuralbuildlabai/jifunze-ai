# AI Essentials — learner UAT checklist

Use this list when validating the learner shell against **production or staging** (with maintenance off for the routes under test, if applicable).

## Environment

- [ ] Signed-in test learner account available
- [ ] Supabase configured if testing remote progress merge (optional for local-only UAT)

## Core flows

- [ ] **Login** — email path works; session persists
- [ ] **Dashboard** (`/dashboard`) — continue card, progress summary, pathway card, portfolio card; **Sign out** visible
- [ ] **Catalog** (`/learn`) — **only AI Essentials** (or only allowlisted courses) visible; no school grid when a single course
- [ ] **AI Essentials course** (`/learn/courses/ai-essentials`) — hero, single **Curriculum** heading, progress card, capstone section, support materials
- [ ] **Module 1 lesson** — session loads; breadcrumb shows **AI Essentials · Module … · Lesson …**; step rail shows **Start / Learn / Example / Check / Complete** (no per-block list)
- [ ] **Module 1 practice** — task-first layout; Goal / Tasks / Artifact / Review / Complete in nav
- [ ] **Module 1 quiz** — shows **Module checkpoint**, **8 questions · pass with at least 6 correct**; submit and lock behavior acceptable
- [ ] **Progress** — after M1 gates, **~10%** milestone display matches expectations
- [ ] **Reports** (`/reports`) — row for AI Essentials; sessions / checkpoints / next link sensible
- [ ] **Pathways** (`/paths`) — optional browse; no “live + roadmap” style badges on browse cards
- [ ] **Settings / Account** (`/settings`) — email, password help if configured, sign out; **no** billing/plan blocks when monetization UI is disabled

## Negative checks

- [ ] **No Generate / Studio / Ideas / Lab** links in learner nav or primary pages
- [ ] **No** pricing, subscription, checkout, or “buy course” CTAs on learner pages
- [ ] **No** incomplete or non-allowlisted courses in `/learn` featured list

## Mobile

- [ ] Dashboard and session **mobile** step menu usable
- [ ] Course page readable without horizontal overflow

## Module 16 smoke (timeboxed)

- [ ] Capstone session opens when gates satisfied (or document gate state for UAT account)
- [ ] Rubric self-grade saves and reflects in progress (Supabase path)

## Sign-off

- [ ] Product owner confirms copy and IA match “serious learning platform” positioning
- [ ] Engineering confirms **Course 1 verification scripts** green on release candidate
