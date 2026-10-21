export default function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-state={visible ? 'visible' : 'hidden'}
      className="pointer-events-none fixed bottom-[111px] left-1/2 z-999 -translate-x-1/2 translate-y-[15px] rounded-[10px] bg-toast px-[15px] py-2.5 text-[12px] text-white opacity-0 shadow-toast transition-[opacity,translate] duration-200 data-[state=visible]:translate-y-0 data-[state=visible]:opacity-100 print:hidden"
    >
      {message}
    </div>
  );
}
