import type { FlagshipSessionContentBlock } from '../data/learning/flagshipSessionContentTypes'
import type { LearnerArtifactValidationStatus } from './learnerCourseArtifactTypes'
import { blockSuggestsPortfolioEvidence } from './flagshipSessionResponseBlocks'

export type FlagshipValidationResult = {
  status: LearnerArtifactValidationStatus
  summary: string
  strengths: string[]
  improvements: string[]
  acceptedAsModuleEvidence: boolean
  capstoneCandidate: boolean
  /** 0–1 heuristic score for future AI replacement */
  score: number
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function wordSet(s: string): Set<string> {
  return new Set(
    normalize(s)
      .split(/[^a-z0-9]+/i)
      .filter((w) => w.length > 2),
  )
}

/** Jaccard-like overlap between response and prompt — high overlap suggests copying. */
function promptOverlapRatio(prompt: string, response: string): number {
  const pw = wordSet(prompt)
  const rw = wordSet(response)
  if (pw.size === 0 || rw.size === 0) return 0
  let inter = 0
  for (const w of rw) {
    if (pw.has(w)) inter += 1
  }
  return inter / rw.size
}

function looksLikeNonsense(text: string): boolean {
  const t = text.trim()
  if (t.length < 8) return true
  const letters = (t.match(/[a-z]/gi) ?? []).length
  if (letters / t.length < 0.35) return true
  if (/^(.)\1{12,}$/i.test(t.replace(/\s/g, ''))) return true
  return false
}

function taskWantsEvidence(block: FlagshipSessionContentBlock): boolean {
  const hay = `${block.prompt ?? ''} ${block.body ?? ''} ${block.outputExpectation ?? ''}`.toLowerCase()
  return /evidence|citation|source|verify|prove|link|quote|data/i.test(hay)
}

function taskWantsUncertainty(block: FlagshipSessionContentBlock): boolean {
  const hay = `${block.eyebrow ?? ''} ${block.title ?? ''} ${block.prompt ?? ''}`.toLowerCase()
  return /uncertain|risk|limit|failure|tradeoff|assumption|unknown|limitation/i.test(hay)
}

/**
 * Rule-based validation (v1). Replace with server-side / AI validation later via same result shape.
 */
export function validateFlagshipLearnerResponse(
  block: FlagshipSessionContentBlock,
  responseText: string,
): FlagshipValidationResult {
  const text = responseText.trim()
  const prompt = block.prompt ?? block.body ?? ''
  const strengths: string[] = []

  if (!text) {
    return {
      status: 'needs_more_work',
      summary: 'Add a response before running a check.',
      strengths,
      improvements: ['Write at least a short paragraph that answers the prompt in your own words.'],
      acceptedAsModuleEvidence: false,
      capstoneCandidate: false,
      score: 0,
    }
  }

  if (looksLikeNonsense(text)) {
    return {
      status: 'needs_more_work',
      summary: 'This does not look like a serious attempt yet.',
      strengths: [],
      improvements: [
        'Use real sentences about your situation, constraints, or next actions.',
        'Avoid placeholders, keyboard mash, or empty filler.',
      ],
      acceptedAsModuleEvidence: false,
      capstoneCandidate: false,
      score: 0.05,
    }
  }

  const overlap = promptOverlapRatio(prompt, text)
  if (overlap > 0.55 && text.length < 220) {
    return {
      status: 'needs_more_work',
      summary: 'Too close to the prompt text — add your own analysis and specifics.',
      strengths: [],
      improvements: [
        'Paraphrase the task in one sentence, then answer with your context (role, stakes, unknowns).',
        'Add one concrete example or observation that is not already in the prompt.',
      ],
      acceptedAsModuleEvidence: false,
      capstoneCandidate: false,
      score: 0.15,
    }
  }

  if (text.length < 48) {
    return {
      status: 'needs_more_work',
      summary: 'Good start — go deeper so a reviewer can see your judgment.',
      strengths: ['You engaged with the prompt.'],
      improvements: [
        'Add specifics: who, what decision, what evidence you have, what you still do not know.',
        'Aim for at least 4–6 sentences unless the prompt explicitly asks for less.',
      ],
      acceptedAsModuleEvidence: false,
      capstoneCandidate: false,
      score: 0.25,
    }
  }

  if (taskWantsEvidence(block)) {
    const hasSignal = /because|therefore|observed|measured|source|link|data|example|instance|quote|cite|evidence|compared/i.test(
      text,
    )
    if (!hasSignal) {
      return {
        status: 'almost_ready',
        summary: 'Solid writing — tie claims more clearly to evidence or examples.',
        strengths: ['Clear enough to follow.'],
        improvements: [
          'Name one piece of evidence, observation, or source that supports your main claim.',
          'If you have no evidence yet, say what you would collect next and why.',
        ],
        acceptedAsModuleEvidence: false,
        capstoneCandidate: blockSuggestsPortfolioEvidence(block),
        score: 0.55,
      }
    }
  }

  if (taskWantsUncertainty(block)) {
    const hasLimit = /uncertain|unknown|risk|limit|might|could be wrong|not sure|gap|assumption/i.test(text)
    if (!hasLimit) {
      return {
        status: 'almost_ready',
        summary: 'Add a line about uncertainty, limits, or what could prove you wrong.',
        strengths: ['You addressed the reflection direction.'],
        improvements: [
          'Name one risk, unknown, or limitation you are carrying into the next step.',
        ],
        acceptedAsModuleEvidence: false,
        capstoneCandidate: blockSuggestsPortfolioEvidence(block),
        score: 0.58,
      }
    }
  }

  if (text.length < 120 && overlap > 0.35) {
    return {
      status: 'almost_ready',
      summary: 'Almost there — stretch with one more concrete detail.',
      strengths: ['On-topic and readable.'],
      improvements: ['Add a named stakeholder, metric, deadline, or artifact you will produce next.'],
      acceptedAsModuleEvidence: false,
      capstoneCandidate: blockSuggestsPortfolioEvidence(block),
      score: 0.62,
    }
  }

  if (text.length < 96) {
    return {
      status: 'almost_ready',
      summary: 'Close — add a bit more so your judgment is visible to a reviewer.',
      strengths: ['You are on the right track.'],
      improvements: [
        'Expand with one more sentence on impact, tradeoffs, or what you will do next.',
      ],
      acceptedAsModuleEvidence: false,
      capstoneCandidate: blockSuggestsPortfolioEvidence(block),
      score: 0.65,
    }
  }

  strengths.push('Answers the prompt in your own words.')
  if (text.length >= 160) strengths.push('Enough depth for a reviewer skim.')
  if (/because|therefore|so that|next step|i will|we will/i.test(text)) strengths.push('Shows reasoning or forward motion.')

  const portfolio = blockSuggestsPortfolioEvidence(block)
  const strong = portfolio && text.length >= 220 && overlap < 0.45

  if (strong) {
    return {
      status: 'strong_portfolio_evidence',
      summary: 'Strong enough to reuse in your portfolio or capstone evidence pack.',
      strengths,
      improvements: [],
      acceptedAsModuleEvidence: true,
      capstoneCandidate: true,
      score: 0.92,
    }
  }

  return {
    status: 'accepted',
    summary: 'Accepted as module evidence — clear enough to stand in your learning record.',
    strengths,
    improvements: portfolio
      ? ['Optional: add a sentence on how you would reuse this in your capstone or work context.']
      : [],
    acceptedAsModuleEvidence: true,
    capstoneCandidate: portfolio,
    score: 0.78,
  }
}
