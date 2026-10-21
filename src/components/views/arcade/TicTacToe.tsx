import { useEffect, useSyncExternalStore } from 'react';
import { useOs } from '@/components/os/OsContext';
import { pickArcade, type ArcadeDict } from '@/i18n/arcade';
import { emptyBoard, idealMove, resultFor, type Board, type Player, type Winner } from '@/lib/tictactoe';

type Mode = 'cpu' | 'duo';

interface XoState {
  board: Board;
  turn: Player;
  mode: Mode;
  result: '' | Winner;
  scores: Record<Winner, number>;
}

/* Module-level store: the game survives the view being unmounted (another app opened in the same window). */
let xo: XoState = { board: emptyBoard(), turn: 'X', mode: 'cpu', result: '', scores: { X: 0, O: 0, D: 0 } };
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => void listeners.delete(fn);
};
const snapshot = () => xo;
function setXo(next: XoState) {
  xo = next;
  listeners.forEach((fn) => fn());
}

function play(i: number, who: Player) {
  const board = xo.board.slice();
  board[i] = who;
  const result = resultFor(board);
  if (result)
    setXo({
      ...xo,
      board,
      result: result.winner,
      scores: { ...xo.scores, [result.winner]: xo.scores[result.winner] + 1 },
    });
  else setXo({ ...xo, board, turn: who === 'X' ? 'O' : 'X' });
}

function takeCell(i: number) {
  if (xo.board[i] || xo.result || (xo.mode === 'cpu' && xo.turn === 'O')) return;
  play(i, xo.turn);
}

const newRound = (patch: Partial<XoState> = {}) =>
  setXo({ ...xo, ...patch, board: emptyBoard(), turn: 'X', result: '' });

function statusText(g: XoState, l: ArcadeDict): string {
  if (g.result === 'D') return l.draw;
  if (g.result === 'X') return g.mode === 'cpu' ? l.youWin : l.xWins;
  if (g.result === 'O') return g.mode === 'cpu' ? l.cpuWins : l.oWins;
  return g.turn === 'X' ? l.turnX : l.turnO;
}

const pad2 = (n: number) => String(n).padStart(2, '0');

export const BUTTON =
  'flex cursor-pointer items-center gap-3 rounded-[7px] px-[14px] py-3 text-left text-[12px] font-semibold';
export const DARK_BUTTON = `${BUTTON} w-full justify-between bg-arcade-button text-white hover:bg-arcade-button-hover`;
export const TEXT_BUTTON =
  'cursor-pointer bg-transparent px-0 py-[11px] text-left text-[11px] font-medium text-arcade-text-button hover:text-arcade-text-button-hover disabled:cursor-default disabled:opacity-45';
export const GAME_HEAD =
  'mb-[21px] flex items-start justify-between gap-[18px] max-sm:mb-[15px] max-sm:flex-col max-sm:gap-3';
export const GAME_TITLE = 'm-0 mb-[6px] text-[16px] font-[660] tracking-[-0.025em] text-arcade-title';
export const GAME_COPY = 'm-0 text-[12px] leading-[1.45] text-arcade-copy';

const MODE_BUTTON =
  'cursor-pointer rounded-[4px] bg-transparent px-[9px] py-[7px] text-[11px] font-[550] text-arcade-mode-ink aria-pressed:bg-white aria-pressed:text-arcade-mode-active aria-pressed:shadow-segment max-xs:text-[10px]';

export default function TicTacToe() {
  const { lang, windows } = useOs();
  const l = pickArcade(lang);
  const g = useSyncExternalStore(subscribe, snapshot, snapshot);
  const minimized = windows.some((w) => w.id === 'arcade' && w.minimized);
  const cpuTurn = g.mode === 'cpu' && g.turn === 'O' && !g.result;

  // CPU move after 320ms; cancelled on unmount, new round, mode change or minimize.
  useEffect(() => {
    if (!cpuTurn || minimized) return;
    const timer = window.setTimeout(() => {
      if (xo.mode !== 'cpu' || xo.turn !== 'O' || xo.result) return;
      const move = idealMove(xo.board, 'O');
      if (move >= 0) play(move, 'O');
    }, 320);
    return () => window.clearTimeout(timer);
  }, [cpuTurn, minimized, g.board]);

  const victory = resultFor(g.board)?.line ?? [];

  return (
    <div>
      <div className={GAME_HEAD}>
        <div>
          <h3 className={GAME_TITLE}>{l.xo}</h3>
          <p className={GAME_COPY}>{l.xoInfo}</p>
        </div>
        <div
          className="inline-flex shrink-0 gap-[2px] rounded-[7px] border border-arcade-mode-border bg-arcade-mode p-[3px]"
          role="group"
          aria-label="Players"
        >
          {(['cpu', 'duo'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              className={MODE_BUTTON}
              aria-pressed={g.mode === mode}
              onClick={() => newRound({ mode })}
            >
              {mode === 'cpu' ? l.solo : l.duo}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(215px,288px)_minmax(135px,1fr)] items-start gap-[28px] max-md:gap-[18px] max-sm:grid-cols-1 max-sm:justify-items-center max-sm:gap-[17px] max-xs:gap-[13px]">
        <div className="w-full max-w-[288px] rounded-[11px] bg-xo-board p-[7px] max-sm:max-w-[267px] max-xs:max-w-[242px] max-[360px]:max-w-[232px]">
          <div className="grid aspect-square grid-cols-3 gap-[5px]" role="grid" aria-label={l.xo}>
            {g.board.map((value, i) => {
              const won = victory.includes(i);
              const tone = won
                ? 'bg-xo-won text-xo-won-ink'
                : value === 'O'
                  ? 'bg-white text-xo-o'
                  : 'bg-white text-xo-ink';
              return (
                <button
                  key={i}
                  type="button"
                  role="gridcell"
                  className={`grid aspect-square cursor-pointer place-items-center rounded-[5px] text-[clamp(38px,5vw,55px)] leading-none transition-colors duration-[130ms] enabled:hover:bg-xo-hover disabled:cursor-default ${value === 'O' ? 'font-normal' : 'font-medium'} ${tone}`}
                  aria-label={`${l.xo}, ${i + 1}: ${value || 'empty'}`}
                  disabled={Boolean(value || g.result || cpuTurn)}
                  onClick={() => takeCell(i)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-sm:grid max-sm:w-full max-sm:grid-cols-[1fr_auto] max-sm:items-center max-sm:gap-x-[10px]">
          <div
            className="mt-[3px] mb-[18px] flex min-h-[25px] items-center gap-2 text-[13px] font-[580] text-xo-status max-sm:col-span-full max-sm:m-0 max-sm:mb-[7px]"
            role="status"
            aria-live="polite"
          >
            <span className="size-[7px] flex-none rounded-full bg-arcade-dot" />
            {statusText(g, l)}
          </div>
          <div className="mb-[23px] border-t border-arcade-score-rule max-sm:col-span-full max-sm:mb-3 max-sm:flex max-sm:justify-between max-sm:gap-3">
            {(
              [
                [l.you, g.scores.X],
                [l.ties, g.scores.D],
                [l.other, g.scores.O],
              ] as const
            ).map(([label, n]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-[6px] border-b border-arcade-score-rule py-[10px] max-sm:flex-1 max-sm:flex-col max-sm:items-start max-sm:gap-[2px] max-sm:py-[7px]"
              >
                <span className="text-[11px] text-arcade-score-label max-sm:text-[10px]">{label}</span>
                <strong className="font-mono text-[17px] font-semibold text-arcade-score max-sm:text-[15px]">
                  {pad2(n)}
                </strong>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={`${DARK_BUTTON} max-sm:w-auto max-sm:py-[10px]`}
            onClick={() => newRound()}
          >
            {l.newRound} <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            className={TEXT_BUTTON}
            onClick={() => newRound({ scores: { X: 0, O: 0, D: 0 } })}
          >
            {l.resetScore}
          </button>
        </div>
      </div>
    </div>
  );
}
