import type { ReactNode, SVGProps } from 'react';
import type { AppId } from '@/types';

/** Line icons from the prototype (`ICONS` in app.js + toolbar/menubar glyphs). */
export type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ children, strokeWidth = 1.8, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const WorkIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 7h6l2 2h10v10H3z" />
    <path d="M3 9V6a2 2 0 0 1 2-2h4l2 3" />
  </Stroke>
);

export const AboutIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
  </Stroke>
);

export const ExperienceIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </Stroke>
);

export const ArcadeIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="7" width="18" height="11" rx="4" />
    <path d="M7 12h5m-2.5-2.5v5M16 11h.01M18 14h.01" />
  </Stroke>
);

export const TerminalIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="m7 9 3 3-3 3m6 0h4" />
  </Stroke>
);

export const ContactIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m3 8 9 6 9-6" />
  </Stroke>
);

export const OverviewIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </Stroke>
);

export const BackIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m15 5-7 7 7 7" />
  </Stroke>
);

export const SearchIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m16 16 5 5" />
  </Stroke>
);

export const SunIcon = (p: IconProps) => (
  <Stroke strokeWidth={1.7} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
  </Stroke>
);

export const APP_ICONS: Record<AppId, (p: IconProps) => ReactNode> = {
  work: WorkIcon,
  about: AboutIcon,
  experience: ExperienceIcon,
  arcade: ArcadeIcon,
  terminal: TerminalIcon,
  contact: ContactIcon,
  overview: OverviewIcon,
};

/* ---------- Colored artwork (desktop shortcuts + dock) ---------- */

export const FolderArt = (p: IconProps) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...p}>
    <path d="M7 19h18l6 7h26v25a5 5 0 0 1-5 5H12a5 5 0 0 1-5-5z" fill="#80befd" />
    <path d="M7 25h50v-5a5 5 0 0 0-5-5H30l-6-6H12a5 5 0 0 0-5 5z" fill="#c5e4ff" />
  </svg>
);

export const NotesArt = (p: IconProps) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...p}>
    <rect x="12" y="5" width="40" height="54" rx="8" fill="#fff8e6" />
    <path d="M20 23h23M20 31h23M20 39h17" stroke="#cab892" strokeWidth="3" strokeLinecap="round" />
    <path d="M20 15h14" stroke="#f5aa64" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const JourneyArt = (p: IconProps) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...p}>
    <rect x="10" y="6" width="28" height="36" rx="5" fill="#fff7db" />
    <path d="M16 16h17M16 23h17M16 30h11" stroke="#b3a27c" strokeWidth="2.7" strokeLinecap="round" />
  </svg>
);

export const ArcadeArt = (p: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...p}>
    <rect x="7" y="14" width="34" height="22" rx="7" fill="#282a30" />
    <path d="M14 24h11m-5.5-5.5v11" stroke="#ececee" strokeWidth="2.8" strokeLinecap="round" />
    <circle cx="31" cy="22" r="2.1" fill="#96b7d6" />
    <circle cx="35" cy="28" r="2.1" fill="#e1c2a8" />
  </svg>
);

export const MailArt = (p: IconProps) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...p}>
    <rect x="6" y="12" width="36" height="25" rx="6" fill="#fff" />
    <path d="m9 16 15 12 15-12" fill="none" stroke="#519de6" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const QuickLookArt = (p: IconProps) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...p}>
    <rect x="12" y="5" width="24" height="38" rx="5" fill="#fff" />
    <path d="M18 16h12M18 22h12M18 28h8" stroke="#c0cad4" strokeWidth="3" strokeLinecap="round" />
    <circle cx="32" cy="33" r="7" fill="#65a7f0" />
  </svg>
);
