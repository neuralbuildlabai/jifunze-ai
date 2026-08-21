import { Link, useLocation } from 'react-router-dom'
import { NotFoundPage } from '../NotFoundPage'
import { ADMIN_STATUS_LABELS, adminModuleByPath, type AdminModuleStatus } from './adminModules'

const STATUS_BADGE: Record<AdminModuleStatus, string> = {
  operational: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  'read-only': 'border-sky-400/40 bg-sky-400/10 text-sky-300',
  partial: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  'awaiting-connection': 'border-violet-400/40 bg-violet-400/10 text-violet-300',
  planned: 'border-white/15 bg-white/[0.04] text-zinc-400',
}

/**
 * Honest status page for a console module. Never pretends a backend exists: it states exactly
 * what the repository contains today and what is missing, per the capability truth table.
 */
export function AdminModulePage() {
  const { pathname } = useLocation()
  const modulePath = pathname.replace(/^\/admin\//, '').replace(/\/$/, '')
  const mod = adminModuleByPath(modulePath)
  if (!mod) return <NotFoundPage />

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight text-white">{mod.label}</h1>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-medium ${STATUS_BADGE[mod.status]}`}
        >
          {ADMIN_STATUS_LABELS[mod.status]}
        </span>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">{mod.summary}</p>

      {mod.liveHref ? (
        <Link
          to={mod.liveHref}
          className="mt-5 inline-flex min-h-[2.5rem] items-center rounded-full bg-[#7C3AED] px-5 text-[14px] font-semibold text-white transition hover:bg-[#8B5CF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
        >
          {mod.liveLabel ?? 'Open the live view'}
        </Link>
      ) : null}

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          What exists in the repository today
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-zinc-300">
          {mod.exists.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Missing before this stage is fully operational
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-zinc-400">
          {mod.missing.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-[12px] leading-relaxed text-zinc-600">
        This page reports repository reality, not intent. Statuses come from the capability truth
        table and change only when the underlying code does. Publishing and external connections
        remain disabled until their supervised activation is separately authorized.
      </p>
    </div>
  )
}
