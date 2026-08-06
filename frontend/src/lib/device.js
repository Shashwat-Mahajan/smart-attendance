// A simple, dependency-free device fingerprint: a random ID generated once
// and persisted in localStorage. It survives reloads but not a cleared
// browser/different browser/incognito — good enough to catch "one phone,
// many students" style proxy attendance without adding a fingerprinting
// library. Swap this out for FingerprintJS later if you need something
// that survives storage clearing.
const DEVICE_ID_KEY = "smart_attendance_device_id";

export const getDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId =
      crypto.randomUUID?.() ||
      `dev-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
};
