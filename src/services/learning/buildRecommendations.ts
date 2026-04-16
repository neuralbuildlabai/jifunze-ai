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
  const base =
    i.confidence === 'high' ? 0.92 : i.confidence === 'medium' ? 0.72 : 0.5
  /** Weak / early patterns still move strategy quickly (small-n learning). */
  if (i.patternStrength === 'weak') return base * 0.74
  if (i.patternStrength === 'emerging') return base * 0.9
  if (i.patternStrength === 'confirmed') return base * 1.06
  return base
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
      case 'strong_domain_platform':
        if (ins.kind === 'strong_domain_platform') {
          out.push({
            id: `rec-prefer-plat-${ins.id}`,
            brandProfileId,
            kind: 'prefer_platform',
            title: `Lead with this surface: ${ins.subject}`,
            rationale: `Domain+platform is a proven winner — boost this surface in suggestions and priority.`,
            weight: w * 0.88,
            payload: ins.tags,
            createdAt,
            sourcePatternStrength: ins.patternStrength,
          })
        }
        out.push({
          id: `rec-boost-dom-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Double down: ${ins.subject}`,
          rationale: `Historically above baseline engagement — prioritize queue slots and creative depth.`,
          weight: w,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
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
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'weak_domain':
      case 'weak_domain_platform':
        out.push({
          id: `rec-tight-dom-${ins.id}`,
          brandProfileId,
          kind: 'tighten_autonomy',
          title: `Hold automation: ${ins.subject}`,
          rationale: `Below-baseline engagement — require human taste-checks before auto-publish expands.`,
          weight: w,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'strong_trend':
      case 'strong_trend_platform':
        if (ins.kind === 'strong_trend_platform') {
          out.push({
            id: `rec-prefer-plat-trend-${ins.id}`,
            brandProfileId,
            kind: 'prefer_platform',
            title: `Lead with surface for this trend: ${ins.subject}`,
            rationale: `Trend+platform outperforms — reorder platforms and lift priority when this combo matches.`,
            weight: w * 0.86,
            payload: ins.tags,
            createdAt,
            sourcePatternStrength: ins.patternStrength,
          })
        }
        out.push({
          id: `rec-boost-trend-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Ride this trend shape: ${ins.subject}`,
          rationale: `Pattern outperforms your brand mean — bias calendars toward this rhythm.`,
          weight: w * 0.85,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
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
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'weak_trend':
      case 'weak_trend_platform':
        out.push({
          id: `rec-tight-trend-${ins.id}`,
          brandProfileId,
          kind: 'tighten_autonomy',
          title: `Slow-roll: ${ins.subject}`,
          rationale: `This trend family has under-delivered — keep drafts human-reviewed.`,
          weight: w,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'strong_cta':
      case 'strong_cta_platform':
        out.push({
          id: `rec-cta-${ins.id}`,
          brandProfileId,
          kind: 'prefer_cta_style',
          title: `Winning CTA cluster — reuse this shape`,
          rationale: `This CTA cluster correlates with stronger engagement — default new posts toward this style on matching surfaces.`,
          weight: w,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'weak_cta':
      case 'weak_cta_platform':
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
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'strong_format':
        out.push({
          id: `rec-fmt-prefer-${ins.id}`,
          brandProfileId,
          kind: 'prefer_format',
          title: `Lean into format: ${ins.subject}`,
          rationale: `Outperforms baseline — bias new opportunities toward this format when the topic allows.`,
          weight: w * 0.92,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        out.push({
          id: `rec-fmt-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Favor ${ins.subject}`,
          rationale: `Format shows lift vs baseline — allocate more production budget here.`,
          weight: w * 0.7,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'strong_format_platform':
        out.push({
          id: `rec-fmt-plat-prefer-${ins.id}`,
          brandProfileId,
          kind: 'prefer_format',
          title: `Lean into ${ins.subject}`,
          rationale: `Strong format+surface combo — prefer this format when publishing on this platform.`,
          weight: w * 0.95,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        out.push({
          id: `rec-fmt-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Favor ${ins.subject}`,
          rationale: `Format shows lift vs baseline — allocate more production budget here.`,
          weight: w * 0.7,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'weak_format':
      case 'weak_format_platform':
        out.push({
          id: `rec-fmt-pen-${ins.id}`,
          brandProfileId,
          kind: 'penalize_format',
          title: `Reduce reliance on ${ins.subject}`,
          rationale: `Engagement lags brand baseline — deprioritize unless strategically required.`,
          weight: w,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'strong_teaching_style_platform':
        out.push({
          id: `rec-teach-prefer-${ins.id}`,
          brandProfileId,
          kind: 'prefer_teaching_style',
          title: `Prefer teaching style: ${ins.subject}`,
          rationale: `Explanation style + platform beats baseline — bias pacing and copy toward this pattern.`,
          weight: w * 0.9,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        out.push({
          id: `rec-teach-strong-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Lean into teaching pattern`,
          rationale: `Teaching style + platform is outperforming baseline; prefer this explanation shape.`,
          weight: w * 0.65,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'weak_teaching_style_platform':
        out.push({
          id: `rec-teach-weak-${ins.id}`,
          brandProfileId,
          kind: 'tighten_autonomy',
          title: `Teaching pattern needs review`,
          rationale: `This explanation style underperforms on that platform; simplify or switch style.`,
          weight: w * 0.7,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'strong_teaching_level_domain':
        out.push({
          id: `rec-teach-lvl-${ins.id}`,
          brandProfileId,
          kind: 'boost_domain_platform',
          title: `Teaching depth is working: ${ins.subject}`,
          rationale: `Audience level + domain pairing is outperforming baseline — reuse for similar topics.`,
          weight: w * 0.7,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        out.push({
          id: `rec-teach-lvl-relax-${ins.id}`,
          brandProfileId,
          kind: 'relax_autonomy',
          title: `Trust teaching depth on ${ins.subject}`,
          rationale: `Emerging/confirmed strength lowers execution risk for similar future items.`,
          weight: w * 0.45,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
        })
        break
      case 'weak_teaching_level_domain':
        out.push({
          id: `rec-teach-lvl-weak-${ins.id}`,
          brandProfileId,
          kind: 'tighten_autonomy',
          title: `Teaching level mismatch: ${ins.subject}`,
          rationale: `This level/domain pairing trails baseline — keep human review until it stabilizes.`,
          weight: w * 0.72,
          payload: ins.tags,
          createdAt,
          sourcePatternStrength: ins.patternStrength,
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
            sourcePatternStrength: ins.patternStrength,
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
          sourcePatternStrength: ins.patternStrength,
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
          sourcePatternStrength: ins.patternStrength,
        })
        break
      default:
        break
    }
  }

  return dedupe(out).slice(0, 26)
}
