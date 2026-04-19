import { LifecycleSimulationBadge } from './LifecycleSimulationBadge'
import { describeFunnelMapping } from '../services/conversion/funnelMap'
import type { ContentPackage } from '../types/contentPackage'
import type { SocialContent } from '../types/content'
import { formatConversionIntent, lifecycleStatusChipClass } from '../lib/opportunityWorkspaceUi'

export type WorkspaceGenerationOutputProps = {
  contentPackage: ContentPackage | null
  displaySocial: SocialContent
}

export function WorkspaceGenerationOutput({
  contentPackage,
  displaySocial,
}: WorkspaceGenerationOutputProps) {
  return (
    <section
      id="workspace-output"
      className="space-y-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6"
      aria-live="polite"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Output
        {contentPackage ? (
          <span className="ml-2 font-normal normal-case text-zinc-600">
            ({contentPackage.mode.replace(/_/g, ' ')})
          </span>
        ) : null}
      </h2>
      {contentPackage?.lifecycle_status ? (
        <div className="rounded-lg border border-zinc-800/70 bg-zinc-950/35 px-3 py-2 text-[11px] text-zinc-400">
          <span className="mr-2 inline-flex flex-wrap items-center gap-1 align-middle">
            <span
              className={`inline-flex rounded-full px-2 py-0.5 font-semibold capitalize tracking-wide ${lifecycleStatusChipClass(contentPackage.lifecycle_status)}`}
            >
              {contentPackage.lifecycle_status}
            </span>
            <LifecycleSimulationBadge label="Demo" />
          </span>
          {contentPackage.source_opportunity_id ? (
            <span className="text-zinc-500">Opp {contentPackage.source_opportunity_id} · </span>
          ) : null}
          <span className="text-zinc-500">
            Analytics: pending (impressions, clicks, engagement, conversion hint, publish-time
            performance)
            {contentPackage.conversion_funnel_feedback ? (
              <>
                {' '}
                · Funnel feedback: pending (impressions, clicks, engagement, conversion hint)
              </>
            ) : null}
          </span>
        </div>
      ) : null}
      {contentPackage?.teaching_explainability && contentPackage.teaching_explainability.length ? (
        <div className="rounded-lg border border-indigo-900/40 bg-indigo-950/20 px-3 py-2 text-[11px] text-indigo-100/90 space-y-1">
          <p className="font-semibold text-indigo-200/95">Teaching explainability</p>
          <ul className="list-inside list-disc space-y-0.5 text-zinc-400">
            {contentPackage.teaching_explainability.map((e, idx) => (
              <li key={`pkg-teach-${idx}`}>
                <span className="text-zinc-200">{e.what}</span> — {e.why}
                {e.influencedBy ? (
                  <span className="text-zinc-600"> · {e.influencedBy}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {contentPackage?.platform_adaptation ? (
        <div className="space-y-3 border-t border-zinc-800/80 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Adapted surfaces
          </h3>
          <p className="text-[11px] text-zinc-600">
            One opportunity → Instagram (caption + carousel), TikTok (hook + flow + shots), X (post +
            thread beats), and Facebook — same lesson, native packaging (ready to paste).
          </p>
          {contentPackage.platform_adaptation.variants[0]?.consistency_spine ? (
            <p className="rounded-lg border border-zinc-700/60 bg-zinc-950/50 px-3 py-2 text-[11px] leading-relaxed text-zinc-400">
              <span className="font-semibold text-zinc-500">Consistency spine · </span>
              {contentPackage.platform_adaptation.variants[0].consistency_spine}
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            {contentPackage.platform_adaptation.variants.map((v) => (
              <div
                key={v.platform}
                className="rounded-xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/75 to-zinc-950 p-4 text-left shadow-inner shadow-black/20"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/95">
                  {v.platform}
                </p>
                {v.title ? (
                  <p className="mt-1 text-sm font-medium text-zinc-100">{v.title}</p>
                ) : null}
                {v.hook ? (
                  <div className="mt-2 space-y-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      Hook
                    </p>
                    <p className="text-xs font-medium text-zinc-200">{v.hook}</p>
                  </div>
                ) : null}
                {v.body ? (
                  <div className="mt-2 space-y-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      Body
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">{v.body}</p>
                  </div>
                ) : null}
                <div className="mt-2 space-y-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                    Full caption (copy block)
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">{v.caption}</p>
                </div>
                {v.hashtags ? (
                  <p className="mt-2 font-mono text-xs text-violet-200/90">{v.hashtags}</p>
                ) : null}
                {v.cta ? (
                  <p className="mt-2 text-xs text-zinc-400">
                    <span className="text-zinc-600">CTA:</span> {v.cta}
                  </p>
                ) : null}
                {v.conversion_intent ? (
                  <p className="mt-1 text-[11px] text-zinc-500">
                    <span className="text-zinc-600">Intent:</span>{' '}
                    {formatConversionIntent(v.conversion_intent)}
                  </p>
                ) : null}
                {v.destination_reference ? (
                  <p className="mt-1 text-[11px] text-zinc-500">
                    <span className="text-zinc-600">Route:</span> {v.destination_reference}
                  </p>
                ) : null}
                {v.conversion_intent && v.cta && v.destination_reference ? (
                  <p className="mt-2 text-[10px] leading-relaxed text-zinc-600">
                    {describeFunnelMapping({
                      platform: v.platform,
                      intent: v.conversion_intent,
                      cta: v.cta,
                      destinationReference: v.destination_reference,
                    })}
                  </p>
                ) : null}
                {v.platform === 'x' && v.thread_beats && v.thread_beats.length ? (
                  <div className="mt-2 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      Thread (lead + replies)
                    </p>
                    <ol className="list-decimal space-y-1 pl-4 text-[11px] leading-relaxed text-sky-200/90">
                      <li>
                        <span className="text-zinc-500">Lead: </span>
                        {v.caption}
                      </li>
                      {v.thread_beats.map((b, i) => (
                        <li key={`tb-${v.platform}-${i}`}>{b}</li>
                      ))}
                    </ol>
                  </div>
                ) : v.platform === 'x' && v.thread_continuation_hint ? (
                  <p className="mt-1 text-[11px] text-sky-300/90">
                    <span className="text-zinc-600">Thread:</span> {v.thread_continuation_hint}
                  </p>
                ) : null}
                {v.platform === 'instagram' && v.carousel_slides && v.carousel_slides.length ? (
                  <div className="mt-2 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      Carousel idea (slides)
                    </p>
                    <ol className="list-decimal space-y-1 pl-4 text-[11px] leading-relaxed text-zinc-300">
                      {v.carousel_slides.map((s, i) => (
                        <li key={`cs-${v.platform}-${i}`}>{s}</li>
                      ))}
                    </ol>
                  </div>
                ) : null}
                {v.platform === 'tiktok' && v.tiktok_flow ? (
                  <div className="mt-2 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      TikTok flow (beats)
                    </p>
                    <p className="whitespace-pre-wrap text-[11px] leading-relaxed text-zinc-400">
                      {v.tiktok_flow}
                    </p>
                  </div>
                ) : null}
                {v.visual_note ? (
                  <p className="mt-2 text-[11px] text-zinc-500">
                    <span className="text-zinc-600">Visual note:</span> {v.visual_note}
                  </p>
                ) : null}
                {v.video_concept ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                    <span className="text-zinc-600">Video concept:</span> {v.video_concept}
                  </p>
                ) : null}
                {v.on_screen_text_suggestion ? (
                  <p className="mt-1 font-medium text-[11px] text-amber-200/90">
                    On-screen: {v.on_screen_text_suggestion}
                  </p>
                ) : null}
                {v.community_cta ? (
                  <p className="mt-2 text-[11px] text-zinc-500">
                    <span className="text-zinc-600">Community:</span> {v.community_cta}
                  </p>
                ) : null}
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{v.mediaPlanSummary}</p>
                <p className="mt-2 text-[10px] uppercase tracking-wide text-zinc-600">
                  {v.recommendedFormat.replace(/_/g, ' ')}
                  {v.characterLimitStatus ? ` · ${v.characterLimitStatus.replace(/_/g, ' ')}` : ''}
                </p>
                {v.publishingNotes ? (
                  <p className="mt-1 text-[10px] text-zinc-600">{v.publishingNotes}</p>
                ) : null}
                {v.quality_check && v.quality_check.adjustments_applied.length > 0 ? (
                  <p className="mt-2 text-[10px] text-zinc-600">
                    <span className="text-zinc-500">QA:</span>{' '}
                    {v.quality_check.adjustments_applied.join(' · ')}
                  </p>
                ) : null}
                <p className="mt-3 border-t border-zinc-800/60 pt-2 text-[10px] leading-relaxed text-zinc-600">
                  {v.adaptationRationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Caption</h3>
          <p className="text-sm leading-relaxed text-zinc-200">{displaySocial.caption}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Hashtags</h3>
          <p className="font-mono text-sm text-violet-200/95">{displaySocial.hashtags}</p>
        </div>
      </div>

      {contentPackage?.creative_brief ? (
        <div className="space-y-2 border-t border-zinc-800/80 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Creative brief</h3>
          <dl className="grid gap-2 text-xs text-zinc-400">
            <div>
              <dt className="text-zinc-600">Caption direction</dt>
              <dd className="text-zinc-300">{contentPackage.creative_brief.caption_direction}</dd>
            </div>
            <div>
              <dt className="text-zinc-600">Visual</dt>
              <dd className="text-zinc-300">{contentPackage.creative_brief.visual_direction}</dd>
            </div>
            <div>
              <dt className="text-zinc-600">Animation</dt>
              <dd className="text-zinc-300">{contentPackage.creative_brief.animation_direction}</dd>
            </div>
            <div>
              <dt className="text-zinc-600">Mood / style</dt>
              <dd className="text-zinc-300">{contentPackage.creative_brief.mood_style_notes}</dd>
            </div>
            {contentPackage.creative_brief.teaching_rubric ? (
              <div>
                <dt className="text-zinc-600">Teaching rubric</dt>
                <dd className="text-zinc-300 leading-relaxed">
                  {contentPackage.creative_brief.teaching_rubric}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-zinc-600">Aspect ratio</dt>
              <dd className="text-zinc-300">{contentPackage.creative_brief.recommended_aspect_ratio}</dd>
            </div>
            <div>
              <dt className="text-zinc-600">Platforms</dt>
              <dd className="text-zinc-300">{contentPackage.creative_brief.recommended_platform_usage}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      {contentPackage?.visual_concept_summary ? (
        <div className="space-y-1 border-t border-zinc-800/80 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Visual concept</h3>
          <p className="text-xs leading-relaxed text-zinc-400">{contentPackage.visual_concept_summary}</p>
        </div>
      ) : null}

      {contentPackage?.media_plans && contentPackage.media_plans.length > 0 ? (
        <div className="space-y-3 border-t border-zinc-800/80 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Media plans (surfaces)
          </h3>
          <p className="text-[11px] text-zinc-600">
            Provider-agnostic specs — plug in generators later without changing this layer.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {contentPackage.media_plans.map((plan) => (
              <li
                key={plan.kind}
                className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-3 text-[11px] text-zinc-400"
              >
                <p className="font-semibold text-zinc-200">
                  {plan.kind.replace(/_/g, ' ')} — {plan.title}
                </p>
                <p className="mt-1 line-clamp-2">{plan.visual_style}</p>
                <p className="mt-1 line-clamp-3 text-zinc-500">{plan.scene_description}</p>
                {plan.motion_direction ? (
                  <p className="mt-1 text-zinc-500">
                    <span className="text-zinc-600">Motion:</span> {plan.motion_direction}
                  </p>
                ) : null}
                <p className="mt-1 line-clamp-2">
                  <span className="text-zinc-600">On-screen:</span> {plan.on_screen_text_suggestions}
                </p>
                {plan.music_mood_suggestion ? (
                  <p className="mt-1 line-clamp-2">
                    <span className="text-zinc-600">Audio:</span> {plan.music_mood_suggestion}
                  </p>
                ) : null}
                <p className="mt-1 line-clamp-3 text-violet-200/80">{plan.asset_prompt}</p>
                <p className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-wide text-zinc-600">
                  <span>Complexity: {plan.production_complexity}</span>
                  <span>·</span>
                  <span>{plan.realism_level}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {contentPackage?.media_prompts ? (
        <div className="space-y-2 border-t border-zinc-800/80 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Media prompts (mock)
          </h3>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>
              <span className="text-zinc-600">Image:</span>{' '}
              <span className="text-zinc-300">{contentPackage.media_prompts.image_prompt}</span>
            </li>
            <li>
              <span className="text-zinc-600">Poster:</span>{' '}
              <span className="text-zinc-300">{contentPackage.media_prompts.poster_prompt}</span>
            </li>
            <li>
              <span className="text-zinc-600">Animation:</span>{' '}
              <span className="text-zinc-300">{contentPackage.media_prompts.animation_prompt}</span>
            </li>
            <li>
              <span className="text-zinc-600">Storyboard:</span>{' '}
              <span className="text-zinc-300">{contentPackage.media_prompts.storyboard_summary}</span>
            </li>
          </ul>
        </div>
      ) : null}
    </section>
  )
}
