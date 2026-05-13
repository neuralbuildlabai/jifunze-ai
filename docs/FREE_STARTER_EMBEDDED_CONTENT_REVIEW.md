# Free starter embedded courses — content review & runtime hygiene

**Scope:** Embedded player only: `public/course-assets/interactive/*/content/` (after the learner opens the iframe). React shells under `/learn/free/…` are out of scope except where they load these assets.

**Hard boundary:** Do **not** edit minified `content/lib/**`. Runtime fixes use **scripted** `runtime-data.js` decode → targeted edits → `JSON.parse` validation → re-encode (see `scripts/patch-free-starter-interactive-runtime-data.mjs` and `scripts/lib/free-starter-interactive-runtime-patch.mjs`). No bulk vendor replace, no blind CDN rewrites.

**Stable iframe URLs** (must not change without updating shells and e2e):

- `/course-assets/interactive/smart-workflows-with-ai/content/index.html`
- `/course-assets/interactive/ai-at-work-chatgpt/content/index.html`
- `/course-assets/interactive/business-analytics-decision-making/content/index.html`

---

## Verification & patches (CI)

| Script | Role |
|--------|------|
| `scripts/patch-free-starter-interactive-runtime-data.mjs` | Idempotent post-export patches (labels, copy, titles). |
| `scripts/verify-free-starter-interactive-packages.mjs` | Unified verifier for all three packages. |
| `scripts/verify-smart-workflows-interactive-package.mjs` | Thin wrapper (same checks as unified, Smart slug only). |
| `scripts/verify-ai-at-work-interactive-package.mjs` | Thin wrapper, AI slug only. |
| `scripts/verify-business-analytics-interactive-package.mjs` | Thin wrapper, BA slug only. |
| `npm run verify:embedded-course-packages` | Resolves `index.html` assets + runs unified free-starter verifier. |

Checks include: JSONP decodes; JSON parses; forbidden learner-facing substrings absent from decoded text; required Jifunze-safe label strings present; Smart lesson titles have **no** trailing whitespace or embedded newlines; AI welcome copy matches patched fingerprints; BA short title + lesson 6 title + lesson 1 template removed; `jifunze-host-overrides.css` linked and present on disk for all three; relative `href`/`src` resolve.

### Known limitation (full de-vendorization)

Verifiers intentionally **do not** require zero `articulate.com` (or other CDN) URLs inside the runtime blob. Thumbnails and bundled references may still point at vendor CDNs; fixing that needs **re-hosting assets in the authoring tool** or a dedicated asset pipeline — not a safe blind string replace. Only **learner-visible copy strings** (labels, welcome HTML, etc.) are enforced.

Full **layout quality**, slide density, and decorative imagery still need **re-export / source authoring** where Rise blocks are wrong.

---

## Decorative imagery (documentation only)

This pass does **not** change image URLs or CDN references.

| Package | Notes |
|---------|--------|
| **Smart Workflows** | Mix of strong `M*_*` instructional assets and decorative files (`mountains.jpg`, `beach_dusk.jpg`, `hotel.jpg`, `sparkler.jpg`, `night.jpg`, `stock-image.jpg`). Consider fewer generic heroes in source. |
| **AI at Work** | `stock-image.jpg`, `ai-generated-image*.jpg`, plus `L*_*` lesson art. |
| **Business Analytics** | Slide-style filenames (`L*_slideNN_*`), `stock-image.jpg`, `mountains.jpg`. |

---

## 1. Smart Workflows with AI

**Verdict:** **Acceptable for promotion** after runtime hygiene (lesson title normalization, Jifunze labels, host overrides).

- **Copy:** Strong, localized opening (e.g. city examples), broad 12-module arc.
- **Runtime hygiene:** All lesson titles normalized — **no trailing newlines or trailing whitespace**; verifier prevents drift.
- **`index.html`:** Jifunze-focused meta + `jifunze-host-overrides.css`.

**Re-export optional:** Replace weak decorative heroes; deeper tone polish only if product asks.

---

## 2. AI at Work: Use ChatGPT Safely, Clearly, and Productively

**Verdict:** **Runtime patch applied** before promotion (Jifunze-safe labels, Storyline a11y label neutralized, welcome copy de-clichéd).

- **Welcome copy (patched):** Practical focus on prompts, reviewing output, and sensitive information — beginner-friendly, low hype.
- **`index.html`:** Aligned with Smart Workflows pattern; host overrides for typography only.

**Re-export optional:** Further lesson-level tone and imagery if marketing wants a more premium feel.

---

## 3. Business Analytics for Decision-Making

**Verdict:** **Runtime patch required** (done in repo): Jifunze labels, shortened **visible** course title in runtime, lesson 6 renamed to **Final Practice: GlowCare Decision Review**, lesson 1 template objectives replaced. **GlowCare case study retained.**

**Deeper source re-authoring still recommended:** Slide-heavy flow, chart polish, TOC phrasing outside runtime, and long-form instructional design are best fixed in Rise, not only in `runtime-data.js`.

- **`index.html`:** Short `<title>`, Jifunze meta, host overrides.

---

## Summary table

| Course | Promotion (embedded) | Stronger re-export later? |
|--------|----------------------|---------------------------|
| Smart Workflows | OK | Optional visuals |
| AI at Work | OK after patches | Optional copy / imagery |
| Business Analytics | OK after patches | Yes — charts, pacing, slides |

---

## Appendix — patch highlights (non-exhaustive)

- **Labels:** `targetName`, AI tutor accessibility strings, `a11yBlockStoryline` value `Storyline` → `Lesson content`.
- **Smart:** `course.lessons[*].title` trimmed.
- **AI:** Welcome lesson first paragraphs rewritten in parsed JSON.
- **BA:** `course.title` + `exportSettings.title` shortened; lesson 6 title; lesson 1 template paragraph replaced.
