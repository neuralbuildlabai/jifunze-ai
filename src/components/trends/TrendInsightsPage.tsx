import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { useTrainingPlansList } from '../../training/trainingHooks'
import { useWorkspaceTrainingRole } from '../../training/teamTrainingHooks'
import { useTrainingWorkspace } from '../../training/useTrainingWorkspace'
import {
  addRecommendationMvp,
  addTrendSignalMvp,
  createTrendTopicMvp,
  generateTrendSummaryMvp,
  seedSampleSignalsMvp,
  setRecommendationStatusMvp,
  useRecommendationsList,
  useTrendSignals,
  useTrendSummaries,
  useTrendTopicsList,
} from '../../trends/trendHooks'
import type { RecommendationStatus } from '../../trends/trendTypes'

const card =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]'

export function TrendInsightsPage() {
  const { workspaceShellReady, user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const { isManager, loading: roleLoading } = useWorkspaceTrainingRole()
  const { plans } = useTrainingPlansList()

  const { topics, loading: topicsLoading, error: topicsError, refetch: refetchTopics } = useTrendTopicsList()
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)

  const resolvedTopicId = useMemo(() => {
    if (selectedTopicId && topics.some((t) => t.id === selectedTopicId)) return selectedTopicId
    return topics[0]?.id ?? null
  }, [topics, selectedTopicId])

  const selectedTopic = useMemo(
    () => topics.find((t) => t.id === resolvedTopicId) ?? null,
    [topics, resolvedTopicId],
  )

  const { signals, loading: sigLoading, error: sigError, refetch: refetchSignals } = useTrendSignals(
    resolvedTopicId ?? undefined,
  )
  const { summaries, loading: sumLoading, error: sumError, refetch: refetchSummaries } = useTrendSummaries(
    resolvedTopicId ?? undefined,
  )
  const {
    recommendations,
    loading: recLoading,
    error: recError,
    refetch: refetchRecommendations,
  } = useRecommendationsList()

  const [topicName, setTopicName] = useState('')
  const [topicCategory, setTopicCategory] = useState('')
  const [topicSource, setTopicSource] = useState('')
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const [sigSource, setSigSource] = useState('Notes')
  const [sigText, setSigText] = useState('')

  const [recTitle, setRecTitle] = useState('')
  const [recDesc, setRecDesc] = useState('')
  const [recType, setRecType] = useState('training_plan')
  const [recTopicId, setRecTopicId] = useState<string>('')
  const [recPlanId, setRecPlanId] = useState<string>('')

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Insights</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Trend insights</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Monitor topics, capture signals (manual or simulated), generate summaries, and turn insights into
          actionable recommendations — including links to training plans.
        </p>
      </header>

      {isSupabaseConfigured() && !workspaceShellReady ? (
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      ) : null}

      {topicsError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200" role="alert">
          {topicsError.message}
        </div>
      ) : null}
      {sigError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200" role="alert">
          {sigError.message}
        </div>
      ) : null}
      {sumError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200" role="alert">
          {sumError.message}
        </div>
      ) : null}
      {recError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200" role="alert">
          {recError.message}
        </div>
      ) : null}
      {localError ? (
        <div className="rounded-lg border border-amber-500/25 bg-amber-950/20 px-3 py-2 text-sm text-amber-100" role="alert">
          {localError}
        </div>
      ) : null}

      {!roleLoading && !isManager ? (
        <p className="text-sm text-zinc-400">
          You can view workspace trends and recommendations. Ask a workspace admin to add topics, signals, and
          recommendations.
        </p>
      ) : null}

      <section className={`${card} space-y-4`}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Monitored topics</h2>
        {isManager ? (
          <form
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
            onSubmit={(e) => {
              e.preventDefault()
              void (async () => {
                if (mode.kind === 'blocked') return
                setBusy(true)
                setLocalError(null)
                const { error } = await createTrendTopicMvp({
                  mode,
                  name: topicName,
                  category: topicCategory.trim() || null,
                  sourceLabel: topicSource.trim() || null,
                })
                if (error) {
                  setLocalError(error.message)
                } else {
                  setTopicName('')
                  setTopicCategory('')
                  setTopicSource('')
                  await refetchTopics()
                }
                setBusy(false)
              })()
            }}
          >
            <label className="block min-w-[10rem] flex-1 text-xs text-zinc-400">
              Name
              <input
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                placeholder="e.g. Short-form hooks"
              />
            </label>
            <label className="block min-w-[8rem] flex-1 text-xs text-zinc-400">
              Category
              <input
                value={topicCategory}
                onChange={(e) => setTopicCategory(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                placeholder="optional"
              />
            </label>
            <label className="block min-w-[8rem] flex-1 text-xs text-zinc-400">
              Source label
              <input
                value={topicSource}
                onChange={(e) => setTopicSource(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                placeholder="e.g. Slack #creators"
              />
            </label>
            <button
              type="submit"
              disabled={busy || !isManager}
              className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add topic
            </button>
          </form>
        ) : null}

        {topicsLoading ? (
          <p className="text-sm text-zinc-400">Loading topics…</p>
        ) : topics.length === 0 ? (
          <p className="text-sm text-zinc-500">No topics yet. {isManager ? 'Create one above.' : ''}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTopicId(t.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  resolvedTopicId === t.id
                    ? 'border-violet-400/40 bg-violet-950/35 text-violet-100'
                    : 'border-white/[0.08] bg-zinc-950/50 text-zinc-300 hover:border-violet-400/25'
                }`}
              >
                {t.name}
                <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-zinc-500">{t.status}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      {selectedTopic ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className={`${card} space-y-4`}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Signals</h2>
            <p className="text-xs text-zinc-500">
              Topic: <span className="text-zinc-300">{selectedTopic.name}</span>
            </p>
            {isManager ? (
              <form
                className="space-y-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  void (async () => {
                    if (mode.kind === 'blocked') return
                    setBusy(true)
                    setLocalError(null)
                    const { error } = await addTrendSignalMvp({
                      mode,
                      topicId: selectedTopic.id,
                      sourceName: sigSource,
                      signalText: sigText,
                    })
                    if (error) setLocalError(error.message)
                    else {
                      setSigText('')
                      await refetchSignals()
                      await refetchTopics()
                    }
                    setBusy(false)
                  })()
                }}
              >
                <label className="block text-xs text-zinc-400">
                  Source
                  <input
                    value={sigSource}
                    onChange={(e) => setSigSource(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-xs text-zinc-400">
                  Signal text
                  <textarea
                    value={sigText}
                    onChange={(e) => setSigText(e.target.value)}
                    required
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm"
                  />
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={busy}
                    className="rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
                  >
                    Save signal
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      void (async () => {
                        if (mode.kind === 'blocked') return
                        setBusy(true)
                        setLocalError(null)
                        const { error } = await seedSampleSignalsMvp({
                          mode,
                          topicId: selectedTopic.id,
                          topicName: selectedTopic.name,
                        })
                        if (error) setLocalError(error.message)
                        else await refetchSignals()
                        setBusy(false)
                      })()
                    }}
                    className="rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
                  >
                    Add sample signals
                  </button>
                </div>
              </form>
            ) : null}
            {sigLoading ? (
              <p className="text-sm text-zinc-400">Loading signals…</p>
            ) : signals.length === 0 ? (
              <p className="text-sm text-zinc-500">No signals for this topic yet.</p>
            ) : (
              <ul className="space-y-2">
                {signals.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-sm text-zinc-200"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                      {s.source_name}
                      {s.freshness_label ? ` · ${s.freshness_label}` : null}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap">{s.signal_text}</p>
                    <p className="mt-1 text-[10px] text-zinc-600">
                      {new Date(s.captured_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={`${card} space-y-4`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Summaries</h2>
              {isManager ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    void (async () => {
                      if (mode.kind === 'blocked' || !selectedTopic) return
                      setBusy(true)
                      setLocalError(null)
                      const { error } = await generateTrendSummaryMvp({
                        mode,
                        topicId: selectedTopic.id,
                        topicName: selectedTopic.name,
                      })
                      if (error) setLocalError(error.message)
                      else await refetchSummaries()
                      setBusy(false)
                    })()
                  }}
                  className="rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
                >
                  Generate summary
                </button>
              ) : null}
            </div>
            {sumLoading ? (
              <p className="text-sm text-zinc-400">Loading summaries…</p>
            ) : summaries.length === 0 ? (
              <p className="text-sm text-zinc-500">No summary yet. Managers can generate one from current signals.</p>
            ) : (
              <ul className="space-y-4">
                {summaries.map((s) => (
                  <li key={s.id} className="rounded-lg border border-white/[0.06] bg-zinc-950/35 p-3">
                    <p className="text-[10px] text-zinc-500">
                      {new Date(s.generated_at).toLocaleString()}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-200">{s.summary_text}</p>
                    {Array.isArray(s.recurring_themes_json) ? (
                      <div className="mt-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                          Themes
                        </p>
                        <ul className="mt-1 list-disc pl-4 text-sm text-zinc-400">
                          {(s.recurring_themes_json as string[]).map((x, i) => (
                            <li key={i}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : null}

      <section className={`${card} space-y-4`}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Recommendations</h2>
        <p className="text-sm text-zinc-500">
          Link recommendations to a topic and optionally a training plan so improvements stay traceable.
        </p>

        {isManager ? (
          <form
            className="grid gap-3 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              void (async () => {
                if (mode.kind === 'blocked') return
                setBusy(true)
                setLocalError(null)
                const { error } = await addRecommendationMvp({
                  mode,
                  trendTopicId: recTopicId || null,
                  relatedTrainingPlanId: recPlanId || null,
                  type: recType,
                  title: recTitle,
                  description: recDesc,
                })
                if (error) setLocalError(error.message)
                else {
                  setRecTitle('')
                  setRecDesc('')
                  setRecTopicId('')
                  setRecPlanId('')
                  await refetchRecommendations()
                }
                setBusy(false)
              })()
            }}
          >
            <label className="block text-xs text-zinc-400 sm:col-span-2">
              Title
              <input
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs text-zinc-400 sm:col-span-2">
              Description
              <textarea
                value={recDesc}
                onChange={(e) => setRecDesc(e.target.value)}
                required
                rows={3}
                className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs text-zinc-400">
              Type
              <select
                value={recType}
                onChange={(e) => setRecType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm"
              >
                <option value="training_plan">training_plan</option>
                <option value="content">content</option>
                <option value="topic_alignment">topic_alignment</option>
                <option value="process">process</option>
              </select>
            </label>
            <label className="block text-xs text-zinc-400">
              Related topic
              <select
                value={recTopicId}
                onChange={(e) => setRecTopicId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm"
              >
                <option value="">None</option>
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-zinc-400 sm:col-span-2">
              Related training plan
              <select
                value={recPlanId}
                onChange={(e) => setRecPlanId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm"
              >
                <option value="">None</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
              >
                Add recommendation
              </button>
            </div>
          </form>
        ) : null}

        {recLoading ? (
          <p className="text-sm text-zinc-400">Loading recommendations…</p>
        ) : recommendations.length === 0 ? (
          <p className="text-sm text-zinc-500">No recommendations yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
            <table className="min-w-[40rem] w-full text-left text-sm">
              <thead className="border-b border-white/[0.06] bg-zinc-950/50 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                <tr>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Training</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((r) => (
                  <tr key={r.id} className="border-b border-white/[0.04]">
                    <td className="px-3 py-2 align-top">
                      <p className="font-medium text-zinc-100">{r.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">{r.description}</p>
                    </td>
                    <td className="px-3 py-2 text-zinc-400">{r.type}</td>
                    <td className="px-3 py-2">
                      {r.related_training_plan_id ? (
                        <Link
                          to={`/training/${r.related_training_plan_id}`}
                          className="text-xs text-violet-300 hover:text-violet-200"
                        >
                          Open plan
                        </Link>
                      ) : (
                        <span className="text-xs text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {isManager ? (
                        <select
                          value={r.status}
                          disabled={busy}
                          onChange={(e) => {
                            const next = e.target.value as RecommendationStatus
                            void (async () => {
                              if (mode.kind === 'blocked') return
                              setBusy(true)
                              setLocalError(null)
                              const { error } = await setRecommendationStatusMvp({
                                mode,
                                recommendationId: r.id,
                                status: next,
                              })
                              if (error) setLocalError(error.message)
                              else await refetchRecommendations()
                              setBusy(false)
                            })()
                          }}
                          className="rounded-lg border border-white/[0.08] bg-zinc-900 px-2 py-1 text-xs text-zinc-100"
                        >
                          <option value="new">new</option>
                          <option value="reviewed">reviewed</option>
                          <option value="applied">applied</option>
                          <option value="dismissed">dismissed</option>
                        </select>
                      ) : (
                        <span className="text-xs text-zinc-400">{r.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-[11px] text-zinc-600">
        Full autonomous crawling is out of scope — signals can be pasted manually or seeded for demos.
      </p>
    </div>
  )
}
