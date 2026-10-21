import { describe, expect, it } from 'vitest';
import { projectImages } from '@/data/project-images';
import { byId, projects } from '@/data/projects';

const EXPECTED: Record<string, number> = { noa: 5, comic: 5, pokecats: 5, around: 4, learn: 5 };

describe('project images', () => {
  it('only uses ids that exist in projects', () => {
    for (const id of Object.keys(projectImages)) expect(byId(id), id).toBeDefined();
  });

  it('ships the expected screenshots per project', () => {
    const counts = Object.fromEntries(
      projects.map((p) => [p.id, projectImages[p.id]?.length ?? 0] as const).filter(([, n]) => n > 0),
    );
    expect(counts).toEqual(EXPECTED);
  });

  it('has a source and non-empty EN/ES alts for every image', () => {
    for (const [id, images] of Object.entries(projectImages)) {
      images.forEach((img, i) => {
        expect(img.src, `${id}[${i}].src`).toBeTruthy();
        expect(img.alt.en.trim(), `${id}[${i}].alt.en`).not.toBe('');
        expect(img.alt.es.trim(), `${id}[${i}].alt.es`).not.toBe('');
      });
    }
  });
});
