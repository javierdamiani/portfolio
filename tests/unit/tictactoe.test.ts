import { describe, expect, it } from 'vitest';
import { emptyBoard, idealMove, LINES, resultFor, type Board, type Cell } from '@/lib/tictactoe';

const parse = (s: string): Board => [...s].map((c) => (c === '.' ? '' : (c as Cell)));

describe('tictactoe resultFor', () => {
  it('detects a win on each of the 8 lines for both players', () => {
    expect(LINES).toHaveLength(8);
    for (const line of LINES) {
      for (const p of ['X', 'O'] as const) {
        const board = emptyBoard();
        for (const i of line) board[i] = p;
        expect(resultFor(board)).toEqual({ winner: p, line: [...line] });
      }
    }
  });

  it('returns null while the game is open', () => {
    expect(resultFor(emptyBoard())).toBeNull();
    expect(resultFor(parse('XO.......'))).toBeNull();
  });

  it('detects a draw', () => {
    expect(resultFor(parse('XOXXOOOXX'))).toEqual({ winner: 'D', line: [] });
  });
});

describe('tictactoe idealMove', () => {
  it('takes the win', () => {
    expect(idealMove(parse('OO.XX....'), 'O')).toBe(2);
  });

  it('prefers winning over blocking', () => {
    expect(idealMove(parse('XX.OO....'), 'O')).toBe(5);
  });

  it('blocks the opponent', () => {
    expect(idealMove(parse('XX..O....'), 'O')).toBe(2);
    expect(idealMove(parse('X.....X.O'), 'O')).toBe(3);
    expect(idealMove(parse('O...O....'), 'X')).toBe(8);
  });

  it('takes the centre when free', () => {
    expect(idealMove(parse('X........'), 'O')).toBe(4);
  });

  it('picks a free corner (random injectable)', () => {
    const board = parse('....X....');
    expect(idealMove(board, 'O', () => 0)).toBe(0);
    expect(idealMove(board, 'O', () => 0.99)).toBe(8);
    for (let i = 0; i < 20; i++) expect([0, 2, 6, 8]).toContain(idealMove(board, 'O'));
  });

  it('falls back to any free cell, -1 on a full board', () => {
    expect(idealMove(parse('XOXOXOOXO'), 'O')).toBe(-1);
    const noCorners = parse('XOX.X.OXO');
    expect(idealMove(noCorners, 'O', () => 0)).toBe(3);
    expect(idealMove(noCorners, 'O', () => 0.99)).toBe(5);
  });
});
