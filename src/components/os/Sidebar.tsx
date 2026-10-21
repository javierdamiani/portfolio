import { useEffect, useRef } from 'react';
import type { AppId } from '@/types';
import { SITE } from '@/data/site';
import { useOs } from '@/components/os/OsContext';
import { APP_ICONS } from '@/components/os/icons';
import { WINDOW_TITLE_KEY } from '@/components/views/registry';

const FAVORITES: readonly AppId[] = [
  'work',
  'about',
  'experience',
  'arcade',
  'terminal',
  'contact',
  'overview',
];

const caption = 'mx-3 mb-[7px] text-[10px] font-bold tracking-[0.03em] text-sidebar-caption max-sm:hidden';
const button =
  'flex items-center gap-[11px] rounded-[6px] px-[11px] py-2 text-left text-[12px] max-sm:gap-1.5 max-sm:px-2.5 max-sm:py-[7px] max-sm:text-[11px] max-sm:whitespace-nowrap';
const active = 'bg-sidebar-active font-semibold text-sidebar-active-ink';
const idle = 'font-[520] text-sidebar-ink hover:bg-sidebar-hover';
const icon = 'size-[17px] shrink-0 max-sm:size-3.5';

export default function Sidebar({ active: current }: { active: AppId }) {
  const { t, isMobile, openApp } = useOs();
  const ref = useRef<HTMLElement>(null);

  // Mobile: the sidebar is a horizontal strip; keep the active app centered.
  useEffect(() => {
    const side = ref.current;
    if (!isMobile || !side) return;
    const frame = requestAnimationFrame(() => {
      const btn = side.querySelector<HTMLElement>('[aria-current="page"]');
      if (!btn) return;
      const s = side.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      side.scrollLeft += b.left - s.left - s.width / 2 + b.width / 2;
    });
    return () => cancelAnimationFrame(frame);
  }, [current, isMobile]);

  return (
    <aside
      ref={ref}
      aria-label={t.favorites}
      className="flex w-[198px] shrink-0 flex-col gap-1 border-r border-sidebar-border bg-sidebar px-2.5 pt-[18px] pb-[13px] max-md:w-[170px] max-sm:w-auto max-sm:flex-none max-sm:[scrollbar-width:none] max-sm:flex-row max-sm:items-center max-sm:gap-[3px] max-sm:overflow-x-auto max-sm:border-r-0 max-sm:border-b max-sm:border-b-toolbar-border max-sm:px-[9px] max-sm:py-[7px] print:hidden max-sm:[&::-webkit-scrollbar]:hidden"
    >
      <div className={caption}>{t.favorites}</div>
      {FAVORITES.map((id) => {
        const Icon = APP_ICONS[id];
        const isActive = id === current;
        return (
          <button
            key={id}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => openApp(id)}
            className={`${button} ${isActive ? active : idle} ${id === 'overview' ? 'max-sm:hidden' : ''}`}
          >
            <Icon className={icon} strokeWidth={1.75} />
            <span>{t[WINDOW_TITLE_KEY[id]]}</span>
          </button>
        );
      })}
      <div className="h-[22px] max-sm:hidden" aria-hidden="true" />
      <div className={caption}>{t.now}</div>
      <button type="button" onClick={() => openApp('work')} className={`${button} ${idle} max-sm:hidden`}>
        <span className="size-[7px] shrink-0 rounded-full bg-sidebar-dot" aria-hidden="true" />
        <span>{t.currently}</span>
      </button>
      <div className="mt-auto flex items-center gap-[9px] border-t border-sidebar-rule px-[9px] pt-3.5 pb-[7px] max-sm:hidden">
        <span
          className="grid size-[34px] shrink-0 place-items-center rounded-[10px] bg-avatar text-[13px] font-extrabold tracking-[-0.08em] text-avatar-ink"
          aria-hidden="true"
        >
          jd.
        </span>
        <span>
          <strong className="block text-[11px] font-[670]">{SITE.name}</strong>
          <small className="mt-[3px] block text-[10px] text-sidebar-small">{SITE.role}</small>
        </span>
      </div>
    </aside>
  );
}
