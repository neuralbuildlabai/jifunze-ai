# Video render pipeline — status

> **Day-to-day operation, commands, quality tiers and troubleshooting live in
> [`video-pipeline.md`](./video-pipeline.md).** This document covers setup/status only.

Faceless vertical video from a brief: captions + music + pluggable visuals.
**No voiceover, no manual work.** Proven working 2026-08-18 (test render:
1080×1920 H.264, captions wrapping correctly, $0 generated background).

## Cost: $0 by default
- FFmpeg render + captions: free
- Stock visuals (Pexels): free API key
- Generated gradient fallback: zero-dependency, no key
- AI visuals: OFF by default; only source that ever bills
- Music: royalty-free, bundled

## Run locally
```bash
cd render
VISUAL_PROVIDER=generated node --experimental-strip-types src/render.ts brief.json out.mp4
# or VISUAL_PROVIDER=stock with PEXELS_API_KEY set (free)
```

## Still to wire
1. GitHub Actions cron: pull queued brief → render → upload to Supabase Storage → call publish-instagram
2. Supabase Storage bucket for the public video_url
3. Brief generator (upstream) that turns a ranked opportunity into this brief shape
4. Server-side scoring feeding that generator
