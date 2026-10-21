import type { AppId, WindowBox } from '@/types';

// STUB (WP0) — window geometry helpers, implemented by Aria in WP2.
export function initialBox(_id: AppId, viewport: { width: number; height: number }): WindowBox {
  const width = Math.min(860, viewport.width - 40);
  const height = Math.min(560, viewport.height - 120);
  return { left: Math.max(20, (viewport.width - width) / 2), top: 30, width, height };
}
