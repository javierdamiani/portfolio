import type { Project, ProjectKind } from '@/types';
import { SITE } from '@/data/site';

// STUB (WP0). Leo fills the 10 projects + images in WP1 (see SPEC §5.3).
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
    search: 'betsell react typescript web3 marketplace',
  },
];

export const projects: Project[] = [...raw].sort((a, b) => a.order - b.order);

export const featured = (kind: ProjectKind): Project[] => projects.filter((p) => p.kind === kind);

export const byId = (id: string): Project | undefined => projects.find((p) => p.id === id);
