# Session Plan — Prompt Engineering Fundamentals

Six video sessions covering the full 30-minute course. Each session is recorded and exported as a standalone MP4 so learners can pause, rewatch, and reference individual sections — and can also be concatenated into a `full-course-combined.mp4` for one-shot viewing.

Word counts assume **140 spoken words per minute** (a comfortable instructional pace — fast enough to feel energetic, slow enough for non-native speakers to follow).

---

## Session-level summary

| # | Session title | Duration | Slides | Word target | Demo? | Learner action |
|---|---|---|---|---|---|---|
| 1 | What Prompt Engineering Is and Why It Matters | 4:30 | 1–3 | ~630 | No | Watch and reflect |
| 2 | The Five Core Prompt Principles | 6:30 | 4–8 | ~910 | Optional bad-vs-good demo | Open Workbook Task 1 |
| 3 | Practical Prompting Techniques | 7:30 | 9–13 | ~1,050 | Yes — few-shot live demo | Try Workbook Task 2 |
| 4 | Compare, Refine, and Improve Outputs | 5:30 | 14–18 | ~770 | Yes — iteration demo | Try Workbook Task 4 |
| 5 | Common Mistakes and Safer Prompting Habits | 4:30 | 19–20 | ~630 | No | Self-check pitfalls list |
| 6 | Quiz, Workbook, and Prompt Library Completion | 3:30 | 21–22 | ~490 | No | Take quiz, finish workbook |
| **Total** | | **~32:00** | **22** | **~4,480** | | |

The 32-minute total leaves 2 minutes of natural buffer for opening title cards, transitions, and end cards. Trimming during edit lands the final cut at ~30:00.

---

## Inter-session title cards (handled in editor, not in deck)

The 22-slide deck flows continuously. To make the 6-session split feel intentional in playback, **add a 5-second full-screen title card before each session's content** during editing. These do not require new slides — create them in the video editor (DaVinci Resolve, Descript, Premiere, Final Cut). They appear once at the start of each session video, and once between sessions in the combined cut.

| Title card | Subtitle (smaller text) | Background |
|---|---|---|
| Session 1 — What Prompt Engineering Is | And why it matters | Same gradient as deck |
| Session 2 — The Five Core Principles | Clarity · Context · Structure · Constraints · Examples | Same gradient |
| Session 3 — Practical Prompting Techniques | Eight tools you'll use every week | Same gradient |
| Session 4 — Compare, Refine, and Improve | Advanced patterns for better outputs | Same gradient |
| Session 5 — Common Mistakes and Safer Habits | What to avoid, and how | Same gradient |
| Session 6 — Quiz, Workbook, and Completion | Wrap up and apply | Same gradient |

Use the same purple→indigo gradient (#667eea → #764ba2) and white text as the slide deck so the cards feel native.

---

## Session 1 — What Prompt Engineering Is and Why It Matters

- **Target duration:** 4:30
- **Slides:** 1, 2, 3
- **Word target:** ~630
- **Learning goal:** Learners can articulate what prompt engineering is, name three concrete benefits of doing it well, and identify the difference between a vague prompt and a strong one.
- **Voiceover summary:** Open with the "same model, different prompt" hook. Define prompt engineering plainly. Show the dogs example (slide 3). Set expectations for the next 25 minutes — five principles, eight techniques, the most common mistakes, and an optional code track.
- **Demo flag:** **No live demo.** This is framing.
- **Learner action:** Just watch. Mental note: think of one weak AI response you've had recently.

---

## Session 2 — The Five Core Prompt Principles

- **Target duration:** 6:30
- **Slides:** 4, 5, 6, 7, 8
- **Word target:** ~910
- **Learning goal:** Learners can name and apply Clarity, Context, Structure, Constraints, and Examples — and can rewrite a vague prompt using each.
- **Voiceover summary:** Walk through each principle with a tight bad/good example. Don't deep-dive — the techniques in Session 3 will reinforce these. Slide 8 covers both Constraints and Examples; the voiceover transitions cleanly between them.
- **Demo flag:** **Optional bad-vs-good demo** at the end of the section. Producer can run "Help me with my email" vs the structured version live in any chat tool. Skip if recording solo.
- **Learner action:** Open `learner-workbook.md` Task 1 after this session.

---

## Session 3 — Practical Prompting Techniques

- **Target duration:** 7:30
- **Slides:** 9, 10, 11, 12, 13
- **Word target:** ~1,050
- **Learning goal:** Learners can choose between zero-shot, few-shot, chain-of-thought, role, iterative, template, and negative prompting based on the task. (Comparative is covered in Session 4.)
- **Voiceover summary:** Slide 9 is the overview — list all 8 techniques in 30 seconds, signal that #8 (comparative) is in the next session. Then deep-dive 1–7. Few-shot is the highest-payoff technique to demo live.
- **Demo flag:** **Yes — live few-shot demo** (slide 10) on the sentiment-scoring example. ~30-second demo.
- **Learner action:** Try Workbook Task 2 (few-shot triage) after this session.

---

## Session 4 — Compare, Refine, and Improve Outputs

- **Target duration:** 5:30
- **Slides:** 14, 15, 16, 17, 18
- **Word target:** ~770
- **Learning goal:** Learners can use comparative prompting to surface alternatives, system prompts to set persistent behavior, temperature to control creativity, prompt chaining to break down complex tasks, and meta-prompting to improve their own prompts.
- **Voiceover summary:** Comparative prompting (slide 14) bridges back to Session 3 and forward into the advanced patterns. Then system-vs-user (15), temperature (16), chaining (17), and meta-prompting (18). Keep each tight — these are concepts learners will revisit, not memorize the first pass.
- **Demo flag:** **Yes — live iteration demo** on slide 16 or 18. Producer chooses based on what their tool supports.
- **Learner action:** Try Workbook Task 4 (iterative refinement on product names) after this session.

---

## Session 5 — Common Mistakes and Safer Prompting Habits

- **Target duration:** 4:30
- **Slides:** 19, 20
- **Word target:** ~630
- **Learning goal:** Learners can recognise the five common pitfalls and three safety habits — and can apply a four-step test-and-iterate loop to their own prompts.
- **Voiceover summary:** Slide 19 covers the five pitfalls (vague, assumed context, ignored format, no iteration, overcomplication). Slide 20 covers best practices. The voiceover **adds three safer prompting habits** that aren't on the slides: don't paste sensitive data into prompts, always verify factual claims (especially names, dates, and statistics), and remember the model can hallucinate confidently. These three points are spoken, not drawn from a new slide.
- **Demo flag:** **No demo.** This section is reflective.
- **Learner action:** Self-check against the pitfalls list in the workbook.

---

## Session 6 — Quiz, Workbook, and Prompt Library Completion

- **Target duration:** 3:30
- **Slides:** 21, 22
- **Word target:** ~490
- **Learning goal:** Learners know what to do next — take the quiz, complete the workbook, save their prompt library — and what's coming in the AI Agents course.
- **Voiceover summary:** Slide 21 recaps the four pillars (principles, techniques, advanced patterns, practice). Slide 22 is the wrap. The voiceover explicitly names `quiz.md` and `learner-workbook.md` as the completion artifacts and tells learners how scoring works (9/12 to pass the quiz, 4 rubric-passed tasks in the workbook).
- **Demo flag:** **No demo.**
- **Learner action:** Take the quiz, complete the workbook, save the prompt library, enrol in the AI Agents course.

---

## Notes for the producer

- **Sessions can be recorded out of order.** Sessions 1, 5, and 6 are talking-head + slides only. Sessions 2, 3, and 4 may benefit from one continuous take if your tool supports timestamp-sync editing.
- **Sessions 3 and 4 contain demos.** Pre-record the demo segments separately if you can't run them live, then composite into the main session in the editor.
- **The combined cut is optional.** Many learners prefer 4–8 minute videos they can rewatch in isolation. Ship the 6 sessions first; produce the combined cut only if Jifunze's player benefits from it.
