import { useOs } from '@/components/os/OsContext';
import { SITE } from '@/data/site';
import { Lead, Lines, PrimaryButton, SoftLink, Title, Topline, ViewFrame } from '@/components/views/ui';
import type { ReactNode } from 'react';

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="break-inside-avoid rounded-row border border-card-border bg-white p-[17px]">
      <h3 className="m-0 mb-3 text-[11px] font-bold tracking-[0.05em] text-overview-heading uppercase">
        {title}
      </h3>
      <p className="m-0 text-[12px] leading-[1.8] text-overview-copy">{children}</p>
    </div>
  );
}

export default function OverviewView() {
  const { t, print } = useOs();
  return (
    <ViewFrame>
      <Topline eyebrow={t.overviewEyebrow} pill="JAVIER.DAMIANI" />
      <Title>{t.overviewTitle}</Title>
      <Lead className="max-w-[570px]">{t.overviewLead}</Lead>
      <div className="mt-[22px] grid grid-cols-2 gap-3.5 max-sm:grid-cols-1 print:grid-cols-2">
        <Card title={t.overviewExperience}>
          <Lines text={t.overviewExperienceText} />
        </Card>
        <Card title={t.overviewToolkit}>
          <Lines text={t.overviewToolkitText} />
        </Card>
        <Card title={t.overviewFocus}>
          <Lines text={t.overviewFocusText} />
        </Card>
        <Card title={t.overviewContact}>
          <a href={`mailto:${SITE.email}`} className="text-overview-strong hover:underline">
            {SITE.email}
          </a>
        </Card>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-[9px] print:hidden">
        <PrimaryButton onClick={() => print()}>{t.overviewPrint} ↗</PrimaryButton>
        <SoftLink href={SITE.cv.main} external={false} download>
          {t.downloadCv} ↓
        </SoftLink>
      </div>
    </ViewFrame>
  );
}
