# Caption Files (SRT)

One `.srt` draft per session. **These are estimated drafts, not final timing.** They were generated programmatically from `voiceover-script.md` at 140 words per minute, with caption blocks of 1–11 words split at sentence and clause boundaries.

## What you have

| File | Caption blocks | Estimated runtime |
|---|---|---|
| `session-01-intro.srt` | 98 | ~4:58 |
| `session-02-core-principles.srt` | 137 | ~6:55 |
| `session-03-techniques.srt` | 161 | ~7:37 |
| `session-04-refinement.srt` | 99 | ~5:01 |
| `session-05-mistakes-safety.srt` | 85 | ~4:08 |
| `session-06-completion.srt` | 56 | ~2:59 |
| **Total** | **636** | **~31:40** |

## What needs to happen during edit

1. **Re-time against the actual recorded audio.** Most modern editors (Descript, Premiere, DaVinci Resolve, Final Cut Pro) auto-generate SRT from the recorded narration in one click, then let you nudge timings by ear. The drafts here are useful as a sanity check — caption count, block phrasing — not as final timestamps.

2. **Verify technical terms.** The auto-generated transcript may misspell *zero-shot*, *chain-of-thought*, *meta-prompting*, *hallucinate*, *temperature* (as parameter, not weather). Search-and-replace in the SRT is fast.

3. **Keep blocks under ~3 lines (about 80 characters per line).** YouTube and most LMS players truncate beyond that. The drafts here cap at ~11 words per block, which usually fits in 1–2 lines.

4. **Choose your encoding.** All drafts are UTF-8 without BOM. If your platform requires CRLF line endings (some Windows-based LMS systems), convert before upload.

5. **Validate playback.** Drop the SRT into a video player (VLC works) before delivering. If captions don't appear, check the filename matches the MP4 stem exactly (e.g., `session-03-techniques.mp4` ↔ `session-03-techniques.srt`).

## Regenerating from the script

If `voiceover-script.md` changes, regenerate the SRT drafts. The generator script is embedded in the repo's recording workflow — re-running it produces fresh drafts with updated text and timing.

## When to discard the drafts

If your editor's auto-transcription tool produces tighter captions (Descript and Otter both do), use those instead. The drafts in this folder are the floor, not the ceiling.
