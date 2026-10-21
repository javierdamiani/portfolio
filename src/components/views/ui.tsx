import { Fragment, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { CoverTone } from '@/types';

/** Shared view primitives (prototype `.view*` rules, v5 cascade). Tailwind utilities only. */

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');

/** `.view` padding wrapper. */
export function ViewFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'min-h-full px-8 pt-[29px] pb-9 text-ink max-sm:px-[18px] max-sm:pt-[22px] max-sm:pb-8 max-xs:px-[14px] max-xs:pt-[19px] max-xs:pb-7',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="text-[10px] font-[750] tracking-[0.09em] text-eyebrow uppercase">{children}</span>;
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[5px] bg-pill px-2.5 py-[7px] text-[10px] font-medium whitespace-nowrap text-pill-ink">
      {children}
    </span>
  );
}

/** `.view-topline`: eyebrow on the left, small pill on the right. */
export function Topline({ eyebrow, pill }: { eyebrow: ReactNode; pill: ReactNode }) {
  return (
    <div className="mb-[13px] flex items-center justify-between gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Pill>{pill}</Pill>
    </div>
  );
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cx(
        'm-0 mb-[9px] font-display text-[32px] leading-[1.1] font-[680] tracking-[-0.045em] text-ink-strong max-sm:text-[29px]',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('m-0 mb-[27px] text-[13px] leading-[1.6] text-lead', className)}>{children}</p>;
}

export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('mt-[21px] mb-2.5 text-[11px] font-[640] tracking-[0.01em] text-section', className)}>
      {children}
    </div>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="m-0 mt-7 mb-3 text-[12px] font-[710]">{children}</h3>;
}

export function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-[7px]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-[6px] border border-tag-border bg-tag px-[9px] py-1.5 text-[11px] font-[550] text-tag-ink"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

const softLinkClass =
  'inline-flex items-center gap-2 rounded-[9px] border border-soft-border px-3 py-2.5 text-[11px] font-[650] no-underline transition-colors hover:bg-soft-hover';

export function SoftLink({
  href,
  children,
  external = true,
  download,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      className={softLinkClass}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {children}
    </a>
  );
}

export function PrimaryButton({ children, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center gap-[9px] rounded-control border-0 bg-button px-[15px] py-[11px] text-[12px] font-[570] text-white transition-colors hover:bg-button-hover',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ViewTail({ children }: { children: ReactNode }) {
  return <p className="m-0 mt-5 text-[10px] text-tail">{children}</p>;
}

/** Renders a string with `\n` as line breaks (no innerHTML). */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

/** Full class strings per tone so Tailwind can detect them (never interpolate). */
export const COVER_CLASS: Record<CoverTone, string> = {
  betsell: 'bg-cover-betsell text-cover-betsell-ink',
  uc: 'bg-cover-uc text-cover-uc-ink',
  noa: 'bg-cover-noa text-cover-noa-ink',
  comic: 'bg-cover-comic text-cover-comic-ink',
  pokecats: 'bg-cover-pokecats text-cover-pokecats-ink',
  fifa: 'bg-cover-fifa text-cover-fifa-ink',
  around: 'bg-cover-around text-cover-around-ink',
  learn: 'bg-cover-learn text-cover-learn-ink',
  patria: 'bg-cover-patria text-cover-patria-ink',
  bookbot: 'bg-cover-bookbot text-cover-bookbot-ink',
};

export const pad2 = (n: number) => String(n).padStart(2, '0');
