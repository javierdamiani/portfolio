import { useId, useState } from 'react';
import { useOs } from '@/components/os/OsContext';
import { pickArcade } from '@/i18n/arcade';
import PocketDrive from './PocketDrive';
import TicTacToe from './TicTacToe';

type Tab = 'ttt' | 'drive';

/* Module-level so the selected game survives the view unmounting (same pattern as the game stores). */
let lastTab: Tab = 'ttt';

const TAB =
  'mr-[13px] cursor-pointer border-b-2 border-transparent bg-transparent pt-[11px] pr-[20px] pb-[12px] pl-[4px] text-[12px] font-semibold text-arcade-tab transition-colors duration-[140ms] hover:text-[#30333b] aria-selected:border-arcade-tab-bar aria-selected:text-arcade-tab-active max-xs:mr-[6px] max-xs:pr-[8px] max-xs:text-[11px]';

export default function ArcadeView() {
  const { lang } = useOs();
  const l = pickArcade(lang);
  const [tab, setTabState] = useState<Tab>(lastTab);
  const id = useId();
  const tabId = (t: Tab) => `${id}-arcade-tab-${t}`;

  const setTab = (next: Tab) => {
    lastTab = next;
    setTabState(next);
  };

  return (
    <div className="min-h-full max-w-full px-[32px] pt-[29px] pb-[23px] max-sm:px-[18px] max-sm:pt-[8px] max-sm:pb-[24px] max-xs:px-[14px]">
      <div className="mb-[13px] flex items-center justify-between gap-3 max-sm:hidden">
        <span className="text-[10px] font-[750] tracking-[0.09em] text-eyebrow uppercase">{l.eyebrow}</span>
        <span className="rounded-[5px] bg-pill px-[10px] py-[7px] text-[10px] font-medium whitespace-nowrap text-pill-ink">
          02 / GAMES
        </span>
      </div>
      <h2 className="m-0 mb-[9px] font-display text-[32px] leading-[1.1] font-[680] tracking-[-0.045em] text-ink-strong max-sm:hidden">
        {l.title}
      </h2>
      <p className="m-0 mb-[20px] text-[13px] leading-[1.6] text-lead max-sm:hidden">{l.intro}</p>

      <div
        className="mb-[20px] flex border-b border-arcade-rule max-sm:mb-[12px]"
        role="tablist"
        aria-label={l.gamesTabs}
      >
        {(['ttt', 'drive'] as const).map((t, i) => (
          <button
            key={t}
            id={tabId(t)}
            type="button"
            role="tab"
            aria-selected={tab === t}
            aria-controls={`${id}-arcade-stage`}
            className={TAB}
            onClick={() => setTab(t)}
          >
            0{i + 1} <span className="ml-[6px] font-[530]">{t === 'ttt' ? l.xo : l.drive}</span>
          </button>
        ))}
      </div>

      <section
        id={`${id}-arcade-stage`}
        className="min-h-[304px]"
        role="tabpanel"
        aria-labelledby={tabId(tab)}
      >
        {tab === 'ttt' ? <TicTacToe /> : <PocketDrive />}
      </section>

      <div className="mt-[25px] border-t border-arcade-footer-rule pt-[11px] font-mono text-[9px] font-medium tracking-[0.08em] text-arcade-footer max-sm:mt-[18px]">
        JAVIER.DAMIANI / EXPERIMENTS — 2026
      </div>
    </div>
  );
}
