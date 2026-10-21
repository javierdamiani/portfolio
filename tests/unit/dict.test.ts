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

  it('isLang narrows only en/es', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('es')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });
});
