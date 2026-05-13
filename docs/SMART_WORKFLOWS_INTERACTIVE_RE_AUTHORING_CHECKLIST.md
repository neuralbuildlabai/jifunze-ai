# Smart Workflows with AI — interactive re-authoring checklist

## Purpose and status

This doc records the **safe boundary** between work that is **done in the Jifunze repo** (shell page, wiring, static verification, and light touches at the **`content/`** boundary of the embedded package) and work that must happen **in the interactive course source** (Rise or equivalent) **before the next export**.

| Layer | What “done” means here | What still needs the authoring tool |
|--------|-------------------------|-------------------------------------|
| **Jifunze shell** | Microlearning page copy, layout, CTAs, iframe `src`, and regressions (e.g. single **Free** badge) verified in app code and e2e. | Align shell “Workshop flow” titles with lesson titles if you rename lessons in source. |
| **Embedded package boundary** | After a **verified copy** of the export into `public/course-assets/interactive/smart-workflows-with-ai/`, optional `content/index.html` / thin `jifunze-host-overrides.css`, and **no routine edits** to `content/lib/**`. | Anything that changes **block layout**, **stock vs custom imagery**, **lesson structure**, or **deep learner narrative**. |
| **Course JSON / runtime payload** | Staging-safe cleanup that has already been applied and validated (learner-visible strings, metadata). **Do not expand** ad hoc string surgery on `runtime-data.js`; treat any patch script as **migration-only**. | Re-author so the **next export** is correct at source and does not depend on post-export patches. |

**Staging-safe (current posture):** the shipped interactive package is **acceptable for staging** once the export has been **copied to the repo path above**, **shell cleanup** is in place, and **`npm run verify:smart-workflows-interactive-package`** (plus the microlearning page verify / Playwright flow you use for release) **passes**. That combination confirms wiring, key learner-visible copy boundaries, and no broken top-level references—not that every slide is visually premium.

**Genuinely premium (target):** **full** quality requires **re-exporting** from the **interactive course source** so you can improve **layout and slide balance**, **custom or on-brand visuals**, **local / controlled assets** (fewer vendor CDN dependencies), and **deeper learner experience** (examples, journey, assessments)—things that **cannot** be completed safely by editing minified player bundles in `content/lib/**`.

**Principle going forward:** fix copy, layout, assets, and labels **in the authoring tool** before export. Do **not** rely on ongoing edits to minified `content/lib/**` or fragile string surgery in `runtime-data.js` except for **one-time migration** or explicitly documented exceptions.

The interactive course is served inside Jifunze at:

`/course-assets/interactive/smart-workflows-with-ai/content/index.html`

---

## 1. Authoring cleanup checklist (source course)

Use this in **Rise** (or your equivalent) on the **Smart Workflows with AI** course project.

### 1. First-screen visual quality

- [ ] **Cover / lesson 1 opener** uses a deliberate visual (custom or on-brand imagery), not a default “classic” stock hero that reads as generic LMS.
- [ ] **Title hierarchy** is clear: course title, optional short subtitle, no duplicate long intro that repeats the Jifunze shell page.
- [ ] **Contrast and legibility** checked on laptop and mobile widths; no tiny disclaimer text as the dominant first read.
- [ ] **Spacing** feels intentional: padding consistent with later lessons, not a sparse title floating in empty space.

### 2. Slide / page balance

- [ ] **Two-column blocks** use both columns with real content, or switch to a **single full-width** layout where appropriate.
- [ ] **No persistent empty right rail** on key teaching screens; if the template leaves a blank half, **change block type** or **fill** with diagram, checklist, or example—not whitespace.
- [ ] **Stacking order** on narrow viewports: verify reading order still makes sense (no “caption below empty image” artifacts).

### 3. Removal of generic stock-looking layouts

- [ ] Replace **repeated default stock photos** (mountains, generic office, etc.) with **workflow-relevant** visuals or simple branded diagrams.
- [ ] Avoid **same thumbnail image** across many lessons unless it is intentional wayfinding.
- [ ] **Theme** (colors, fonts) aligned with Jifunze.ai marketing site where the tool allows—avoid “default Rise classic” if it reads as unrelated product chrome.

### 4. Stronger Jifunze.ai branding without clutter

- [ ] **One primary brand moment** on the cover or first lesson (logo or wordmark), not repeated on every screen.
- [ ] **Footer / completion** copy uses **Jifunze.ai** where learners expect “who built this,” not the authoring vendor.
- [ ] **AI Tutor / assistant** legal and link labels use **Jifunze.ai** (or neutral “Help”) per your legal review—no third-party product names in learner-visible strings.
- [ ] **Export / packaging labels** (e.g. publish target display names): set to neutral or **Jifunze.ai workshop** wording in the tool if the UI exposes it; avoid **SCORM** strings in anything learners can see.

### 5. Clearer learner journey (lesson 1 → final check)

- [ ] **Outline / menu titles** match the **shell “Workshop flow”** list on `/learn/free/smart-workflows-with-ai` (or update shell copy in repo if you intentionally rename lessons—keep **one source of truth**).
- [ ] Each lesson ends with a **clear “what’s next”** (one sentence), not only a Next button.
- [ ] **Final lesson** includes an explicit **recap + application prompt** (e.g. “Pick one workflow this week”) aligned with **smart workflows** outcomes.
- [ ] **Knowledge check** questions reference concrete situations (handoffs, approvals, data, rework), not vague AI hype.

### 6. More useful examples (smart workflow learning)

- [ ] Examples are **process-shaped**: trigger → steps → decision → handoff → measurement—not generic “ask ChatGPT.”
- [ ] At least **one end-to-end mini scenario** (e.g. intake triage, weekly report, customer reply draft with review step).
- [ ] **Risks called out** where appropriate (PII, hallucination, human review), tied to **workflow controls**, not abstract ethics only.

### 7. Better visuals, diagrams, and workflow maps

- [ ] Add **1–3 simple workflow maps** (boxes/arrows or swimlane-style) for core ideas; export as **SVG or high-res PNG** for crisp scaling.
- [ ] Use **consistent iconography** (single set) for steps, decisions, and systems.
- [ ] **Alt text** on meaningful images and diagrams for accessibility.
- [ ] Avoid **busy collages**; prefer one diagram + short bullets.

### 8. No external builder/vendor labels visible to learners

- [ ] Search the **preview publish** for: **Rise**, **Articulate**, **Storyline**, **SCORM**, **360**, vendor URLs in **visible text** (not only in browser network tab).
- [ ] **Accessibility labels** and **button labels** in lesson settings: no vendor product names (use “Lesson content,” “Interactive lesson,” etc.).
- [ ] **Author attribution** on cover: use **Jifunze** author profile or neutral “Jifunze.ai” if that reads better than a personal tool default.
- [ ] **AI Tutor** panel: terms and “open in new tab” strings reviewed for vendor naming.

### 9. Local or controlled asset strategy

- [ ] **Course images**: prefer **uploaded** files in the project over hot-linked stock CDN defaults where Rise allows, so the export is **self-contained** under `content/assets/` as much as possible.
- [ ] **Character / stock bundles**: if the tool pulls remote thumbnails, decide whether to **replace with uploaded stills** to reduce dependency on vendor CDNs.
- [ ] **Theme cover / backgrounds**: use **uploaded** art or subtle solid/gradient backgrounds stored in the package.
- [ ] **Font licensing**: only fonts allowed for web embedding in your export settings.

### 10. Export steps and post-export patch steps

**Export (authoring tool)**

- [ ] Export format: **web / hosted HTML** package suitable for static hosting (same structure Jifunze already expects: `content/index.html` + `content/lib/**` + assets).
- [ ] **Unminified or “full”** export if your workflow supports it for easier diffing (optional); production can still be the standard build.

**Deploy into repo**

- [ ] Replace contents under  
  `public/course-assets/interactive/smart-workflows-with-ai/`  
  so the **iframe URL is unchanged**:  
  `…/course-assets/interactive/smart-workflows-with-ai/content/index.html`

**Post-export (repository — no lib hacking)**

- [ ] Optionally keep a **thin** `content/jifunze-host-overrides.css` for host typography only (no hiding UI with `display:none` hacks).
- [ ] **Do not** edit `content/lib/**` minified files for copy or branding.

**Patch script (exception / migration only)**

- [ ] `npm run patch:smart-workflows-interactive-runtime` — **only** if a fresh export still emits legacy learner-visible strings you cannot remove in-tool yet. Goal: **eliminate the need** for this script via authoring fixes. Do not expand patching as a routine workflow.

---

## 2. Re-export instructions

1. **Duplicate** the current Rise project (or branch in your CMS) before large changes so you can compare exports.
2. Work through **Section 1** above in **preview** mode; do a **stakeholder pass** on lesson 1, middle lesson, and final check.
3. **Search** preview for forbidden learner strings (Rise, Articulate, Storyline, SCORM, articulate.com in **visible** text only).
4. **Export** the web package to a clean folder on disk.
5. **Copy** the export into  
   `public/course-assets/interactive/smart-workflows-with-ai/`  
   preserving the `content/index.html` entry path.
6. Run **Section 3** commands below; fix issues **in source** and re-export rather than patching `lib/`.

---

## 3. Post-export commands (repository)

From the repo root:

```bash
npm run verify:smart-workflows-interactive-package
npm run verify:smart-workflows-microlearning-page
npx playwright test e2e/smart-workflows-microlearning-page.spec.ts
```

Full CI-style sanity (recommended before merge):

```bash
npm run lint
npx tsc -b --force
npm run build
npm run verify:smart-workflows-microlearning-page
npx playwright test e2e/smart-workflows-microlearning-page.spec.ts
```

**Note:** `verify:smart-workflows-microlearning-page` runs the embedded package verifier first, then shell page static checks.

If you still use the **one-time string patch** on `runtime-data.js`:

```bash
npm run patch:smart-workflows-interactive-runtime
npm run verify:smart-workflows-interactive-package
```

After patching, **re-run authoring** to remove the need for that patch on the next export.

---

## 4. Final QA checklist (re-export acceptance)

### Path and shell

- [ ] **Iframe launch path unchanged:**  
  `/course-assets/interactive/smart-workflows-with-ai/content/index.html`
- [ ] On `/learn/free/smart-workflows-with-ai`, the **Jifunze shell** still shows **“Free” only once** (regression check against hero badge + body copy).

### Learner-visible branding and labels

- [ ] **No visible** Rise, Articulate, Storyline, SCORM, or external course-builder **labels** in the embedded player UI (menus, footers, tutor, accessibility strings).
- [ ] **Accept:** vendor strings may still exist **inside minified `lib/`** or in **JSON keys** that are not rendered; **reject:** any of those words appearing in **on-screen text**, link text, or tooltips.

### Technical integrity

- [ ] **No broken** image, script, or stylesheet references (browser devtools **Network** tab on cold load; fix in export or asset paths).
- [ ] **No awkward word breaks** on common breakpoints (spot-check longest headings and table cells).

### Layout and copy quality

- [ ] **No left-heavy slides** with a large unused blank right side on primary teaching screens (spot-check ≥25% of blocks).
- [ ] **No shallow filler** (“AI is important,” “in today’s world”) without a workflow action for the learner.

### Automated verification

- [ ] All commands in **Section 3** pass.

### Manual smoke (5 minutes)

- [ ] Open shell page → iframe loads → **first screen** feels premium and aligned with shell promise.
- [ ] Navigate **start → middle → end** without console errors.
- [ ] **Final check** feels like closure of the journey, not an afterthought.

---

## 5. Known limitations (do not fix by editing minified `lib/` files)

| Limitation | Why not to patch `lib/` |
|------------|-------------------------|
| **Webpack chunk names** and internal module strings (`articulate`, `mondrian`, etc.) | Cosmetic in bundle only; editing breaks hashes, imports, or runtime. |
| **Player chrome layout** (menus, progress, spacing) | Behavior tied to minified React/Svelte bundles; high risk of subtle breakage. |
| **CDN URLs inside course JSON** for stock thumbnails/characters | Replacing by hand in JSON is error-prone; **re-author with uploaded assets** or accept CDN until re-export. |
| **Lesson block geometry** (columns, card grids) | Controlled by authoring blocks and theme, not by safe CSS overrides on `#app`. |
| **“Rise math” / custom elements** and third-party widgets | Part of compiled player; do not fork. |
| **AI Tutor remote entries** | If the export wires remote containers, changing `lib/player/*.js` can break loading; fix in **publish settings** or authoring support, not grep-replace. |

**Preferred lever:** change **source blocks, theme, images, and publish metadata**, then export again. Use **thin host CSS** and **static verify scripts** only at the `content/` boundary—not inside `lib/`.

---

## Output summary (quick reference)

0. **Purpose and status** — safe boundary (shell vs package vs source); staging-safe vs premium; principle (top of this doc).
1. **Authoring cleanup checklist** — Section 1 (items 1–10).
2. **Re-export instructions** — Section 2.
3. **Post-export commands** — Section 3.
4. **Final QA checklist** — Section 4.
5. **Known limitations** — Section 5.
