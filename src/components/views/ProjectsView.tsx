import { useEffect, useRef } from 'react';
import { useOs } from '@/components/os/OsContext';
import { projects } from '@/data/projects';
import type { Lang, Project } from '@/types';
import ProjectDetail from '@/components/views/ProjectDetail';
import {
  Lead,
  Lines,
  SectionHeading,
  Title,
  Topline,
  ViewFrame,
  ViewTail,
  pad2,
} from '@/components/views/ui';

/** Pure search filter: matches the query against `search`, name and localized label. */
export function filterProjects(list: readonly Project[], query: string, lang: Lang): Project[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...list];
  return list.filter((p) => `${p.search} ${p.name} ${p.label[lang]}`.toLowerCase().includes(q));
}

/** Uppercase category shown in the card/hero kicker (prototype copy), falling back to the label. */
const CATEGORY: Record<string, string> = { betsell: 'PRODUCT', uc: 'WEB DEVELOPMENT', noa: 'COMMUNITY' };
const category = (p: Project, lang: Lang) =>
  CATEGORY[p.id] ?? (p.label[lang].split('·')[0] ?? p.label[lang]).trim().toUpperCase();

/** Two-word names break onto two lines on cards ("Universidad / Continental"). */
const cardTitle = (name: string) => {
  const words = name.split(' ');
  return words.length === 2 ? words.join('\n') : name;
};

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus';

function Hero({ p, lang, onOpen }: { p: Project; lang: Lang; onOpen: () => void }) {
  const stack = p.tags.filter((tag) => !tag.includes(' ')).slice(0, 3);
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`relative flex h-[204px] w-full justify-between overflow-hidden rounded-hero border border-hero bg-hero px-[26px] py-[23px] text-left text-white transition-colors duration-[140ms] hover:bg-hero-hover max-sm:h-[184px] max-sm:p-[18px] max-xs:h-[172px] ${focusRing}`}
    >
      <span className="flex flex-col items-start">
        <span className="text-[10px] font-semibold tracking-[0.08em] text-hero-mini">
          {`${pad2(p.order)}  /  ${category(p, lang)}`}
        </span>
        <strong className="mt-auto mb-2 text-[49px] leading-none font-[675] tracking-[-0.065em] text-white max-sm:text-[40px] max-xs:text-[35px]">
          {p.name}
        </strong>
        <span className="max-w-[230px] text-[11px] leading-[1.6] text-hero-ink">
          {p.label[lang]}
          <br />
          {stack.join(' · ')}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="flex min-w-[160px] flex-col items-end justify-between text-hero-ink max-sm:min-w-[84px]"
      >
        <span className="font-mono text-[9px] tracking-[0.005em] max-sm:hidden">SELECTED / 2025–26</span>
        <span className="text-[72px] leading-none font-[650] tracking-[-0.09em] text-hero-mark select-none max-sm:text-[55px] max-xs:text-[45px]">
          {p.name.charAt(0)}
          <span className="text-hero-mark-accent">.</span>
        </span>
        <span className="border-t border-hero-cta-rule pt-2 font-mono text-[9px] tracking-[0.005em] text-hero-cta max-sm:max-w-[85px] max-sm:text-right max-sm:text-[8px]">
          OPEN CASE STUDY ↗
        </span>
      </span>
    </button>
  );
}

function Card({ p, lang, onOpen }: { p: Project; lang: Lang; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`relative flex h-[149px] w-full flex-col items-start overflow-hidden rounded-card border border-card-border bg-card px-[19px] py-[17px] text-left text-[#272a30] transition-colors duration-[140ms] hover:border-card-border-hover hover:bg-card-hover max-sm:h-[141px] max-sm:p-[13px] max-xs:h-[112px] ${focusRing}`}
    >
      <span className="text-[9px] font-semibold tracking-[0.07em] text-card-mini">
        {`${pad2(p.order)} / ${category(p, lang)}`}
      </span>
      <strong className="mt-auto mb-px text-[24px] leading-[1.06] font-[645] tracking-[-0.048em] text-card-title max-sm:text-[21px] max-xs:text-[22px]">
        <Lines text={cardTitle(p.name)} />
      </strong>
      <span className="text-[10px] text-card-desc">{p.label[lang]}</span>
      <span
        aria-hidden="true"
        className="absolute top-4 right-[18px] text-[18px] text-card-open max-sm:top-3 max-sm:right-3"
      >
        ↗
      </span>
    </button>
  );
}

function Row({
  p,
  lang,
  onOpen,
  compact = false,
}: {
  p: Project;
  lang: Lang;
  onOpen: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`relative flex w-full items-center overflow-hidden rounded-row border border-card-border bg-white px-[18px] text-left text-row-ink transition-colors duration-[140ms] hover:border-card-border-hover hover:bg-card ${compact ? 'mt-2 h-[52px] gap-3.5 max-xs:px-3.5' : 'mt-3 h-[65px] gap-[17px]'} ${focusRing}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-[7px] bg-row-mono font-mono font-[750] text-row-mono-ink ${compact ? 'size-[27px] text-[10px]' : 'size-[31px] text-[11px]'}`}
      >
        {pad2(p.order)}
      </span>
      <span className="flex min-w-0 flex-col gap-[3px]">
        <strong className={`truncate ${compact ? 'text-[12px]' : 'text-[13px]'}`}>{p.name}</strong>
        <small className="truncate text-[10px] text-row-small">{p.label[lang]}</small>
      </span>
      {compact && (
        <span className="ml-auto shrink-0 font-mono text-[10px] text-row-small max-xs:hidden">{p.year}</span>
      )}
      <span
        aria-hidden="true"
        className={`${compact ? 'ml-1 text-[17px] max-xs:ml-auto' : 'ml-auto text-[22px]'}`}
      >
        ↗
      </span>
    </button>
  );
}

export default function ProjectsView() {
  const { t, lang, currentProject, setCurrentProject, searchVisible, searchQuery, setSearchQuery } = useOs();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchVisible) inputRef.current?.focus();
  }, [searchVisible]);

  if (currentProject) return <ProjectDetail />;

  const visible = filterProjects(projects, searchVisible ? searchQuery : '', lang);
  const of = (kind: Project['kind']) => visible.filter((p) => p.kind === kind);
  const heroes = of('hero');
  const cards = of('card');
  const rows = of('row');
  const archive = of('archive');
  const open = (id: string) => () => setCurrentProject(id);

  return (
    <ViewFrame>
      <Topline eyebrow={t.folder} pill={`${pad2(projects.length)} ${t.projectsWord}`} />
      <Title>{t.viewTitle}</Title>
      <Lead>{t.viewLead}</Lead>

      {searchVisible && (
        <div className="mb-5">
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={t.search}
            placeholder={t.search}
            className="w-full rounded-control border border-input-border bg-white px-3 py-2.5 text-[13px] text-input-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
          />
        </div>
      )}

      <div className="pb-2">
        {visible.length === 0 && <p className="m-0 mt-5 text-[12px] text-muted">{t.noProjects}</p>}

        {heroes.length > 0 && (
          <>
            <SectionHeading>{t.featured}</SectionHeading>
            {heroes.map((p) => (
              <Hero key={p.id} p={p} lang={lang} onOpen={open(p.id)} />
            ))}
          </>
        )}

        {cards.length + rows.length > 0 && <SectionHeading>{t.moreWork}</SectionHeading>}
        {cards.length > 0 && (
          <div className="grid grid-cols-2 gap-3 max-sm:gap-2.5 max-xs:grid-cols-1">
            {cards.map((p) => (
              <Card key={p.id} p={p} lang={lang} onOpen={open(p.id)} />
            ))}
          </div>
        )}
        {rows.map((p) => (
          <Row key={p.id} p={p} lang={lang} onOpen={open(p.id)} />
        ))}

        {archive.length > 0 && (
          <>
            <SectionHeading className="mt-[30px]">{t.archive}</SectionHeading>
            <p className="m-0 mb-1 text-[11px] leading-[1.6] text-lead">{t.archiveLead}</p>
            {archive.map((p) => (
              <Row key={p.id} p={p} lang={lang} onOpen={open(p.id)} compact />
            ))}
          </>
        )}
      </div>

      <ViewTail>{t.projectHint}</ViewTail>
    </ViewFrame>
  );
}
