/**
 * Safe localStorage access: SSR-safe (no window at build time) and resilient to
 * private mode / blocked storage (every access wrapped in try/catch).
 */
function store(): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getItem(key: string): string | null {
  try {
    return store()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function setItem(key: string, value: string): void {
  try {
    store()?.setItem(key, value);
  } catch {
    /* storage unavailable: ignore */
  }
}

export function removeItem(key: string): void {
  try {
    store()?.removeItem(key);
  } catch {
    /* storage unavailable: ignore */
  }
}

export const STORAGE_KEYS = {
  lang: 'javier-lang',
  wallpaper: 'javier-wallpaper',
  arcadeBest: 'jd-arcade-best',
} as const;
