/**
 * Namespaced localStorage helpers for Placement Suite
 * Prefix: placementSuite:
 */

const PREFIX = 'placementSuite:';

export function getStorageKey(feature: string, key: string): string {
  return `${PREFIX}${feature}:${key}`;
}

export function getItem<T>(feature: string, key: string): T | null {
  try {
    const raw = localStorage.getItem(getStorageKey(feature, key));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(feature: string, key: string, value: T): void {
  try {
    localStorage.setItem(getStorageKey(feature, key), JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}
