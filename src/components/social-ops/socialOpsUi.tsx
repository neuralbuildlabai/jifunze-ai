import type { ReactNode } from 'react'
import type { Freshness } from '../../services/socialOps/socialOpsSummary'

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-zinc-400">{title}</h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function Stat({
  label,
  value,
  hint,
  freshness,
}: {
  label: string
  value: string
  hint?: string
  freshness?: Freshness
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-zinc-500">{label}</p>
      <p className="mt-1.5 text-[24px] font-bold tracking-tight text-white">{value}</p>
      {hint ? <p className="mt-1 text-[12px] text-zinc-500">{hint}</p> : null}
      {freshness ? (
        <p className={`mt-1 text-[12px] ${freshness.stale ? 'text-amber-300' : 'text-zinc-500'}`}>
          {freshness.label}
        </p>
      ) : null}
    </div>
  )
}

const TONE: Record<string, string> = {
  ok: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  warn: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  bad: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
  muted: 'border-white/12 bg-white/[0.04] text-zinc-300',
  brand: 'border-[#7C3AED]/40 bg-[#7C3AED]/12 text-[#C4B5FD]',
}

export function Pill({ tone = 'muted', children }: { tone?: keyof typeof TONE; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-medium ${TONE[tone]}`}>
      {children}
    </span>
  )
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-6 text-center text-[13px] text-zinc-400">
      {children}
    </p>
  )
}

export function DataTable({ head, children }: { head: readonly string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-white/10">
            {head.map((h) => (
              <th key={h} scope="col" className="px-3 py-2 font-medium text-zinc-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06]">{children}</tbody>
      </table>
    </div>
  )
}
