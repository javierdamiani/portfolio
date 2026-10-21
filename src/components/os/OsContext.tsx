import { createContext, useContext } from 'react';
import type { Dict } from '@/i18n/dict';
import type { AppId, Lang, OptimizedImage, ProjectImages, Wallpaper, WindowState } from '@/types';

export interface OsApi {
  lang: Lang;
  t: Dict;
  toggleLang(): void;
  wallpaper: Wallpaper;
  cycleWallpaper(): void;
  isMobile: boolean;
  windows: WindowState[];
  activeId: AppId | null;
  openApp(id: AppId): void;
  closeWindow(id: AppId): void;
  minimizeWindow(id: AppId): void;
  maximizeWindow(id: AppId): void;
  focusWindow(id: AppId): void;
  goBack(): void;
  currentProject: string | null;
  setCurrentProject(id: string | null): void;
  searchVisible: boolean;
  toggleSearch(): void;
  searchQuery: string;
  setSearchQuery(q: string): void;
  notice(message: string): void;
  print(): void;
  images: ProjectImages;
  portrait: OptimizedImage | null;
}

export const OsContext = createContext<OsApi | null>(null);

export function useOs(): OsApi {
  const os = useContext(OsContext);
  if (!os) throw new Error('useOs() must be used inside <OsContext.Provider> (rendered by <Desktop />).');
  return os;
}
