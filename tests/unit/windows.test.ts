import { describe, expect, it } from 'vitest';
import { dragBox, fitBox, initialBox, MIN_WINDOW, resizeBox, WINDOW_SIZES } from '@/lib/windows';

const DESKTOP = { width: 1440, height: 861 };

describe('initialBox', () => {
  it('uses the preferred size on a large stage and places Projects at 28% of the width', () => {
    const box = initialBox('work', DESKTOP);
    expect([box.width, box.height]).toEqual(WINDOW_SIZES.work);
    expect(box.left).toBeCloseTo(Math.max(365, 1440 * 0.28));
    expect(box.top).toBeCloseTo(Math.max(55, 861 * 0.105));
  });

  it('offsets every other app a little to the right and down', () => {
    const work = initialBox('work', DESKTOP);
    const about = initialBox('about', DESKTOP);
    expect(about.left - work.left).toBeCloseTo(34);
    expect(about.top - work.top).toBeCloseTo(30);
  });

  it('shrinks to the stage but never below the minimum size', () => {
    const box = initialBox('work', { width: 600, height: 400 });
    expect(box.width).toBeGreaterThanOrEqual(520);
    expect(box.height).toBeGreaterThanOrEqual(340);
    expect(box.left).toBe(12);
    expect(box.top).toBeGreaterThanOrEqual(13);
  });
});

describe('fitBox', () => {
  it('pulls Projects back on-stage when the browser goes from 1440 to 900 wide', () => {
    const before = initialBox('work', DESKTOP);
    const after = fitBox(before, { width: 900, height: 861 });
    expect(after.width).toBe(875);
    expect(after.left + after.width).toBeLessThanOrEqual(900);
    expect(after.left).toBeGreaterThanOrEqual(0);
    expect(after.height).toBe(before.height);
  });

  it('reproduces the verifier scenario (left 403 / width 946 → stage 900)', () => {
    const after = fitBox({ left: 403, top: 90, width: 946, height: 648 }, { width: 900, height: 661 });
    expect(after).toEqual({ left: 17, top: 41, width: 875, height: 535 });
  });

  it('keeps a window that already fits untouched', () => {
    const box = { left: 100, top: 60, width: 700, height: 500 };
    expect(fitBox(box, DESKTOP)).toEqual(box);
  });

  it('respects the minimum size unless the stage itself is smaller', () => {
    const box = { left: 300, top: 200, width: 946, height: 648 };
    const small = fitBox(box, { width: 540, height: 400 });
    expect(small.width).toBe(MIN_WINDOW.width);
    expect(small.height).toBe(MIN_WINDOW.height);
    expect(small.left).toBe(540 - 530 - 8);
    expect(small.top).toBe(0);
    const tiny = fitBox(box, { width: 300, height: 200 });
    expect(tiny.width).toBe(300);
    expect(tiny.height).toBe(200);
    expect(tiny.left).toBe(0);
    expect(tiny.top).toBe(0);
  });
});

describe('dragBox', () => {
  const start = { left: 400, top: 100, width: 700, height: 500 };

  it('moves by the pointer delta', () => {
    expect(dragBox(start, start, -120, 40, DESKTOP)).toEqual({ ...start, left: 280, top: 140 });
  });

  it('cannot leave the stage through the top/left nor fully through the right/bottom', () => {
    expect(dragBox(start, start, -1000, -1000, DESKTOP)).toMatchObject({ left: 0, top: 0 });
    expect(dragBox(start, start, 5000, 5000, DESKTOP)).toMatchObject({ left: 1440 - 80, top: 861 - 90 });
  });
});

describe('resizeBox', () => {
  const start = { left: 400, top: 100, width: 700, height: 500 };

  it('grows by the pointer delta', () => {
    expect(resizeBox(start, start, 50, 30, DESKTOP)).toEqual({ ...start, width: 750, height: 530 });
  });

  it('clamps to the stage edge and to the minimum size', () => {
    const big = resizeBox(start, start, 5000, 5000, DESKTOP);
    expect(big.width).toBe(1440 - 400 - 8);
    expect(big.height).toBe(861 - 100 - 85);
    const small = resizeBox(start, start, -5000, -5000, DESKTOP);
    expect(small.width).toBe(MIN_WINDOW.width);
    expect(small.height).toBe(MIN_WINDOW.height);
  });
});
