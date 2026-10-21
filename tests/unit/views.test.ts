import { describe, expect, it } from 'vitest';
import { filterProjects } from '@/components/views/ProjectsView';
import { projects } from '@/data/projects';

describe('filterProjects', () => {
  it('returns every project for an empty query', () => {
    expect(filterProjects(projects, '  ', 'en')).toHaveLength(projects.length);
  });

  it('matches by name, case-insensitively', () => {
    const ids = filterProjects(projects, 'BETSELL', 'en').map((p) => p.id);
    expect(ids).toContain('betsell');
  });

  it('matches archive projects too', () => {
    const archived = projects.find((p) => p.kind === 'archive');
    expect(archived).toBeDefined();
    const ids = filterProjects(projects, archived!.name.toLowerCase(), 'es').map((p) => p.id);
    expect(ids).toContain(archived!.id);
  });

  it('ignores accents in both the query and the localized label', () => {
    expect(filterProjects(projects, 'educacion', 'es').map((p) => p.id)).toContain('uc');
    expect(filterProjects(projects, 'FÚTBOL', 'en').map((p) => p.id)).toContain('fifa');
  });

  it('matches the localized label only for the active language', () => {
    const query = 'herramienta cli';
    expect(filterProjects(projects, query, 'es').length).toBeGreaterThan(0);
    expect(filterProjects(projects, query, 'en')).toEqual([]);
  });

  it('trims the query and does not mutate the input list', () => {
    const copy = [...projects];
    const out = filterProjects(projects, '   ', 'en');
    expect(out).not.toBe(projects);
    expect(projects).toEqual(copy);
  });

  it('returns nothing for gibberish', () => {
    expect(filterProjects(projects, 'zzqqxx-no-match', 'en')).toEqual([]);
  });
});
