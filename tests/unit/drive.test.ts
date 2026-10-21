import { describe, expect, it } from 'vitest';
import {
  collides,
  createDriveState,
  DRIVE_HEIGHT,
  DRIVE_WIDTH,
  freeLanes,
  LANES,
  PLAYER_BOUNDS,
  resetDrive,
  stepDrive,
} from '@/lib/drive';

/** Deterministic PRNG (mulberry32). */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('drive engine', () => {
  it('has the prototype canvas size', () => {
    expect([DRIVE_WIDTH, DRIVE_HEIGHT]).toEqual([320, 380]);
  });

  it('creates and resets state, keeping best', () => {
    const s = createDriveState(42);
    expect(s.best).toBe(42);
    expect(createDriveState(Number.NaN).best).toBe(0);
    stepDrive(s, 0.04, new Set(['ArrowLeft']), () => 0.9);
    s.started = true;
    resetDrive(s);
    expect(s).toMatchObject({
      time: 0,
      score: 0,
      enemies: [],
      started: false,
      best: 42,
      player: { x: 144, y: 307 },
    });
  });

  it('keeps the player inside the bounds', () => {
    const s = createDriveState();
    const run = (keys: string[]) => {
      for (let i = 0; i < 200; i++) {
        s.enemies = [];
        stepDrive(s, 0.04, new Set(keys), () => 0.5);
      }
    };
    run(['ArrowLeft', 'ArrowUp']);
    expect(s.player).toMatchObject({ x: PLAYER_BOUNDS.minX, y: PLAYER_BOUNDS.minY });
    run(['d', 's']);
    expect(s.player).toMatchObject({ x: PLAYER_BOUNDS.maxX, y: PLAYER_BOUNDS.maxY });
  });

  it('grows the score with time and clamps dt', () => {
    const s = createDriveState();
    stepDrive(s, 0.04, new Set(), () => 0.5);
    expect(s.score).toBe(0);
    for (let i = 0; i < 25; i++) {
      s.enemies = [];
      stepDrive(s, 0.04, new Set(), () => 0.5);
    }
    expect(s.score).toBe(Math.floor(s.time * 10));
    expect(s.score).toBe(10);
    s.enemies = [];
    const before = s.time;
    stepDrive(s, 5, new Set(), () => 0.5);
    expect(s.time - before).toBeCloseTo(0.04);
  });

  it('never spawns two cars in the same lane within 36px near the top', () => {
    const random = seeded(7);
    const s = createDriveState();
    for (let i = 0; i < 3000; i++) {
      const before = s.enemies.length;
      const lanesBefore = freeLanes(s.enemies);
      stepDrive(s, 0.04, new Set(), random);
      s.player.x = -1000; // keep the player out of the way
      if (s.enemies.length > before) {
        const spawned = s.enemies[s.enemies.length - 1]!;
        expect(LANES).toContain(spawned.x);
        expect(lanesBefore).toContain(spawned.x);
      }
      const top = s.enemies.filter((e) => e.y < 0);
      for (const a of top) for (const b of top) if (a !== b) expect(Math.abs(a.x - b.x) >= 36).toBe(true);
    }
  });

  it('detects collisions with margins', () => {
    const a = { x: 100, y: 100, w: 31, h: 53 };
    expect(collides(a, { ...a })).toBe(true);
    expect(collides(a, { ...a, x: 130 })).toBe(false); // 30px apart: margins absorb it
    expect(collides(a, { ...a, x: 115 })).toBe(true);
    expect(collides(a, { ...a, y: 140 })).toBe(false);

    const s = createDriveState();
    s.spawn = 10;
    s.enemies = [{ x: s.player.x, y: s.player.y - 10, w: 31, h: 53, color: '#fff' }];
    expect(stepDrive(s, 0.01, new Set(), () => 0.5).crashed).toBe(true);
  });

  it('is deterministic with an injected random', () => {
    const play = () => {
      const s = createDriveState();
      const r = seeded(123);
      let crashed = false;
      for (let i = 0; i < 500 && !crashed; i++) crashed = stepDrive(s, 0.04, new Set(['a']), r).crashed;
      return JSON.stringify(s);
    };
    expect(play()).toBe(play());
  });
  it('collides at exactly 20px sideways but not at 21px (5px side margins)', () => {
    const a = { x: 100, y: 100, w: 31, h: 53 };
    expect(collides(a, { ...a, x: 120 })).toBe(true);
    expect(collides(a, { ...a, x: 121 })).toBe(false);
    expect(collides(a, { ...a, x: 80 })).toBe(true);
    expect(collides(a, { ...a, x: 79 })).toBe(false);
    // 7px lengthwise margins: 53 - 14 = 39px of overlap budget.
    expect(collides(a, { ...a, y: 138 })).toBe(true);
    expect(collides(a, { ...a, y: 139 })).toBe(false);
  });

  /** A state with no spawn due and the player parked away from the traffic. */
  const quiet = (time = 0) => {
    const s = createDriveState();
    s.time = time;
    s.spawn = 100;
    s.player.x = PLAYER_BOUNDS.minX;
    return s;
  };

  it('moves enemies at min(255, 130 + t*3.3) px/s', () => {
    for (const t0 of [0, 10, 30, 37.84, 60, 500]) {
      const s = quiet(t0);
      s.enemies = [{ x: LANES[2], y: 0, w: 31, h: 53 }];
      stepDrive(s, 0.02, new Set(), () => 0.5);
      const t = t0 + 0.02;
      expect(s.enemies[0]!.y).toBeCloseTo(Math.min(255, 130 + t * 3.3) * 0.02, 9);
    }
  });

  it('schedules the next spawn at max(.46, 1.12 - t*.008) + rnd*.28', () => {
    for (const [t, rnd] of [
      [0, 0],
      [0, 0.99],
      [40, 0.5],
      [82.5, 0.25],
      [200, 0.7],
    ] as const) {
      const s = quiet(t);
      s.spawn = 0;
      stepDrive(s, 0, new Set(), () => rnd);
      expect(s.enemies).toHaveLength(1);
      expect(s.spawn).toBeCloseTo(Math.max(0.46, 1.12 - t * 0.008) + rnd * 0.28, 12);
    }
  });

  it('culls enemies once y >= 410', () => {
    const s = quiet();
    const car = (y: number) => ({ x: LANES[2], y, w: 31, h: 53 });
    s.enemies = [car(409.99), car(410), car(500)];
    stepDrive(s, 0, new Set(), () => 0.5);
    expect(s.enemies.map((e) => e.y)).toEqual([409.99]);
  });

  it('colours a new car by random > 0.52', () => {
    const spawnWith = (colourRoll: number) => {
      const s = quiet();
      s.spawn = 0;
      const rolls = [0, colourRoll, 0]; // lane, colour, next spawn
      stepDrive(s, 0, new Set(), () => rolls.shift() ?? 0);
      return s.enemies[0]!.color;
    };
    expect(spawnWith(0.53)).toBe('#b6c9d1');
    expect(spawnWith(0.99)).toBe('#b6c9d1');
    expect(spawnWith(0.52)).toBe('#d8bda8');
    expect(spawnWith(0)).toBe('#d8bda8');
  });
});
