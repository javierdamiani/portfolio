import type { ReactNode } from 'react';
import type { AppId } from '@/types';
import { useOs } from '@/components/os/OsContext';
import { FolderArt, NotesArt } from '@/components/os/icons';

const tile = 'size-[54px] rounded-dock-icon max-sm:h-[53px]';

export default function DesktopShortcuts({ className = '' }: { className?: string }) {
  const { t, openApp } = useOs();

  const items: readonly { id: AppId; label: string; icon: ReactNode }[] = [
    { id: 'work', label: t.desktopWork, icon: <FolderArt className="size-[58px] max-sm:size-[53px]" /> },
    {
      id: 'about',
      label: t.desktopAbout,
      icon: (
        <span className={`${tile} grid place-items-center bg-shortcut-me shadow-shortcut`}>
          <span className="text-[23px] font-extrabold tracking-[-0.11em] text-shortcut-me-ink">jd.</span>
        </span>
      ),
    },
    {
      id: 'experience',
      label: t.desktopJourney,
      icon: <NotesArt className="size-[58px] max-sm:size-[53px]" />,
    },
    {
      id: 'terminal',
      label: 'Terminal',
      icon: (
        <span
          className={`${tile} grid place-items-center bg-shortcut-terminal text-shortcut-terminal-ink shadow-shortcut-terminal`}
        >
          <span className="-translate-y-[2px] font-mono text-[30px]">›_</span>
        </span>
      ),
    },
  ];

  return (
    <nav
      aria-label="Desktop shortcuts"
      className={`absolute top-[57%] left-[6.1%] grid w-[285px] grid-cols-[repeat(2,110px)] gap-x-3 gap-y-[21px] max-lg:left-[4%] max-sm:top-auto max-sm:bottom-[154px] max-sm:left-1/2 max-sm:z-1 max-sm:w-auto max-sm:-translate-x-1/2 max-sm:grid-cols-[repeat(4,76px)] max-sm:gap-2.5 max-xs:grid-cols-[repeat(4,65px)] max-xs:gap-[7px] print:hidden ${className}`}
    >
      {items.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => openApp(id)}
          className="group flex flex-col items-center justify-center gap-[7px] text-[11.5px] font-medium text-shortcut-ink max-sm:gap-1.5 max-sm:text-center max-sm:text-[10px] night:text-night-ink night:[text-shadow:0_1px_#1b2528]"
        >
          <span className="grid h-[56px] w-[58px] place-items-center transition-transform duration-200 ease-os group-hover:-translate-y-[2px] group-active:scale-95 max-sm:h-[53px] max-sm:w-[54px]">
            {icon}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
