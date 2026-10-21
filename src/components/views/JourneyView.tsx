import { useOs } from '@/components/os/OsContext';
import { journey } from '@/data/journey';
import { Lead, Title, Topline, ViewFrame } from '@/components/views/ui';

export default function JourneyView() {
  const { t, lang } = useOs();
  return (
    <ViewFrame>
      <Topline eyebrow={t.journeyEyebrow} pill="2019 — 2026" />
      <Title>{t.journeyTitle}</Title>
      <Lead>{t.journeyLead}</Lead>
      <div className="mt-6">
        {journey.map((item) => (
          <article
            key={`${item.org}-${item.when.en}`}
            className="grid grid-cols-[116px_1fr] gap-[18px] border-t border-journey-rule py-5 max-sm:grid-cols-[76px_1fr] max-sm:gap-3.5"
          >
            <div className="text-[11px] leading-[1.5] text-journey-date">{item.when[lang]}</div>
            <div>
              <h3 className="m-0 mb-1 text-[17px] font-bold tracking-[-0.025em]">
                {item.role[lang]}{' '}
                {item.current && (
                  <span className="ml-1 inline-flex items-center gap-[5px] rounded-[20px] bg-now px-[7px] py-[3px] align-middle text-[9px] tracking-normal text-now-ink">
                    ● {t.nowBadge}
                  </span>
                )}
              </h3>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-[630] text-journey-org no-underline hover:underline"
                >
                  {item.org}
                </a>
              ) : (
                <span className="text-[12px] font-[630] text-journey-org">{item.org}</span>
              )}
              <p className="m-0 mt-[9px] text-[12px] leading-[1.7] text-journey-copy">{item.desc[lang]}</p>
            </div>
          </article>
        ))}
      </div>
    </ViewFrame>
  );
}
