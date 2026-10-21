import type { ReactNode } from 'react';
import type { AppId } from '@/types';
import { useOs } from '@/components/os/OsContext';
import { ArcadeArt, JourneyArt, MailArt, QuickLookArt } from '@/components/os/icons';

interface DockItem {
  id: AppId;
  label: string;
  tile: string;
  content: ReactNode;
}

const art = 'size-[45px] max-sm:size-10 max-[340px]:size-[33px]';

const FinderFace = () => (
  <span
    aria-hidden="true"
    className="relative block size-[37px] rounded-[4px] border-[1.8px] border-dock-finder-face after:absolute after:top-0 after:left-1/2 after:h-[29px] after:skew-x-[-10deg] after:border-l-[1.8px] after:border-dock-finder-face max-[340px]:scale-[0.82]"
  >
    <span className="absolute top-[10px] left-[9px] h-2 w-0.5 rounded-[3px] bg-dock-finder-eye" />
    <span className="absolute top-[10px] right-[9px] h-2 w-0.5 rounded-[3px] bg-dock-finder-eye" />
    <span className="absolute right-[7px] bottom-[6px] left-2 h-2 rounded-b-[50%] border-b-2 border-dock-finder-eye" />
  </span>
);

const BEFORE_RULE: readonly DockItem[] = [
  {
    id: 'work',
    label: 'Projects',
    tile: 'bg-[linear-gradient(90deg,var(--color-dock-finder-light)_0_50%,var(--color-dock-finder-dark)_50%_100%)]',
    content: <FinderFace />,
  },
  {
    id: 'about',
    label: 'About',
    tile: 'bg-dock-about text-[22px] max-[340px]:text-[18px] font-extrabold tracking-[-0.13em] text-dock-about-ink',
    content: <span>jd.</span>,
  },
  { id: 'experience', label: 'Journey', tile: 'bg-dock-journey', content: <JourneyArt className={art} /> },
  {
    id: 'terminal',
    label: 'Terminal',
    tile: 'bg-dock-terminal font-mono text-[26px] max-[340px]:text-[21px] text-dock-terminal-ink',
    content: <span>›_</span>,
  },
  {
    id: 'arcade',
    label: 'Arcade',
    tile: 'bg-dock-arcade text-white',
    content: <ArcadeArt className="size-[39px] max-xs:size-[33px] max-[340px]:size-[28px]" />,
  },
];

const AFTER_RULE: readonly DockItem[] = [
  { id: 'contact', label: 'Contact', tile: 'bg-dock-mail', content: <MailArt className={art} /> },
  { id: 'overview', label: 'Quick Look', tile: 'bg-dock-quick', content: <QuickLookArt className={art} /> },
];

export default function Dock() {
  const { windows, openApp } = useOs();
  const isOpen = (id: AppId) => windows.some((w) => w.id === id && !w.minimized);

  const render = ({ id, label, tile, content }: DockItem) => (
    <button
      key={id}
      type="button"
      aria-label={`Open ${label}`}
      title={label}
      data-open={isOpen(id) ? '' : undefined}
      onClick={() => openApp(id)}
      className={`group relative grid size-[51px] place-items-center rounded-dock-icon p-0 shadow-dock-icon transition-transform duration-200 ease-[cubic-bezier(0.18,0.8,0.2,1)] hover:-translate-y-1.5 active:-translate-y-[3px] active:scale-95 motion-reduce:hover:translate-y-0 max-sm:size-[47px] max-sm:hover:translate-y-0 max-xs:size-[43px] max-[340px]:size-[38px] ${tile}`}
    >
      {content}
      <i
        aria-hidden="true"
        className="absolute -bottom-[9px] left-[calc(50%-2px)] size-1 rounded-full bg-dock-indicator opacity-0 group-data-open:opacity-95"
      />
    </button>
  );

  return (
    <footer className="absolute bottom-[17px] left-1/2 z-180 -translate-x-1/2 px-2.5 max-sm:px-0 print:hidden">
      <nav
        aria-label="App dock"
        className="flex h-[71px] items-center gap-[9px] rounded-dock border border-dock-border bg-dock px-[11px] py-2 shadow-dock max-sm:h-[68px] max-sm:gap-2 max-sm:px-2.5 max-xs:h-[64px] max-xs:gap-1.5 max-xs:px-[7px] max-[340px]:h-[58px] max-[340px]:gap-1 max-[340px]:px-[5px]"
      >
        {BEFORE_RULE.map(render)}
        <div
          className="mx-0.5 h-[43px] w-px bg-dock-rule max-sm:h-[33px] max-[340px]:h-[28px]"
          aria-hidden="true"
        />
        {AFTER_RULE.map(render)}
      </nav>
    </footer>
  );
}
