import { useEffect, useState } from 'react';
import type { AppId, Lang } from '@/types';
import { useOs } from '@/components/os/OsContext';
import { SunIcon } from '@/components/os/icons';

// The prototype keeps these labels in English in both languages.
const MENUS: readonly (readonly [AppId, string])[] = [
  ['work', 'Projects'],
  ['about', 'About'],
  ['experience', 'Journey'],
  ['arcade', 'Arcade'],
  ['contact', 'Contact'],
];

const formatTime = (lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-PE' : 'en-GB', {
    timeZone: 'America/Lima',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

const item = 'border-0 bg-transparent py-[5px] text-inherit';
const hover = 'hover:rounded-[5px] hover:bg-menubar-hover night:hover:bg-white/10';

export default function MenuBar() {
  const { lang, t, toggleLang, cycleWallpaper, openApp } = useOs();
  // SSR placeholder; the real Lima time is filled in after hydration (avoids a mismatch).
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    setTime(formatTime(lang));
    const timer = setInterval(() => setTime(formatTime(lang)), 60_000);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <header className="relative z-200 flex h-[39px] min-h-[39px] items-center justify-between border-b border-menubar-border bg-menubar px-[25px] text-[12px] text-menubar-ink max-lg:px-[14px] max-sm:h-[44px] max-sm:min-h-[44px] max-sm:px-[17px] print:hidden night:border-b-[#ffffff17] night:bg-menubar-night night:text-menubar-ink-night">
      <div className="flex h-full items-center gap-[18px]">
        <button
          type="button"
          aria-label="About Javier"
          onClick={() => openApp('about')}
          className={`${item} text-[18px] font-[760] tracking-[-0.07em]`}
        >
          j<span>.</span>
        </button>
        <button type="button" onClick={() => openApp('work')} className={`${item} text-[12px] font-[650]`}>
          Javier&apos;s Space
        </button>
        <nav
          aria-label="Menu"
          className="flex h-full items-center gap-[22px] max-lg:gap-[14px] max-sm:hidden"
        >
          {MENUS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => openApp(id)}
              className={`${hover} border-0 bg-transparent py-[5px] font-[460] text-menubar-item transition-opacity duration-200 hover:opacity-50 night:text-menubar-ink-night/80`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex h-full items-center gap-4 max-sm:gap-2.5">
        <span className="flex items-center gap-[7px] text-[11px] font-medium text-availability max-sm:hidden night:text-[#dde7ef]">
          <span className="size-[7px] rounded-full bg-accent-green" aria-hidden="true" />
          <span>{t.openToWork}</span>
        </span>
        <button
          type="button"
          aria-label="Change wallpaper"
          title="Change wallpaper"
          onClick={cycleWallpaper}
          className={`${hover} grid size-[25px] place-items-center rounded-[7px] text-inherit`}
        >
          <SunIcon className="size-[17px]" />
        </button>
        <button
          type="button"
          aria-label="Switch language"
          onClick={toggleLang}
          className={`${hover} rounded-[7px] px-2 py-1.5 font-[650] text-inherit max-sm:text-[12px]`}
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
        <time
          className="min-w-[45px] text-[11.5px] tracking-[0.02em] tabular-nums max-sm:hidden"
          suppressHydrationWarning
        >
          {time}
        </time>
      </div>
    </header>
  );
}
