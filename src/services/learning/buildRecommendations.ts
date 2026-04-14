import type {
  OptimizationInsight,
  StrategyAdjustmentRecommendation,
} from '../../types/performanceLearning'

function dedupe(
  rows: StrategyAdjustmentRecommendation[],
): StrategyAdjustmentRecommendation[] {
  const seen = new Set<string>()
  const out: StrategyAdjustmentRecommendation[] = []
  for (const r of rows) {
    const key = `${r.kind}:${JSON.stringify(r.payload ?? {})}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(r)
  }
  return out
}

function weightFromInsight(i: OptimizationInsight): number {
  if (i.confidence === 'high') return 0.92
  if (i.confidence === 'medium') return 0.72
  return 0.5
}

/**
 * Turns insights into actionable strategy rows (rules engine input).
 */
export function buildStrategyRecommendations(
  brandProfileId: string,
  insights: OptimizationInsight[],
): StrategyAdjustmentRecommendation[] {
  const createdAt = new Date().toISOString()
  const out: StrategyAdjustmentRecommendation[] = []

  for (const ins of insights) {
    const w = weightFromInsight(ins)
    switch (ins.kind) {
      case 'strong_domain':
        out.push({
          id: `rec-boost-dom-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Double down: ${ins.subject}`,
          rationale: `Historically above baseline engagement — prioritize queue slots and creative depth.`,
          weight: w,
          payload: ins.tags,
          createdAt,
        })
        out.push({
          id: `rec-relax-${ins.id}`,
          brandProfileId,
          kind: 'relax_autonomy',
          title: `Raise confidence on ${ins.subject}`,
          rationale: `Proven surface area lowers execution risk for autonomous paths.`,
          weight: w * 0.65,
          payload: ins.tags,
          createdAt,
        })
        break
      case 'weak_domain':
        out.push({
          id: `rec-tight-dom-${ins.id}`,
          brandProfileId,
          kind: 'tighten_autonomy',
          title: `Hold automation: ${ins.subject}`,
          rationale: `Below-baseline engagement — require human taste-checks before auto-publish expands.`,
          weight: w,
          payload: ins.tags,
          createdAt,
        })
        break
      case 'strong_trend':
        out.push({
          id: `rec-boost-trend-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Ride this trend shape: ${ins.subject}`,
          rationale: `Pattern outperforms your brand mean — bias calendars toward this rhythm.`,
          weight: w * 0.85,
          payload: ins.tags,
          createdAt,
        })
        out.push({
          id: `rec-relax-trend-${ins.id}`,
          brandProfileId,
          kind: 'relax_autonomy',
          title: `Trust the trend muscle`,
          rationale: `Historical wins reduce uncertainty for similar future items.`,
          weight: w * 0.5,
          payload: ins.tags,
          createdAt,
        })
        break
      case 'weak_trend':
        out.push({
          id: `rec-tight-trend-${ins.id}`,
          brandProfileId,
          kind: 'tighten_autonomy',
          title: `Slow-roll: ${ins.subject}`,
          rationale: `This trend family has under-delivered — keep drafts human-reviewed.`,
          weight: w,
          payload: ins.tags,
          createdAt,
        })
        break
      case 'strong_cta':
        out.push({
          id: `rec-cta-${ins.id}`,
          brandProfileId,
          kind: 'prefer_cta_style',
          title: `Reuse winning CTA shape`,
          rationale: `This CTA cluster correlates with stronger engagement in recent history.`,
          weight: w,
          payload: ins.tags,
          createdAt,
        })
        break
      case 'weak_cta':
        out.push({
          id: `rec-cta-avoid-${ins.id}`,
          brandProfileId,
          kind: 'prefer_cta_style',
          title: `Rotate away from weak CTA phrasing`,
          rationale: `Try DM / link-in-bio / save-share variants instead of this cluster.`,
          weight: w * 0.55,
          payload: {
            ctaStyle:
              ins.tags?.ctaStyle === 'dm'
                ? 'link_in_bio'
                : ins.tags?.ctaStyle === 'link_in_bio'
                  ? 'save_share'
                  : 'dm',
          },
          createdAt,
        })
        break
      case 'strong_format':
        out.push({
          id: `rec-fmt-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Favor ${ins.subject}`,
          rationale: `Format shows lift vs baseline — allocate more production budget here.`,
          weight: w * 0.7,
          payload: ins.tags,
          createdAt,
        })
        break
      case 'weak_format':
        out.push({
          id: `rec-fmt-pen-${ins.id}`,
          brandProfileId,
          kind: 'penalize_format',
          title: `Reduce reliance on ${ins.subject}`,
          rationale: `Engagement lags brand baseline — deprioritize unless strategically required.`,
          weight: w,
          payload: ins.tags,
          createdAt,
        })
        break
      case 'strong_posting_hour':
        if (ins.tags?.postingHour != null) {
          out.push({
            id: `rec-hour-${ins.id}`,
            brandProfileId,
            kind: 'prefer_posting_window',
            title: `Bias publish window: ${ins.subject}`,
            rationale: `Weighted engagement peaks in this UTC band for your recent posts.`,
            weight: w * 0.8,
            payload: ins.tags,
            createdAt,
          })
        }
        break
      case 'weak_combo':
        out.push({
          id: `rec-combo-${ins.id}`,
          brandProfileId,
          kind: 'penalize_weak_combo',
          title: `Watch this pairing`,
          rationale: `Domain + trend combo trails your baseline — keep strategist in loop.`,
          weight: w,
          payload: ins.tags,
          createdAt,
        })
        out.push({
          id: `rec-combo-tight-${ins.id}`,
          brandProfileId,
          kind: 'tighten_autonomy',
          title: `Lower autonomy for this pairing`,
          rationale: `Historical underperformance — bias toward review before auto-publish.`,
          weight: w * 0.75,
          payload: ins.tags,
          createdAt,
        })
        break
      default:
        break
    }
  }

  return dedupe(out).slice(0, 14)
}
