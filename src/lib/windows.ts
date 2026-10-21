import type { AppId, WindowBox } from '@/types';

/** Stage = the desktop area below the menubar (`<main id="main">`), in CSS px. */
export interface Stage {
  width: number;
  height: number;
}

/** Preferred window size per app [width, height] (prototype `initialBox`). */
export const WINDOW_SIZES: Record<AppId, readonly [number, number]> = {
  work: [946, 648],
  about: [780, 568],
  experience: [790, 600],
  terminal: [690, 470],
  arcade: [825, 630],
  contact: [700, 510],
  overview: [730, 540],
};

/** English accessible names for the window `<section>` (prototype `windowTitles`). */
export const WINDOW_ARIA: Record<AppId, string> = {
  work: 'Projects',
  about: 'About Javier',
  experience: 'Journey',
  terminal: 'Terminal',
  arcade: 'Arcade',
  contact: 'Contact',
  overview: 'Quick Look',
};

/** Digit shortcuts (keyboard 1-6). */
export const KEY_APPS: Readonly<Record<string, AppId>> = {
  '1': 'work',
  '2': 'about',
  '3': 'experience',
  '4': 'terminal',
  '5': 'contact',
  '6': 'arcade',
};

export const MIN_WINDOW = { width: 530, height: 335 } as const;

/** Initial geometry of a window for `id` inside `stage` (same formula as the prototype). */
export function initialBox(id: AppId, stage: Stage): WindowBox {
  const { width: w, height: h } = stage;
  const [sw, sh] = WINDOW_SIZES[id];
  const offset = id === 'work' ? 0 : 1;
  const width = Math.min(sw, w - 35);
  const height = Math.min(sh, h - 126);
  const left = Math.max(12, Math.min(w - width - 45, Math.max(365, w * 0.28) + offset * 34));
  const top = Math.max(13, Math.min(h - height - 85, Math.max(55, h * 0.105) + offset * 30));
  return { width: Math.max(520, width), height: Math.max(340, height), left, top };
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/** Position while dragging by the toolbar (prototype `dragStart`). */
export function dragBox(box: WindowBox, start: WindowBox, dx: number, dy: number, stage: Stage): WindowBox {
  return {
    ...box,
    left: clamp(start.left + dx, 0, stage.width - 80),
    top: clamp(start.top + dy, 0, stage.height - 90),
  };
}

/** Size while resizing by the corner grip (prototype `resizeStart`). */
export function resizeBox(box: WindowBox, start: WindowBox, dx: number, dy: number, stage: Stage): WindowBox {
  return {
    ...box,
    width: Math.max(MIN_WINDOW.width, Math.min(stage.width - box.left - 8, start.width + dx)),
    height: Math.max(MIN_WINDOW.height, Math.min(stage.height - box.top - 85, start.height + dy)),
  };
}

/**
 * Keep a window fully on-stage after the viewport changes: cap its size to the stage (respecting
 * MIN_WINDOW unless the stage itself is smaller), then pull it back inside.
 */
export function fitBox(box: WindowBox, stage: Stage): WindowBox {
  // Never cap below the minimum size, unless the stage itself is narrower/shorter than it.
  const maxWidth = Math.max(stage.width - 25, Math.min(MIN_WINDOW.width, stage.width));
  const maxHeight = Math.max(stage.height - 126, Math.min(MIN_WINDOW.height, stage.height));
  const width = Math.min(box.width, maxWidth);
  const height = Math.min(box.height, maxHeight);
  return {
    width,
    height,
    left: clamp(box.left, 0, Math.max(0, stage.width - width - 8)),
    top: clamp(box.top, 0, Math.max(0, stage.height - height - 85)),
  };
}
