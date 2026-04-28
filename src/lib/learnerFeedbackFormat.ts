/**
 * Structured learner validation feedback stored in `validation_feedback` (text column).
 * v1 JSON for rich UI; legacy newline blocks remain parseable for older rows.
 */

export type LearnerFeedbackPayloadV1 = {
  jfFeedback: 1
  summary: string
  strengths: string[]
  improvements: string[]
  nextStep: string | null
}

export function serializeLearnerFeedback(payload: Omit<LearnerFeedbackPayloadV1, 'jfFeedback'>): string {
  const body: LearnerFeedbackPayloadV1 = {
    jfFeedback: 1,
    summary: payload.summary,
    strengths: payload.strengths,
    improvements: payload.improvements,
    nextStep: payload.nextStep,
  }
  return JSON.stringify(body)
}

function parseLegacyParagraphFeedback(raw: string): Omit<LearnerFeedbackPayloadV1, 'jfFeedback'> {
  const parts = raw.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  const strengths: string[] = []
  const improvements: string[] = []
  let summary = ''

  for (const p of parts) {
    if (p.startsWith('What went well: ')) {
      strengths.push(p.slice('What went well: '.length).trim())
    } else if (p.startsWith('Improve: ')) {
      improvements.push(p.slice('Improve: '.length).trim())
    } else if (!summary) {
      summary = p
    }
  }

  return { summary, strengths, improvements, nextStep: null }
}

/** Normalize stored feedback for UI (structured JSON or legacy paragraphs). */
export function parseLearnerFeedback(raw: string | null | undefined): Omit<LearnerFeedbackPayloadV1, 'jfFeedback'> {
  if (!raw?.trim()) {
    return { summary: '', strengths: [], improvements: [], nextStep: null }
  }
  const t = raw.trim()
  if (t.startsWith('{') && t.includes('"jfFeedback"')) {
    try {
      const parsed = JSON.parse(t) as Partial<LearnerFeedbackPayloadV1>
      if (parsed && parsed.jfFeedback === 1) {
        return {
          summary: typeof parsed.summary === 'string' ? parsed.summary : '',
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths.filter((s) => typeof s === 'string') : [],
          improvements: Array.isArray(parsed.improvements)
            ? parsed.improvements.filter((s) => typeof s === 'string')
            : [],
          nextStep: typeof parsed.nextStep === 'string' && parsed.nextStep.trim() ? parsed.nextStep.trim() : null,
        }
      }
    } catch {
      /* fall through */
    }
  }
  return parseLegacyParagraphFeedback(raw)
}
