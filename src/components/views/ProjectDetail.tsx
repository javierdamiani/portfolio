import { useOs } from '@/components/os/OsContext';
import { byId, projects } from '@/data/projects';
import { COVER_CLASS, SoftLink, TagList, Title, ViewFrame } from '@/components/views/ui';

/** Big cover wordmark per project (prototype copy); archive projects show their name. */
const COVER_TEXT: Record<string, string> = { betsell: 'BetSell', uc: 'UC', noa: 'NOA', comic: 'Comic Nest' };

export default function ProjectDetail() {
  const { t, lang, currentProject, setCurrentProject, images } = useOs();
  const p = (currentProject ? byId(currentProject) : undefined) ?? projects[0];
  if (!p) return null;
  const shots = images[p.id] ?? [];
  const coverText = COVER_TEXT[p.id] ?? p.name;

  return (
    <ViewFrame>
      <button
        type="button"
        onClick={() => setCurrentProject(null)}
        className="mb-[25px] flex items-center gap-[7px] border-0 bg-transparent p-0 text-[12px] text-detail-back hover:underline"
      >
        ← {t.back}
      </button>

      <div
        className={`flex h-[152px] items-center justify-center overflow-hidden rounded-row px-4 text-center leading-none font-[780] tracking-[-0.07em] ${coverText.length > 12 ? 'text-[40px] max-sm:text-[30px]' : 'text-[50px] max-sm:text-[40px]'} ${COVER_CLASS[p.tone]}`}
        aria-hidden="true"
      >
        {coverText}
      </div>

      <span className="mt-[25px] mb-2 block text-[11px] text-detail-kicker">
        {p.label[lang]} / {p.year}
      </span>
      <Title>{p.name}</Title>
      <p className="m-0 mb-5 max-w-[650px] text-[14px] leading-[1.75] text-detail-copy">
        {p.description[lang]}
      </p>
      <TagList tags={p.tags} />

      {(p.link || p.repo) && (
        <div className="mt-[25px] flex flex-wrap items-center gap-2">
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[9px] bg-detail-link px-4 py-3 text-[12px] font-semibold text-white no-underline transition-colors hover:bg-detail-link-hover"
            >
              {p.kind === 'archive' ? t.viewLive : t.visit} ↗
            </a>
          )}
          {p.repo && <SoftLink href={p.repo}>{t.viewCode} ↗</SoftLink>}
        </div>
      )}

      {shots.length > 0 && (
        <section className="mt-9">
          <h3 className="m-0 mb-3 text-[12px] font-[710]">{t.gallery}</h3>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {shots.map((img, i) => (
              <img
                key={`${img.src}-${i}`}
                src={img.src}
                width={img.width}
                height={img.height}
                alt={img.alt[lang]}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full rounded-row border border-card-border bg-card object-cover object-top"
              />
            ))}
          </div>
        </section>
      )}
    </ViewFrame>
  );
}
