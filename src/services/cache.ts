/**
 * In-memory cache — clean file, not changed in this PR.
 * Should be SKIPPED by changed-only analysis.
 */
const store = new Map<string, { value: unknown; expiresAt: number }>();

export function set(key: string, value: unknown, ttlMs: number): void {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function get<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry || Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}
