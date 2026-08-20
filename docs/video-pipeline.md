# Jifunze.ai video pipeline

The operational guide for the autonomous content loop: what it does, how to run
it, and what to check when it misbehaves.

Related: [`AUTONOMOUS_LOOP_DEPLOYMENT.md`](./AUTONOMOUS_LOOP_DEPLOYMENT.md) covers
one-time Supabase/Instagram setup; [`signal-ingestion-architecture.md`](./signal-ingestion-architecture.md)
covers where signals come from. This document is the day-to-day one.

---

## 1. What the autonomous loop does

One pass, once a day, entirely server-side in GitHub Actions:

```
ingest (separate Supabase cron)
        │
        ▼
   select  ──►  brief  ──►  quality gate  ──►  render  ──►  upload  ──►  publish
 (hybrid)      (LLM or     (scriptQuality)    (ffmpeg)     (Supabase)   (Instagram,
               template)                                                 kill-switched)
```

| Stage | File | Needs |
|---|---|---|
| select | `orchestrator/select.ts`, `orchestrator/score.ts` | nothing |
| brief | `orchestrator/brief.ts`, `orchestrator/contentBank.ts` | `OPENAI_API_KEY` *(optional)* |
| quality gate | `orchestrator/scriptQuality.ts` | nothing |
| render | `render/src/render.ts`, `render/providers/*` | ffmpeg; `PEXELS_API_KEY` *(optional)* |
| upload | `orchestrator/storage.ts` | Supabase |
| publish | `supabase/functions/publish-instagram` | Supabase + `IG_PUBLISH_ENABLED=true` |

Nothing is posted unless **all** of these are true: `DRY_RUN` is not `true`,
Supabase credentials exist, and the `IG_PUBLISH_ENABLED` Supabase secret is
`"true"`.

---

## 2. Evergreen-first hybrid selection

**Evergreen is the backbone. News is the exception.** The platform teaches
practical career and digital skills; it is not an AI-news channel.

- `orchestrator/contentBank.ts` holds 16 evergreen how-to topics across six
  pillars (`cv`, `interview`, `ai_task`, `money`, `applications`, `mindset`).
- `pickEvergreen(runDate)` rotates deterministically by date, so the full bank is
  used before any topic repeats. Pass `{ exclude: [...] }` to skip topics used
  recently (re-runs, backfills).
- Every topic ships a hand-written `script` that passes the quality gate on its
  own. **A run with no API keys at all is still publishable**, not filler.

News only displaces evergreen when it clears the gate below. Otherwise the loop
logs why and falls back.

---

## 3. How the news gate works

Two independent checks in `orchestrator/score.ts`:

**a. Off-brand veto.** An outright rejection regardless of keywords:
child/teen safety, celebrity, political, religious/festival, funding and
valuation hype, model-launch hype, gambling/crypto. A story caught here scores
`0`.

**b. Career concepts, not keywords.** Terms are grouped into concept families
(`jobs`, `hiring`, `cv`, `interview`, `application`, `freelance`, `remote`,
`skills`, `pay`, `career`, `workertools`). `careerScore = distinct families / 3`,
capped at 1. A story must reach **`NEWS_BAR = 0.66`** — two distinct concepts —
and be fresh (`freshness >= 0.5`, roughly the last two days).

Grouping is the point: "jobs / job market / job search" in one headline is *one*
concept. The old flat keyword list let substring double-counting push generic
"AI will take your jobs" commentary over the bar.

```
REJECT  0.00  OpenAI launches new teen safety controls        vetoed: child/teen safety story
REJECT  0.00  AI startup raises $200m at a $3bn valuation      vetoed: funding/valuation hype
REJECT  0.33  AI could take your jobs, report warns            concepts: jobs
ACCEPT  1.00  Employers are increasingly using AI to screen resumes   concepts: jobs + hiring + cv
ACCEPT  1.00  Remote work hiring rebounds for junior roles     concepts: jobs + hiring + interview + remote
ACCEPT  0.67  Freelance platform changes its fees              concepts: freelance + pay
```

Reproduce that table any time:

```bash
npm run video:test-news-gate
npm run video:test-news-gate -- --title "Your headline here" --summary "..."
```

Every rejection is recorded with a reason in `loop-artifacts/decision.json` and
in the CI log.

---

## 4. Script quality gate

`orchestrator/scriptQuality.ts` runs on every brief before render. Errors block
the render (set `CONTENT_STRICT=false` to downgrade to warnings).

It rejects:

- hooks over 8 words or 60 characters, and empty hooks
- fewer than 3 or more than 6 segments; any segment over 8 words
- captions over 180 characters, or missing the `link in bio` CTA
- stock filler: *"in today's fast-paced world"*, *"AI is changing everything"*,
  *"let's dive in"*, *"this is important for everyone"*, *"game changer"*,
  *"revolutionize"*, *"unlock the power"*, *"stay tuned"* …
- scripts with **no action verb in any segment** — i.e. nothing the viewer can
  actually go and do

Tone target: practical, warm, clear, adult, useful, non-hype, career/skills
focused.

---

## 5. Quality tiers

| Tier | `VISUAL_PROVIDER` | What it is | Cost |
|---|---|---|---|
| 1 | `fallback` | Flat ffmpeg gradient, no brand art. **Emergency only** — never selected automatically. | $0 |
| 2 | `designed` | **The default.** Branded background (near-black + brand violet/blue glows), slow Ken Burns push, film grain, corner brand mark, kinetic captions with keyword highlight, progress bar, branded end card. | $0 |
| 3 | `stock` | The same designed treatment over real Pexels B-roll. | $0 (free API key) |
| 4 | human-recorded | Long-term premium path. Not implemented. | — |

Resolution rules (`render/providers/registry.ts`):

```
(unset) / designed  ->  designed
stock               ->  stock if PEXELS_API_KEY is set, else designed (warns)
fallback            ->  fallback (warns — you asked for it explicitly)
ai                  ->  ai stub, which itself falls back to designed
generated           ->  designed (DEPRECATED alias, warns)
anything else       ->  designed (warns)
```

**Nothing ever silently lands on `fallback`.**

---

## 6. Running locally

Requires Node 22+ and `ffmpeg` on PATH (`brew install ffmpeg` /
`sudo apt-get install ffmpeg fonts-dejavu-core`). No secrets needed.

```bash
npm install

# content only — selection, brief, quality gate. No ffmpeg, no network.
npm run video:dry-run
npm run video:dry-run -- --date 2026-09-01
npm run video:dry-run -- --signals ./my-signals.json

# see the news gate decide
npm run video:test-news-gate

# render a real video
npm run video:render:designed      # branded default, $0
npm run video:render:stock         # needs PEXELS_API_KEY, else falls back
npm run video:evergreen            # same as render:designed, provider from env

# the full loop
npm run autonomous:offline         # never touches Supabase; renders, publishes nothing
npm run autonomous:dry-run         # uses Supabase if configured; publishes nothing
npm run autonomous:once            # the real daily pass (publishes if enabled)
npm run video:daily                # alias of autonomous:once

# validation
npm run test                       # content engine suite (offline, no secrets)
npm run lint
npm run typecheck:pipeline         # orchestrator/ + render/ (NOT covered by npm run build)
npm run autonomous:validate        # test + lint + typecheck:pipeline + build

# regenerate the designed background after editing the palette
npm run video:brand-bg
```

---

## 7. Triggering the GitHub Action

**UI:** Actions → *Autonomous content loop* → **Run workflow**. Two inputs:
`dry_run` (default **true**) and `visual_provider` (default `designed`).

**CLI:**

```bash
gh workflow run "Autonomous content loop"
gh workflow run "Autonomous content loop" -f dry_run=false -f visual_provider=stock
gh run list --workflow=autonomous-loop.yml --limit 3
gh run view <run-id> --log
```

The workflow runs two jobs. `validate` is secret-free and fast (tests, lint,
typecheck, offline dry run) and gates `run`, which installs ffmpeg and renders.
`permissions: contents: read` — **the workflow never commits generated content
back to the repo.** Output leaves as workflow artifacts only.

Repository variables (Settings → Secrets and variables → Actions → Variables):

| Variable | Effect |
|---|---|
| `DRY_RUN` | `true` = scheduled runs render + upload the artifact but never publish. Unset falls through to `true`; set `false` explicitly to allow publishing |
| `VISUAL_PROVIDER` | default tier for scheduled runs (`designed` if unset) |

---

## 8. Adding `PEXELS_API_KEY`

Pexels is **optional**. Without it the loop uses the designed tier and stays
green.

1. Create a free account at <https://www.pexels.com/api/> and copy the key.
2. GitHub → repo **Settings → Secrets and variables → Actions → New repository
   secret** → name `PEXELS_API_KEY`.
3. Set the repo variable `VISUAL_PROVIDER=stock` (or pick `stock` when
   dispatching manually).
4. Locally: `PEXELS_API_KEY=... npm run video:render:stock`.

The key is server-side only. It is read exclusively in
`render/providers/stockProvider.ts`, which is never imported from `src/`, so it
cannot reach the browser bundle. Search phrases are translated from topic tags
(`cv` → *"writing notebook desk closeup"*) rather than searching raw tags, and
any miss — no key, rate limit, non-portrait results, download failure — degrades
to `designed` rather than shipping irrelevant footage.

---

## 9. Inspecting the output

Everything lands in **`loop-artifacts/`** (gitignored):

| File | What |
|---|---|
| `<brief-id>.mp4` | the render, 1080×1920 H.264 30fps |
| `poster.jpg` | frame at 1.2s, for a fast look |
| `decision.json` | mode, audience, selection reason, rejected news + reasons, quality report, the brief, provider |

From CI: the `run` job uploads `loop-output` (7-day retention) and the
`validate` job uploads `content-decision`. Download from the run summary page or
`gh run download <run-id>`.

Quick checks on a local render:

```bash
ffprobe -v error -show_entries stream=width,height,codec_name -of default=noprint_wrappers=1 loop-artifacts/*.mp4
ffmpeg -ss 16.8 -i loop-artifacts/*.mp4 -frames:v 1 /tmp/endcard.png   # end card
```

A good frame has: the corner brand mark, a progress bar that has advanced, one
accent-coloured keyword, and captions inside the safe area (nothing below
y≈1600, where TikTok/Reels UI sits).

---

## 10. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `script quality gate failed` | the LLM produced filler or an over-long hook | read the errors in the log / `decision.json`; re-run. `CONTENT_STRICT=false` renders anyway (not recommended) |
| Output looks like a flat gradient | `VISUAL_PROVIDER=fallback`, or `render/assets/bg/brand-bg.png` is missing | `npm run video:brand-bg`; check the `[visual]` warning in the log |
| `[visual] ... PEXELS_API_KEY is not set` | expected when `stock` is requested without a key | add the secret, or set `VISUAL_PROVIDER=designed` |
| `render: ffmpeg failed` | ffmpeg missing, or no DejaVu fonts | install `ffmpeg` **and** `fonts-dejavu-core` |
| `SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are required to publish` | a live run without credentials | set the secrets, or run with `DRY_RUN=true` / `LOOP_OFFLINE=true` |
| Loop picks news you consider off-brand | the gate needs tuning | add a veto phrase or a concept family in `orchestrator/score.ts`, add a case to `scripts/test-content-engine.ts` |
| Same evergreen topic twice | a re-run on the same date | expected — rotation is date-keyed; pass `exclude` for backfills |
| Video has no audio | no music bed is committed | add a royalty-free track at `render/assets/music/bed.m4a`; it is picked up automatically |
| Nothing published, run green | `IG_PUBLISH_ENABLED` is not `"true"`, or `DRY_RUN=true` | intended kill switch |
