import type { Lang } from '@/types';

/**
 * UI strings, copied from the prototype DICT (javier-space-arcade/app.js).
 * journeyItems / workLabels / projectDescriptions live in src/data instead.
 * Values that had <br> in the prototype use \n; views split('\n') to render line breaks.
 * Rule: keys can be ADDED, never renamed/removed; en and es must share the same key set.
 */
export const DICT = {
  en: {
    openToWork: 'Available for remote roles',
    hello: "Hello, I'm",
    wallpaperRole: 'Frontend developer.\nReact, TypeScript & the web.',
    location: 'Based in Peru · Available worldwide',
    desktopWork: 'My Projects',
    desktopAbout: 'About Me',
    desktopJourney: 'My Journey',
    work: 'Projects',
    about: 'About Me',
    experience: 'My Journey',
    terminal: 'Terminal',
    contact: 'Say Hello',
    overview: 'Quick Look',
    arcade: 'Arcade',
    favorites: 'Favorites',
    now: 'These days',
    currently: 'Currently building',
    currentWork: 'BetSell & Universidad Continental',
    myCorner: 'Javier’s Space',
    status: 'javierdamiani.com · 2026',
    viewTitle: 'Projects.',
    viewLead: 'Web products I work on, plus a few side projects.',
    projectsCount: '04 projects',
    featured: 'Featured',
    moreWork: 'More projects',
    projectHint: 'Select a project to explore it',
    back: 'All projects',
    visit: 'Visit website',
    aboutTitle: 'A little about me.',
    aboutEyebrow: 'The person behind the pixels',
    aboutLead:
      'I’m Javier, a frontend developer from Peru. I work mainly with React, TypeScript and web interfaces.',
    aboutP1:
      'I’m based in Peru and spend most of my time building web products, experimenting with interfaces and finding small details worth improving.',
    aboutP2:
      'I care about the things you don’t immediately notice: how fast a page feels, how naturally a flow works and whether every interaction makes sense.',
    aboutSkills: 'Things I work with',
    aboutFooter: 'Outside of code: music, curiosity and too many browser tabs.',
    journeyTitle: 'The road so far.',
    journeyLead: 'Where I’ve worked and what I’ve been building.',
    journeyEyebrow: 'Experience / timeline',
    nowBadge: 'Now',
    contactEyebrow: 'Inbox / Open channel',
    contactTitle: 'Say hello.',
    contactLead: 'For work, collaborations, or just to talk about a project, email works best.',
    copy: 'Copy email',
    copied: 'Email copied',
    social: 'Or find me here',
    overviewEyebrow: 'Quick Look / Resume',
    overviewTitle: 'Javier, at a glance.',
    overviewLead: 'Frontend developer from Peru. Working with React, TypeScript and production web apps.',
    overviewExperience: 'Current work',
    overviewExperienceText: 'BetSell (2025–present)\nUniversidad Continental (2024–present)',
    overviewToolkit: 'Toolkit',
    overviewToolkitText: 'React · TypeScript · JavaScript\nAstro · Next.js · Vite · Tailwind CSS',
    overviewFocus: 'What I care about',
    overviewFocusText: 'Thoughtful UX · Maintainable frontend\nPerformance · Real product outcomes',
    overviewContact: 'Get in touch',
    overviewPrint: 'Print / Save PDF',
    termStart:
      'Welcome to Javier’s terminal.\nA little personal corner of the command line.\nType help to begin.',
    termHelp:
      'Commands: help, whoami, ls, projects, about, contact, date, clear, theme, open [work|about|experience|contact|arcade], sudo hire javier',
    termWho: 'Javier Damiani — frontend developer in Peru. Likes useful interfaces and thoughtful details.',
    termHire: 'Thanks! Let’s talk: javierdamiani74@gmail.com',
    termError: 'Command not found. Try help.',
    termTheme: 'Wallpaper changed.',
    search: 'Search projects',
    noProjects: 'No projects found',
    fileCount: '4 items',
    folder: 'Javier / Projects',
    responsive: 'Thoughtful on every screen.',
  },
  es: {
    openToWork: 'Disponible para trabajo remoto',
    hello: 'Hola, soy',
    wallpaperRole: 'Desarrollador frontend.\nReact, TypeScript y web.',
    location: 'Desde Perú · Trabajando para el mundo',
    desktopWork: 'Mis proyectos',
    desktopAbout: 'Sobre mí',
    desktopJourney: 'Mi camino',
    work: 'Proyectos',
    about: 'Sobre mí',
    experience: 'Mi camino',
    terminal: 'Terminal',
    contact: 'Contacto',
    overview: 'Vista rápida',
    arcade: 'Arcade',
    favorites: 'Favoritos',
    now: 'Actualmente',
    currently: 'Trabajando en',
    currentWork: 'BetSell y Universidad Continental',
    myCorner: 'El espacio de Javier',
    status: 'javierdamiani.com · 2026',
    viewTitle: 'Proyectos.',
    viewLead: 'Productos web en los que trabajo y algunos proyectos personales.',
    projectsCount: '04 proyectos',
    featured: 'Destacado',
    moreWork: 'Más proyectos',
    projectHint: 'Selecciona un proyecto para explorarlo',
    back: 'Todos los proyectos',
    visit: 'Visitar web',
    aboutTitle: 'Un poco sobre mí.',
    aboutEyebrow: 'La persona detrás de los píxeles',
    aboutLead:
      'Soy Javier, desarrollador frontend de Perú. Trabajo principalmente con React, TypeScript e interfaces web.',
    aboutP1:
      'Vivo en Perú y paso gran parte de mi tiempo creando productos web, experimentando con interfaces y encontrando pequeños detalles que se pueden mejorar.',
    aboutP2:
      'Me importan las cosas que no siempre se notan a primera vista: qué tan rápida se siente una página, qué tan natural es un flujo y si cada interacción tiene sentido.',
    aboutSkills: 'Tecnologías con las que trabajo',
    aboutFooter: 'Fuera del código: música, curiosidad y demasiadas pestañas abiertas.',
    journeyTitle: 'El camino recorrido.',
    journeyLead: 'Dónde he trabajado y qué he estado desarrollando.',
    journeyEyebrow: 'Experiencia / trayectoria',
    nowBadge: 'Actual',
    contactEyebrow: 'Buzón / Canal abierto',
    contactTitle: 'Hablemos.',
    contactLead: 'Para trabajo, colaboraciones o conversar sobre un proyecto, prefiero el correo.',
    copy: 'Copiar correo',
    copied: 'Correo copiado',
    social: 'También puedes encontrarme aquí',
    overviewEyebrow: 'Vista rápida / Perfil',
    overviewTitle: 'Javier, en breve.',
    overviewLead:
      'Desarrollador frontend en Perú. Trabajo con React, TypeScript y aplicaciones web en producción.',
    overviewExperience: 'Experiencia actual',
    overviewExperienceText: 'BetSell (2025–actualidad)\nUniversidad Continental (2024–actualidad)',
    overviewToolkit: 'Herramientas',
    overviewToolkitText: 'React · TypeScript · JavaScript\nAstro · Next.js · Vite · Tailwind CSS',
    overviewFocus: 'Lo que me importa',
    overviewFocusText: 'UX cuidada · Frontend mantenible\nRendimiento · Resultados de producto',
    overviewContact: 'Escribirme',
    overviewPrint: 'Imprimir / Guardar PDF',
    termStart:
      'Bienvenido a la terminal de Javier.\nMi pequeño rincón de la línea de comandos.\nEscribe help para comenzar.',
    termHelp:
      'Comandos: help, whoami, ls, projects, about, contact, date, clear, theme, open [work|about|experience|contact|arcade], sudo hire javier',
    termWho:
      'Javier Damiani — desarrollador frontend en Perú. Me gustan las interfaces útiles y los detalles bien cuidados.',
    termHire: '¡Gracias! Hablemos: javierdamiani74@gmail.com',
    termError: 'Comando no reconocido. Prueba help.',
    termTheme: 'Fondo cambiado.',
    search: 'Buscar proyectos',
    noProjects: 'Sin proyectos',
    fileCount: '4 elementos',
    folder: 'Javier / Proyectos',
    responsive: 'Pensado para cualquier pantalla.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

/**
 * Shape of one language. Keys come from `en`; values are widened to `string` so that
 * `DICT.es` (whose `as const` literals differ) is assignable to `Dict` too.
 */
export type Dict = { readonly [K in keyof (typeof DICT)['en']]: string };

// Compile-time guard: `es` must provide every key of `en`.
DICT.es satisfies Dict;

export const isLang = (v: unknown): v is Lang => v === 'en' || v === 'es';
