import { describe, expect, it } from 'vitest';
import { DICT, isLang } from '@/i18n/dict';
import { ARCADE_DICT } from '@/i18n/arcade';

/**
 * Keys whose EN and ES values are legitimately identical (proper names, product names
 * and tech lists). Everything else must be translated.
 */
const SAME_IN_BOTH: ReadonlySet<string> = new Set([
  'terminal', // app name, same word in Spanish
  'arcade', // app name
  'status', // 'javierdamiani.com · 2026'
  'overviewToolkitText', // list of technologies
]);

/** Arcade keys that are identical by design (game/brand names). */
const ARCADE_SAME_IN_BOTH: ReadonlySet<string> = new Set([
  'eyebrow', // 'Javier / Arcade'
  'drive', // 'Pocket Drive', the game's name
]);

const untranslated = (
  dict: { en: Record<string, string>; es: Record<string, string> },
  allowed: ReadonlySet<string>,
): string[] => Object.keys(dict.en).filter((k) => !allowed.has(k) && dict.es[k] === dict.en[k]);

describe('i18n dict', () => {
  it('en and es share the same set of keys', () => {
    expect(Object.keys(DICT.es).sort()).toEqual(Object.keys(DICT.en).sort());
  });

  it('has no empty strings and no raw <br> markup', () => {
    for (const lang of ['en', 'es'] as const) {
      for (const [key, value] of Object.entries(DICT[lang])) {
        expect(value, `${lang}.${key}`).not.toBe('');
        expect(value, `${lang}.${key}`).not.toContain('<br');
      }
    }
  });

  it('includes the WP1 keys in both languages', () => {
    const keys = [
      'projectsWord',
      'itemsWord',
      'archive',
      'archiveLead',
      'viewCode',
      'viewLive',
      'gallery',
      'downloadCv',
      'aboutFacts',
      'openProject',
      'aboutFact1',
      'aboutFact2',
      'aboutFact3',
      'aboutFact4',
    ];
    for (const lang of ['en', 'es'] as const) {
      for (const key of keys) {
        const value = (DICT[lang] as Record<string, string>)[key];
        expect(value, `${lang}.${key}`).toBeTypeOf('string');
        expect(value?.trim(), `${lang}.${key}`).not.toBe('');
      }
    }
  });

  it('has no whitespace-only values', () => {
    for (const lang of ['en', 'es'] as const) {
      for (const [key, value] of Object.entries(DICT[lang])) {
        expect(value.trim(), `${lang}.${key}`).not.toBe('');
      }
    }
  });

  it('translates every key except the explicit allow-list', () => {
    expect(untranslated(DICT, SAME_IN_BOTH)).toEqual([]);
  });

  it('keeps the allow-list honest (only existing keys that are really identical)', () => {
    for (const key of SAME_IN_BOTH) {
      const en = (DICT.en as Record<string, string>)[key];
      expect(en, key).toBeTypeOf('string');
      expect((DICT.es as Record<string, string>)[key], key).toBe(en);
    }
  });

  it('isLang narrows only en/es', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('es')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });
});

describe('arcade dict', () => {
  it('en and es share the same set of keys', () => {
    expect(Object.keys(ARCADE_DICT.es).sort()).toEqual(Object.keys(ARCADE_DICT.en).sort());
  });

  it('translates every key except game/brand names', () => {
    expect(untranslated(ARCADE_DICT, ARCADE_SAME_IN_BOTH)).toEqual([]);
  });
});
