import type { ComponentType } from 'react';
import type { Dict } from '@/i18n/dict';
import type { AppId } from '@/types';
import AboutView from '@/components/views/AboutView';
import ArcadeView from '@/components/views/arcade/ArcadeView';
import ContactView from '@/components/views/ContactView';
import JourneyView from '@/components/views/JourneyView';
import OverviewView from '@/components/views/OverviewView';
import ProjectsView from '@/components/views/ProjectsView';
import TerminalView from '@/components/views/TerminalView';

// Owned by the commander: do not modify (SPEC §5.5).
export const VIEWS: Record<AppId, ComponentType> = {
  work: ProjectsView,
  about: AboutView,
  experience: JourneyView,
  arcade: ArcadeView,
  terminal: TerminalView,
  contact: ContactView,
  overview: OverviewView,
};

export const WINDOW_TITLE_KEY: Record<AppId, keyof Dict> = {
  work: 'work',
  about: 'about',
  experience: 'experience',
  arcade: 'arcade',
  terminal: 'terminal',
  contact: 'contact',
  overview: 'overview',
};
