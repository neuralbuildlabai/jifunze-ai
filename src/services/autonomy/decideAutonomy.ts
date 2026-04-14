import { mergeBrandAutomationSettings } from '../../config/brandAutomationDefaults'
import type { BrandProfile } from '../../types/brand'
import type { AutonomyDecision, AutonomyPolicy, BrandSafetyFlags } from '../../types/autonomy'
import { DEFAULT_AUTONOMY_POLICY as POLICY } from '../../types/autonomy'
import type { TrendCategory } from '../../types/trendCategory'
import type { ContentDomain } from '../../types/contentDomain'
import type { ScoredSignal } from '../relevance/types'
import { computeBrandSafetyFlags } from './computeBrandSafetyFlags'
import { computeConfidenceAndRisk, domainMatchRole } from './computeConfidenceAndRisk'
import { inferSourceQuality } from './inferSourceQuality'

export type AutonomyEngineInput = {
  brand: BrandProfile
  policy?: AutonomyPolicy
  signal: ScoredSignal
  opportunity: {
    priority_score: number
    trend_category: TrendCategory
    content_domain: ContentDomain
    topic: string
    matched_keywords: string[]
  }
  /** Optional nudge from performance memory (rule-based learning layer). */
  learning?: {
    confidenceDelta: number
    reasonFragment?: string
  }
}

function haystackFrom(signal: ScoredSignal): string {
  return `${signal.title} ${signal.summary} ${signal.topic_tags.join(' ')}`
}

function isAmbiguousContent(
  signal: ScoredSignal,
  thresholds: AutonomyPolicy['thresholds'],
): boolean {
  const t = signal.title.trim().length
  const s = signal.summary.trim().length
  return t < thresholds.minTitleCharsForConfidence || s < thresholds.minSummaryCharsForConfidence
}

function withPausedAutomation(
  decision: AutonomyDecision,
  paused: boolean,
): AutonomyDecision {
  if (!paused) return decision
  if (
    decision.autonomy_action === 'ignore' ||
    decision.autonomy_action === 'watch' ||
    decision.autonomy_action === 'escalate_for_review'
  ) {
    return decision
  }
  return {
    autonomy_action: 'queue',
    autonomy_reason: `${decision.autonomy_reason} · Automation paused for this profile — approval required before execution.`,
    requires_human_review: true,
    risk_level: decision.risk_level,
    confidence_score: decision.confidence_score,
  }
}

/**
 * Rule-based autonomy: automate by default, escalate by exception.
 */
export function decideAutonomy(input: AutonomyEngineInput): AutonomyDecision {
  const policy = input.policy ?? POLICY
  const settings = mergeBrandAutomationSettings(input.brand)
  const signal = input.signal
  const opp = input.opportunity
  const hay = haystackFrom(signal)
  const safety: BrandSafetyFlags = computeBrandSafetyFlags(input.brand, hay)
  const sourceQuality = inferSourceQuality(signal.source)
  const domainRole = domainMatchRole(input.brand, opp.content_domain)
  const ambiguous = isAmbiguousContent(signal, policy.thresholds)

  let { confidence_score, risk_level } = computeConfidenceAndRisk({
    brand: input.brand,
    relevance: signal.relevance_score ?? 0,
    freshness: signal.freshness_score ?? 0,
    sourceQuality,
    domainRole,
    trend_category: opp.trend_category,
    ambiguousContent: ambiguous,
    safety,
    policy,
  })

  const learningDelta = input.learning?.confidenceDelta ?? 0
  if (learningDelta !== 0) {
    confidence_score = Math.min(1, Math.max(0, confidence_score + learningDelta))
  }

  const fresh = signal.freshness_score ?? 0
  const prio = opp.priority_score

  const base = (): AutonomyDecision => {
    if (safety.banned_topic_match) {
      return {
        autonomy_action: 'escalate_for_review',
        autonomy_reason:
          'Brand safety: banned-topic vocabulary detected — human review required before any automation.',
        requires_human_review: true,
        risk_level: 'high',
        confidence_score,
      }
    }

    if (
      settings.require_review_for_sensitive_topics &&
      safety.sensitive_topic_match &&
      !safety.banned_topic_match
    ) {
      return {
        autonomy_action: 'escalate_for_review',
        autonomy_reason:
          'Sensitive-topic keyword hit — routed for human review per profile policy.',
        requires_human_review: true,
        risk_level: 'medium',
        confidence_score,
      }
    }

    if (
      settings.require_review_for_low_confidence &&
      confidence_score < 0.46 &&
      risk_level !== 'low'
    ) {
      return {
        autonomy_action: 'escalate_for_review',
        autonomy_reason:
          'Confidence is below the safe band while risk is elevated — human review recommended.',
        requires_human_review: true,
        risk_level,
        confidence_score,
      }
    }

    if (risk_level === 'high') {
      return {
        autonomy_action: 'escalate_for_review',
        autonomy_reason:
          'Risk flagged as high (domain fit, competition, or trend shape) — hold for strategist review.',
        requires_human_review: true,
        risk_level,
        confidence_score,
      }
    }

    if (
      prio <= policy.thresholds.autonomousIgnoreMaxPriority &&
      confidence_score <= policy.thresholds.autonomousIgnoreMaxConfidence &&
      risk_level === 'low'
    ) {
      return {
        autonomy_action: 'ignore',
        autonomy_reason:
          'Low composite value autonomous skip — no draft or calendar action.',
        requires_human_review: false,
        risk_level: 'low',
        confidence_score,
      }
    }

    const canPublish =
      settings.auto_publish_enabled &&
      risk_level === 'low' &&
      !safety.sensitive_topic_match &&
      !safety.competitor_mention &&
      confidence_score >= settings.minimum_confidence_for_auto_publish &&
      prio >= settings.minimum_priority_for_auto_queue &&
      fresh >= policy.thresholds.staleFreshnessForPublish &&
      settings.allowed_auto_publish_categories.includes(opp.trend_category) &&
      !settings.blocked_auto_publish_categories.includes(opp.trend_category)

    if (canPublish) {
      return {
        autonomy_action: 'publish',
        autonomy_reason:
          'High-confidence, in-policy item — marked ready for autonomous publish path (connector executes later).',
        requires_human_review: false,
        risk_level: 'low',
        confidence_score,
      }
    }

    const canQueue =
      settings.auto_queue_enabled &&
      prio >= settings.minimum_priority_for_auto_queue &&
      confidence_score >= 0.55 &&
      !(safety.sensitive_topic_match && settings.require_review_for_sensitive_topics)

    if (canQueue) {
      return {
        autonomy_action: 'queue',
        autonomy_reason:
          'Meets queue thresholds — scheduled for content ops without human gate (profile allows).',
        requires_human_review: false,
        risk_level,
        confidence_score,
      }
    }

    const canDraft =
      settings.auto_draft_enabled &&
      confidence_score >= 0.48 &&
      prio >= 0.32 &&
      (risk_level === 'low' || (risk_level === 'medium' && confidence_score >= 0.62))

    if (canDraft) {
      return {
        autonomy_action: 'draft',
        autonomy_reason:
          'Eligible for autonomous draft generation — low-risk match to domain, trend, and freshness.',
        requires_human_review: false,
        risk_level,
        confidence_score,
      }
    }

    if (prio < settings.minimum_priority_for_auto_queue && confidence_score >= 0.4) {
      return {
        autonomy_action: 'watch',
        autonomy_reason:
          'On radar only — priority below auto-queue bar; monitor for movement or refresh.',
        requires_human_review: false,
        risk_level,
        confidence_score,
      }
    }

    if (confidence_score < 0.5 || risk_level === 'medium') {
      return {
        autonomy_action: 'escalate_for_review',
        autonomy_reason:
          'Borderline fit or elevated sensitivity — strategist review before automation proceeds.',
        requires_human_review: true,
        risk_level,
        confidence_score,
      }
    }

    return {
      autonomy_action: 'watch',
      autonomy_reason: 'Default watch state — no automatic execution on this pass.',
      requires_human_review: false,
      risk_level,
      confidence_score,
    }
  }

  const decision = base()
  const withLearningNote =
    input.learning?.reasonFragment?.trim() && learningDelta !== 0
      ? {
          ...decision,
          autonomy_reason: `${decision.autonomy_reason} · Learning: ${input.learning.reasonFragment}`,
        }
      : decision
  return withPausedAutomation(withLearningNote, !settings.automation_enabled)
}
