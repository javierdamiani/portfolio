import type { Dict } from '@/i18n/dict';
import { APP_IDS, type AppId, type Lang } from '@/types';

/** Pure command interpreter for the Terminal view (SPEC §5.7). Ported from `handleTerminal` in app.js. */
export interface TerminalContext {
  lang: Lang;
  t: Dict;
  email: string;
  projectNames: string[];
  /** Injectable clock for `date` (tests). Defaults to `new Date()`. */
  now?: Date;
}

export type TerminalAction = { type: 'open'; id: AppId } | { type: 'theme' } | { type: 'clear' };

export interface TerminalResult {
  output: string;
  action?: TerminalAction;
}

export const PROMPT = 'javier@mac ~ %';

export const OPEN_ALIASES: Readonly<Record<string, AppId>> = {
  projects: 'work',
  journey: 'experience',
  mail: 'contact',
  games: 'arcade',
};

const isAppId = (v: string): v is AppId => (APP_IDS as readonly string[]).includes(v);

/** Lower-cases and collapses whitespace so `  SUDO   hire  Javier ` === `sudo hire javier`. */
export const normalizeCommand = (input: string): string => input.trim().toLowerCase().replace(/\s+/g, ' ');

export function formatDate(lang: Lang, now: Date = new Date()): string {
  return now.toLocaleString(lang === 'es' ? 'es-PE' : 'en-US', { timeZone: 'America/Lima' });
}

export function runCommand(input: string, ctx: TerminalContext): TerminalResult {
  const { t } = ctx;
  const cmd = normalizeCommand(input);

  switch (cmd) {
    case 'help':
      return { output: t.termHelp };
    case 'whoami':
      return { output: t.termWho };
    case 'ls':
    case 'projects':
      return { output: ctx.projectNames.map((name) => `${name}/`).join('   ') };
    case 'about':
      return { output: t.termWho, action: { type: 'open', id: 'about' } };
    case 'contact':
      return { output: ctx.email, action: { type: 'open', id: 'contact' } };
    case 'date':
      return { output: formatDate(ctx.lang, ctx.now) };
    case 'clear':
      return { output: '', action: { type: 'clear' } };
    case 'theme':
      return { output: t.termTheme, action: { type: 'theme' } };
    case 'sudo hire javier':
      return { output: t.termHire };
  }

  if (cmd.startsWith('open ')) {
    const target = cmd.slice(5).trim();
    const id = OPEN_ALIASES[target] ?? target;
    if (isAppId(id)) {
      return {
        output: `${ctx.lang === 'es' ? 'Abriendo' : 'Opening'} ${id}…`,
        action: { type: 'open', id },
      };
    }
  }

  return { output: t.termError };
}
