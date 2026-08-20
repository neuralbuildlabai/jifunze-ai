/**
 * LLM provider abstraction for the Wave 2 authoring CLIs.
 *
 * Pluggable: pick provider at runtime based on env. Both Anthropic and OpenAI implementations
 * are supported. Keys are read from process.env and never logged.
 *
 * Provider selection:
 *   LLM_PROVIDER=anthropic | openai (default: anthropic if ANTHROPIC_API_KEY set, else openai)
 *   ANTHROPIC_API_KEY=...
 *   ANTHROPIC_MODEL=claude-sonnet-4-6 (default)
 *   OPENAI_API_KEY=...
 *   OPENAI_MODEL=gpt-4o (default)
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

export type LlmProviderName = 'anthropic' | 'openai'

export type LlmCompleteRequest = {
  /** System prompt prepended to the conversation (STYLE.md + SCHEMA.md + task instructions). */
  system: string
  /** User prompt — the actual task description and inputs. */
  user: string
  /** Maximum output tokens; provider-specific cap applies. */
  maxOutputTokens?: number
  /** Sampling temperature (0–1). 0.3 is sensible for structured authoring. */
  temperature?: number
}

export type LlmCompleteResponse = {
  text: string
  inputTokens: number | null
  outputTokens: number | null
  model: string
  provider: LlmProviderName
}

export type LlmProvider = {
  name: LlmProviderName
  model: string
  complete: (req: LlmCompleteRequest) => Promise<LlmCompleteResponse>
}

// ---------------------------------------------------------------------------
// .env loader (zero-dep, just reads .env into process.env if not already set)
// ---------------------------------------------------------------------------

let envLoaded = false
export function loadDotenv(): void {
  if (envLoaded) return
  envLoaded = true
  const repoRoot = path.resolve(__dirname, '..', '..')
  for (const filename of ['.env.local', '.env']) {
    const filePath = path.join(repoRoot, filename)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, 'utf8')
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx < 0) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let val = trimmed.slice(eqIdx + 1).trim()
      // Strip optional surrounding quotes
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      if (!(key in process.env)) process.env[key] = val
    }
  }
}

// ---------------------------------------------------------------------------
// Provider factory
// ---------------------------------------------------------------------------

export function resolveProvider(): LlmProvider {
  loadDotenv()
  const requested = (process.env.LLM_PROVIDER ?? '').toLowerCase()
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY)
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY)

  let provider: LlmProviderName
  if (requested === 'anthropic' || requested === 'openai') {
    provider = requested
  } else if (hasAnthropic) {
    provider = 'anthropic'
  } else if (hasOpenAI) {
    provider = 'openai'
  } else {
    throw new Error(
      'No LLM provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY in .env.local (and optionally LLM_PROVIDER, ANTHROPIC_MODEL, OPENAI_MODEL).',
    )
  }

  if (provider === 'anthropic') {
    if (!hasAnthropic) throw new Error('LLM_PROVIDER=anthropic but ANTHROPIC_API_KEY is not set.')
    const model = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6'
    return {
      name: 'anthropic',
      model,
      complete: (req) => completeAnthropic(req, model, process.env.ANTHROPIC_API_KEY!),
    }
  }

  if (!hasOpenAI) throw new Error('LLM_PROVIDER=openai but OPENAI_API_KEY is not set.')
  const model = process.env.OPENAI_MODEL ?? 'gpt-4o'
  return {
    name: 'openai',
    model,
    complete: (req) => completeOpenAI(req, model, process.env.OPENAI_API_KEY!),
  }
}

// ---------------------------------------------------------------------------
// Anthropic implementation (Messages API)
// ---------------------------------------------------------------------------

async function completeAnthropic(
  req: LlmCompleteRequest,
  model: string,
  apiKey: string,
): Promise<LlmCompleteResponse> {
  const body = {
    model,
    max_tokens: req.maxOutputTokens ?? 8000,
    temperature: req.temperature ?? 0.3,
    system: req.system,
    messages: [{ role: 'user', content: req.user }],
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Anthropic API ${res.status}: ${errBody}`)
  }

  const json = (await res.json()) as {
    content: Array<{ type: string; text?: string }>
    usage?: { input_tokens?: number; output_tokens?: number }
  }
  const text = json.content
    .filter((c) => c.type === 'text' && typeof c.text === 'string')
    .map((c) => c.text!)
    .join('\n')

  return {
    text,
    inputTokens: json.usage?.input_tokens ?? null,
    outputTokens: json.usage?.output_tokens ?? null,
    model,
    provider: 'anthropic',
  }
}

// ---------------------------------------------------------------------------
// OpenAI implementation (Chat Completions API)
// ---------------------------------------------------------------------------

async function completeOpenAI(
  req: LlmCompleteRequest,
  model: string,
  apiKey: string,
): Promise<LlmCompleteResponse> {
  const body = {
    model,
    max_tokens: req.maxOutputTokens ?? 8000,
    temperature: req.temperature ?? 0.3,
    messages: [
      { role: 'system', content: req.system },
      { role: 'user', content: req.user },
    ],
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`OpenAI API ${res.status}: ${errBody}`)
  }

  const json = (await res.json()) as {
    choices: Array<{ message?: { content?: string } }>
    usage?: { prompt_tokens?: number; completion_tokens?: number }
  }
  const text = json.choices[0]?.message?.content ?? ''

  return {
    text,
    inputTokens: json.usage?.prompt_tokens ?? null,
    outputTokens: json.usage?.completion_tokens ?? null,
    model,
    provider: 'openai',
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Reads STYLE.md and SCHEMA.md from content/ — these are prepended to every authoring system prompt.
 */
export function loadAuthoringContext(): { style: string; schema: string } {
  const repoRoot = path.resolve(__dirname, '..', '..')
  const style = fs.readFileSync(path.join(repoRoot, 'content', 'STYLE.md'), 'utf8')
  const schema = fs.readFileSync(path.join(repoRoot, 'content', 'SCHEMA.md'), 'utf8')
  return { style, schema }
}
