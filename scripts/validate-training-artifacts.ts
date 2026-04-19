/**
 * CI / local validation: training knowledge spec, seed JSON, and derived-asset derivations.
 * Run: npm run validate:training
 */
import { buildPlanSeedBundleSync } from '../src/knowledge/pipeline'
import {
  partitionIssues,
  validateDerivedAssetDerivationSanity,
  validatePlanSeedPayloadUnknown,
  validateTrainingKnowledgeSpecValue,
} from '../src/training/validation'

const golden = {
  title: 'CI golden: product writing',
  topic: 'Product writing for announcements',
  objective: 'Ship clearer copy with measurable lift in engagement',
  skillLevel: 'intermediate' as const,
  durationLabel: '4 modules · self-paced',
  status: 'active' as const,
}

function main() {
  let bundle: ReturnType<typeof buildPlanSeedBundleSync>
  try {
    bundle = buildPlanSeedBundleSync(golden)
  } catch (e) {
    console.error('[validate:training] BLOCKING pipeline.build:', e instanceof Error ? e.message : e)
    process.exit(1)
    return
  }
  const fromSpec = validateTrainingKnowledgeSpecValue(bundle.knowledgeSpec)
  const fromPseed = validatePlanSeedPayloadUnknown(bundle.p_seed)
  const fromDerive = validateDerivedAssetDerivationSanity(bundle.knowledgeSpec)
  const all = [...fromSpec, ...fromPseed, ...fromDerive]
  const { blocking, warnings } = partitionIssues(all)

  for (const w of warnings) {
    console.warn(`[validate:training] WARNING ${w.code}: ${w.message}`)
  }
  for (const b of blocking) {
    console.error(`[validate:training] BLOCKING ${b.code}: ${b.message}`)
  }

  if (blocking.length) {
    console.error(`[validate:training] Failed: ${blocking.length} blocking issue(s), ${warnings.length} warning(s).`)
    process.exit(1)
  }
  console.log(
    `[validate:training] OK — 0 blocking, ${warnings.length} warning(s). Knowledge spec modules: ${bundle.knowledgeSpec.modules.length}.`,
  )
}

main()
