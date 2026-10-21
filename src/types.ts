import type { ImageMetadata } from 'astro';
export type Lang = 'en' | 'es';
export type AppId = 'work' | 'about' | 'experience' | 'arcade' | 'terminal' | 'contact' | 'overview';
export const APP_IDS: readonly AppId[] = [
  'work',
  'about',
  'experience',
  'arcade',
  'terminal',
  'contact',
  'overview',
];
export type Wallpaper = 'light' | 'peach' | 'night';
export type Localized = Record<Lang, string>;
export type ProjectKind = 'hero' | 'card' | 'row' | 'archive';
export type CoverTone =
  'betsell' | 'uc' | 'noa' | 'comic' | 'pokecats' | 'fifa' | 'around' | 'learn' | 'patria' | 'bookbot';
export interface ProjectImage {
  src: ImageMetadata;
  alt: Localized;
}
export interface Project {
  id: string;
  name: string;
  year: string;
  kind: ProjectKind;
  tone: CoverTone;
  order: number;
  tags: string[];
  label: Localized;
  description: Localized;
  link?: string;
  repo?: string;
  images: ProjectImage[];
  search: string;
}
export interface OptimizedImage {
  src: string;
  width: number;
  height: number;
  alt: Localized;
}
export type ProjectImages = Record<string, OptimizedImage[]>;
export interface JourneyItem {
  when: Localized;
  role: Localized;
  org: string;
  desc: Localized;
  current?: boolean;
  link?: string;
}
export interface WindowBox {
  left: number;
  top: number;
  width: number;
  height: number;
}
export interface WindowState {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  z: number;
  box: WindowBox;
}
export interface DesktopProps {
  images: ProjectImages;
  portrait: OptimizedImage | null;
}
