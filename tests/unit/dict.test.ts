import { describe, expect, it } from 'vitest';
import { DICT, isLang } from '@/i18n/dict';

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

  it('isLang narrows only en/es', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('es')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });
});
