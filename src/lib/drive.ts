/**
 * Pocket Drive engine (ported from arcade.js `tick` / `drawCar` / `paintVehicle`).
 * No DOM globals: state is a plain object, `stepDrive` is deterministic given `random`,
 * `drawDrive` only touches the 2D context it receives.
 */
export const DRIVE_WIDTH = 320;
export const DRIVE_HEIGHT = 380;
export const LANES = [68, 144, 220] as const;
export const PLAYER_BOUNDS = { minX: 44, maxX: 244, minY: 28, maxY: 320 } as const;
export const MAX_DT = 0.04;

const PLAYER_START = { x: 144, y: 307 } as const;
const CAR_W = 31;
const CAR_H = 53;

export interface Vehicle {
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
}

export interface DriveState {
  /** Loop running right now. */
  active: boolean;
  /** Started and interrupted (not crashed). */
  paused: boolean;
  /** Crashed. */
  over: boolean;
  /** At least one start since the last reset. */
  started: boolean;
  score: number;
  best: number;
  time: number;
  spawn: number;
  enemies: Vehicle[];
  player: Vehicle;
}

export const DRIVE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'] as const;

export function createDriveState(best = 0): DriveState {
  return {
    active: false,
    paused: false,
    over: false,
    started: false,
    score: 0,
    best: Math.max(0, Number.isFinite(best) ? Math.floor(best) : 0),
    time: 0,
    spawn: 0,
    enemies: [],
    player: { x: PLAYER_START.x, y: PLAYER_START.y, w: CAR_W, h: CAR_H },
  };
}

/** Back to the start line (keeps `best`). Mutates and returns the state. */
export function resetDrive(state: DriveState): DriveState {
  state.active = false;
  state.paused = false;
  state.over = false;
  state.started = false;
  state.score = 0;
  state.time = 0;
  state.spawn = 0;
  state.enemies = [];
  state.player.x = PLAYER_START.x;
  state.player.y = PLAYER_START.y;
  return state;
}

const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

/** Bounding-box overlap with the prototype's forgiving margins (5px sideways, 7px lengthwise). */
export function collides(a: Vehicle, b: Vehicle): boolean {
  return (
    a.x + 5 < b.x + b.w - 5 && a.x + a.w - 5 > b.x + 5 && a.y + 7 < b.y + b.h - 7 && a.y + a.h - 7 > b.y + 7
  );
}

/** Lanes where a new car may appear (no car near the top of that lane). */
export const freeLanes = (enemies: readonly Vehicle[]): number[] =>
  LANES.filter((x) => !enemies.some((e) => e.y < 92 && Math.abs(e.x - x) < 36));

/** Advances the simulation by `dt` seconds (clamped to MAX_DT). Mutates `state`. */
export function stepDrive(
  state: DriveState,
  dt: number,
  keys: ReadonlySet<string>,
  random: () => number = Math.random,
): { crashed: boolean } {
  const step = clamp(dt, 0, MAX_DT);
  state.time += step;
  const left = keys.has('ArrowLeft') || keys.has('a');
  const right = keys.has('ArrowRight') || keys.has('d');
  const up = keys.has('ArrowUp') || keys.has('w');
  const down = keys.has('ArrowDown') || keys.has('s');
  const p = state.player;
  p.x = clamp(p.x + (Number(right) - Number(left)) * 215 * step, PLAYER_BOUNDS.minX, PLAYER_BOUNDS.maxX);
  p.y = clamp(p.y + (Number(down) - Number(up)) * 190 * step, PLAYER_BOUNDS.minY, PLAYER_BOUNDS.maxY);

  const speed = Math.min(255, 130 + state.time * 3.3);
  state.spawn -= step;
  if (state.spawn <= 0) {
    const choices = freeLanes(state.enemies);
    if (choices.length) {
      const x = choices[Math.floor(random() * choices.length)] ?? choices[0]!;
      state.enemies.push({ x, y: -64, w: CAR_W, h: CAR_H, color: random() > 0.52 ? '#b6c9d1' : '#d8bda8' });
    }
    state.spawn = Math.max(0.46, 1.12 - state.time * 0.008) + random() * 0.28;
  }
  for (const e of state.enemies) e.y += speed * step;
  state.enemies = state.enemies.filter((e) => e.y < 410);
  state.score = Math.floor(state.time * 10);
  return { crashed: state.enemies.some((e) => collides(p, e)) };
}

function rounded(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

export function paintVehicle(
  ctx: CanvasRenderingContext2D,
  p: Vehicle,
  player: boolean,
  color: string,
): void {
  const { x, y, w, h } = p;
  rounded(ctx, x - 4, y + 9, 5, 13, 1.7, '#171a1d');
  rounded(ctx, x + w - 1, y + 9, 5, 13, 1.7, '#171a1d');
  rounded(ctx, x - 4, y + h - 22, 5, 13, 1.7, '#171a1d');
  rounded(ctx, x + w - 1, y + h - 22, 5, 13, 1.7, '#171a1d');
  rounded(ctx, x, y, w, h, 5, color);
  rounded(ctx, x + 5, y + 8, w - 10, 13, 2, player ? '#2d4651' : '#657782');
  rounded(ctx, x + 6, y + h - 17, w - 12, 11, 2, player ? '#436675' : '#90a0a7');
  rounded(ctx, x + 3, y + h - 5, 7, 3, 1, '#bf4d49');
  rounded(ctx, x + w - 10, y + h - 5, 7, 3, 1, '#bf4d49');
  rounded(ctx, x + 3, y + 2, 7, 3, 1, '#f6e8bb');
  rounded(ctx, x + w - 10, y + 2, 7, 3, 1, '#f6e8bb');
}

export function drawDrive(ctx: CanvasRenderingContext2D, state: DriveState): void {
  ctx.clearRect(0, 0, DRIVE_WIDTH, DRIVE_HEIGHT);
  ctx.fillStyle = '#e6e9e7';
  ctx.fillRect(0, 0, DRIVE_WIDTH, DRIVE_HEIGHT);
  ctx.fillStyle = '#c8cec9';
  ctx.fillRect(32, 0, 256, DRIVE_HEIGHT);
  ctx.fillStyle = '#30363d';
  ctx.fillRect(39, 0, 242, DRIVE_HEIGHT);
  ctx.fillStyle = '#e9ddba';
  ctx.fillRect(43, 0, 3, DRIVE_HEIGHT);
  ctx.fillRect(274, 0, 3, DRIVE_HEIGHT);
  ctx.fillStyle = '#9298a0';
  const offset = (state.time * 128) % 75;
  for (const x of [120, 200]) for (let y = -85 + offset; y < 420; y += 75) ctx.fillRect(x, y, 3, 39);
  for (const e of state.enemies) paintVehicle(ctx, e, false, e.color ?? '#b6c9d1');
  paintVehicle(ctx, state.player, true, '#f3f0e9');
  ctx.fillStyle = 'rgba(255,255,255,.62)';
  ctx.font = '10px ui-monospace, Menlo, monospace';
  ctx.textAlign = 'left';
  ctx.fillText('JD / 02', 13, 20);
}
