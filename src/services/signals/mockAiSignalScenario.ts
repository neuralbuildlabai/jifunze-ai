import type { ExternalSignal } from '../../types/signal'
import type { SignalIngestionContext } from './types'

function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashSeed(parts: string[]): number {
  let h = 2166136261
  for (const p of parts) {
    for (let i = 0; i < p.length; i++) {
      h ^= p.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
  }
  return h >>> 0
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n))
}

type Template = {
  title: string
  summary: string
  path: string
  tags: string[]
  sentiment: NonNullable<ExternalSignal['sentiment']>
  /** Prior velocity hint 0–1 (boosted by RNG). */
  strengthHint: number
}

const TRENDS: Template[] = [
  {
    title: 'Spike: ChatGPT “custom GPT” walkthroughs outperform generic tips',
    summary:
      'Creators are screen-recording tool settings, sharing system prompts, and ending with one copy-paste workflow — high save rates on tutorial carousels.',
    path: '/trends/chatgpt-custom-gpt-walkthrough',
    tags: ['ChatGPT', 'tutorial', 'OpenAI', 'workflow', 'AI tools'],
    sentiment: 'positive',
    strengthHint: 0.82,
  },
  {
    title: 'Midjourney v6: side-by-side realism vs speed presets',
    summary:
      'Comparison posts stack two exports with identical prompts; audiences want latency + cost notes, not only pretty grids.',
    path: '/trends/midjourney-v6-comparison',
    tags: ['Midjourney', 'comparison', 'image generation', 'tutorial'],
    sentiment: 'neutral',
    strengthHint: 0.74,
  },
  {
    title: 'Breaking: major model vendor ships cheaper long-context API tier',
    summary:
      'Developer educators are translating release notes into “what breaks / what improves” for RAG apps and eval harnesses.',
    path: '/trends/model-api-pricing-shift',
    tags: ['API', 'breaking news', 'LLM', 'pricing', 'developer'],
    sentiment: 'neutral',
    strengthHint: 0.88,
  },
  {
    title: 'Use-case wave: “Claude Projects” for research briefs (non-coders included)',
    summary:
      'Step-by-step threads show foldering, citations, and guardrails; strong hook = before/after PDF summary quality.',
    path: '/trends/claude-projects-use-case',
    tags: ['Claude', 'Anthropic', 'use case', 'research', 'AI literacy'],
    sentiment: 'positive',
    strengthHint: 0.79,
  },
  {
    title: 'Gemini Live + mobile: what creators are demoing this week',
    summary:
      'Short-form demos highlight voice latency, tool calling, and on-device limits — audiences ask for honest failure clips.',
    path: '/trends/gemini-live-demos',
    tags: ['Gemini', 'Google', 'mobile AI', 'demo', 'voice'],
    sentiment: 'positive',
    strengthHint: 0.71,
  },
  {
    title: 'Perplexity vs traditional search: classroom-style breakdowns trend',
    summary:
      'Educators use a 4-slide carousel: query → sources pane → follow-ups → “when not to trust it” disclaimers.',
    path: '/trends/perplexity-vs-search-education',
    tags: ['Perplexity', 'comparison', 'RAG', 'tutorial', 'trust'],
    sentiment: 'neutral',
    strengthHint: 0.77,
  },
  {
    title: 'NotebookLM audio overviews: viral “study with me” AI format',
    summary:
      'TikTok hooks show the generated podcast in 10s; captions list three prompts that change the episode structure.',
    path: '/trends/notebooklm-audio-overview',
    tags: ['NotebookLM', 'Google', 'audio', 'study', 'AI tools'],
    sentiment: 'positive',
    strengthHint: 0.73,
  },
  {
    title: 'Cursor / Copilot-style IDEs: “ship a feature in 20 minutes” challenges',
    summary:
      'Live coding arcs compare autocomplete vs agent mode; threads end with repo hygiene and test checklist.',
    path: '/trends/ide-agent-challenges',
    tags: ['Cursor', 'GitHub Copilot', 'developer', 'tutorial', 'automation'],
    sentiment: 'positive',
    strengthHint: 0.8,
  },
  {
    title: 'EU AI Act headlines: what educators are clarifying for SMB audiences',
    summary:
      'Plain-language explainers separate obligations by company size; creators link to primary sources in thread 2.',
    path: '/trends/eu-ai-act-explainer',
    tags: ['policy', 'compliance', 'breaking news', 'SMB', 'trust'],
    sentiment: 'neutral',
    strengthHint: 0.69,
  },
  {
    title: 'Runway / Pika / Kling: motion-model comparison grids heat up',
    summary:
      'Same prompt, three outputs, one rubric (temporal consistency, artifacting, control). Saves spike on carousels.',
    path: '/trends/video-model-comparison',
    tags: ['Runway', 'Pika', 'comparison', 'video AI', 'benchmark'],
    sentiment: 'neutral',
    strengthHint: 0.76,
  },
  {
    title: 'Local LLMs on Apple Silicon: realistic throughput tutorials',
    summary:
      'Creators publish token/s charts, thermals, and battery hit — “what you can actually ship on a laptop” angle.',
    path: '/trends/local-llm-apple-silicon',
    tags: ['local LLM', 'MLX', 'tutorial', 'hardware', 'developer'],
    sentiment: 'positive',
    strengthHint: 0.72,
  },
  {
    title: 'Prompt injection demos: security educators gain traction',
    summary:
      'Short reels walk through a benign jailbreak then the fix; X threads list three mitigations with severity tags.',
    path: '/trends/prompt-injection-security',
    tags: ['security', 'LLM', 'tutorial', 'breaking news', 'risk'],
    sentiment: 'negative',
    strengthHint: 0.84,
  },
]

const NEWS: Template[] = [
  {
    title: 'OpenAI rolls out batch API pricing shift; educators parse impact on homework tools',
    summary:
      'Newsroom-style brief with quotes from release notes; adjacent explainers cover rate limits and caching for student-facing apps.',
    path: '/news/openai-batch-api',
    tags: ['OpenAI', 'API', 'pricing', 'education', 'LLM'],
    sentiment: 'neutral',
    strengthHint: 0.81,
  },
  {
    title: 'Anthropic publishes updated safety card alongside Claude feature drop',
    summary:
      'Wire story length: policy + product; creator reaction threads focus on tool-use reliability and eval deltas.',
    path: '/news/anthropic-safety-card',
    tags: ['Anthropic', 'Claude', 'safety', 'product launch', 'eval'],
    sentiment: 'neutral',
    strengthHint: 0.78,
  },
  {
    title: 'Adobe integrates generative fill updates; designers compare legacy vs AI-assisted workflows',
    summary:
      'Before/after asset packs trend on Instagram; news item anchors licensing and indemnity notes.',
    path: '/news/adobe-genfill-update',
    tags: ['Adobe', 'design', 'comparison', 'workflow', 'creative AI'],
    sentiment: 'positive',
    strengthHint: 0.7,
  },
  {
    title: 'Microsoft Build: Copilot Studio announcements spark “no-code agent” tutorials',
    summary:
      'Conference digest + three follow-on explainers: triggers, connectors, and failure handling patterns.',
    path: '/news/microsoft-build-copilot-studio',
    tags: ['Microsoft', 'Copilot', 'agents', 'tutorial', 'automation'],
    sentiment: 'positive',
    strengthHint: 0.83,
  },
]

const RSS: Template[] = [
  {
    title: 'Hugging Face model card templates now emphasize eval tables — RSS digest excerpt',
    summary:
      'Long-read excerpt shows how educators mirror cards in Notion; includes CSV export for classroom grading rubrics.',
    path: '/rss/hf-model-card-templates',
    tags: ['Hugging Face', 'eval', 'tutorial', 'open source', 'LLM'],
    sentiment: 'positive',
    strengthHint: 0.75,
  },
  {
    title: 'ElevenLabs + dubbing workflows: weekly roundup of creator experiments',
    summary:
      'Syndicated post highlights lip-sync pitfalls and consent practices; links to CC-licensed sample packs.',
    path: '/rss/elevenlabs-dubbing-roundup',
    tags: ['ElevenLabs', 'audio AI', 'use case', 'ethics', 'creators'],
    sentiment: 'neutral',
    strengthHint: 0.68,
  },
  {
    title: 'Notion AI database templates for course ops (RSS teaser)',
    summary:
      'Structured property patterns for cohorts, office hours, and rubric-linked feedback — aimed at bootcamp operators.',
    path: '/rss/notion-ai-course-ops',
    tags: ['Notion', 'automation', 'education', 'template', 'AI tools'],
    sentiment: 'positive',
    strengthHint: 0.66,
  },
]

const WEB: Template[] = [
  {
    title: 'Reddit thread: “Which small model beats GPT-4o-mini on my support ticket dataset?”',
    summary:
      'Synthetic public-web snippet: practitioners share JSONL eval scripts and latency charts; moderation note included for demo provenance.',
    path: '/web/reddit-small-model-bakeoff',
    tags: ['comparison', 'benchmark', 'developer', 'support', 'LLM'],
    sentiment: 'neutral',
    strengthHint: 0.77,
  },
  {
    title: 'Forum scrape: teachers compare MagicSchool vs custom GPTs for lesson plans',
    summary:
      'Community voice signal for demos; highlights price, privacy, and export formats — not endorsement.',
    path: '/web/forums-magicschool-vs-gpts',
    tags: ['education', 'comparison', 'ChatGPT', 'workflow', 'teachers'],
    sentiment: 'neutral',
    strengthHint: 0.72,
  },
  {
    title: 'GitHub Discussion: LangGraph patterns for human-in-the-loop agents',
    summary:
      'Developer monitor pulse: diagrams + minimal repro repos; velocity indicator for “agents” topic cluster.',
    path: '/web/github-langgraph-hitl',
    tags: ['LangGraph', 'agents', 'developer', 'tutorial', 'orchestration'],
    sentiment: 'positive',
    strengthHint: 0.8,
  },
]

const POOLS: Record<'trends' | 'news' | 'rss' | 'web_monitoring', Template[]> = {
  trends: TRENDS,
  news: NEWS,
  rss: RSS,
  web_monitoring: WEB,
}

export function buildDynamicAiSignals(input: {
  kind: keyof typeof POOLS
  providerId: string
  sourceLabel: string
  context: SignalIngestionContext
  /** How many items to emit this fetch (keeps batches lively but bounded). */
  count: number
}): ExternalSignal[] {
  const pool = POOLS[input.kind]
  const rnd = mulberry32(hashSeed([input.kind, input.providerId, input.context.fetched_at]))
  const start = Math.floor(rnd() * pool.length) % pool.length
  const out: ExternalSignal[] = []
  const baseTime = Date.parse(input.context.fetched_at)
  for (let i = 0; i < input.count; i++) {
    const tpl = pool[(start + i) % pool.length]
    const ageHours = rnd() * 56 + i * 1.7 + rnd() * 6
    const published_at = new Date(baseTime - ageHours * 3600000).toISOString()
    const jitter = rnd() * 0.24 - 0.1
    const signal_strength = clamp(tpl.strengthHint + jitter, 0.18, 0.98)
    const cr = globalThis.crypto
    const id =
      cr && typeof cr.randomUUID === 'function'
        ? `sig-${input.providerId}-${cr.randomUUID()}`
        : `sig-${input.providerId}-${baseTime}-${i}-${(rnd() * 1e9).toFixed(0)}`
    out.push({
      id,
      source: input.providerId,
      source_label: input.sourceLabel,
      signal_strength,
      title: tpl.title,
      summary: tpl.summary,
      url: `https://signals.jifunze.ai${tpl.path}?batch=${encodeURIComponent(input.context.fetched_at)}`,
      published_at,
      topic_tags: [...tpl.tags],
      sentiment: tpl.sentiment,
    })
  }
  return out
}
