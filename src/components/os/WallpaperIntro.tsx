import { Fragment } from 'react';
import { useOs } from '@/components/os/OsContext';

export default function WallpaperIntro({ className = '' }: { className?: string }) {
  const { t } = useOs();
  const role = t.wallpaperRole.split('\n');

  return (
    <section
      aria-label="Introduction"
      className={`absolute top-[18%] left-[6.1%] w-[395px] select-none max-lg:left-[4%] max-lg:w-[270px] max-sm:top-[10%] max-sm:left-[9%] max-sm:z-1 max-sm:w-[82%] print:hidden ${className}`}
    >
      <p className="mt-0 mb-[19px] flex items-center gap-[9px] text-[12px] font-medium tracking-[0.005em] text-intro-hello night:text-night-ink">
        <span className="size-[7px] rounded-full bg-accent-green" aria-hidden="true" />{' '}
        <span data-slot="hello">{t.hello}</span>
      </p>
      <h1 className="mt-0 mb-[23px] font-display text-[clamp(58px,4.95vw,76px)] leading-[1.025] font-[680] tracking-[-0.065em] text-intro-title max-sm:text-[clamp(53px,12vw,72px)] night:text-night-ink">
        Javier
        <br />
        Damiani<span>.</span>
      </h1>
      <p className="m-0 text-[14px] leading-[1.6] font-[430] text-intro-role night:text-night-ink">
        {role.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </p>
      <div className="mt-[21px] flex items-center gap-2 text-[11px] text-intro-location night:text-night-ink">
        <span className="text-[17px] text-intro-pin" aria-hidden="true">
          ↗
        </span>
        <span>{t.location}</span>
      </div>
    </section>
  );
}
