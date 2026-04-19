import { useState } from 'react'
import type { WorkspaceIdentityState } from '../workspace/useWorkspaceIdentity'

type Props = {
  /** Brand profile name (content profile) — shown as secondary line. */
  brandName: string
  identity: WorkspaceIdentityState
}

export function WorkspaceIdentityStrip({ brandName, identity }: Props) {
  const { loading, error, row, planTier, retentionHint, rename } = identity
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [renameBusy, setRenameBusy] = useState(false)
  const [renameErr, setRenameErr] = useState<string | null>(null)

  const displayName = row?.name?.trim() || 'Your workspace'

  function startEdit() {
    setDraft(displayName)
    setRenameErr(null)
    setEditing(true)
  }

  async function commitRename() {
    setRenameBusy(true)
    setRenameErr(null)
    const out = await rename(draft)
    setRenameBusy(false)
    if (out.ok) {
      setEditing(false)
    } else {
      setRenameErr(out.message)
    }
  }

  return (
    <div className="min-w-0 flex-1 space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        {editing ? (
          <span className="flex min-w-0 flex-wrap items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={80}
              className="min-w-[12rem] max-w-full rounded-lg border border-white/[0.12] bg-zinc-950/60 px-2 py-1 text-sm text-white outline-none focus:border-violet-400/45"
              aria-label="Workspace name"
            />
            <button
              type="button"
              disabled={renameBusy}
              onClick={() => void commitRename()}
              className="rounded-md bg-violet-500/90 px-2 py-1 text-[11px] font-semibold text-white hover:bg-violet-400 disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              disabled={renameBusy}
              onClick={() => setEditing(false)}
              className="text-[11px] font-medium text-zinc-500 hover:text-zinc-300"
            >
              Cancel
            </button>
          </span>
        ) : (
          <span className="flex min-w-0 flex-wrap items-baseline gap-2">
            <span className="truncate text-sm font-semibold text-white" title={displayName}>
              {loading ? '…' : displayName}
            </span>
            <button
              type="button"
              onClick={startEdit}
              className="shrink-0 text-[11px] font-medium text-violet-300/90 hover:text-violet-200"
            >
              Rename
            </button>
          </span>
        )}
        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
          {planTier === 'subscriber' ? 'Subscriber' : 'Free'}
        </span>
      </div>
      <p className="text-[11px] text-zinc-500/90">
        Content profile: <span className="text-zinc-400">{brandName}</span>
      </p>
      {error ? (
        <p className="text-[11px] text-rose-300/90" role="status">
          {error}
        </p>
      ) : null}
      {renameErr ? (
        <p className="text-[11px] text-rose-300/90" role="alert">
          {renameErr}
        </p>
      ) : null}
      {retentionHint ? (
        <p className="max-w-xl text-[11px] leading-relaxed text-amber-200/85" role="status">
          {retentionHint}
        </p>
      ) : null}
    </div>
  )
}
