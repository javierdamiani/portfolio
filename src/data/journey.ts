import type { JourneyItem } from '@/types';
import { SITE } from '@/data/site';

// STUB (WP0). Leo fills the full timeline in WP1 (see SPEC §5.3). Most recent first.
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
];
