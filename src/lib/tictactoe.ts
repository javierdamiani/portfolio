// STUB (WP0) — implemented by Fio in WP4 (SPEC §5.8).
export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export interface GameResult {
  winner: Player | null;
  line: number[] | null;
  draw: boolean;
}

export function resultFor(_board: Board): GameResult {
  return { winner: null, line: null, draw: false };
}

export function idealMove(board: Board, _player: Player): number {
  return board.findIndex((c) => c === null);
}
