import { useEffect, useRef, useState, type SubmitEvent, type MouseEvent } from 'react';
import { useOs } from '@/components/os/OsContext';
import { projects } from '@/data/projects';
import { SITE } from '@/data/site';
import { PROMPT, runCommand } from '@/lib/terminal';

interface LogEntry {
  id: number;
  command: string;
  output: string;
}

const projectNames = projects.map((p) => p.name);

export default function TerminalView() {
  const { lang, t, openApp, cycleWallpaper } = useOs();
  const [log, setLog] = useState<LogEntry[]>([]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // Autofocus once the window has painted (the window enter animation may still be running).
  useEffect(() => {
    const raf = requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keep the latest output in view.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    inputRef.current?.scrollIntoView({ block: 'nearest' });
  }, [log]);

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const command = value;
    setValue('');
    const result = runCommand(command, { lang, t, email: SITE.email, projectNames });
    if (result.action?.type === 'clear') {
      setLog([]);
    } else {
      setLog((prev) => [...prev, { id: nextId.current++, command, output: result.output }]);
    }
    if (result.action?.type === 'open') openApp(result.action.id);
    else if (result.action?.type === 'theme') cycleWallpaper();
    inputRef.current?.focus({ preventScroll: true });
  }

  function focusInput(e: MouseEvent<HTMLDivElement>) {
    if (e.target instanceof HTMLInputElement) return;
    if (window.getSelection()?.toString()) return; // let people copy output
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <div
      className="flex h-full min-h-full flex-col bg-terminal px-[28px] py-[23px] font-mono text-[12px] leading-[1.72] text-terminal-ink max-sm:px-[17px] max-sm:py-[22px]"
      onClick={focusInput}
    >
      <div className="mb-[19px] shrink-0 whitespace-pre-line text-terminal-intro">{t.termStart}</div>
      <div ref={logRef} className="min-h-0 overflow-auto text-terminal-log" role="log" aria-live="polite">
        {log.map((entry) => (
          <div key={entry.id}>
            <div className="my-[3px] whitespace-pre-wrap">
              <strong className="font-bold text-terminal-strong">{PROMPT} </strong>
              {entry.command}
            </div>
            <div className="my-[3px] whitespace-pre-wrap">{entry.output}</div>
          </div>
        ))}
      </div>
      <form className="mt-[10px] flex shrink-0 items-center gap-[9px] text-terminal-prompt" onSubmit={submit}>
        <span aria-hidden="true">{PROMPT}</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          enterKeyHint="send"
          aria-label="Terminal command"
          placeholder="help"
          className="min-w-0 flex-1 bg-transparent text-terminal-input caret-terminal-input outline-none placeholder:text-terminal-placeholder focus-visible:outline-none"
        />
      </form>
    </div>
  );
}
