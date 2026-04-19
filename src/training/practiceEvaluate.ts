import type { LessonPracticeExercise } from './practiceTypes'

export type PracticeEvalResult = {
  passed: boolean
  score01: number
  feedback_lines: string[]
}

function normToken(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)
}

/** Deterministic heuristic: length + keyword coverage (no LLM). */
export function evaluatePracticeSubmission(
  text: string,
  exercise: LessonPracticeExercise,
): PracticeEvalResult {
  const trimmed = text.trim()
  const chars = trimmed.length
  const feedback_lines: string[] = []

  if (chars < exercise.min_chars) {
    feedback_lines.push(
      `Add specificity: aim for at least ${exercise.min_chars} characters (currently ${chars}). Explain decisions, stakeholders, or constraints.`,
    )
  }

  const tokens = new Set(normToken(trimmed))
  let kwHits = 0
  for (const kw of exercise.rubric_keywords) {
    const k = kw.trim().toLowerCase()
    if (!k) continue
    if (tokens.has(k) || trimmed.toLowerCase().includes(k)) kwHits += 1
  }
  const minKw = exercise.tier >= 3 ? 3 : exercise.tier >= 2 ? 2 : 2
  if (kwHits < minKw) {
    feedback_lines.push(
      `Strengthen linkage to outcomes: weave in evidence of ≥${minKw} of these ideas (you showed ${kwHits}): ${exercise.rubric_keywords.slice(0, 6).join(', ')}.`,
    )
  }

  const sentences = trimmed.split(/[.!?]+\s+/).filter((s) => s.trim().length > 8).length
  const sentenceOk = exercise.tier === 1 ? sentences >= 2 : sentences >= 3
  if (!sentenceOk) {
    feedback_lines.push(
      exercise.tier === 1
        ? `Add at least two concrete sentences or bullets so the situation and decision are visible.`
        : `Break your response into at least three clear sentences or bullets so a reviewer could follow your reasoning.`,
    )
  }

  const passed = chars >= exercise.min_chars && kwHits >= minKw && sentenceOk

  const denom = Math.max(1, exercise.min_chars / 120 + minKw + (exercise.tier >= 2 ? 1 : 0))
  const num =
    Math.min(chars / exercise.min_chars, 1.5) * 0.45 +
    Math.min(kwHits / Math.max(minKw, 1), 1.5) * 0.45 +
    Math.min(sentences / 4, 1) * 0.1
  const score01 = Math.min(1, Math.max(0, num / denom))

  if (passed) {
    feedback_lines.unshift(`Looks solid for tier ${exercise.tier}: you tied the response to observable outcomes and provided enough specificity.`)
  }

  return { passed, score01, feedback_lines }
}
