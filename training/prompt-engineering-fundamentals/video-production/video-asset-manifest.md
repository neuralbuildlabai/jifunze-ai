# Video Asset Manifest

Final expected output files from the recording + editing pipeline. The producer delivers these to a `video-production/output/` folder (created during/after editing — not committed to the repo). Jifunze ingest reads from there.

---

## Required deliverables (6 session videos + 6 caption files)

| File | Target duration | Source | Notes |
|---|---|---|---|
| `session-01-intro.mp4` | ~4:30 | Voiceover §1 + slides 1–3 + Session 1 title card | Talking-head not required; voiceover-only is fine |
| `session-02-core-principles.mp4` | ~6:30 | Voiceover §2 + slides 4–8 + Session 2 title card | Optional bad/good live demo (~30s) at end of slide 8 segment |
| `session-03-techniques.mp4` | ~7:30 | Voiceover §3 + slides 9–13 + Session 3 title card | Live few-shot demo (~30s) at slide 10 segment |
| `session-04-refinement.mp4` | ~5:30 | Voiceover §4 + slides 14–18 + Session 4 title card | Optional meta-prompting demo (~45s) at slide 18 segment |
| `session-05-mistakes-safety.mp4` | ~4:30 | Voiceover §5 + slides 19–20 + Session 5 title card | No demo. Lower-thirds for the three safety habits recommended |
| `session-06-completion.mp4` | ~3:30 | Voiceover §6 + slides 21–22 + Session 6 title card | No demo. Slow fade to black at "Happy Prompting!" |
| `session-01-intro.srt` | match | Generated from session 1 transcript | Re-time during edit |
| `session-02-core-principles.srt` | match | Generated from session 2 transcript | |
| `session-03-techniques.srt` | match | Generated from session 3 transcript | |
| `session-04-refinement.srt` | match | Generated from session 4 transcript | |
| `session-05-mistakes-safety.srt` | match | Generated from session 5 transcript | |
| `session-06-completion.srt` | match | Generated from session 6 transcript | |

**Total runtime across the six videos: ~30:00.**

---

## Optional deliverables

| File | Target duration | Notes |
|---|---|---|
| `full-course-combined.mp4` | ~30:00 | Concatenation of all six session videos with the inter-session title cards held to 5s each. Useful if Jifunze's player doesn't support a chaptered single video. |
| `full-course-combined.srt` | match | Concatenation of the six SRT files with timestamp offsets adjusted |
| `course-trailer.mp4` | 30–60s | Marketing teaser for course landing page. Optional. |
| `thumbnail-master.png` | 1920×1080 | Course thumbnail. 1280×720 export sufficient for most platforms. |

The optional deliverables are **not required for first upload**. Ship the six required videos first; produce the combined cut and trailer only if Jifunze's player benefits from them.

---

## Per-file technical specs

All MP4s share these encoding parameters:

- Container: MP4
- Video: H.264, 1920×1080, 30 fps, 8–10 Mbps VBR (2-pass)
- Audio: AAC, 192 kbps, 48 kHz, stereo
- Color: BT.709
- Captions: SRT, UTF-8, no BOM

Expected file sizes (1080p, 30 fps, 8 Mbps): **session-01 ≈ 30 MB, session-03 ≈ 50 MB, full-course ≈ 200 MB**.

---

## Asset hand-off checklist

Before declaring video assets done:

- [ ] All six MP4s named exactly as listed (no `wip-`, no spaces, no version suffixes)
- [ ] All six SRTs match their corresponding MP4 names exactly (just `.srt` extension)
- [ ] Each MP4 plays correctly in VLC, QuickTime, and Chrome
- [ ] Each SRT loads correctly when dropped into VLC playback
- [ ] All session videos within ±20s of the targets above
- [ ] Total combined runtime between 28:00 and 32:00
- [ ] No internal references, "Bob", placeholder text, or untemplated `<REPLACE: …>` markers visible in any frame or caption
- [ ] Output folder structure matches:
    ```
    video-production/output/
    ├── session-01-intro.mp4
    ├── session-01-intro.srt
    ├── session-02-core-principles.mp4
    ├── session-02-core-principles.srt
    ├── session-03-techniques.mp4
    ├── session-03-techniques.srt
    ├── session-04-refinement.mp4
    ├── session-04-refinement.srt
    ├── session-05-mistakes-safety.mp4
    ├── session-05-mistakes-safety.srt
    ├── session-06-completion.mp4
    └── session-06-completion.srt
    ```

When all boxes are checked, hand off to Jifunze upload.
