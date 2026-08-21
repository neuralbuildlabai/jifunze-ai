import { useEffect, useState } from 'react'
import { loadSignalsInbox, type SignalsInbox } from '../../services/socialOps/signalsData'

/**
 * Read-only signals inbox (capability stage 1–3). Signal lifecycle (consumed/rejected) does not
 * exist yet — rows here are exactly what ingestion wrote, most recent first.
 */
export function AdminSignalsPage() {
  const [inbox, setInbox] = useState<SignalsInbox | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    loadSignalsInbox()
      .then((r) => {
        if (!cancelled) setInbox(r)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight text-white">Signals</h1>
        <span className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-400/10 px-2.5 py-0.5 text-[12px] font-medium text-sky-300">
          Read-only
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-zinc-400">
        Signals ingested in the last 14 days, newest first. Ingestion runs server-side
        (RSS/Atom/RDF); nothing here can modify a signal, and lifecycle states (consumed /
        rejected) are not implemented yet.
      </p>

      <div className="mt-6">
        {loading ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-8 text-center text-[14px] text-zinc-400">
            Loading signals…
          </p>
        ) : !inbox?.configured ? (
          <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-8 text-center text-[14px] text-zinc-400">
            Supabase is not configured in this build, so there is no signal store to read.
          </p>
        ) : inbox.error ? (
          <p className="rounded-2xl border border-amber-400/30 bg-amber-400/5 px-5 py-8 text-center text-[14px] text-amber-200/90">
            Could not read signals: {inbox.error}
          </p>
        ) : inbox.signals.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-8 text-center text-[14px] text-zinc-400">
            No signals in the last 14 days. Ingestion has either not been connected yet or has
            nothing new — this is the honest empty state, not an error.
          </p>
        ) : (
          <ul className="space-y-3">
            {inbox.signals.map((s) => (
              <li key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded text-[15px] font-semibold text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                  >
                    {s.title}
                  </a>
                  <span className="text-[12px] text-zinc-500">
                    {s.published_at ? new Date(s.published_at).toUTCString().slice(0, 22) : 'undated'}
                  </span>
                </div>
                {s.summary ? (
                  <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-zinc-400">{s.summary}</p>
                ) : null}
                <p className="mt-2 text-[12px] text-zinc-500">
                  {s.source_label ?? s.provider_id ?? 'unknown source'}
                  {s.topic_tags?.length ? ` · ${s.topic_tags.join(', ')}` : ''}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
