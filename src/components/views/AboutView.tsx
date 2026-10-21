import { useOs } from '@/components/os/OsContext';
import { SITE } from '@/data/site';
import { SoftLink, SubHeading, TagList, Title, Topline, ViewFrame } from '@/components/views/ui';

const SKILLS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Next.js',
  'Astro',
  'Vite',
  'Tailwind CSS',
  'Node.js',
  'Git',
  'Web Performance',
] as const;

const copyClass = 'm-0 my-[15px] text-[13px] leading-[1.82] text-about-copy';

export default function AboutView() {
  const { t, lang, portrait } = useOs();
  const facts = [t.aboutFact1, t.aboutFact2, t.aboutFact3, t.aboutFact4];

  return (
    <ViewFrame>
      <Topline eyebrow={t.aboutEyebrow} pill="README.md" />
      <div className="grid grid-cols-[1fr_175px] items-start gap-5 max-sm:grid-cols-[1fr_95px] max-sm:gap-[15px] max-xs:grid-cols-1">
        <div>
          <Title className="max-w-[420px]">{t.aboutTitle}</Title>
          <p className="m-0 my-[15px] text-[15px] leading-[1.6] font-[540] text-about-strong">
            {t.aboutLead}
          </p>
          <p className={copyClass}>{t.aboutP1}</p>
          <p className={copyClass}>{t.aboutP2}</p>
        </div>
        <div
          className="relative flex h-[184px] items-center justify-center overflow-hidden rounded-card border border-portrait-border bg-portrait max-sm:h-[120px] max-xs:hidden"
          {...(portrait ? {} : { role: 'img', 'aria-label': 'Javier initials artwork' })}
        >
          {portrait ? (
            <img
              src={portrait.src}
              width={portrait.width}
              height={portrait.height}
              alt={portrait.alt[lang]}
              loading="eager"
              decoding="async"
              className="-mt-5 h-[138px] w-auto object-contain max-sm:-mt-4 max-sm:h-[82px]"
            />
          ) : (
            <span className="text-[70px] font-[790] tracking-[-0.1em] text-portrait-ink max-sm:text-[43px]">
              jd.
            </span>
          )}
          <span className="absolute bottom-3.5 left-3.5 text-[10px] font-bold text-portrait-note max-sm:bottom-2 max-sm:left-2 max-sm:text-[8px]">
            MADE IN PERU ↗
          </span>
        </div>
      </div>

      <SubHeading>{t.aboutSkills}</SubHeading>
      <TagList tags={SKILLS} />

      <SubHeading>{t.aboutFacts}</SubHeading>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {facts.map((fact) => (
          <li key={fact} className="flex gap-2.5 text-[13px] leading-[1.7] text-about-copy">
            <span aria-hidden="true" className="mt-[0.75em] size-1 shrink-0 rounded-full bg-pill-ink" />
            <span>{fact}</span>
          </li>
        ))}
      </ul>

      <div className="mt-[25px] flex flex-wrap gap-2">
        <SoftLink href={SITE.links.github}>GitHub ↗</SoftLink>
        <SoftLink href={SITE.links.linkedin}>LinkedIn ↗</SoftLink>
      </div>
      <p className="m-0 mt-[25px] text-[11px] text-[#9ca6ad]">{t.aboutFooter}</p>
    </ViewFrame>
  );
}
