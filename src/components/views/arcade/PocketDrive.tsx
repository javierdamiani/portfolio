import { useEffect, useReducer, useRef, type PointerEvent } from 'react';
import { useOs } from '@/components/os/OsContext';
import { pickArcade } from '@/i18n/arcade';
import {
  createDriveState,
  DRIVE_HEIGHT,
  DRIVE_KEYS,
  DRIVE_WIDTH,
  drawDrive,
  MAX_DT,
  resetDrive,
  stepDrive,
  type DriveState,
} from '@/lib/drive';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';
import { BUTTON, GAME_COPY, GAME_HEAD, GAME_TITLE, TEXT_BUTTON } from './TicTacToe';

/*
 * Module-level game controller: a paused run survives the view unmounting (tab switch, another app
 * opened in the same window). Only one Pocket Drive is ever mounted, so a single `view` slot is enough.
 */
let drive: DriveState | null = null;
const keys = new Set<string>();
let raf = 0;
let last = 0;
let view: { canvas: HTMLCanvasElement | null; sync: () => void } | null = null;

function getDrive(): DriveState {
  drive ??= createDriveState(Math.max(0, Number(getItem(STORAGE_KEYS.arcadeBest)) || 0));
  return drive;
}

function draw() {
  const ctx = view?.canvas?.getContext('2d');
  if (ctx) drawDrive(ctx, getDrive());
}

function pause() {
  const d = getDrive();
  cancelAnimationFrame(raf);
  d.active = false;
  keys.clear();
  if (d.started && !d.over) d.paused = true;
  view?.sync();
}

function finish() {
  const d = getDrive();
  d.over = true;
  pause();
  if (d.score > d.best) {
    d.best = d.score;
    setItem(STORAGE_KEYS.arcadeBest, String(d.best));
  }
  draw();
  view?.sync();
}

function tick(now: number) {
  const d = getDrive();
  if (!d.active || !view) return pause();
  const dt = Math.min((now - last) / 1000, MAX_DT);
  last = now;
  const prevScore = d.score;
  if (stepDrive(d, dt, keys).crashed) return finish();
  draw();
  if (d.score !== prevScore) view.sync();
  raf = requestAnimationFrame(tick);
}

function start() {
  const d = getDrive();
  if (!view) return;
  if (!d.started || d.over) resetDrive(d);
  d.started = true;
  d.paused = false;
  d.active = true;
  last = performance.now();
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(tick);
  view.sync();
}

const toggle = () => (getDrive().active ? pause() : start());

const isTyping = (el: Element | null) =>
  !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || (el as HTMLElement).isContentEditable);

const normKey = (key: string) => (key.length === 1 ? key.toLowerCase() : key);

const DIRS = [
  ['ArrowLeft', '←', 'left'],
  ['ArrowUp', '↑', 'up'],
  ['ArrowDown', '↓', 'down'],
  ['ArrowRight', '→', 'right'],
] as const;

const pad4 = (n: number) => String(n).padStart(4, '0');

export default function PocketDrive() {
  const { lang, windows } = useOs();
  const l = pickArcade(lang);
  const [, sync] = useReducer((n: number) => n + 1, 0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const d = getDrive();
  const minimized = windows.some((w) => w.id === 'arcade' && w.minimized);

  // Mount: attach canvas + paint the current frame. Unmount: stop the loop (pauses a running game).
  useEffect(() => {
    view = { canvas: canvasRef.current, sync };
    draw();
    return () => {
      view = null;
      pause();
    };
  }, []);

  useEffect(() => {
    if (minimized) pause();
  }, [minimized]);

  useEffect(() => {
    const onBlur = () => pause();
    const onVisibility = () => document.hidden && pause();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const active = document.activeElement;
      if (isTyping(active)) return;
      const key = normKey(e.key);
      if ((DRIVE_KEYS as readonly string[]).includes(key) && getDrive().active) {
        e.preventDefault();
        keys.add(key);
      }
      if ((key === ' ' || key === 'Enter') && active === canvasRef.current) {
        e.preventDefault();
        toggle();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(normKey(e.key));
    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const press = (dir: string) => (e: PointerEvent<HTMLButtonElement>) => {
    if (!getDrive().active) return;
    e.preventDefault();
    keys.add(dir);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const release = (dir: string) => () => keys.delete(dir);

  const overlayTitle = d.over ? l.crashed : d.paused ? l.paused : l.ready;
  const overlayAction = d.over ? l.restart : d.paused ? l.resume : l.start;

  return (
    <div>
      <div className={GAME_HEAD}>
        <div>
          <h3 className={GAME_TITLE}>{l.drive}</h3>
          <p className={GAME_COPY}>{l.driveDesc}</p>
        </div>
        <div className="mt-[5px] flex items-center gap-[7px] font-mono text-[10px] font-semibold tracking-[0.035em] whitespace-nowrap text-drive-indicator">
          <span className="size-[6px] rounded-full bg-arcade-dot" />
          ARCADE 02
        </div>
      </div>

      <div className="grid grid-cols-[minmax(220px,320px)_minmax(145px,1fr)] items-start gap-[23px] max-md:gap-[15px] max-sm:grid-cols-1 max-sm:justify-items-center max-sm:gap-4">
        <div className="min-w-0 max-sm:w-full max-sm:max-w-[300px] max-xs:max-w-[260px] max-[360px]:max-w-[205px]">
          <div className="relative overflow-hidden rounded-[9px] border border-drive-screen-border bg-drive-screen">
            <canvas
              ref={canvasRef}
              width={DRIVE_WIDTH}
              height={DRIVE_HEIGHT}
              role="img"
              aria-label={l.driveDesc}
              tabIndex={0}
              className="block aspect-[320/380] h-auto w-full"
            />
            {!d.active && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-[14px] bg-drive-overlay p-[15px] backdrop-blur-[1.5px]">
                <strong className="text-center text-[18px] font-[650] tracking-[-0.02em] text-white">
                  {overlayTitle}
                </strong>
                <button
                  type="button"
                  className={`${BUTTON} w-auto min-w-[132px] justify-center bg-drive-overlay-button text-drive-overlay-button-ink hover:bg-drive-overlay-button-hover`}
                  onClick={() => {
                    start();
                    canvasRef.current?.focus({ preventScroll: true });
                  }}
                >
                  {overlayAction} <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
          <div className="mt-[10px] flex justify-center gap-2" role="group" aria-label={l.steer}>
            {DIRS.map(([dir, glyph, label]) => (
              <button
                key={dir}
                type="button"
                aria-label={l[label]}
                className="h-[34px] w-[42px] cursor-pointer touch-none rounded-[6px] border border-drive-control-border bg-drive-control text-[19px] font-semibold text-drive-control-ink select-none active:bg-drive-control-active max-sm:h-[38px] max-sm:min-w-[47px]"
                onPointerDown={press(dir)}
                onPointerUp={release(dir)}
                onPointerCancel={release(dir)}
                onLostPointerCapture={release(dir)}
                onContextMenu={(e) => e.preventDefault()}
              >
                {glyph}
              </button>
            ))}
          </div>
        </div>

        <div className="max-sm:w-full max-sm:max-w-[300px] max-[360px]:max-w-[205px]">
          <div className="grid grid-cols-2 gap-2 max-sm:gap-[22px]">
            {(
              [
                [l.score, d.score],
                [l.best, d.best],
              ] as const
            ).map(([label, n]) => (
              <div
                key={label}
                className="flex flex-col gap-[7px] border-b border-drive-score-rule pb-[13px] max-sm:pb-[10px]"
              >
                <span className="text-[10px] text-drive-score-label">{label}</span>
                <strong className="font-mono text-[21px] font-[650] tracking-[-0.03em] text-drive-score">
                  {pad4(n)}
                </strong>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-[6px] border-t border-drive-rule pt-4 max-sm:mt-3 max-sm:pt-[10px]">
            <span className="text-[10px] text-[#8b8f95]">{l.controls}</span>
            <strong className="text-[12px] font-[580] text-drive-strong">{l.keys}</strong>
            <p className="m-0 text-[11px] leading-[1.55] text-drive-copy">{l.mobile}</p>
          </div>
          <p className="mt-[21px] mb-[5px] text-[11px] leading-[1.55] text-drive-copy max-sm:my-2">
            {l.driveHint}
          </p>
          <button type="button" className={TEXT_BUTTON} disabled={!d.started || d.over} onClick={toggle}>
            {d.active ? l.pause : l.resume}
          </button>
        </div>
      </div>
    </div>
  );
}
