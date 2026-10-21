import { useOs } from '@/components/os/OsContext';
import { SITE } from '@/data/site';
import {
  Lead,
  PrimaryButton,
  SectionHeading,
  SoftLink,
  Title,
  Topline,
  ViewFrame,
} from '@/components/views/ui';

/** Copies text to the clipboard, falling back to a hidden textarea + execCommand. */
export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.className = 'fixed -left-[9999px] opacity-0';
    document.body.append(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
}

export default function ContactView() {
  const { t, notice } = useOs();
  const onCopy = async () => {
    await copyText(SITE.email);
    notice(t.copied);
  };

  return (
    <ViewFrame>
      <Topline eyebrow={t.contactEyebrow} pill="↗ 01 / 01" />
      <Title className="max-w-[500px]">{t.contactTitle}</Title>
      <Lead className="max-w-[440px]">{t.contactLead}</Lead>
      <a
        href={`mailto:${SITE.email}`}
        className="mb-3.5 block text-[clamp(18px,2.2vw,26px)] font-[710] tracking-[-0.045em] break-all text-contact-email no-underline transition-colors hover:text-blue"
      >
        {SITE.email} ↗
      </a>
      <PrimaryButton onClick={onCopy}>
        {t.copy} <span aria-hidden="true">⧉</span>
      </PrimaryButton>
      <SectionHeading className="mt-11">{t.social}</SectionHeading>
      <div className="mt-10 flex flex-wrap gap-[11px]">
        <SoftLink href={SITE.links.linkedin}>LinkedIn ↗</SoftLink>
        <SoftLink href={SITE.links.github}>GitHub ↗</SoftLink>
      </div>
    </ViewFrame>
  );
}
