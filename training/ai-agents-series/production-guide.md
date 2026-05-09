# Production Guide — AI Agents Series

A concise, three-episode-aware production guide. The goal is to record three coherent 30-minute videos that hold together as a series without each one needing a different rig or workflow.

---

## 1 — One-time setup

Get this right once and the rest of the series records faster.

### Equipment

- **Mic.** Any cardioid USB mic with a pop filter is fine. Rode NT-USB, Shure MV7, Blue Yeti — all work. Audio quality matters more than camera quality for this format.
- **Screen recording.** OBS Studio (free), ScreenFlow (Mac), or Camtasia. Record at 1920×1080 minimum, 30 fps, MP4 / H.264.
- **Editor.** VS Code with the dark+ theme. Bump the editor font to 18pt and the integrated terminal to 16pt before recording.
- **Slides.** Each episode ships with an HTML slide deck. Open in fullscreen with the cursor visible.
- **Quiet room.** Carpet + cushions on hard surfaces is enough; you do not need a treated booth.

### Code environment

A single Python virtualenv per episode. Don't mix dependencies across episodes — Episode 2 needs ChromaDB which Episode 1 doesn't, and viewers shouldn't see ChromaDB warnings during the intro.

```bash
cd 0X-episode-folder
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Verify before recording:

```bash
python code/01_first_tool.py    # episode 1
python code/02_simple_agent.py  # episode 1
# ... etc
```

If any example throws an error, fix it in the code, don't fix it in the edit.

---

## 2 — Per-episode recording structure

Each episode is broken into 4 takes. This makes it dramatically easier to redo a section without re-recording the whole thing.

| Take | Time in final | Content type | Notes |
|---|---|---|---|
| 1 | 0:00–6:00 | Slides (intro + concepts) | Talk to the slide; cursor visible. |
| 2 | 6:00–18:00 | Code editor | Live-ish coding; have the file pre-written and reveal sections. |
| 3 | 18:00–25:00 | Terminal demo | Run the code; show output; show one failure. |
| 4 | 25:00–30:00 | Slides (best practices + close) | Land the takeaways. |

**Pro tip.** Record Take 1 last. Once you've done Takes 2–3 you understand the topic better and your intro is sharper.

---

## 3 — Visual conventions across the series

Keep these consistent across all three episodes. The series should feel like one course.

### Code display

- Font: JetBrains Mono or Fira Code, 18pt
- Theme: VS Code Dark+
- Line numbers: on
- Minimap: off (visual noise)
- Word wrap: off (viewers should see the line as you intend)
- Indent guides: on (helps readers follow structure on a 30-fps recording)

### Terminal

- Font: 16pt
- Prompt: short and readable. Hide hostname/username if you can.
- Clear screen between demos (`clear` or `cmd+k`).
- Set `PYTHONDONTWRITEBYTECODE=1` to avoid `__pycache__` directories appearing on screen.

### Slides

The HTML decks use a single colour family per episode so viewers can tell at a glance which one they're watching:

- Episode 1 — Intro: **orange / cream** (warm, approachable)
- Episode 2 — Memory & RAG: **teal / cream** (deeper, calmer)
- Episode 3 — Production & Safety: **slate / orange accent** (serious, but still warm)

Don't use stock photography. Diagrams beat photos every time for technical content.

### Cursor and pointer

Use a cursor highlighter (built into ScreenFlow and OBS as a plugin) so viewers can follow your eye across the screen. Keep it subtle — a 30-pixel halo at 30% opacity is enough.

---

## 4 — Audio conventions

- **Sample rate.** 48 kHz. Match across all three episodes.
- **Bit depth.** 24-bit if your editor supports it.
- **Pace.** Aim for ~150 words per minute. Slow is better than fast for technical material; viewers can speed it up.
- **Pauses.** Land them before complex code reveals and after errors. Two seconds is fine.
- **No music** under spoken content. A 5-second intro sting and outro are enough.

---

## 5 — Per-episode timing

Each episode's `script.md` has minute-by-minute timing markers (e.g. `[3:00]`). Trust them — they were timed at 150 wpm. If you're consistently running over, you're either explaining things you don't need to or your pace is too slow.

A reliable check: at the 10-minute mark of any episode, you should be deep in code. If you're still on slides, you're behind.

---

## 6 — Editing checklist (per episode)

Run this list every time. It is short on purpose.

- Cut all dead air > 1.5 seconds.
- Verify code shown on screen matches code in the repo (you don't want the video showing v1 and the README pointing to v2).
- Add the episode title card (5 seconds, top-left) so the episode is identifiable in a thumbnail-less context.
- Include a closing card with the next episode's title and a one-sentence teaser.
- Captions: auto-generate, then **read every caption** for technical terms (`ChromaDB`, `text-embedding-3-small`, `ReAct` are commonly mis-transcribed).

---

## 7 — Cross-episode continuity

Three production gotchas that only show up in a series:

### Don't reset state

Episode 2 ends with a populated vector store. Episode 3 should reference it (even if it just opens, prints the count, and moves on). Don't have the viewer feel like each episode starts from zero.

### Reuse the same agent name

Pick one — `ResearchAgent`, `Assistant`, whatever — and use it across all three episodes. Renaming the class between episodes is the kind of thing that breaks viewer trust.

### Match the system prompt

The system prompt should evolve across episodes (Episode 3 hardens it), but the *base personality* should be the same. If Episode 1's agent is a "concise research assistant," Episode 3's should still feel like a concise research assistant — just more careful.

---

## 8 — Export and distribution

Final export per episode:

```
Format:    MP4
Codec:     H.264
Resolution: 1920×1080
Frame rate: 30 fps
Bitrate:   8–10 Mbps (VBR)
Audio:     AAC, 192 kbps, 48 kHz
```

File naming:

```
ai-agents-01-intro-v1.mp4
ai-agents-02-memory-rag-v1.mp4
ai-agents-03-production-safety-v1.mp4
```

If you bump a version (`v2`, `v3`), keep the old MP4 archived. Don't overwrite — viewers may have linked to the v1 timestamps.

---

## 9 — Companion materials (per episode)

Each episode benefits from three tied-in artifacts:

1. **Code repo link** in the description.
2. **PDF cheatsheet** (one page) summarising the episode's key concepts. Use the same colour family as the slides.
3. **Thumbnail** at 1280×720, with the episode number visible large in the corner so viewers can tell the series order at a glance.

The thumbnail is the highest-leverage marketing asset. Spend disproportionate time on it.

---

## 10 — One mistake to avoid

Do not record the three episodes back-to-back in one day. By Episode 3 you'll be tired, and the production-and-safety material is the part where you most need clarity. Spread the recording across three sessions if you can — your future viewers will hear the difference.
