import { DataTable, EmptyState, Panel, Pill } from './socialOpsUi'
import { useSocialOpsSnapshot } from './useSocialOpsSnapshot'
import { PLATFORM_MATRIX, READINESS_LABEL } from '../../social/platformMatrix'
import { PROHIBITED_CLAIMS } from '../../social/brand'

/**
 * Safety controls.
 *
 * READ-ONLY BY DESIGN. Every switch below is a server-side secret or a repository variable. A
 * browser button that could flip `IG_PUBLISH_ENABLED` would put a production kill switch one
 * mis-click from off, so this page shows state and tells the operator exactly where to change it.
 * Anything genuinely dangerous goes through the `social-ops-admin` Edge Function, which re-checks
 * authorization server-side and requires an explicit confirmation token.
 */

const SWITCHES = [
  {
    name: 'IG_PUBLISH_ENABLED',
    where: 'Supabase secret',
    effect: 'Instagram posts publicly only when this is exactly "true".',
    changeVia: 'supabase secrets set IG_PUBLISH_ENABLED=true — after a human approves the first live post.',
  },
  {
    name: 'DRY_RUN',
    where: 'GitHub Actions repository variable',
    effect: 'When "true" the autonomous loop renders and uploads an artifact but never publishes.',
    changeVia: 'Repository → Settings → Variables.',
  },
  {
    name: 'SOCIAL_SYNC_ENABLED',
    where: 'GitHub Actions repository variable',
    effect: 'The two-hour metrics sync workflow no-ops unless this is "true".',
    changeVia: 'Repository → Settings → Variables. Leave unset until the migration is reviewed.',
  },
  {
    name: 'VISUAL_PROVIDER',
    where: 'GitHub Actions environment',
    effect: '"ai" is the only paid tier. Anything else is $0.',
    changeVia: 'Workflow input or repository variable. Keep off the "ai" value.',
  },
  {
    name: 'PUBLISH_SECRET / INGEST_SECRET',
    where: 'Supabase secrets',
    effect: 'Gate the publish and ingest Edge Functions. Absent means those functions refuse.',
    changeVia: 'supabase secrets set — never in the repository.',
  },
] as const

const GATES = [
  {
    gate: 'Human approval required',
    state: 'Enforced',
    detail: 'Nothing publishes without a recorded approval in content_approvals.',
  },
  {
    gate: 'Duplicate protection',
    state: 'Enforced',
    detail:
      'content_publications is unique on (content_id, platform) and on (platform, platform_post_id). A second attempt cannot create a second post.',
  },
  {
    gate: 'Broken-link protection',
    state: 'Enforced',
    detail:
      'A call to action is only added when the destination is a live https://www.jifunze.ai URL. The Kazi Kit does not exist, so no caption links to it.',
  },
  {
    gate: 'Prohibited-CTA check',
    state: 'Enforced',
    detail: 'The script quality gate rejects any caption containing a link-in-bio promise.',
  },
  {
    gate: 'Content relevance check',
    state: 'Enforced',
    detail:
      'A news signal must clearly support one of the six pillars. The off-brand veto is covered by a regression test.',
  },
  {
    gate: 'Failed-publication alerts',
    state: 'Enforced',
    detail: 'A failed sync or publish writes a row to social_alerts and surfaces on the overview.',
  },
] as const

export function SocialOpsSafetyPage() {
  const { snapshot, loading, error } = useSocialOpsSnapshot()

  if (loading) return <p className="text-[13px] text-zinc-400">Loading…</p>
  if (error) return <EmptyState>{error}</EmptyState>

  const enabledPlatforms = snapshot?.accounts.filter((a) => a.enabled) ?? []

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-5 py-4">
        <h2 className="text-[14px] font-semibold text-white">This page does not change anything</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-300">
          Production secrets are never readable or writable from a browser. Each switch below shows
          where it lives and how to change it deliberately, with the change recorded outside this
          console.
        </p>
      </div>

      <Panel title="Kill switches and safety flags">
        <DataTable head={['Variable', 'Where it lives', 'What it does', 'How to change it']}>
          {SWITCHES.map((s) => (
            <tr key={s.name}>
              <td className="px-3 py-2 font-mono text-[12px] text-zinc-200">{s.name}</td>
              <td className="px-3 py-2 text-zinc-400">{s.where}</td>
              <td className="px-3 py-2 text-zinc-300">{s.effect}</td>
              <td className="px-3 py-2 text-zinc-400">{s.changeVia}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>

      <Panel title="Per-platform publishing state">
        <DataTable head={['Platform', 'Enabled in ledger', 'Readiness', 'What would happen if asked to publish']}>
          {PLATFORM_MATRIX.map((p) => {
            const enabled = enabledPlatforms.some((a) => a.platform === p.id)
            return (
              <tr key={p.id}>
                <td className="px-3 py-2 text-zinc-200">{p.label}</td>
                <td className="px-3 py-2">
                  <Pill tone={enabled ? 'ok' : 'muted'}>{enabled ? 'enabled' : 'disabled'}</Pill>
                </td>
                <td className="px-3 py-2 text-zinc-400">{READINESS_LABEL[p.readiness]}</td>
                <td className="px-3 py-2 text-zinc-400">
                  {p.readiness === 'ready'
                    ? 'Would attempt to publish — still gated by the kill switch and by human approval.'
                    : 'The adapter refuses and records why. Nothing is posted.'}
                </td>
              </tr>
            )
          })}
        </DataTable>
      </Panel>

      <Panel title="Quality gates">
        <DataTable head={['Gate', 'State', 'Detail']}>
          {GATES.map((g) => (
            <tr key={g.gate}>
              <td className="px-3 py-2 text-zinc-200">{g.gate}</td>
              <td className="px-3 py-2">
                <Pill tone="ok">{g.state}</Pill>
              </td>
              <td className="px-3 py-2 text-zinc-400">{g.detail}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>

      <Panel title="Phrases that must never ship">
        <ul className="flex flex-wrap gap-2">
          {PROHIBITED_CLAIMS.map((claim) => (
            <li key={claim}>
              <Pill tone="bad">{claim}</Pill>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
          Checked by `findProhibitedClaims()` in every adapter's content validation and in the copy
          test, so a reappearance fails the build rather than reaching a profile.
        </p>
      </Panel>
    </div>
  )
}
