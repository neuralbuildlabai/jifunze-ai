# Production Guide — Scrum Made Simple: Plan Your First Sprint

This guide covers how to produce the recorded version of the workshop end-to-end: workflow, tools, voiceover, slide design, animations, screen recording, and the export and quality checks before the file is uploaded to Jifunze.

The package follows the same conventions used by the `prompt-engineering-fundamentals` training package in this repository.

---

## 1. Recommended workflow

Recommended order of operations. Each step should be checked off before moving to the next.

1. **Lock the script.** `script.md` is the canonical narration source. Do not start recording until it has been read aloud at full pace at least once. Time it.
2. **Build the slides.** Follow `slides/slide-outline.md` slide by slide. Match the chart data to `data/chart-data.csv`.
3. **Record the voiceover.** Use `video-production/voiceover-script.md`, which is the same content as `script.md` re-cut by slide for recording convenience.
4. **Cut the audio.** Remove ums, repeated takes, and long silences. Leave the `[PAUSE — workbook]` cues as 2-second silences with on-screen "Workbook" badges.
5. **Build the animations.** Follow `video-production/animation-and-visual-plan.md`. Animations are minimal and purposeful — they support the narration, they don't decorate it.
6. **Record the task-board screen capture.** See *Screen recording the task board* below.
7. **Edit the video.** Lay slides + animations + screen capture against the cut voiceover.
8. **QA pass.** Run the *Quality checklist* (end of this document) before exporting.
9. **Export.** Run the *Export checklist*.
10. **Upload to Jifunze.** Attach the workbook PDF, the slide PDF, and the chart-data CSV as downloadable resources.

The whole production should take a competent two-person team (presenter + editor) two to three working days.

---

## 2. Recommended tools

These are recommendations, not requirements. Substitute any tool your team already knows well — the workshop is short enough that you don't need fancy infrastructure.

| Job | Recommended tool | Notes |
|---|---|---|
| Voiceover recording | Reaper, Logic Pro, GarageBand, or Audacity | Anything that captures clean WAV at 48 kHz. |
| Microphone | A USB condenser like the Shure MV7 or a basic XLR like the Rode NT1 | Treat the room — record under a duvet if you have to. |
| Slide deck | Keynote, Google Slides, or PowerPoint | Keynote produces the cleanest exports for video. |
| Animation / motion | Keynote's built-in transitions, or After Effects for the chart reveals | Keep it simple. See section 5. |
| Chart rendering | The chart inside Keynote or Google Slides reading from `data/chart-data.csv` | A static chart is fine if animation is too costly. |
| Screen recording | Screen Studio (Mac), Camtasia, or Loom | For the task board demo only — see section 6. |
| Video editing | Final Cut Pro, Premiere, DaVinci Resolve, or Descript | Descript's "edit by transcript" workflow is fastest if your editor is non-technical. |
| Captions | Descript or Whisper-generated SRT | Hand-correct, do not ship raw auto-captions. |
| Workbook PDF | Pandoc + a print stylesheet, or Markdown → PDF in your editor | Output single-column, A4. |

---

## 3. Voiceover guidance

**Tone.** Warm, calm, conversational. Imagine explaining Scrum to a friend over coffee — not lecturing. The script is written this way; do not "perform" it, just read it.

**Pace.** Target ~140 words per minute. Faster than that and the workshop ends in 30 minutes, which feels rushed. Slower than that and it stretches past 50 minutes, which loses learners.

**Recording technique.**
- Record one lesson per session. The script is broken into six lesson segments. Take a break between each.
- Record three takes of every paragraph that introduces a new concept. Pick the best in editing.
- Stand up while recording — your voice projects better.
- Drink room-temperature water, not cold. Cold tightens the throat.
- Keep a printed script in front of you with bigger-than-usual font (16pt+) so you don't squint.

**What to mark on the script.**
- Underline words that should be emphasised.
- Slash marks where you'll breathe.
- Brackets around every sentence you can drop if you're running long.

**Pause cues.** Every `[PAUSE — workbook]` in the script becomes a 2-second silent gap in the final audio with an on-screen "Workbook" badge. Do not narrate over the badge.

**What to avoid.**
- Filler words: *um*, *uh*, *so*, *basically*, *like*. Cut in editing.
- Apologetic openers: *I think*, *maybe*, *kind of*. The script is already calibrated; just read it as written.
- Exclamation: *amazing*, *love this*, *super cool*. The audience is adults; respect them.

---

## 4. Slide design guidance

**One idea per slide.** If a slide has more than one idea, split it. The deck is short — adding slides is cheap.

**Use the same layout family for the whole deck.** Pick one title-card layout, one content-card layout, one diagram-card layout, one chart-card layout. Reuse them. Visual consistency makes the deck feel professional even with simple content.

**Colours.** A two-colour palette is enough.
- Primary: a calm dark colour (deep blue / charcoal)
- Accent: a warmer signal colour (orange or coral) for the one thing that should stand out on each slide
- Background: white or near-white
- Text: dark grey, not pure black

**Typography.**
- Headings: a clean sans-serif (Inter, Söhne, or system default)
- Body: the same family, different weight
- Slide titles 36–44pt, body 24–32pt, footnotes 16pt
- Never below 16pt on any slide

**Layout principles.**
- Generous margins. Don't fill every pixel.
- Left-align text. It scans faster.
- One bullet per line. Maximum five bullets per slide.
- Diagrams centre-aligned with breathing room above and below.

**Required diagrams** (see `slides/slide-outline.md` for placement):

1. *Agile vs traditional feedback timing chart* — a simple bar or line chart showing feedback frequency over time. Data in `data/chart-data.csv`.
2. *Scrum cycle diagram* — a circular flow showing Sprint Planning → Daily Scrum (×N) → Sprint Review → Sprint Retrospective → next Sprint.
3. *Backlog-to-sprint-backlog arrow flow* — a long product backlog on the left, a short sprint backlog on the right, an arrow showing the slice being pulled into the sprint.
4. *Task board diagram* — three or four columns (To Do / In Progress / Blocked / Done) with three example cards.
5. *Definition of Done checklist* — a clean checklist visual with example items.
6. *Sprint burndown / progress chart* — line chart showing remaining work decreasing across the days of a sprint. Data in `data/chart-data.csv`.

**Logo and footer.**
- Jifunze.ai logo bottom-left in a small, neutral colour.
- Slide number bottom-right.
- No date in the footer (it ages the video).

---

## 5. Graph and animation guidance

**Animation budget.** Keep it small. Heavy animation distracts from the workshop's content and ages quickly. Most slides should have either no animation or a single fade-in for the diagram.

**Chart animations.** When a chart is introduced, animate the data drawing in once. After it has drawn, hold it static. Do not loop chart animations.

**Diagram reveals.** When walking through a multi-part diagram (the Scrum cycle, the backlog flow), reveal one element at a time, in sync with the narration. Keynote's "Build In" feature is sufficient.

**Specific animations required.**

| Slide | Animation |
|---|---|
| Agile vs traditional chart | Bars draw in sequence (traditional first, then agile, to make the contrast feel temporal). 1.2s total. |
| Scrum cycle diagram | Each event lights up as it is named in the narration. Connecting arrows fade in last. |
| Backlog → Sprint backlog | The selected items fly from the product backlog to the sprint backlog, one at a time. |
| Task board | An example card moves from To Do → In Progress → Done as the narration describes the flow. |
| Definition of Done checklist | Each item ticks in turn, in sync with the narration. |
| Burndown / progress chart | Line draws left-to-right across 10 working days. |

**No animations** for: title slides, lesson title slides, recap slides, quiz intro, completion slide, end card.

**Things to avoid.**
- Spinning text, bouncing icons, anything from a 2010s template gallery.
- Slow fades over 1 second — they feel sluggish.
- Multiple animations playing at once on the same slide.

---

## 6. Screen recording: the task board

**Purpose.** A short (~30 second) live screen capture during Lesson 5 showing how a task board behaves in practice. It makes the abstract concept concrete.

**What to record.**
- Open one of: Trello, Notion's board view, or a simple Google Sheets task board template.
- Show three columns: To Do, In Progress, Done.
- Drag one example card from To Do → In Progress → Done.
- Pause for half a second on each column move so the viewer's eye can follow.

**Recording specs.**
- 1920 × 1080 minimum, 60 fps if possible.
- Cursor highlighted (Screen Studio does this automatically).
- Record at 100% zoom; don't shrink the window.
- Hide notifications, browser bookmarks, anything personal.
- Record without audio — it will be voiced over from the script.

**Where it goes in the video.** During Lesson 5, after the static task-board diagram has been shown, cut to the screen recording for ~30 seconds, then cut back to the slide deck.

---

## 7. Captions and transcripts

- Generate captions with Descript or Whisper.
- **Always hand-correct** before publishing. Auto-captions miss the Scrum vocabulary (sprint, backlog, retrospective) and proper nouns.
- Burn in captions optionally; always ship a separate `.srt` file.
- A full plain-text transcript is required for accessibility and search — store it in `video-production/captions/` (create the folder during production).

---

## 8. Export checklist

Before exporting the master video file:

▢  Voiceover normalised to -16 LUFS (broadcast loudness standard)
▢  No clipping (peaks under -1 dBFS)
▢  All `[PAUSE — workbook]` cues are present as 2-second silences
▢  All "Workbook" badges appear on screen during pause cues
▢  Every slide is on screen for the full duration of its narration (no early cuts)
▢  Task-board screen capture appears in Lesson 5
▢  Captions are hand-corrected
▢  Slide numbers visible on every slide
▢  Jifunze.ai logo visible on every slide
▢  No on-screen typos (run a separate slide-only QA pass)

Export settings:

- **Master file:** ProRes 422 HQ (or H.264 high-quality) at 1920 × 1080, 30 fps
- **Audio:** AAC 256 kbps stereo
- **Streaming file:** H.264 1080p, 8–10 Mbps for upload
- **Filename convention:** `scrum-made-simple_v01_YYYY-MM-DD.mp4`

---

## 9. Quality checklist (final review before upload)

This is the last gate before the video goes live on Jifunze. The reviewer should be someone who has *not* worked on the production, so they catch things the team has gone blind to.

**Content**

▢  The course title in the deck matches the title in this README ("Scrum Made Simple: Plan Your First Sprint").
▢  No claim of certification anywhere in the video, captions, slide deck, or workbook.
▢  Every Scrum Guide term used is paired with a plain-language explanation the first time it appears.
▢  All four worked examples (salon, school, marketing, software/product improvement) are actually present in the narration.
▢  The mini project is fully walked through, end to end, in Lesson 6.
▢  The completion activity asks the learner to commit to a sprint start date out loud.

**Audio**

▢  Voiceover is clean and consistent across all six lessons.
▢  No abrupt level changes between segments.
▢  No background hiss or hum.
▢  Music (if any) sits well below the voice.

**Visual**

▢  Every required diagram from `slides/slide-outline.md` is present.
▢  Charts match the data in `data/chart-data.csv`.
▢  No stretched or pixelated assets.
▢  Captions sync within ±0.2 seconds.
▢  Brand consistency — logo, colours, fonts.

**Resources attached**

▢  Workbook PDF
▢  Slide deck PDF
▢  Chart data CSV
▢  Plain-text transcript
▢  Quiz (as a separate downloadable Markdown / PDF)

**Metadata**

▢  Title: Scrum Made Simple: Plan Your First Sprint
▢  Tags: scrum, agile, sprint, micro-course, beginner, project management
▢  Category: Workshop / micro-course (NOT flagship)
▢  Course catalog visibility: **off** until explicitly approved by the team

---

## 10. Versioning and updates

- Treat the script as the source of truth. When you update the script, regenerate the per-slide voiceover script in `video-production/voiceover-script.md`.
- Bump the version in the README when you re-record (`v1.0` → `v1.1` for small fixes; `v2.0` for re-records).
- Note any factual corrections in a `CHANGELOG.md` file at the package root if the package is updated post-launch (create on first update — not required for v1.0).
