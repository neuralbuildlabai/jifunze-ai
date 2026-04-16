const STORAGE_KEY = 'jifunze_simulation_mode'

/**
 * **Transient UI preference** (localStorage): whether trend runs should write synthetic publish
 * rows and rebuild opportunities for the learning demo.
 *
 * This is intentionally separate from **durable learning state** (`getPersistence` → performance
 * rows, signal/opportunity caches, learning snapshots, lab run history). Toggling simulation
 * does not clear persisted memory; it only changes the next pipeline refresh’s behavior.
 *
 * @see `buildRankedOpportunitiesForBrand` in `services/signals/signalOrchestrator.ts`
 */
export function getSimulationMode(): boolean {
  try {
    if (typeof localStorage === 'undefined') return false
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null || raw === '') return false
    return raw === 'true' || raw === '1'
  } catch {
    return false
  }
}

export function setSimulationMode(on: boolean): void {
  try {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(STORAGE_KEY, on ? 'true' : 'false')
  } catch {
    /* ignore quota / private mode */
  }
}
