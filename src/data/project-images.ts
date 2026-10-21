/**
 * Project screenshots (original PNGs), keyed by `project.id`.
 * Server-only: imported exclusively by `src/pages/index.astro`, which turns them into WebP
 * via `getImage()` and passes the optimized URLs to the client. Never import this module
 * from a React component, or the original PNGs end up in the client bundle and `dist/_astro`.
 */
import type { Localized, ProjectImage } from '@/types';

import noa01 from '@/assets/projects/noa/01.png';
import noa02 from '@/assets/projects/noa/02.png';
import noa03 from '@/assets/projects/noa/03.png';
import noa04 from '@/assets/projects/noa/04.png';
import noa05 from '@/assets/projects/noa/05.png';
import comic01 from '@/assets/projects/comic-nest/01.png';
import comic02 from '@/assets/projects/comic-nest/02.png';
import comic03 from '@/assets/projects/comic-nest/03.png';
import comic04 from '@/assets/projects/comic-nest/04.png';
import comic05 from '@/assets/projects/comic-nest/05.png';
import cats01 from '@/assets/projects/pokecats/01.png';
import cats02 from '@/assets/projects/pokecats/02.png';
import cats03 from '@/assets/projects/pokecats/03.png';
import cats04 from '@/assets/projects/pokecats/04.png';
import cats05 from '@/assets/projects/pokecats/05.png';
import around01 from '@/assets/projects/around-us/01.png';
import around02 from '@/assets/projects/around-us/02.png';
import around03 from '@/assets/projects/around-us/03.png';
import around04 from '@/assets/projects/around-us/04.png';
import learn01 from '@/assets/projects/learning-to-learn/01.png';
import learn02 from '@/assets/projects/learning-to-learn/02.png';
import learn03 from '@/assets/projects/learning-to-learn/03.png';
import learn04 from '@/assets/projects/learning-to-learn/04.png';
import learn05 from '@/assets/projects/learning-to-learn/05.png';

/** Builds a gallery with alt texts like "NOA — screen 1" / "NOA — pantalla 1". */
const gallery = (name: string, srcs: ProjectImage['src'][], captions?: Localized[]): ProjectImage[] =>
  srcs.map((src, i) => ({
    src,
    alt: {
      en: `${name} — ${captions?.[i]?.en ?? `screen ${i + 1}`}`,
      es: `${name} — ${captions?.[i]?.es ?? `pantalla ${i + 1}`}`,
    },
  }));

const HOME: Localized = { en: 'home screen', es: 'pantalla de inicio' };

/** Projects without screenshots are simply absent (use `projectImages[id] ?? []`). */
export const projectImages: Record<string, ProjectImage[]> = {
  noa: gallery('NOA', [noa01, noa02, noa03, noa04, noa05], [HOME]),
  comic: gallery(
    'Comic Nest',
    [comic01, comic02, comic03, comic04, comic05],
    [{ en: 'comic catalog', es: 'catálogo de cómics' }],
  ),
  pokecats: gallery('PokeCats', [cats01, cats02, cats03, cats04, cats05], [HOME]),
  around: gallery(
    'Around the U.S.',
    [around01, around02, around03, around04],
    [{ en: 'sign-in screen', es: 'pantalla de inicio de sesión' }],
  ),
  learn: gallery('Learning to learn', [learn01, learn02, learn03, learn04, learn05], [HOME]),
};
