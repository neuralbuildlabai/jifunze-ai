# Recording Checklist — Prompt Engineering Fundamentals

Use this before, during, and after recording. The course can be produced in two ways:

- **Path A — AI-narrated.** Generate voiceover with ElevenLabs / Descript / HeyGen / Synthesia (see `voiceover-tool-prompt.md`), then composite with screen-recorded slides.
- **Path B — Human-narrated.** Record a presenter reading `voiceover-script.md` over the slide deck.

Both paths produce the same six MP4 deliverables (see `video-asset-manifest.md`). The checklist below applies to both unless marked **[Path B only]**.

---

## ✅ Pre-recording — environment and assets

- [ ] `voiceover-script.md` reviewed end-to-end; any tongue-twisters flagged for the narrator
- [ ] `slide-to-voiceover-map.md` open in a second monitor for reference during recording
- [ ] `slides/index.html` opens cleanly in a full-screen browser; arrow keys advance/reverse
- [ ] All 22 slides render without overflow at 1920×1080
- [ ] Examples directory tested with real API key — `python 02_advanced_techniques.py --auto` ran end-to-end and outputs were captured for backup demo footage
- [ ] Six session title cards designed in editor (gradient #667eea → #764ba2, white text)

---

## 🎙 Microphone and voice quality

**[Path B only]** — Skip if AI-narrating.

- [ ] Microphone tested at speaking distance (15–25 cm); no clipping at maximum volume
- [ ] Pop filter or windscreen attached
- [ ] Sample rate **48 kHz**, bit depth **24-bit**
- [ ] Recorded format: **WAV** (master) or high-quality **MP3 192 kbps** minimum
- [ ] Noise floor at or below **−60 dBFS**
- [ ] Quiet room — HVAC off, doors closed, phone silenced
- [ ] Test recording (30s) played back through headphones to confirm no echo, hiss, or background hum
- [ ] Speaker hydrated; warm-up done (5 min of relaxed speech before take 1)

**For AI narration (Path A):**

- [ ] Selected voice approved by stakeholder (warm, clear, instructional — not announcer-y)
- [ ] Voice settings saved: pace ~140 wpm, no excessive expressiveness
- [ ] One sample paragraph generated and listened to before committing to a full session

---

## 🖥 Screen recording

- [ ] Display resolution set to **1920×1080** (or higher, downscaled in export)
- [ ] Frame rate **30 fps** locked in recorder
- [ ] Browser in full-screen kiosk mode — no tabs, bookmarks, or address bar visible
- [ ] Notifications silenced (Do Not Disturb / Focus mode)
- [ ] Cursor enlarged with subtle highlight halo (yellow recommended)
- [ ] Wallpaper neutral or hidden — recording region constrained to slide window only
- [ ] Recorder configured to capture **system audio + microphone** if recording demos
- [ ] Test recording verified for sync (audio drift on long takes is the #1 issue)

---

## 🎞 Slide recording (per session)

For each session video:

- [ ] Slide deck navigated to the correct starting slide before "record" pressed
- [ ] First 1.5 seconds: hold on slide silently (gives editor a clean head)
- [ ] Slide changes happen at the cue points in `slide-to-voiceover-map.md`
- [ ] Final slide held for 1.5 seconds after narration ends (clean tail)
- [ ] Session title card for the next session NOT shown — that's added in editing

---

## 🧪 Demo recording (Sessions 2, 3, 4)

Sessions 2, 3, and 4 contain optional or required live demos.

- [ ] **Session 2 demo (optional):** "Help me with my email" vs structured version, run side-by-side in the producer's chosen chat tool
- [ ] **Session 3 demo (recommended):** Few-shot sentiment scoring example. Run in real chat tool, show the AI's response on screen.
- [ ] **Session 4 demo (optional):** Meta-prompting "improve this prompt" example
- [ ] Demos pre-tested ahead of recording — outputs saved as backup screenshots
- [ ] If the live API call fails during recording, cut to the backup screenshot rather than retry on camera
- [ ] Demo segments recorded as separate clips and composited into the main session in editing

---

## 🎚 Audio post-production

- [ ] Audio levels normalized to **−16 LUFS** (typical for educational content) or platform-appropriate target
- [ ] Background hiss removed (RX, Audacity Noise Reduction, or built-in DAW tools)
- [ ] Plosives and clicks de-essed
- [ ] Long pauses (>1.5s) trimmed unless intentionally placed
- [ ] Light room tone added between sentences if the silence sounds unnaturally dead
- [ ] Subtle background music (optional) — if used, ducked to **−24 dB** beneath voice

---

## 📤 Export settings

| Setting | Value |
|---|---|
| Container | MP4 |
| Video codec | H.264 |
| Resolution | 1920×1080 |
| Frame rate | 30 fps |
| Bitrate | 8–10 Mbps (VBR, 2-pass for final) |
| Audio codec | AAC |
| Audio bitrate | 192 kbps |
| Audio sample rate | 48 kHz |

---

## 🗂 Filename naming convention

All session videos follow this format. **Do not deviate — Jifunze ingest pipelines expect these exact names.**

```
session-01-intro.mp4
session-02-core-principles.mp4
session-03-techniques.mp4
session-04-refinement.mp4
session-05-mistakes-safety.mp4
session-06-completion.mp4
full-course-combined.mp4              ← optional combined cut
```

Captions follow the same stem with `.srt` extension:

```
session-01-intro.srt
session-02-core-principles.srt
session-03-techniques.srt
session-04-refinement.srt
session-05-mistakes-safety.srt
session-06-completion.srt
full-course-combined.srt              ← optional, concatenated from per-session SRTs
```

For working files (project files, raw takes, masters), use a `wip-` prefix and date stamp:

```
wip-session-03-techniques-2026-05-08-take-02.mp4
```

`wip-` files are ignored by Jifunze ingest and stay in the producer's working folder.

---

## 📋 Final QC pass — before delivering to Jifunze

For each of the six session videos:

- [ ] Plays end-to-end without freezes or audio dropouts
- [ ] Audio sync is tight (no drift over the session length)
- [ ] All slide transitions are clean — no flash frames, no half-rendered slides
- [ ] Captions (.srt) load and display correctly in a video player (test in VLC)
- [ ] No background notifications, mouse wandering, or browser chrome visible
- [ ] Session length within ±20 seconds of the target in `session-plan.md`
- [ ] No "Bob" / placeholder / internal references in narration or captions
- [ ] File size reasonable (5–15 minute videos at 1080p should be 50–200 MB at 8 Mbps)

If all six pass, the course is ready for Jifunze upload review.
