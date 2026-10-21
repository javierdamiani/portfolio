import type { JourneyItem } from '@/types';
import { SITE } from '@/data/site';

/**
 * Career timeline, most recent first.
 * Convention: technical job titles stay in English in both languages (as on the CV and
 * LinkedIn); qualifiers, programs and descriptions are translated.
 */
export const journey: JourneyItem[] = [
  {
    when: { en: '2025 — Present', es: '2025 — Actualidad' },
    role: { en: 'Frontend Developer', es: 'Frontend Developer' },
    org: 'BetSell',
    desc: {
      en: 'Product development for a sports marketplace: React interfaces, API integration, interactive purchase flows and Web3-related features.',
      es: 'Desarrollo de producto para un marketplace deportivo: React, integración con APIs, flujos interactivos de compra y funcionalidades Web3.',
    },
    current: true,
    link: SITE.links.betsell,
  },
  {
    when: { en: '2024 — Present', es: '2024 — Actualidad' },
    role: { en: 'Frontend Developer', es: 'Frontend Developer' },
    org: 'Universidad Continental',
    desc: {
      en: 'Websites and campaign landing pages, responsive UI, performance work and content-focused platforms.',
      es: 'Sitios web y landing pages de campañas, interfaces responsive, rendimiento y plataformas de contenido.',
    },
    current: true,
    link: SITE.links.uc,
  },
  {
    when: { en: '2024', es: '2024' },
    role: { en: 'Full-stack Developer', es: 'Full-stack Developer' },
    org: 'No Country',
    desc: {
      en: 'Work simulation in a multidisciplinary team building Comic Nest, a comic e-commerce with React, Node.js, MongoDB and Cloudinary, using agile practices.',
      es: 'Simulación laboral en un equipo multidisciplinario desarrollando Comic Nest, un e-commerce de cómics con React, Node.js, MongoDB y Cloudinary, con metodologías ágiles.',
    },
  },
  {
    when: { en: 'Nov 2023 — Jan 2024', es: 'Nov 2023 — Ene 2024' },
    role: { en: 'Frontend Developer (Internship)', es: 'Frontend Developer (Prácticas)' },
    org: 'BeActtive',
    desc: {
      en: 'Refactored the website to Next.js and TypeScript and led the team that added internationalization with i18next.',
      es: 'Refactoricé el sitio web a Next.js y TypeScript y lideré el equipo que implementó la internacionalización con i18next.',
    },
  },
  {
    when: { en: '2022 — 2023', es: '2022 — 2023' },
    role: { en: 'Web Development Bootcamp', es: 'Bootcamp de Desarrollo Web' },
    org: 'TripleTen',
    desc: {
      en: 'Built a foundation in HTML, CSS, JavaScript, React, Node.js and full-stack web applications.',
      es: 'Bases en HTML, CSS, JavaScript, React, Node.js y aplicaciones web full-stack.',
    },
  },
  {
    when: { en: '2019 — 2022', es: '2019 — 2022' },
    role: { en: 'Before code', es: 'Antes del código' },
    org: 'Concepto Perú · V.I.P. Online · El Tumi · Bioselva · Freelance',
    desc: {
      en: 'Business administration, logistics and operations roles, plus freelance research consulting in methodology and statistics. MBA coursework at Universidad de San Martín de Porres.',
      es: 'Cargos de administración, logística y operaciones, además de consultoría independiente en metodología de investigación y estadística. Estudios de maestría en Administración de Empresas en la Universidad de San Martín de Porres.',
    },
  },
];
