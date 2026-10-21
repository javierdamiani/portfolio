import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import type { AppId, WindowBox, WindowState } from '@/types';
import { useOs } from '@/components/os/OsContext';
import Sidebar from '@/components/os/Sidebar';
import { BackIcon, OverviewIcon, SearchIcon, WorkIcon } from '@/components/os/icons';
import { VIEWS, WINDOW_TITLE_KEY } from '@/components/views/registry';
import { projects } from '@/data/projects';
import { dragBox, resizeBox, WINDOW_ARIA, type Stage } from '@/lib/windows';

interface WindowProps {
  state: WindowState;
  active: boolean;
  printable: boolean;
  getStage(): Stage;
  setBox(id: AppId, box: WindowBox): void;
}

interface Gesture {
  kind: 'drag' | 'resize';
  pointerId: number;
  x: number;
  y: number;
  start: WindowBox;
  stage: Stage;
  /** Latest geometry, painted straight onto the DOM; committed to state once on pointerup. */
  live: WindowBox | null;
}

const toolButton =
  'grid h-[28px] w-[29px] place-items-center rounded-[7px] border-0 bg-transparent p-[3px] text-tool hover:bg-tool-hover hover:text-tool-hover-ink';

const traffic =
  'grid size-3 place-items-center rounded-full border border-black/7 p-0 text-[10px] leading-none text-traffic-glyph';

export default function Window({ state, active, printable, getStage, setBox }: WindowProps) {
  const {
    t,
    isMobile,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    goBack,
    openApp,
    toggleSearch,
    searchVisible,
  } = useOs();
  const { id, box, maximized, minimized, z } = state;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);

  // New content in a reused window: scroll to top; terminal gets keyboard focus.
  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.scrollTop = 0;
    if (id !== 'terminal') return;
    const frame = requestAnimationFrame(() => panel?.querySelector<HTMLElement>('input, textarea')?.focus());
    return () => cancelAnimationFrame(frame);
  }, [id]);

  const begin = (kind: Gesture['kind'], e: ReactPointerEvent<HTMLElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    gesture.current = {
      kind,
      pointerId: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      start: box,
      stage: getStage(),
      live: null,
    };
  };

  const move = (e: ReactPointerEvent<HTMLElement>) => {
    const g = gesture.current;
    if (!g || g.pointerId !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    const fn = g.kind === 'drag' ? dragBox : resizeBox;
    const next = fn(g.live ?? g.start, g.start, dx, dy, g.stage);
    g.live = next;
    // Per-frame geometry bypasses React so the OS context (and the whole app) does not re-render.
    const el = sectionRef.current;
    if (!el) return;
    el.style.left = `${next.left}px`;
    el.style.top = `${next.top}px`;
    el.style.width = `${next.width}px`;
    el.style.height = `${next.height}px`;
  };

  const end = (e: ReactPointerEvent<HTMLElement>) => {
    const g = gesture.current;
    if (g?.pointerId !== e.pointerId) return;
    gesture.current = null;
    if (g.live) setBox(id, g.live);
  };

  const onToolbarDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (isMobile || e.button !== 0 || maximized || (e.target as Element).closest('button')) return;
    begin('drag', e);
  };

  const onResizeDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (isMobile || e.button !== 0 || maximized) return;
    e.preventDefault();
    e.stopPropagation();
    focusWindow(id);
    begin('resize', e);
  };

  // Mid-gesture re-renders (e.g. focus) must not snap the window back to the committed box.
  const b = gesture.current?.live ?? box;
  // Geometry is the only inline style allowed (SPEC §3). Mobile geometry lives in max-sm: classes.
  const style: CSSProperties = isMobile
    ? { zIndex: z }
    : maximized
      ? { left: 18, top: 16, width: 'calc(100% - 36px)', height: 'calc(100% - 111px)', zIndex: z }
      : { left: b.left, top: b.top, width: b.width, height: b.height, zIndex: z };

  const View = VIEWS[id];
  const dataState = minimized ? 'minimized' : maximized ? 'maximized' : 'normal';

  return (
    <section
      ref={sectionRef}
      aria-label={`${WINDOW_ARIA[id]} window`}
      data-app={id}
      data-state={dataState}
      data-focused={active ? '' : undefined}
      data-printable={printable ? '' : undefined}
      style={style}
      onPointerDown={() => focusWindow(id)}
      className={`pointer-events-auto absolute flex min-h-[335px] min-w-[530px] origin-center animate-window-in flex-col overflow-hidden rounded-window border border-window-border bg-window shadow-window data-[state=minimized]:hidden max-lg:max-w-[calc(100%-25px)] max-md:min-w-[450px] max-sm:top-[9px] max-sm:left-[9px] max-sm:h-[calc(100%-100px)] max-sm:min-h-0 max-sm:w-[calc(100%-18px)] max-sm:max-w-none max-sm:min-w-0 max-sm:rounded-t-window-mobile max-sm:rounded-b-none max-xs:h-[calc(100%-89px)] ${
        active ? '' : 'saturate-90'
      } ${
        printable
          ? 'print:static print:block print:h-auto! print:min-h-0 print:w-auto! print:max-w-none print:min-w-0 print:animate-none print:overflow-visible print:rounded-none print:border-0 print:shadow-none print:filter-none'
          : 'print:hidden'
      }`}
    >
      <header
        onPointerDown={onToolbarDown}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        onDoubleClick={(e) => {
          if (isMobile || (e.target as Element).closest('button')) return;
          maximizeWindow(id);
        }}
        className="relative flex h-[52px] min-h-[52px] cursor-grab touch-none items-center gap-[15px] border-b border-toolbar-border bg-toolbar px-[18px] select-none active:cursor-grabbing max-sm:h-[51px] max-sm:min-h-[51px] max-sm:cursor-default max-sm:px-[13px] print:hidden"
      >
        <div className="group flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={`${traffic} bg-traffic-close`}
            aria-label="Close window"
            onClick={() => closeWindow(id)}
          >
            <span
              className="opacity-0 group-focus-within:opacity-70 group-hover:opacity-70"
              aria-hidden="true"
            >
              ×
            </span>
          </button>
          <button
            type="button"
            className={`${traffic} bg-traffic-min`}
            aria-label="Minimize window"
            onClick={() => minimizeWindow(id)}
          >
            <span
              className="opacity-0 group-focus-within:opacity-70 group-hover:opacity-70"
              aria-hidden="true"
            >
              −
            </span>
          </button>
          <button
            type="button"
            className={`${traffic} bg-traffic-max`}
            aria-label="Maximize window"
            aria-pressed={maximized}
            onClick={() => maximizeWindow(id)}
          >
            <span
              className="opacity-0 group-focus-within:opacity-70 group-hover:opacity-70"
              aria-hidden="true"
            >
              +
            </span>
          </button>
        </div>
        <div className="ml-[9px] flex items-center gap-[5px] max-sm:hidden">
          <button type="button" className={toolButton} aria-label="Back" onClick={goBack}>
            <BackIcon className="size-[17px]" />
          </button>
          <button type="button" className={toolButton} aria-label="Projects" onClick={() => openApp('work')}>
            <WorkIcon className="size-[17px]" />
          </button>
        </div>
        <span
          data-slot="window-title"
          className="pointer-events-none absolute left-1/2 max-w-[40%] -translate-x-1/2 truncate text-center text-[12px] font-[590] text-window-title max-sm:max-w-[45%] max-sm:text-[11px]"
        >
          {t[WINDOW_TITLE_KEY[id]]}
        </span>
        <div className="ml-auto flex items-center gap-[3px] max-sm:gap-0">
          <button
            type="button"
            className={`${toolButton} max-sm:w-[25px]`}
            aria-label="Quick Look"
            title="Quick Look"
            onClick={() => openApp('overview')}
          >
            <OverviewIcon className="size-[17px]" />
          </button>
          <span className="mx-[7px] h-[17px] w-px bg-tool-divider max-sm:hidden" aria-hidden="true" />
          <button
            type="button"
            className={`${toolButton} max-sm:w-[25px]`}
            aria-label="Search projects"
            title="Search"
            aria-pressed={id === 'work' ? searchVisible : undefined}
            onClick={toggleSearch}
          >
            <SearchIcon className="size-[17px]" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden bg-window max-sm:flex-col print:block print:overflow-visible">
        <Sidebar active={id} />
        <div
          ref={panelRef}
          data-slot="window-panel"
          className="min-w-0 flex-1 [scrollbar-width:thin] [scrollbar-color:var(--color-scrollbar)_transparent] overflow-auto bg-window print:block print:h-auto print:overflow-visible"
        >
          <View />
        </div>
      </div>

      <footer className="flex h-6 min-h-6 items-center justify-between border-t border-status-border bg-status pr-[26px] pl-[213px] text-[10px] text-status-ink max-md:pl-[184px] max-sm:h-[22px] max-sm:min-h-[22px] max-sm:px-[13px] print:hidden">
        <span>{id === 'work' ? `${projects.length} ${t.itemsWord}` : t.myCorner}</span>
        <span>{t.status}</span>
      </footer>

      <span
        aria-hidden="true"
        onPointerDown={onResizeDown}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        className="absolute right-0 bottom-0 z-2 size-[18px] cursor-nwse-resize touch-none after:absolute after:right-[5px] after:bottom-[5px] after:size-[9px] after:border-r-[1.5px] after:border-b-[1.5px] after:border-resize max-sm:hidden print:hidden"
      />
    </section>
  );
}
