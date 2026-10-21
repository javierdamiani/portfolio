import { useMemo } from 'react';
import { DICT } from '@/i18n/dict';
import type { DesktopProps } from '@/types';
import { OsContext, type OsApi } from '@/components/os/OsContext';

// STUB (WP0) — Aria replaces this with the real OsApi provider + shell in WP2.
const noop = () => {};

export default function Desktop({ images, portrait }: DesktopProps) {
  const api = useMemo<OsApi>(
    () => ({
      lang: 'en',
      t: DICT.en,
      toggleLang: noop,
      wallpaper: 'light',
      cycleWallpaper: noop,
      isMobile: false,
      windows: [],
      activeId: null,
      openApp: noop,
      closeWindow: noop,
      minimizeWindow: noop,
      maximizeWindow: noop,
      focusWindow: noop,
      goBack: noop,
      currentProject: null,
      setCurrentProject: noop,
      searchVisible: false,
      toggleSearch: noop,
      searchQuery: '',
      setSearchQuery: noop,
      notice: noop,
      print: noop,
      images,
      portrait,
    }),
    [images, portrait],
  );

  return (
    <OsContext.Provider value={api}>
      <main className="h-dvh">
        <h1>Javier Damiani</h1>
      </main>
    </OsContext.Provider>
  );
}
