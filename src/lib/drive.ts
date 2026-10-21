// STUB (WP0) — Pocket Drive engine, implemented by Fio in WP4 (SPEC §5.8).
export const DRIVE_WIDTH = 320;
export const DRIVE_HEIGHT = 380;

export interface DriveState {
  running: boolean;
  score: number;
}

export function createDrive(): DriveState {
  return { running: false, score: 0 };
}
