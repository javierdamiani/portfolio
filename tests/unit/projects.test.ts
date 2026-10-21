import { describe, expect, it } from 'vitest';
import { archiveProjects, byId, byKind, featuredProjects, projects } from '@/data/projects';
import type { Localized } from '@/types';

const filled = (l: Localized) => l.en.trim() !== '' && l.es.trim() !== '';

describe('projects data', () => {
  it('has 10 projects with unique ids', () => {
    expect(projects).toHaveLength(10);
    expect(new Set(projects.map((p) => p.id)).size).toBe(10);
  });

  it('has exactly 1 hero, 2 cards, 1 row and 6 archive items', () => {
    expect(byKind('hero')).toHaveLength(1);
    expect(byKind('card')).toHaveLength(2);
    expect(byKind('row')).toHaveLength(1);
    expect(byKind('archive')).toHaveLength(6);
    expect(featuredProjects).toHaveLength(4);
    expect(archiveProjects).toHaveLength(6);
  });

  it('is sorted by a consecutive order 1..10', () => {
    expect(projects.map((p) => p.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('uses its id as cover tone', () => {
    for (const p of projects) expect(p.tone, p.id).toBe(p.id);
  });

  it('has localized label and description', () => {
    for (const p of projects) {
      expect(filled(p.label), `${p.id}.label`).toBe(true);
      expect(filled(p.description), `${p.id}.description`).toBe(true);
    }
  });

  it('has tags, a lowercase search string and localized image alts', () => {
    for (const p of projects) {
      expect(p.tags.length, p.id).toBeGreaterThan(0);
      expect(p.search, p.id).toBe(p.search.toLowerCase());
      expect(p.search, p.id).toContain(p.name.toLowerCase().split(' ')[0]);
      for (const img of p.images) {
        expect(img.src, p.id).toBeTruthy();
        expect(filled(img.alt), `${p.id} image alt`).toBe(true);
      }
    }
  });

  it('has screenshots for the projects that ship them', () => {
    expect(byId('noa')?.images).toHaveLength(5);
    expect(byId('comic')?.images).toHaveLength(5);
    expect(byId('pokecats')?.images).toHaveLength(5);
    expect(byId('around')?.images).toHaveLength(4);
    expect(byId('learn')?.images).toHaveLength(5);
  });

  it('only uses https urls', () => {
    for (const p of projects) {
      for (const url of [p.link, p.repo]) {
        if (url !== undefined) expect(url, p.id).toMatch(/^https:\/\//);
      }
    }
  });

  it('byId finds projects and returns undefined otherwise', () => {
    expect(byId('betsell')?.kind).toBe('hero');
    expect(byId('nope')).toBeUndefined();
  });
});
