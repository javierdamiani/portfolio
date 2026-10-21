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

  it('returns nothing for gibberish', () => {
    expect(filterProjects(projects, 'zzqqxx-no-match', 'en')).toEqual([]);
  });
});
