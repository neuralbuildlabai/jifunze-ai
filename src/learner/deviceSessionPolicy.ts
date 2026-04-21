import { MAX_ACTIVE_DEVICE_SESSIONS } from '@/learner/learnerCommerceConstants'
import { readDeviceSlots, readOrCreateDeviceId, writeDeviceSlots, type DeviceSlot } from '@/learner/learnerEntitlementStorage'

export type DeviceCheckResult =
  | { ok: true; slots: DeviceSlot[]; deviceId: string }
  | { ok: false; slots: DeviceSlot[]; deviceId: string }

/**
 * Register this browser as an active learner device. If over cap, returns ok:false.
 * Call on app init for signed-in or learn surfaces.
 */
export function registerActiveDevice(): DeviceCheckResult {
  const deviceId = readOrCreateDeviceId()
  const now = Date.now()
  let slots = readDeviceSlots()
  const idx = slots.findIndex((s) => s.deviceId === deviceId)
  if (idx >= 0) {
    slots = slots.map((s, i) => (i === idx ? { ...s, lastSeen: now } : s))
    writeDeviceSlots(slots)
    return { ok: true, slots, deviceId }
  }
  if (slots.length < MAX_ACTIVE_DEVICE_SESSIONS) {
    slots = [...slots, { deviceId, lastSeen: now }]
    writeDeviceSlots(slots)
    return { ok: true, slots, deviceId }
  }
  return { ok: false, slots, deviceId }
}

export function removeOtherDeviceSessions(keepDeviceId: string): void {
  const now = Date.now()
  writeDeviceSlots([{ deviceId: keepDeviceId, lastSeen: now }])
}
