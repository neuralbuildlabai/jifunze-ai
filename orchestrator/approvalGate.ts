/**
 * Human-approval gate for the publish path — DEFAULT CLOSED.
 *
 * Rule (Amendment 003 §6): nothing publishes merely because content generation succeeded. The
 * publish layer refuses any item without an explicit recorded human approval, and refuses when
 * the approval store cannot be read (fail closed). There is no environment variable that
 * bypasses this gate.
 *
 * The approval record lives in `public.content_approvals` (social-ops migration): the most
 * recent decision for the content id must be `approved`. Today no UI writes approvals — which
 * means the gate correctly refuses everything until the Review module lands. That is the
 * intended behaviour, not a gap: publishing is also still disabled by DRY_RUN /
 * IG_PUBLISH_ENABLED, and this gate is the layer that remains once those switches open.
 */

export type ApprovalDecisionRow = {
  decision: 'approved' | 'rejected' | 'changes_requested'
  decided_at: string
  decided_by: string | null
}

/** Minimal query surface so the gate is unit-testable without Supabase. */
export type ApprovalReader = {
  latestDecisionFor(contentId: string): Promise<
    { ok: true; row: ApprovalDecisionRow | null } | { ok: false; error: string }
  >
}

export type GateVerdict =
  | { allowed: true; decidedAt: string; decidedBy: string | null }
  | { allowed: false; reason: string }

export async function checkHumanApproval(
  reader: ApprovalReader,
  contentId: string,
): Promise<GateVerdict> {
  if (!contentId.trim()) {
    return { allowed: false, reason: 'no content id — refusing to publish (fail closed)' }
  }

  const res = await reader.latestDecisionFor(contentId)
  if (!res.ok) {
    return {
      allowed: false,
      reason: `approval store unreadable (${res.error}) — refusing to publish (fail closed)`,
    }
  }
  if (!res.row) {
    return {
      allowed: false,
      reason: 'no recorded human approval for this item — refusing to publish (fail closed)',
    }
  }
  if (res.row.decision !== 'approved') {
    return {
      allowed: false,
      reason: `latest recorded decision is '${res.row.decision}' — refusing to publish`,
    }
  }
  return { allowed: true, decidedAt: res.row.decided_at, decidedBy: res.row.decided_by }
}

/**
 * Reader over the real `content_approvals` table. `admin` is a service-role Supabase client
 * (the orchestrator's); the table grants no write policy to any browser role.
 */
type ApprovalQuery = {
  select(cols: string): {
    eq(col: string, v: string): {
      order(col: string, opts: { ascending: boolean }): {
        limit(n: number): PromiseLike<{ data: unknown; error: { message: string } | null }>
      }
    }
  }
}

export function supabaseApprovalReader(admin: { from(table: string): unknown }): ApprovalReader {
  return {
    async latestDecisionFor(contentId: string) {
      try {
        const { data, error } = await (admin.from('content_approvals') as ApprovalQuery)
          .select('decision, decided_at, decided_by')
          .eq('content_id', contentId)
          .order('decided_at', { ascending: false })
          .limit(1)
        if (error) return { ok: false, error: error.message }
        const rows = Array.isArray(data) ? (data as ApprovalDecisionRow[]) : []
        return { ok: true, row: rows[0] ?? null }
      } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : String(e) }
      }
    },
  }
}
