/** Pure Tic Tac Toe rules + CPU (ported from arcade.js `resultFor` / `idealMove`). */
export type Player = 'X' | 'O';
export type Cell = '' | Player;
export type Board = Cell[];
export type Winner = Player | 'D';

export interface GameResult {
  /** 'D' = draw. */
  winner: Winner;
  /** Winning cell indexes (empty on a draw). */
  line: number[];
}

export const LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const emptyBoard = (): Board => Array<Cell>(9).fill('');

export function resultFor(board: readonly Cell[]): GameResult | null {
  for (const seq of LINES) {
    const first = board[seq[0]];
    if (first && seq.every((i) => board[i] === first)) return { winner: first, line: [...seq] };
  }
  return board.every(Boolean) ? { winner: 'D', line: [] } : null;
}

/**
 * Win if possible, otherwise block, otherwise centre, otherwise a random free corner, otherwise any free cell.
 * Returns -1 when the board is full.
 */
export function idealMove(
  board: readonly Cell[],
  player: Player = 'O',
  random: () => number = Math.random,
): number {
  const options = board.flatMap((v, i) => (v ? [] : [i]));
  if (!options.length) return -1;
  const opponent: Player = player === 'O' ? 'X' : 'O';
  for (const who of [player, opponent]) {
    for (const i of options) {
      const next = board.slice();
      next[i] = who;
      if (resultFor(next)?.winner === who) return i;
    }
  }
  if (board[4] === '') return 4;
  const corners = [0, 2, 6, 8].filter((i) => !board[i]);
  const pool = corners.length ? corners : options;
  return pool[Math.floor(random() * pool.length)] ?? pool[0]!;
}
