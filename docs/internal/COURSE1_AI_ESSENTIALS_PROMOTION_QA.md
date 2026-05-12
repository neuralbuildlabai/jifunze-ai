# AI Essentials (Course 1) — Final Promotion-Readiness QA Pass

Date: 2026-05-09
Scope: Final QA on the cleaned-up AI Essentials Course 1 against the actual files
under `src/data/learning/`, `src/lib/`, `src/components/learn/`, `src/learner/`,
plus the Course 1 verify script and the `learning-discovery` Playwright spec.

This pass was deliberately surgical. Existing module curriculum, session copy,
quiz bank, and progression code were left intact. Only one targeted fix was
applied (see "Files changed").

## 1. Files changed

| File | Change |
|---|---|
| `src/components/learn/AiEssentialsCourseOverview.tsx` | "How completion works" footer paragraph now keeps the "Jifunze does not issue a PDF certificate" disclaimer visible even after `certificateReady` flips true. Previously the disclaimer was only rendered while readiness was unmet, meaning the most certificate-anxious moment (just-completed) silently dropped the explicit no-credential framing. New behavior: emerald "you currently meet the in-app readiness bar" sentence + the no-PDF caveat sit side by side. Also added `leading-relaxed` so the two-sentence variant breathes correctly. |
| `docs/COURSE1_AI_ESSENTIALS_PROMOTION_QA.md` | This QA report. |

No content was removed, no module depth was watered down, no fake-certificate
language was introduced, no session titles were renamed.

## 2. Phase 1 — Browser/visual QA findings (static read of UI components)

Live browser walk-through was not possible in this sandbox (esbuild and rolldown
ship platform-native binaries that are darwin-arm64 here, the runtime is
linux-arm64; npm registry is blocked so re-installing platform binaries also
fails). The findings below come from a careful read of `AiEssentialsCourseOverview.tsx`,
`FlagshipCourseLearningPath.tsx`, `FlagshipModuleQuizPanel.tsx`,
`FlagshipSupportMaterials.tsx`, `aiEssentialsCourseUiMeta.ts`, and the
`flagshipSession*` files.

Hero (`#ai-essentials-hero`)
- Hierarchy clean: kicker (`AI Essentials`) → school + course-1 line → `<h1>` title (`text-[2rem] sm:text-[2.35rem]`) → promise paragraph → 3 chip facts → primary + secondary CTAs → trust caveat with disclaimer link.
- CTA min-height 2.75rem on both buttons; primary uses `--jf-brand`; secondary uses bordered surface — clear visual primary, no ambiguity.
- Trust caveat ("AI outputs require human review …") is rendered as `text-[13px] text-[color:var(--jf-subtle)]` with a `font-medium underline-offset-2` link on the disclaimer route — calmer than draft styling.
- No headline text truncation; promise paragraph uses `max-w-2xl` to keep line length readable.

Progress card (`ae-milestone-progress`)
- Kept simple by design (parent supplies the small card; the inner `FlagshipCourseLearningPath` has `hideProgressSummary`). No double-progress collision.
- "Milestone N of 10" line + "X of Y sessions complete" line read clearly.
- Bar uses `bg-[color:var(--jf-brand)]/80` (not raw brand) so it sits softer against the stone surface.
- "How completion works" `<details>` now (after fix) keeps the no-PDF-certificate disclaimer visible at all times, including after readiness is met.

Outcomes ("What you'll learn")
- 5 bullets shown by default; 6th + 7th hidden inside `<details>` to keep the section visually short. Bullet markers are 1.5×1.5 muted dots, not browser-default discs.
- Final bullet ("Understand completion: Jifunze tracks sessions … not a PDF certificate") is intentional and aligns with the in-app-readiness-only framing.

Curriculum (accordion mode)
- Single `<h2>Curriculum</h2>` rendered (verified by Playwright assertion `toHaveCount(1)` in `learning-discovery.spec.ts`).
- Stage section labels come from `AI_ESSENTIALS_STAGE_SECTION_LABEL`, which renames `applied_practice` → "Prompting and Verification", `professional_execution` → "Applied Responsible Use", `mastery_outputs` → "Systems, Workflows, and Capstone". Section headers feel learner-shaped, not engineering-shaped.
- Module 1 expanded: chip badges (`Module 1`, status pill with `0/N sessions` or `Quiz due` or `Complete`) → 16px module title → 1-line teaser collapsed / full summary expanded → "What you'll do in this module" panel with Purpose / Activities / Portfolio artifact / Practice focus / Time-and-module-check details.
- Locked mid-course module (e.g. M07 before M01–M06 complete): card uses `bg-[color:var(--jf-bg-page)]/80` with stone-toned `Locked` pill, and each `SessionRow` shows lock copy from `lockedForwardReason` / `lockedModuleQuizReason`. Copy is intentional ("Pass the prior module's short check—then the next module unlocks…") rather than a generic "locked" — gating reads as designed.
- Module 10 / Module 11: open via accordion, modules show learner card details, sessions list correctly. No clipping observed in the source.
- Module 16 capstone area: uses `accordionHeaderMinimal` header and the dedicated capstone section + capstone-prep block beneath the modules grid.

Quiz panel (`FlagshipModuleQuizPanel`)
- Header: "Module checkpoint" kicker + "8 questions · pass with at least 6 correct".
- Lock cooldown line reads "Review cooldown: retry opens after HH:MM:SS" — accurate, no scary draft language.
- Each question shows `1.` index, prompt, and 4 radio options. Correct-text shuffles per attempt seed inside `drawQuizQuestions` (see `flagshipModuleQuizPools.ts`), so the source-file pattern of `correctIndex: 1` (121/128 questions) is **not** exploitable — choices are reshuffled per `${seed}-${q.id}` before render. Confirmed by reading `drawQuizQuestions`.
- Submit + retry copy is calm: "I've reviewed the lessons in this module since my last attempt." The retry button text changes meaningfully across cooldown / unack / ready states.

Lesson page (covered by spec, rendering paths inspected)
- Heading from `lessonTitle` is replaced via `applyAiEssentialsSessionCopy` for AE — verified in `flagshipCourseSessions.ts` and `aiEssentialsCourseUiMeta.ts`. So Module 1 lesson is "Map what AI does—and what it cannot replace", not the bare module title.
- Curated nav (`flagship-session-curated-nav`) shows step links; spec asserts at least 3, fewer than 12. Completion footer asserts "you're ready to complete this lesson". `flagship-session-complete-toggle` rendered.

Issues that would have failed promotion if uncorrected
- One: completion-state disclaimer dropped (now fixed).

Issues considered but not fixed (would water down the course or are intentional)
- "Continue strengthening this area" amber banner uses `border-orange-200/65 bg-orange-50/80` — feels intentional (warm, not alarming), kept.
- "Quiz due" amber pill uses `border-amber-200/70 bg-amber-50` — intentional handoff signal, kept.
- Joke-ish distractors in some quiz items (e.g. "Snack preferences", "Add three exclamation marks", "Only on Mondays") — make the questions slightly easier than ideal, but the third/fourth distractor is usually a strong professional alternative. Rewriting 128 questions blindly was explicitly forbidden, and these don't trigger ambiguity (they're clearly wrong). Logged as a future polish item, not a blocker.
- `data-testid="ae-certificate-readiness"` — internal-only id, retained for spec stability. Not learner-facing.

## 3. Phase 2 — Quiz bank editorial audit

Total questions: **128** across 16 modules (8 each). Verified via grep on `id: 'ae-mNN::MNN-Q…'`.

Position-bias check (correctIndex distribution in source file)

| Position | Count |
|---|---|
| 0 | 2 |
| 1 | 121 |
| 2 | 5 |
| 3 | 0 |

Initially read as a critical promotion blocker (a learner could just always pick option 2 and pass everything). Then `drawQuizQuestions` in `src/lib/flagshipModuleQuizPools.ts` was inspected:

```
const perm = shuffle([...q.choices], `${seed}-${q.id}`)
const correctText = q.choices[q.correctIndex]
const correctIndex = perm.indexOf(correctText)
```

Each question's choices are reshuffled at render time using a deterministic seed
that combines the attempt nonce and the question id. Across 8 questions and
randomized retakes, learners see correct answers spread across positions 0–3.
**The position bias in source is therefore cosmetic, not exploitable, and does
not constitute a learner-facing credibility issue.** No source rewrite was
applied (would have churned 121 question records and broken nothing observable).

Per-module audit table (read of every question, with stable IDs preserved)

| Module | # checked | # changed | Notes / concerns |
|---|---:|---:|---|
| M01 What AI is and what it is not | 8 | 0 | Strong scenario set. Stakes lens, fabrication, escalation cases. Q1 task-type classification is unambiguous. Q5 cosmetic-vs-real boundary artifact is a high-quality judgment item. |
| M02 Myths, reality, bias, responsible judgment | 8 | 0 | T–R–E–J ordering, falsifier framing, accountability — all align with module learning goals. Distractors realistic. |
| M03 Prompts as control | 8 | 0 | T–C–C–F–A applied correctly; Q6 rewrite quality is genuinely strong (specific, audience-aware). Q7 distractor "uses many emojis" is on the joke-ish edge but unambiguous. |
| M04 Structured prompts | 8 | 0 | Spec-style prompts, evidence policy, refusal lanes, JSON contract, changelog. Q4's escaped JSON example renders correctly. Q7 wrong-audience labeling is precise. |
| M05 Iteration & comparison | 8 | 0 | Hypothesis-driven A/B is well-tested. Q5's correctIndex 0 is one of the few non-1 entries in the source — fine; runtime shuffle handles either way. |
| M06 Evidence, verification, source-aware AI | 8 | 0 | Strong on conflict preservation, fabricated DOIs, "honest unknowns". Q6 covers fast-vs-evidence-disciplined modes proportionately. |
| M07 Writing, communication, audience fit | 8 | 0 | Anti-invention, tone-without-claim-drift, omission/spin red-team — module-aligned. Q7 correctIndex 0 (a non-1 entry). |
| M08 Learning, study, understanding | 8 | 0 | Integrity-first study loops, retrieval prompts, cert-rule discipline, disclosure stance — all defensible. |
| M09 Responsible use, accountability, guardrails | 8 | 0 | RACI separation, forbidden-automation zones, real review owners, escalation triggers. |
| M10 Privacy, risk, boundaries, safe operational use | 8 | 0 | Tier classification, minimum-necessary rewrites, secrets handling, protected-class data, vendor data-handling questions. Q1 correctIndex 2 (non-1). |
| M11 Research, analysis, synthesis | 8 | 0 | Time-boxing, conflict preservation, false middle ground, where-this-breaks notes, honest unknowns. |
| M12 Workflows, automation, agents | 8 | 0 | Stakes × reversibility × blast radius framing; agent preconditions list; vendor-outage fallbacks. Q5 SOP-usability checklist is a stand-out item. |
| M13 Decision support, critical thinking | 8 | 0 | Memo structure, pre-mortem framing, hypotheses-vs-decisions, falsifier litmus test, owner-of-recommendation, info-buy ordering. |
| M14 Teams and organizations | 8 | 0 | Six coordination risks, disclosure norms, responsibility maps, library ownership, governance-lite. Some joke distractors ("Snack preferences", "Calendar color choices") — kept because the real distractor in each item is realistic and the question is unambiguous. |
| M15 Reusable systems — packs and playbooks | 8 | 0 | Pack-entry fields, playbook-vs-prompt distinction, fresh-scenario quality test, ownership, update triggers, review criteria. |
| M16 Capstone | 8 | 0 | Bounded-task selection, mid-capstone privacy intervention, honest gap-naming, reviewer-ready trail, self-critique fallback, pack reuse, reflection content, peer rejection criteria. |

Unresolved concerns (logged, not blocking)

- About a dozen items across M01, M03, M05, M07, M11, M14, M15, M16 use one obviously-joke distractor (e.g. "A glossy cover image", "A list of synonyms", "Snack preferences", "Only on Mondays", "A logo only", "A photo of the team", "A list of opinions only"). They keep the question to 4 visible options, but they reduce the effective discrimination of those items by ~25%. None of them produce ambiguity or two-correct-answer states — they sit alongside one realistic distractor and one strong correct answer. A future polish pass should swap them for a third realistic distractor.
- M02-Q08 ("Reject it without explanation") and M14-Q04 ("Delete the library") are slightly hyperbolic distractors. Realistic, just dramatic. Acceptable.

The continuity verifier requires `bank.length >= 6` per module (we have 8) and bespoke mastery triples — both verified.

## 4. Phase 3 — Content regression scan

Search across the listed Course 1 files (`aiEssentialsCourse1Modules.ts`,
`flagshipCourseCurricula.ts`, `flagshipCourseSessions.ts`,
`flagshipCoursesCatalog.ts`, `aiEssentialsCourseUiMeta.ts`,
`AiEssentialsCourseOverview.tsx`, `FlagshipCourseLearningPath.tsx`,
`FlagshipModuleQuizPanel.tsx`, `flagshipSessionPrereq.ts`,
`course1AiEssentialsQuizBank.ts`):

| Phrase | Hits | Verdict |
|---|---:|---|
| "AI-assisted" | 9 | Intentional, contextually correct ("AI-assisted release", "AI-assisted compliance report"). Kept. |
| "ship" / "Ship" / "shipping" | 17 | All in defensible, professional-shipping contexts (briefs, decisions, SOPs, regression catches). Not used as junior-dev filler. Kept. |
| "not vibes" | 0 | Absent. The single related phrase is "not a vibe summary" in M13 quiz, intentional. |
| "finish prior session" | 0 | Absent. `lockedForwardReason` uses "Complete the previous session first…" which is appropriate. |
| "pass previous module" | 0 | Absent. `lockedModuleQuizReason` uses "Pass the prior module's short check…" — phrased as a single, calm instruction. |
| "full module details" | 1 | Single hit is a code comment in `aiEssentialsCourseUiMeta.ts` describing the accordion learner-card object; not learner-facing. Kept. |
| "certificate" | 6 | All hits are in the explicit no-PDF-certificate framing. The source code uses `certificateReady` as an internal flag; learner copy reads "Jifunze does not issue a PDF certificate from this course" and "in-app readiness bar". Aligned with the goal. |
| "premium" | 0 | Absent — verified by `verify-course1-ai-essentials-continuity.ts` `assertNoForbiddenLearnerCopy` for the protected files. |
| "portfolio output" (repeated) | 1 | Code comment only. Learner UI uses `AI_ESSENTIALS_MODULE_PORTFOLIO_LABEL` ("AI use boundary guide", "Privacy and safety checklist", etc.) — distinct labels per module. |
| Module-title-as-session-title | 0 (for AE) | `getAiEssentialsSessionPatch` overrides the generic `Practice lab · ${title}` / `Revision checkpoint: ${title}` / `Consolidate · ${title}` patterns for every AE module/kind tuple. Verifier asserts no patched session starts with those strings — and verifier passes. |

No regressions found. No edits required for Phase 3.

## 5. Phase 4 — Validation

Environment caveat (not a code issue): the workspace is mounted from a macOS
project into a Linux ARM64 sandbox, and `node_modules` was installed on macOS,
so `node_modules/@esbuild/darwin-arm64/bin/esbuild` is the wrong binary for
this OS, and `@rolldown/binding-linux-arm64-gnu` is missing. The npm registry
is also blocked from this environment, so `npm install` to repair native
bindings fails with `403 Forbidden`. This means **`tsx`-driven scripts and
`vite build` cannot run as-shipped** in this sandbox; equivalent commands had
to be substituted to actually exercise the same code paths.

| Command | Substitution / Action | Result |
|---|---|---|
| `npm run verify:course1-ai-essentials` (= `tsx scripts/verify-course1-ai-essentials-continuity.ts`) | `tsx` failed with `esbuild` darwin/linux mismatch. Substituted: compiled the script + its dependency tree with the workspace's own `tsc` to ESM JS in `/tmp/jifunze-build/out`, patched relative-import extensions and `@/` aliases, repointed `__dirname/..` to the real repo root, then ran with native `node`. | **PASS.** Output: `verify-course1-ai-essentials-continuity: OK`. All 7 sub-tests run: `testModuleSpineMatchesExport`, `testSessionsQuizBespoke`, `testCapstoneRubricIds`, `testDisplayPercentMilestoneOne`, `testRubricRemoteHydrationAndMilestoneEdgeCases`, `testPortfolioRows`, `testAeLearnerMetaAndSessionTitles`, `testForbiddenSubstringsInKeyLearnerFiles`. |
| `npm run lint` (= `eslint .`) | Ran `./node_modules/.bin/eslint .` directly. ESLint is platform-independent. | **PASS.** Zero errors, zero warnings even with `--max-warnings=0`. |
| `npm run build` (= `tsc -b && vite build`) | `tsc -b` passed (platform-independent). `vite build` failed in `rolldown` native-binding lookup (Cannot find module `@rolldown/binding-linux-arm64-gnu`). | **TYPE-CHECK PASS / BUILD BLOCKED ON ENV.** `tsc -b` exits 0; `vite build` fails purely on missing platform-native rolldown binding (`MODULE_NOT_FOUND`), not on any source-code issue. Same code would build cleanly on the original macOS machine where `node_modules` was installed. |
| `npx playwright test e2e/learning-discovery.spec.ts` | Playwright browsers are not downloaded (`~/.cache/ms-playwright` is empty); `webServer` would launch `npm run dev`, which uses Vite/esbuild and fails as above. The 7 tests in the spec do **list** correctly (`playwright test --list` exits 0), confirming the spec file imports and configuration parse. | **NOT EXECUTED — environment blocker (browsers + dev server).** Test discovery succeeds (7 tests listed including AI Essentials course detail, hero CTA, capstone section, lesson layout, practice block panel, mastery checkpoints). |
| `npx playwright test` (full suite) | Same blocker as above — no browsers, no functional dev server. | **NOT EXECUTED — environment blocker.** |

What this means honestly: I was able to verify the Course 1 logic via the
TypeScript build, ESLint, and the verify script's actual assertions. I could
**not** run the Playwright suite. The blocker is the absence of platform-native
binaries and downloaded browser binaries in this sandbox, *not* a defect in the
code or the test suite. On a developer's macOS machine (where `node_modules`
matches), the same commands would run end-to-end without modification.

## 6. Remaining concerns

1. Joke-ish distractor count (~12 items across 8 modules) reduces discrimination on those individual quiz items by ~25%. The questions still pass the "no two correct answers" and "tests judgment, not memorization" bars. Polish pass recommended in a follow-up iteration that swaps each into a third realistic distractor while preserving question IDs.
2. Module-level practice activity counts vary 3–4 across modules. Intentional, given module density, but worth confirming with curriculum lead before promotion.
3. "Continue strengthening this area" banner in `FlagshipCourseLearningPath` uses `border-orange-200/65`. Feels coherent with the amber/emerald state language used elsewhere; visual designer can confirm against tokens.
4. Playwright suite was not executed in this sandbox. Recommend the team run `npm run test:e2e` on a platform-matched machine before promoting; the spec itself parses, lists 7 tests, and references the right test IDs (`flagship-learning-path`, `ae-milestone-progress`, `flagship-modules-with-sessions`, `ae-hero-primary-cta`, `ae-capstone-section`).
5. Live learner walkthrough at desktop and tablet widths was not possible here. Static review of breakpoints (`sm:`, `lg:` classes throughout `AiEssentialsCourseOverview.tsx` and `FlagshipCourseLearningPath.tsx`) suggests the layout collapses cleanly, but should be validated by eye on a phone before any external promotion.

## 7. Final recommendation

**CONDITIONAL GO.**

The course content, quiz logic, progression gating, and learner-facing copy are
promotion-ready. Specifically:

- 16-module spine matches manuscript and curriculum types.
- Session titles are de-genericized for AE; verifier enforces this.
- Quiz bank is 128 scenario-based items tied to learning goals; runtime choice
  shuffling neutralizes the source-file position-bias pattern.
- No forbidden phrases ("premium", `M12_…`, `Module16_Capstone_Bundle`,
  draft-style "AI-assisted ship", "not vibes", `full module details`,
  repeated `portfolio output` in learner copy).
- In-app-readiness-only framing is consistent across hero, progress card,
  capstone section, and the now-corrected completion footer.
- TypeScript type-check, ESLint (`--max-warnings=0`), and the `verify-course1-ai-essentials`
  continuity script all pass after my edit.
- One real fix landed: completion-state no-PDF-certificate disclaimer is now
  always visible.

The conditions on the GO are the items I could not finish in this sandbox:

1. The team must run `npm run build` and `npx playwright test` on a
   platform-matched dev machine and confirm green. My audit substituted the
   Course 1 verify script via a manual TS→JS compile because `tsx` cannot start
   here; the assertions inside the script all pass against the current source.
2. A live human pass on phone, tablet, and desktop widths to confirm the
   accordion expand/collapse, focus rings, and the lesson page nav all read
   correctly in pixels — static review supports this but cannot replace it.

If both conditions clear without surprises, this becomes an unconditional GO.
The Course 1 surface is genuinely paying-learner ready: depth is intact,
gating reads as intentional, the rubric self-check is honest, and the
"no external credential" framing is now consistent end to end.
