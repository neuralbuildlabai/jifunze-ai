/**
 * Lightweight checks for admin health parsers (no live Supabase).
 * Run: npm run test:admin-health
 */
import assert from 'node:assert/strict'
import {
  parseSchemaHealthRpc,
  sanitizeAdminHealthSummaryForClipboard,
  sortHealthChecksBySeverity,
} from '../src/lib/admin/adminDiagnosticsHealth'

const ts = new Date().toISOString()

const criticalSchema = parseSchemaHealthRpc(
  {
    checked_at: ts,
    required_tables: [{ name: 'learner_self_paced_progress', exists: false, rls_enabled: false }],
    required_functions: [{ name: 'admin_get_platform_metrics', exists: true }],
  },
  ts,
)

assert(criticalSchema.some((c) => c.status === 'critical' && c.label.includes('learner_self_paced_progress')))

const sorted = sortHealthChecksBySeverity([
  { status: 'healthy', label: 'a', description: 'x', lastCheckedAt: ts },
  { status: 'critical', label: 'b', description: 'y', lastCheckedAt: ts },
  { status: 'warning', label: 'c', description: 'z', lastCheckedAt: ts },
])
assert.equal(sorted[0].label, 'b')

const clip = sanitizeAdminHealthSummaryForClipboard([
  {
    status: 'warning',
    label: 'Leak test',
    description: 'See https://example.com/path and eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsRv8',
    remediation: 'Do not paste sk_live_abc123def456 here',
    lastCheckedAt: ts,
  },
])
assert(!clip.includes('https://'))
assert(!clip.includes('eyJ'))
assert(!clip.includes('sk_live_'))

console.log('test:admin-health OK')
