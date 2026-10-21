import type { Dict } from '@/i18n/dict';
import type { AppId, Lang } from '@/types';

// STUB (WP0) — implemented by Fio in WP4 (SPEC §5.7).
export interface TerminalContext {
  lang: Lang;
  t: Dict;
  email: string;
  projectNames: string[];
}

export type TerminalAction = { type: 'open'; id: AppId } | { type: 'theme' } | { type: 'clear' };

export interface TerminalResult {
  output: string;
  action?: TerminalAction;
}

export const PROMPT = 'javier@mac ~ %';

export function runCommand(_input: string, ctx: TerminalContext): TerminalResult {
  return { output: ctx.t.termError };
}
