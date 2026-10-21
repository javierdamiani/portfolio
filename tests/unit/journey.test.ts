import { describe, expect, it } from 'vitest';
import { journey } from '@/data/journey';
import type { Localized } from '@/types';

const filled = (l: Localized) => l.en.trim() !== '' && l.es.trim() !== '';

describe('journey data', () => {
  it('has at least 6 items', () => {
    expect(journey.length).toBeGreaterThanOrEqual(6);
  });

  it('has exactly 2 current roles, listed first', () => {
    expect(journey.filter((j) => j.current)).toHaveLength(2);
    expect(journey[0]?.current).toBe(true);
    expect(journey[1]?.current).toBe(true);
  });

  it('has localized when/role/desc and an org', () => {
    for (const j of journey) {
      expect(filled(j.when), `${j.org}.when`).toBe(true);
      expect(filled(j.role), `${j.org}.role`).toBe(true);
      expect(filled(j.desc), `${j.org}.desc`).toBe(true);
      expect(j.org.trim()).not.toBe('');
      if (j.link !== undefined) expect(j.link).toMatch(/^https:\/\//);
    }
  });

  it('keeps technical job titles in English in both languages', () => {
    for (const j of journey) {
      if (/Developer/.test(j.role.en)) {
        expect(j.role.es.split(' (')[0], j.org).toBe(j.role.en.split(' (')[0]);
      }
    }
  });
});
