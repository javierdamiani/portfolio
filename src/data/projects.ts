import type { Localized, Project, ProjectImage, ProjectKind } from '@/types';
import { SITE } from '@/data/site';

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

const raw: Project[] = [
  {
    id: 'betsell',
    name: 'BetSell',
    year: '2025 — now',
    kind: 'hero',
    tone: 'betsell',
    order: 1,
    tags: ['React', 'TypeScript', 'React Query', 'Web3', 'REST APIs'],
    label: { en: 'Product · Web3 · Marketplace', es: 'Producto · Web3 · Marketplace' },
    description: {
      en: 'Building frontend experiences for a sports-related ticket marketplace: listing flows, purchases, application state, and connections to APIs and blockchain functionality.',
      es: 'Desarrollo de interfaces frontend para un marketplace de tickets deportivos: listados, compras, manejo de estado e integraciones con APIs y tecnología blockchain.',
    },
    link: SITE.links.betsell,
    images: [],
    search: 'betsell react typescript react query web3 marketplace tickets sports blockchain',
  },
  {
    id: 'uc',
    name: 'Universidad Continental',
    year: '2024 — now',
    kind: 'card',
    tone: 'uc',
    order: 2,
    tags: ['HTML', 'CSS', 'JavaScript', 'Vite', 'Tailwind CSS'],
    label: { en: 'Education · Web platforms', es: 'Educación · Plataformas web' },
    description: {
      en: 'Designing and developing responsive web experiences for Universidad Continental, including campaigns, career pages and performance improvements.',
      es: 'Diseño y desarrollo de experiencias web responsive para Universidad Continental: campañas, páginas de carreras y mejoras de rendimiento.',
    },
    link: SITE.links.uc,
    images: [],
    search: 'universidad continental education web landing campaigns vite tailwind javascript',
  },
  {
    id: 'noa',
    name: 'Never One Alone',
    year: '2024',
    kind: 'card',
    tone: 'noa',
    order: 3,
    tags: ['React', 'TypeScript', 'Real-time chat', 'Teamwork', 'UI Development'],
    label: { en: 'Gaming · Community', es: 'Gaming · Comunidad' },
    description: {
      en: 'A collaborative platform conceived to connect players through the games they love. Built with a multidisciplinary team.',
      es: 'Una plataforma colaborativa para conectar jugadores según los videojuegos que disfrutan. Desarrollada con un equipo multidisciplinario.',
    },
    images: gallery('NOA', [noa01, noa02, noa03, noa04, noa05], [HOME]),
    search: 'never one alone noa gaming community players chat react typescript',
  },
  {
    id: 'comic',
    name: 'Comic Nest',
    year: '2024',
    kind: 'row',
    tone: 'comic',
    order: 4,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    label: { en: 'Full-stack · Team project', es: 'Full-stack · Proyecto en equipo' },
    description: {
      en: 'A collaborative full-stack comic store, with product browsing and shopping experiences built together with a development team.',
      es: 'E-commerce full-stack de cómics desarrollado en equipo, con catálogo e interacciones de compra.',
    },
    images: gallery(
      'Comic Nest',
      [comic01, comic02, comic03, comic04, comic05],
      [{ en: 'comic catalog', es: 'catálogo de cómics' }],
    ),
    search: 'comic nest ecommerce store full-stack react node express mongodb no country',
  },
  {
    id: 'pokecats',
    name: 'PokeCats',
    year: '2023',
    kind: 'archive',
    tone: 'pokecats',
    order: 5,
    tags: ['React', 'CSS', 'PokeAPI'],
    label: { en: 'React · Public API', es: 'React · API pública' },
    description: {
      en: 'A playful cat adoption site that mixes the Pokémon universe with real cats, built with React and data from PokeAPI.',
      es: 'Un sitio de adopción de gatos que mezcla el universo Pokémon con gatos reales, hecho con React y datos de PokeAPI.',
    },
    link: 'https://pokecats-six.vercel.app/',
    repo: 'https://github.com/javierdamiani/pokeCats-javierdamiani-frontend',
    images: gallery('PokeCats', [cats01, cats02, cats03, cats04, cats05], [HOME]),
    search: 'pokecats pokemon cats adoption react pokeapi',
  },
  {
    id: 'fifa',
    name: 'Dentro del terreno',
    year: '2023',
    kind: 'archive',
    tone: 'fifa',
    order: 6,
    tags: ['React', 'JavaScript', 'Data analysis'],
    label: { en: 'Football · Data', es: 'Fútbol · Datos' },
    description: {
      en: 'Football analytics presented on the web, built by web developers together with a data scientist.',
      es: 'Analítica de fútbol presentada en la web, desarrollada por desarrolladores web junto a un científico de datos.',
    },
    link: 'https://fifa-games.vercel.app/',
    repo: 'https://github.com/javierdamiani/fifa_games',
    images: [],
    search: 'dentro del terreno fifa football soccer futbol data analytics react',
  },
  {
    id: 'around',
    name: 'Around the U.S.',
    year: '2023',
    kind: 'archive',
    tone: 'around',
    order: 7,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    label: { en: 'Full-stack · Bootcamp', es: 'Full-stack · Bootcamp' },
    description: {
      en: 'A full-stack photo sharing app with sign-up, login, posting and deleting cards, backed by a Node.js and MongoDB API.',
      es: 'Aplicación full-stack para compartir fotos con registro, inicio de sesión, publicación y eliminación de tarjetas, sobre una API en Node.js y MongoDB.',
    },
    repo: 'https://github.com/javierdamiani/react-around-api-full_es',
    images: gallery(
      'Around the U.S.',
      [around01, around02, around03, around04],
      [{ en: 'sign-in screen', es: 'pantalla de inicio de sesión' }],
    ),
    search: 'around the us photos full-stack react node express mongodb auth tripleten',
  },
  {
    id: 'learn',
    name: 'Learning to learn',
    year: '2022',
    kind: 'archive',
    tone: 'learn',
    order: 8,
    tags: ['HTML', 'CSS'],
    label: { en: 'HTML · CSS · First project', es: 'HTML · CSS · Primer proyecto' },
    description: {
      en: 'My first bootcamp project: a static page about how we learn, written in plain HTML and CSS.',
      es: 'Mi primer proyecto del bootcamp: una página estática sobre cómo aprendemos, escrita en HTML y CSS.',
    },
    link: 'https://tripleten-firstproject.vercel.app/',
    repo: 'https://github.com/javierdamiani/tripleten-firstproject',
    images: gallery('Learning to learn', [learn01, learn02, learn03, learn04, learn05], [HOME]),
    search: 'learning to learn html css first project tripleten bootcamp',
  },
  {
    id: 'patria',
    name: 'De Patria a Patria',
    year: '2022',
    kind: 'archive',
    tone: 'patria',
    order: 9,
    tags: ['HTML', 'CSS', 'Flexbox', 'Grid'],
    label: { en: 'Layout · Responsive', es: 'Maquetación · Responsive' },
    description: {
      en: 'A responsive layout exercise focused on Flexbox and CSS Grid.',
      es: 'Un ejercicio de maquetación responsive centrado en Flexbox y CSS Grid.',
    },
    link: 'https://javierdamiani.github.io/web_project_3_esp/',
    repo: 'https://github.com/javierdamiani/web_project_3_esp',
    images: [],
    search: 'de patria a patria html css flexbox grid responsive layout',
  },
  {
    id: 'bookbot',
    name: 'Bookbot',
    year: '2024',
    kind: 'archive',
    tone: 'bookbot',
    order: 10,
    tags: ['Python', 'CLI'],
    label: { en: 'Python · CLI tool', es: 'Python · Herramienta CLI' },
    description: {
      en: 'A small Python tool that reads a text file and reports its word count and the frequency of each letter.',
      es: 'Una pequeña herramienta en Python que lee un archivo de texto y reporta el número de palabras y la frecuencia de cada letra.',
    },
    repo: 'https://github.com/javierdamiani/bookbot',
    images: [],
    search: 'bookbot python cli text analysis words letters',
  },
];

export const projects: Project[] = [...raw].sort((a, b) => a.order - b.order);

export const byKind = (kind: ProjectKind): Project[] => projects.filter((p) => p.kind === kind);

/** Alias kept for compatibility with the SPEC §5.3 helper name. */
export const featured = byKind;

export const byId = (id: string): Project | undefined => projects.find((p) => p.id === id);

/** Hero + cards + row, in display order. */
export const featuredProjects: Project[] = projects.filter((p) => p.kind !== 'archive');

export const archiveProjects: Project[] = byKind('archive');
