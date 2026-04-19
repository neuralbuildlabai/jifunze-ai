import { useState, type FormEvent } from 'react'
import { useAuth } from '../auth/AuthContext'
import { TrustBoundaryStrip } from './TrustBoundaryStrip'

function verifyLog(checkpoint: string, detail?: Record<string, unknown>) {
  console.log('[JifunzeAI verify]', detail != null ? { checkpoint, ...detail } : { checkpoint })
}
import { isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'
import { insertFirstBrandProfile, validateFirstBrandName } from '../services/brands/insertFirstBrandProfile'

/** Shown when Supabase + signed-in user + zero brand profiles (workspace not ready for Ideas/Studio). */
export type EmptyWorkspaceShellGate = 'empty_brands'

/** Direct brand reload should be fast; full `refreshBrands` can take up to workspace bootstrap timeout. */
const RELOAD_BRANDS_AFTER_CREATE_MS = 25_000
const REFRESH_BRANDS_AFTER_CREATE_MS = 90_000

function withTimeoutMs<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms}ms`))
    }, ms)
    promise.then(
      (v) => {
        clearTimeout(t)
        resolve(v)
      },
      (e) => {
        clearTimeout(t)
        reject(e)
      },
    )
  })
}

export function EmptyWorkspaceCreateBrand({ gate }: { gate: EmptyWorkspaceShellGate }) {
  const {
    user,
    tenantId,
    supabase,
    workspaceTenantResolved,
    refreshBrands,
    reloadBrandsOnly,
    error: authWorkspaceError,
    signOut,
    signOutPending,
    clearAuthMessages,
  } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const tenantIdValidShape = isWorkspaceTenantId(tenantId)
  /** First-brand insert requires both profile-validated tenant and UUID shape. */
  const tenantStrictForCreate = Boolean(workspaceTenantResolved && tenantIdValidShape)
  const canCreate = Boolean(supabase && user && tenantStrictForCreate)
  /**
   * Tenant banner only when profile never resolved a workspace tenant **and** `tenantId` is not a
   * workspace UUID — and **never** on the `empty_brands` shell (validated empty list must not show
   * a conflicting tenant error).
   */
  const showingTenantError = Boolean(
    gate !== 'empty_brands' && user && !workspaceTenantResolved && !tenantIdValidShape,
  )

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLocalError(null)
    if (!supabase || !user) {
      setLocalError('You must be signed in to create a brand.')
      return
    }
    if (!tenantStrictForCreate) {
      setLocalError(
        'Workspace tenant is not ready yet. Wait a moment, refresh the page, or sign out and sign in again.',
      )
      return
    }
    const v = validateFirstBrandName(name)
    if (v) {
      setLocalError(v)
      return
    }
    setBusy(true)
    try {
      const result = await insertFirstBrandProfile(supabase, {
        tenantId: tenantId.trim(),
        name,
        createdByUserId: user.id,
      })
      if (!result.ok) {
        setLocalError(result.message)
        return
      }

      let brandCountAfterCreate: number | undefined
      try {
        brandCountAfterCreate = await withTimeoutMs(
          reloadBrandsOnly(),
          RELOAD_BRANDS_AFTER_CREATE_MS,
          'reloadBrandsOnly after create',
        )
        if (brandCountAfterCreate === undefined || brandCountAfterCreate < 1) {
          brandCountAfterCreate = await withTimeoutMs(
            refreshBrands(),
            REFRESH_BRANDS_AFTER_CREATE_MS,
            'refreshBrands after create',
          )
        }
      } catch (refreshErr) {
        const msg = refreshErr instanceof Error ? refreshErr.message : String(refreshErr)
        console.log('[JifunzeAI workspace]', {
          create_brand_failed: { phase: 'refresh_after_create', message: msg },
        })
        setLocalError(
          /timed out/i.test(msg)
            ? 'Brand was created, but reloading the list timed out. Refresh the page or try again.'
            : `Brand was created, but the list could not be refreshed: ${msg}`,
        )
        return
      }

      console.log('[JifunzeAI workspace]', {
        brand_count_after_create: { count: brandCountAfterCreate ?? null },
      })
      if (brandCountAfterCreate === undefined) {
        setLocalError(
          'Brand may have been created, but the workspace list could not be refreshed. Check the Brands table or refresh the page.',
        )
        return
      }
      if (brandCountAfterCreate < 1) {
        setLocalError(
          'Brand was saved, but no brands appeared in this session. Refresh the page or verify RLS on `public.brands`.',
        )
        return
      }

      console.log('[JifunzeAI workspace]', {
        ui_gate_after_create: { gate: 'main_expected', brandCount: brandCountAfterCreate },
      })
      verifyLog('empty_workspace_exited', { brandCount: brandCountAfterCreate })

      clearAuthMessages()
      setName('')
      setShowForm(false)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong while creating the brand.'
      console.log('[JifunzeAI workspace]', {
        create_brand_failed: { phase: 'unexpected', message: msg },
      })
      setLocalError(msg)
    } finally {
      setBusy(false)
    }
  }

  if (showingTenantError) {
    return (
      <div className="w-full max-w-2xl space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 text-center">
        <p className="text-sm font-medium text-rose-200/95">Workspace tenant is not ready</p>
        <p className="text-xs text-zinc-500">
          Sign out and sign in again, or check your profile in Supabase.
        </p>
        {authWorkspaceError ? (
          <p className="text-xs text-rose-400/95" role="alert">
            {authWorkspaceError}
          </p>
        ) : null}
        <div className="pt-2">
          <button
            type="button"
            disabled={signOutPending}
            onClick={() => void signOut()}
            className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {signOutPending ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 text-center">
      <p className="text-sm text-zinc-300">No brands in this workspace yet.</p>
      {authWorkspaceError ? (
        <p className="text-xs text-rose-400/95" role="alert">
          {authWorkspaceError}
        </p>
      ) : null}
      <p className="text-xs text-zinc-500">Create your first brand to start generating content.</p>

      <TrustBoundaryStrip className="mx-auto max-w-lg text-left" dataTestId="first-brand-trust-boundary" />

      {showForm && canCreate ? (
        <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-3 text-left">
          <label className="block space-y-1">
            <span className="text-xs text-zinc-500">Brand name</span>
            <input
              type="text"
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My AI Studio"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
              autoComplete="organization"
            />
          </label>
          {localError ? (
            <p className="text-xs text-rose-400" role="alert">
              {localError}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 disabled:opacity-40"
            >
              {busy ? 'Creating…' : 'Create brand'}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setShowForm(false)
                setLocalError(null)
                setName('')
              }}
              className="rounded-lg border border-zinc-600 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-900 disabled:opacity-40"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={!canCreate}
            onClick={() => {
              setLocalError(null)
              setShowForm(true)
            }}
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create brand
          </button>
        </div>
      )}

      <div className="pt-2">
        <button
          type="button"
          disabled={signOutPending}
          onClick={() => void signOut()}
          className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {signOutPending ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </div>
  )
}
