import { describe, expect, it } from 'vitest';
import { DICT } from '@/i18n/dict';
import { normalizeCommand, PROMPT, runCommand, type TerminalContext } from '@/lib/terminal';
import { APP_IDS } from '@/types';

const ctx = (lang: 'en' | 'es' = 'en'): TerminalContext => ({
  lang,
  t: DICT[lang],
  email: 'hi@example.com',
  projectNames: ['BetSell', 'Universidad Continental', 'Comic Nest'],
  now: new Date('2026-10-21T17:30:00Z'),
});

describe('terminal runCommand', () => {
  it('exposes the prompt', () => expect(PROMPT).toBe('javier@mac ~ %'));

  it('help / whoami / sudo hire javier', () => {
    expect(runCommand('help', ctx())).toEqual({ output: DICT.en.termHelp });
    expect(runCommand('whoami', ctx('es'))).toEqual({ output: DICT.es.termWho });
    expect(runCommand('sudo hire javier', ctx())).toEqual({ output: DICT.en.termHire });
  });

  it('ls and projects list project names', () => {
    const expected = 'BetSell/   Universidad Continental/   Comic Nest/';
    expect(runCommand('ls', ctx()).output).toBe(expected);
    expect(runCommand('projects', ctx()).output).toBe(expected);
    expect(runCommand('ls', ctx()).action).toBeUndefined();
  });

  it('about and contact open their apps', () => {
    expect(runCommand('about', ctx())).toEqual({
      output: DICT.en.termWho,
      action: { type: 'open', id: 'about' },
    });
    expect(runCommand('contact', ctx())).toEqual({
      output: 'hi@example.com',
      action: { type: 'open', id: 'contact' },
    });
  });

  it('date uses the Lima timezone and the language locale', () => {
    const now = new Date('2026-10-21T17:30:00Z');
    expect(runCommand('date', ctx()).output).toBe(now.toLocaleString('en-US', { timeZone: 'America/Lima' }));
    expect(runCommand('date', ctx('es')).output).toBe(
      now.toLocaleString('es-PE', { timeZone: 'America/Lima' }),
    );
    expect(runCommand('date', ctx()).output).toContain('12:30');
  });

  it('clear and theme return actions', () => {
    expect(runCommand('clear', ctx()).action).toEqual({ type: 'clear' });
    expect(runCommand('theme', ctx())).toEqual({ output: DICT.en.termTheme, action: { type: 'theme' } });
  });

  it('open accepts every app id', () => {
    for (const id of APP_IDS) expect(runCommand(`open ${id}`, ctx()).action).toEqual({ type: 'open', id });
    expect(runCommand('open work', ctx()).output).toBe('Opening work…');
    expect(runCommand('open work', ctx('es')).output).toBe('Abriendo work…');
  });

  it('open resolves aliases', () => {
    const cases = { projects: 'work', journey: 'experience', mail: 'contact', games: 'arcade' } as const;
    for (const [alias, id] of Object.entries(cases))
      expect(runCommand(`open ${alias}`, ctx()).action).toEqual({ type: 'open', id });
  });

  it('is case and whitespace insensitive', () => {
    expect(normalizeCommand('  SUDO   Hire\tJavier ')).toBe('sudo hire javier');
    expect(runCommand('  HELP ', ctx()).output).toBe(DICT.en.termHelp);
    expect(runCommand('Open   GAMES', ctx()).action).toEqual({ type: 'open', id: 'arcade' });
  });

  it('invalid, empty and unknown commands return termError', () => {
    for (const input of ['', '   ', 'rm -rf /', 'open', 'open nope', 'open toString', 'sudo hire'])
      expect(runCommand(input, ctx('es'))).toEqual({ output: DICT.es.termError });
  });
});
