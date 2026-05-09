# Video Asset Manifest — Scrum Made Simple

The full inventory of files and assets that go into producing the recorded version of the workshop. Use this as the production team's checklist — every line should resolve to either an existing file in this package or a deliverable that needs to be created.

---

## A. Source documents (already in this package)

| File | Purpose | Owner |
|---|---|---|
| `README.md` | Course summary and package map | Course author |
| `course-outline.md` | Lesson-by-lesson structure | Course author |
| `script.md` | Canonical narration source (lesson-by-lesson) | Course author |
| `learner-workbook.md` | Printable workbook | Course author |
| `facilitator-notes.md` | Optional live-delivery guidance | Course author |
| `quiz.md` | 15-question final quiz | Course author |
| `production-guide.md` | End-to-end production reference | Production lead |
| `slides/slide-outline.md` | Slide-by-slide deck plan | Slide designer |
| `data/chart-data.csv` | Chart data for 3 slides | Slide designer |
| `video-production/recording-checklist.md` | Pre/during/post recording | Voiceover artist |
| `video-production/animation-and-visual-plan.md` | What moves and when | Motion designer |
| `video-production/voiceover-script.md` | Per-slide narration for recording | Voiceover artist |
| `video-production/slide-to-voiceover-map.md` | Slide ↔ narration timeline | Editor |
| `video-production/video-asset-manifest.md` | This file | Production lead |

All present. Verify with `find training/scrum-made-simple -type f`.

---

## B. Asset deliverables (to be produced)

### B.1 Slide deck files

| ID | Asset | Format | Status | Notes |
|---|---|---|---|---|
| DK-01 | Master slide deck | `.key` or `.pptx` | TBD | 43 slides, 16:9, brand-styled |
| DK-02 | Slide deck PDF export | `.pdf` | TBD | Attached to LMS as downloadable resource |
| DK-03 | Slide deck PNG exports (per slide) | `.png` | TBD | One PNG per slide, 1920×1080, for video edit |

### B.2 Diagrams (8 required + 4 supporting)

These are the 12 distinct visual diagrams listed in `animation-and-visual-plan.md`. Required diagrams are marked ★.

| ID | Diagram | Slide(s) | Format | Status |
|---|---|---|---|---|
| DG-01 | Sequential waterfall bar | 5 | SVG + PNG | TBD |
| DG-02 | Wobbly real-project timeline | 6 | SVG + PNG | TBD |
| DG-03 | Set diagram: Agile / Scrum / Kanban / XP | 9 | SVG + PNG | TBD |
| DG-04 | Two-week sprint calendar block | 12 | SVG + PNG | TBD |
| DG-05 | ★ Scrum cycle circular diagram | 13 | SVG + PNG | TBD |
| DG-06 | Three-column role layout | 17 | SVG + PNG | TBD |
| DG-07 | Role mapping for community food drive | 18 | SVG + PNG | TBD |
| DG-08 | Stacked artifact diagram | 27 | SVG + PNG | TBD |
| DG-09 | ★ Backlog → Sprint backlog arrow flow | 28 | SVG + PNG | TBD |
| DG-10 | ★ Task board diagram | 31 | SVG + PNG | TBD |
| DG-11 | ★ Definition of Done checklist | 32 | SVG + PNG | TBD |
| DG-12 | ★ Mini-project step list | 37, 38 | SVG + PNG | TBD |

### B.3 Charts (3 total, all driven by `data/chart-data.csv`)

| ID | Chart | Slide | Data source | Format | Status |
|---|---|---|---|---|---|
| CH-01 | ★ Bar chart: Agile vs traditional feedback timing | 8 | `agile_vs_traditional_feedback` sheet | SVG + PNG | TBD |
| CH-02 | ★ Line chart: Sprint burndown | 33 | `sprint_progress_by_day` sheet | SVG + PNG | TBD |
| CH-03 | (optional) Pie/bar: task status distribution | 31 (companion) | `task_status_distribution` sheet | SVG + PNG | TBD |

### B.4 Illustrations / photography

| ID | Asset | Slide | Source | Status |
|---|---|---|---|---|
| IL-01 | Salon illustration or stock photo | 14 | Stock or commissioned | TBD |
| IL-02 | Three person silhouettes (food drive) | 18 | Stock or commissioned | TBD |
| IL-03 | Single person silhouette with hats | 19 | Stock or commissioned | TBD |
| IL-04 | Two-week calendar (school context) | 23 | Designed | TBD |
| IL-05 | Mini-board composite (Mother's Day) | 34 | Designed | TBD |
| IL-06 | End-card (logo + URL) | 43 | Designed | TBD |

### B.5 Reusable templates

| ID | Asset | Used on slides | Format | Status |
|---|---|---|---|---|
| TM-01 | Lesson divider template | 4, 11, 16, 21, 26, 36 | Slide layout | TBD |
| TM-02 | Workbook badge | Pause cues (10, 15, 20, 25, 35, 39) | Slide layout | TBD |
| TM-03 | Title slide layout | 1, 43 | Slide layout | TBD |
| TM-04 | Content slide layout | Most content slides | Slide layout | TBD |

### B.6 Audio

| ID | Asset | Source | Format | Status |
|---|---|---|---|---|
| AU-01 | Raw voiceover recording (per session × 6) | Voiceover artist | 48 kHz / 24-bit WAV | TBD |
| AU-02 | Edited voiceover master | Audio editor | 48 kHz / 24-bit WAV, normalised to -16 LUFS | TBD |
| AU-03 | Streaming MP3 reference | Audio editor | MP3 256 kbps | TBD |

### B.7 Screen recording

| ID | Asset | Used on slide | Format | Status |
|---|---|---|---|---|
| SR-01 | Task board screen capture (~30 s) | 31 | MP4 1920×1080 60 fps | TBD |

### B.8 Captions and transcripts

| ID | Asset | Format | Status |
|---|---|---|---|
| CP-01 | Hand-corrected captions | SRT | TBD |
| CP-02 | Plain-text transcript | TXT | TBD |
| CP-03 | (optional) Burned-in captions version of master video | MP4 | TBD |

### B.9 Final exports

| ID | Asset | Format | Notes | Status |
|---|---|---|---|---|
| EX-01 | Master video file | ProRes 422 HQ or H.264 1920×1080 30 fps | Archive copy | TBD |
| EX-02 | Streaming video file | H.264 1080p, 8–10 Mbps | LMS upload | TBD |
| EX-03 | Workbook PDF | PDF, A4 single column | LMS resource | TBD |
| EX-04 | Slide deck PDF | PDF, 16:9 | LMS resource | TBD |
| EX-05 | Quiz PDF | PDF | LMS resource | TBD |
| EX-06 | Chart data CSV | CSV | LMS resource | TBD |
| EX-07 | Plain-text transcript | TXT | LMS resource | TBD |

---

## C. File naming conventions

- All filenames use kebab-case.
- All filenames are prefixed with `scrum-made-simple_` for traceability when assets are mixed with other course assets.
- Asset IDs (e.g. `DG-05`) appear in the filename when more than one variant exists.

Examples:

- `scrum-made-simple_master-deck_v01.key`
- `scrum-made-simple_DG-05_scrum-cycle_v02.svg`
- `scrum-made-simple_voiceover_master_v03.wav`
- `scrum-made-simple_v01_2026-05-09.mp4`

---

## D. Brand assets needed from the design system

Confirm these are available before slide design begins:

▢  Jifunze.ai logo, full-colour and reversed, SVG
▢  Brand fonts (or web-safe fallback list)
▢  Brand colour swatches (primary, accent, neutrals)
▢  Iconography library (Heroicons or whichever the rest of Jifunze uses)
▢  Slide template starter file (if one exists)

If any of the above are missing, raise a request to the brand team **before** the slide designer starts work. Inconsistent brand application is the most common reason course videos get rejected at QA.

---

## E. Sign-off gates

The asset manifest moves through three gates before the video ships.

**Gate 1 — Asset readiness (before recording)**

▢  All source documents (Section A) finalised
▢  Slide deck draft complete (DK-01)
▢  All required diagrams (★ items in DG and CH) drafted
▢  Reusable templates (TM-01 to TM-04) complete

**Gate 2 — Recording complete (before edit)**

▢  Six voiceover sessions recorded (AU-01)
▢  Audio edited and mastered (AU-02)
▢  Screen recording complete (SR-01)
▢  All slide PNG exports complete (DK-03)

**Gate 3 — Pre-upload QA (before LMS upload)**

▢  Captions hand-corrected (CP-01)
▢  Transcript generated (CP-02)
▢  Master video exported (EX-01)
▢  Streaming video exported (EX-02)
▢  All learner-facing PDFs exported (EX-03 to EX-07)
▢  Quality checklist in `production-guide.md` Section 9 completed

When all three gates are passed, the video is ready for upload to Jifunze.

---

## F. Status legend

- **TBD** — not yet started
- **In progress** — work has begun
- **In review** — first draft delivered, awaiting feedback
- **Approved** — signed off, ready for use
- **Final** — frozen for shipping

Update the status column as production progresses. The simple discipline of keeping this file current is the cheapest way to avoid forgetting an asset.
