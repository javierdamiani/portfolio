import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { DICT, isLang } from '@/i18n/dict';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';
import { fitBox, initialBox, KEY_APPS, type Stage } from '@/lib/windows';
import type { AppId, DesktopProps, Lang, Wallpaper, WindowBox, WindowState } from '@/types';
import { OsContext, type OsApi } from '@/components/os/OsContext';
import MenuBar from '@/components/os/MenuBar';
import WallpaperIntro from '@/components/os/WallpaperIntro';
import DesktopShortcuts from '@/components/os/DesktopShortcuts';
import Dock from '@/components/os/Dock';
import Window from '@/components/os/Window';
import Toast from '@/components/os/Toast';

const WALLPAPERS: readonly Wallpaper[] = ['light', 'peach', 'night'];
const MOBILE_QUERY = '(max-width: 760px)';
const HISTORY_LIMIT = 20;
const TOAST_MS = 2200;

const isWallpaper = (v: unknown): v is Wallpaper => WALLPAPERS.includes(v as Wallpaper);

/** Top-most visible window (highest z, not minimized). */
const topWindow = (list: WindowState[]): WindowState | undefined =>
  list.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];

const isTyping = (el: Element | null) =>
  !!el && (/^(input|textarea|select)$/i.test(el.tagName) || (el as HTMLElement).isContentEditable);

export default function Desktop({ images, portrait }: DesktopProps) {
  const [lang, setLang] = useState<Lang>('en');
  const [wallpaper, setWallpaper] = useState<Wallpaper>('light');
  const [isMobile, setIsMobile] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ message: '', visible: false });
  const [printableId, setPrintableId] = useState<AppId | null>(null);

  // Source of truth for synchronous window logic (event handlers read it directly).
  const windowsRef = useRef<WindowState[]>([]);
  const zRef = useRef(10);
  const historyRef = useRef<AppId[]>([]);
  const stageRef = useRef<HTMLElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const currentProjectRef = useRef<string | null>(null);
  currentProjectRef.current = currentProject;

  const t = DICT[lang];
  const tRef = useRef(t);
  tRef.current = t;

  const commit = useCallback((next: WindowState[]) => {
    windowsRef.current = next;
    setWindows(next);
  }, []);

  const getStage = useCallback((): Stage => {
    const el = stageRef.current;
    if (el) return { width: el.clientWidth, height: el.clientHeight };
    return typeof window === 'undefined'
      ? { width: 1440, height: 860 }
      : { width: window.innerWidth, height: window.innerHeight - 39 };
  }, []);

  const notice = useCallback((message: string) => {
    setToast({ message, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((s) => ({ ...s, visible: false })), TOAST_MS);
  }, []);

  /* ---------- Window manager (port of app.js) ---------- */

  const focusWindow = useCallback(
    (id: AppId) => {
      const list = windowsRef.current;
      const target = list.find((w) => w.id === id);
      if (!target) return;
      const top = topWindow(list);
      if (!target.minimized && top?.id === id && target.z === zRef.current) return;
      const z = ++zRef.current;
      commit(list.map((w) => (w.id === id ? { ...w, minimized: false, z } : w)));
    },
    [commit],
  );

  /** Returns true when an existing window was reused (and the previous app pushed to history). */
  const openInternal = useCallback(
    (id: AppId): boolean => {
      const list = windowsRef.current;
      const existing = list[0];
      if (existing) {
        if (existing.id === id) {
          focusWindow(id);
          return false;
        }
        const history = historyRef.current;
        history.push(existing.id);
        if (history.length > HISTORY_LIMIT) history.shift();
        setCurrentProject(null);
        setSearchVisible(false);
        setSearchQuery('');
        const z = ++zRef.current;
        commit([{ ...existing, id, minimized: false, z }, ...list.slice(1)]);
        return true;
      }
      const z = ++zRef.current;
      commit([{ id, minimized: false, maximized: false, z, box: initialBox(id, getStage()) }]);
      return false;
    },
    [commit, focusWindow, getStage],
  );

  const openApp = useCallback((id: AppId) => void openInternal(id), [openInternal]);

  const closeWindow = useCallback(
    (id: AppId) => {
      const list = windowsRef.current;
      if (!list.some((w) => w.id === id)) return;
      commit(list.filter((w) => w.id !== id));
      setPrintableId((p) => (p === id ? null : p));
      const next = topWindow(windowsRef.current);
      if (next) focusWindow(next.id);
    },
    [commit, focusWindow],
  );

  const minimizeWindow = useCallback(
    (id: AppId) => commit(windowsRef.current.map((w) => (w.id === id ? { ...w, minimized: true } : w))),
    [commit],
  );

  const maximizeWindow = useCallback(
    (id: AppId) => {
      commit(windowsRef.current.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
      focusWindow(id);
    },
    [commit, focusWindow],
  );

  const setBox = useCallback(
    (id: AppId, box: WindowBox) => commit(windowsRef.current.map((w) => (w.id === id ? { ...w, box } : w))),
    [commit],
  );

  const goBack = useCallback(() => {
    const active = windowsRef.current[0]?.id;
    if (active === 'work' && currentProjectRef.current) {
      setCurrentProject(null);
      return;
    }
    const target = historyRef.current.pop() ?? 'work';
    // Re-opening pushes the app we are leaving; drop it so "back" does not ping-pong.
    if (openInternal(target)) historyRef.current.pop();
  }, [openInternal]);

  const toggleSearch = useCallback(() => {
    const current = topWindow(windowsRef.current)?.id ?? windowsRef.current[0]?.id;
    if (current !== 'work') {
      openApp('work');
      return;
    }
    setSearchVisible((v) => !v);
    setCurrentProject(null);
  }, [openApp]);

  const print = useCallback(() => {
    const id = topWindow(windowsRef.current)?.id ?? null;
    flushSync(() => setPrintableId(id));
    window.print();
  }, []);

  /* ---------- Language & wallpaper ---------- */

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next: Lang = l === 'en' ? 'es' : 'en';
      setItem(STORAGE_KEYS.lang, next);
      return next;
    });
  }, []);

  const cycleWallpaper = useCallback(() => {
    setWallpaper((w) => {
      const next = WALLPAPERS[(WALLPAPERS.indexOf(w) + 1) % WALLPAPERS.length]!;
      document.documentElement.dataset.wallpaper = next;
      setItem(STORAGE_KEYS.wallpaper, next);
      return next;
    });
    notice(tRef.current.termTheme);
  }, [notice]);

  /* ---------- Effects (client only) ---------- */

  // Hydrate persisted preferences + open the default window on desktop.
  useEffect(() => {
    const storedLang = getItem(STORAGE_KEYS.lang);
    if (isLang(storedLang)) setLang(storedLang);
    const fromHtml = document.documentElement.dataset.wallpaper;
    const stored = getItem(STORAGE_KEYS.wallpaper);
    const wp = isWallpaper(fromHtml) ? fromHtml : isWallpaper(stored) ? stored : 'light';
    setWallpaper(wp);
    document.documentElement.dataset.wallpaper = wp;

    const mq = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    if (!mq.matches && windowsRef.current.length === 0) openInternal('work');
    return () => mq.removeEventListener('change', onChange);
  }, [openInternal]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Global keyboard shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openApp('terminal');
        return;
      }
      if (e.key === 'Escape') {
        const active = topWindow(windowsRef.current);
        if (active) closeWindow(active.id);
        return;
      }
      if (e.altKey || e.ctrlKey || e.metaKey || isTyping(document.activeElement)) return;
      const id = KEY_APPS[e.key];
      if (id) openApp(id);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openApp, closeWindow]);

  // Keep windows reachable when the viewport shrinks.
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia(MOBILE_QUERY).matches || windowsRef.current.length === 0) return;
      const stage = getStage();
      commit(windowsRef.current.map((w) => ({ ...w, box: fitBox(w.box, stage) })));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [commit, getStage]);

  useEffect(() => {
    const clear = () => setPrintableId(null);
    window.addEventListener('afterprint', clear);
    return () => window.removeEventListener('afterprint', clear);
  }, []);

  const activeId = topWindow(windows)?.id ?? null;

  const api = useMemo<OsApi>(
    () => ({
      lang,
      t,
      toggleLang,
      wallpaper,
      cycleWallpaper,
      isMobile,
      windows,
      activeId,
      openApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      goBack,
      currentProject,
      setCurrentProject,
      searchVisible,
      toggleSearch,
      searchQuery,
      setSearchQuery,
      notice,
      print,
      images,
      portrait,
    }),
    [
      lang,
      t,
      toggleLang,
      wallpaper,
      cycleWallpaper,
      isMobile,
      windows,
      activeId,
      openApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      goBack,
      currentProject,
      searchVisible,
      toggleSearch,
      searchQuery,
      notice,
      print,
      images,
      portrait,
    ],
  );

  const hasOpenWindow = windows.some((w) => !w.minimized);
  // Mobile only: the full-screen window hides the wallpaper content underneath.
  const underWindow = `max-sm:transition-opacity max-sm:duration-200 ${
    hasOpenWindow ? 'max-sm:pointer-events-none max-sm:opacity-0' : ''
  }`;

  return (
    <OsContext.Provider value={api}>
      <a
        href="#main"
        className="fixed -top-20 left-3 z-999 bg-white px-4 py-2.5 text-ink focus:top-3 print:hidden"
      >
        Skip to content
      </a>
      <div
        className="relative flex h-dvh min-h-[580px] flex-col overflow-hidden bg-wall max-sm:min-h-0 print:block print:h-auto print:min-h-0 print:overflow-visible print:bg-white peach:bg-wall-peach night:bg-wall-night"
        data-mobile={isMobile ? '' : undefined}
      >
        <MenuBar />
        <main
          id="main"
          ref={stageRef}
          className="relative isolate min-h-0 flex-1 overflow-hidden bg-wall print:static print:block print:h-auto print:min-h-0 print:overflow-visible print:bg-white peach:bg-wall-peach night:bg-wall-night"
        >
          <WallpaperIntro className={underWindow} />
          <DesktopShortcuts className={underWindow} />
          <div
            className={`absolute bottom-[26px] left-[6.1%] text-[11px] tracking-[0.005em] text-signature max-sm:inset-x-0 max-sm:bottom-[128px] max-sm:text-center max-sm:text-[10px] print:hidden night:text-night-ink ${underWindow}`}
          >
            © 2026 · Javier Damiani
          </div>
          <div className="pointer-events-none absolute inset-0 z-20 print:static print:block print:h-auto">
            {windows.map((w, i) => (
              <Window
                key={i}
                state={w}
                active={w.id === activeId}
                printable={printableId !== null && w.id === printableId}
                getStage={getStage}
                setBox={setBox}
              />
            ))}
          </div>
        </main>
        <Dock />
        <Toast message={toast.message} visible={toast.visible} />
      </div>
    </OsContext.Provider>
  );
}
