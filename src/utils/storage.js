const PREFIX = 'sarang:';

export function getItem(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode / quota) — fail silently, UI still works in-memory
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}
