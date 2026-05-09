# Animation and Visual Plan — Scrum Made Simple

The visual plan for the recorded video. Pairs with `slides/slide-outline.md` (which describes what's on each slide) and `slide-to-voiceover-map.md` (which says when each slide is on screen).

This document tells the editor / motion designer:

1. Which on-screen elements move, and when
2. Which static elements need to be designed before animation begins
3. The pace and style rules for the whole deck
4. The full asset list

---

## Style rules (apply to every animation in the deck)

- **Movement is purposeful.** If something moves, it should be because the narration is introducing or revealing it.
- **One thing at a time.** Do not have two animations running simultaneously on the same slide.
- **Fade > slide.** Fades read as professional. Sliding-in text reads as a 2010s template.
- **Speed.** Most reveals are 0.4–0.6 seconds. Chart draws are 1.0–1.5 seconds. Avoid anything slower than 1.5s — it feels sluggish.
- **Hold time.** When the animation completes, the slide should sit static for the rest of its on-screen time. Do not loop.
- **Easing.** Use a soft ease-out (Quad or Cubic). No bounce, no elastic.
- **Cursor / pointer effects.** None, except in the screen-recorded segment (slide 31). Cursor highlights are appropriate there.

---

## Per-slide animation specifications

(Slide numbers match `slides/slide-outline.md`. Slides not listed here have no animation.)

### Slide 1 — Title

Static. No animation.

### Slide 2 — What you'll have done by the end

- Five rows fade in sequentially as the narrator names each outcome.
- Each row: 0.4s fade. 0.2s pause between rows. Total reveal ~3s.
- After all five appear, slide holds static.

### Slide 5 — The waterfall idea

- Sequential phases (Plan → Design → Build → Test → Deliver) fill from left to right.
- Each phase: 0.3s fill. Total 1.5s.
- Caption fades in after phases complete.

### Slide 6 — Then reality intervenes

- Original waterfall bar already on screen from previous slide carry-over.
- "Real project" wobbly timeline draws below, left to right (1.5s).
- Three labels ("customer changed mind," "supplier raised price," "regulation moved") fade in one at a time, ~0.4s each.

### Slide 7 — Agile, in one sentence

- Sentence appears in word groups (3 groups, ~0.7s each).
- Caption "Agile Manifesto, 2001" fades in 1s after sentence completes.

### Slide 8 — Agile vs traditional feedback timing chart

- Traditional bar (single bar at week 12) draws first (~0.4s).
- 0.5s hold.
- Agile bars (six bars at weeks 2, 4, 6, 8, 10, 12) draw left to right, 0.15s each, total ~1s.
- Chart legend fades in after bars complete.
- Source: `data/chart-data.csv`, sheet `agile_vs_traditional_feedback`.

### Slide 9 — Agile is the philosophy. Scrum is one recipe.

- "Agile" container circle fades in.
- Three chips ("Scrum," "Kanban," "XP") fade in stacked.
- Scrum chip then highlights (background colour shift, 0.4s).

### Slide 10 — Workbook prompt L1

- Static. "Workbook" badge holds for full duration of pause cue.

### Slide 12 — A sprint is a fixed time-box

- Calendar block (10 working days) fills day by day.
- Each day: 0.15s fill. Total 1.5s.

### Slide 13 — The Scrum cycle

- Each event in the cycle highlights as the narrator names it. Sequence:
  1. Sprint Planning highlights (0.5s).
  2. Daily Scrum (small inner loop) highlights and pulses three times to imply repetition.
  3. Sprint Review highlights.
  4. Sprint Retrospective highlights.
  5. Arrow back to Sprint Planning fades in last.
- This is the most complex animation in the deck. Budget 30 minutes of motion design time for it.

### Slide 14 — Worked example: Amani's salon

- Sprint goal box appears.
- 1s hold.
- "Not in this sprint" line fades in.

### Slide 15 — Workbook prompt L2

- Static.

### Slide 17 — The three Scrum roles

- Three columns fade in left to right, 0.4s each.

### Slide 18 — Worked example: community food drive

- Three roles appear stacked.
- Mapping arrows draw from the role name to the corresponding person, one at a time.
- Each arrow draw: 0.6s.

### Slide 19 — Wearing more than one hat

- Person illustration on screen.
- Three hats (PO, SM, Dev) appear above one at a time.

### Slide 22 — Five events at a glance

- Table rows fade in as each event is named (5 rows total, ~0.4s each).

### Slide 23 — Worked example: school careers week

- Two-week calendar already on screen.
- Each event icon drops onto the calendar at its date as the narrator names it.
- Drop animation: 0.4s with soft landing.

### Slide 24 — Skipping events

- Each consequence line fades in as named.

### Slide 27 — The three artifacts

- Three cards fade in stacked top to bottom, 0.5s each.

### Slide 28 — Backlog → Sprint backlog flow

- Long product backlog list on left appears static.
- Sprint backlog box on right appears empty.
- Selected items (3–4) fly from left to right, one at a time.
- Each item flight: 0.6s with arc motion.
- This is the second-most complex animation. Budget 30 minutes.

### Slide 29 — User story shape

- Template appears first (no animation).
- Example fades in 1.5s later.

### Slide 30 — Acceptance criteria

- Mother's Day example carries over from slide 29 (or re-appears).
- Four checkbox lines tick in sequence as narrator names each.
- Tick animation: small bounce, ~0.3s each.

### Slide 31 — The task board

- Static board appears.
- Single example card moves from To Do → In Progress → Done.
- Two pauses on the way (one in each column), ~0.5s each.
- Card-move animation: 0.6s with subtle motion blur.
- **After this animation, cut to the screen-recorded segment** for ~30 seconds (see *Screen recording* below). Then return to slide 31 for the wrap.

### Slide 32 — Definition of Done

- Five checklist lines tick in sequence, ~0.4s each.

### Slide 33 — Sprint progress (burndown)

- Line chart draws left to right.
- Total draw: 2.0s.
- Source: `data/chart-data.csv`, sheet `sprint_progress_by_day`.
- Optionally show the "ideal" line as a dashed line that draws first; the "actual" line draws after.

### Slide 34 — Worked example: Daniel's Mother's Day campaign

- Sprint goal sentence appears.
- Six cards fade into the sprint backlog one at a time.
- Definition of Done box appears last.

### Slide 37 — Mini-project instruction slide

- Nine numbered steps appear one at a time, ~0.4s each, as the narrator names them.

### Slide 38 — Walkthrough: each step

- Same numbered list at the side; the highlighted step shifts down the list as the narration moves through each one.
- Highlight shift animation: 0.4s.
- Small example panel on the right swaps to match the step. Use a fast cross-fade (0.3s).

### Slide 40 — Three honest reminders

- Each line fades in.

### Slide 41 — Final recap

- Each item ticks in sequence.

### Slide 42 — Three things before you close this

- Each item ticks in sequence.

### Slide 43 — End card

- Static.

---

## Screen recording: the task board (slide 31)

The recorded segment is ~30 seconds. Inserted between two views of slide 31.

- Tool to use: pick **one** of Trello, Notion's board view, or a Google Sheets task board template.
- Pre-built example board: 4 cards in To Do, 2 in In Progress, 0 Blocked, 2 in Done.
- During the recording: click and drag one card from "To Do" → "In Progress" → "Done." Pause briefly on each column.
- Hide all browser bookmarks, notifications, and personal info.
- Cursor: highlighted (Screen Studio handles this automatically).
- Recording resolution: 1920 × 1080 minimum, 60 fps if available.
- No audio in the screen recording — the narration plays underneath.

When cutting back to slide 31 after the recording, fade in over 0.4s.

---

## Asset list

The following assets must be produced or sourced before final assembly. Group by type so the designer can batch the work.

### Diagrams (8 total)

1. Sequential waterfall bar (slide 5)
2. Wobbly real-project timeline (slide 6)
3. Set diagram: Agile / Scrum / Kanban / XP (slide 9)
4. Two-week sprint calendar block (slide 12)
5. Scrum cycle circular diagram (slide 13)
6. Three-column role layout (slide 17)
7. Role mapping diagram for community food drive (slide 18)
8. Stacked artifact diagram (slide 27)
9. Backlog → Sprint backlog arrow flow (slide 28) — **required**
10. Task board diagram (slide 31) — **required**
11. Definition of Done checklist (slide 32) — **required**
12. Mini-project step list (slides 37, 38) — **required**

### Charts (3 total)

13. Bar chart: Agile vs traditional feedback timing (slide 8) — data: `chart-data.csv` sheet `agile_vs_traditional_feedback`
14. Line chart: Sprint burndown (slide 33) — data: `chart-data.csv` sheet `sprint_progress_by_day`
15. Optional: pie or bar chart of task status distribution at end of day 5 (companion to slide 31, only if the static layout allows) — data: `chart-data.csv` sheet `task_status_distribution`

### Illustrations / photography (6 total)

16. Salon illustration or stock photo (slide 14)
17. Three person silhouettes for the food drive (slide 18)
18. Single person silhouette with hats (slide 19)
19. Two-week calendar with event markers, school context (slide 23)
20. Mini-board composite for Mother's Day campaign (slide 34)
21. Course end-card with logo and URL (slide 43)

### Lesson divider templates (6 total)

One reusable template, populated for each lesson:

22. Lesson 1 divider
23. Lesson 2 divider
24. Lesson 3 divider
25. Lesson 4 divider
26. Lesson 5 divider
27. Lesson 6 divider

### Workbook badges (used on every pause cue, 6 instances)

One reusable badge, with one variant per lesson if you want to label which workbook section the prompt corresponds to.

### Screen recording (1 file)

28. Task board screen capture (~30 seconds, see specs above)

---

## Hand-off to the motion designer

The motion designer should receive:

- This document
- `slides/slide-outline.md`
- `slide-to-voiceover-map.md` (so they know how long each slide is on screen)
- The chart-ready CSV at `data/chart-data.csv`
- The flat asset files (diagrams, illustrations, lesson dividers) as separate exports
- The cut voiceover WAV (so they can preview animations against the actual narration)

Ask them to deliver one slide at a time for review. Do not let the project move to "stitch the whole thing together" before the team has approved at least the Scrum cycle (slide 13), the backlog flow (slide 28), and the burndown (slide 33). Those are the load-bearing visuals.
