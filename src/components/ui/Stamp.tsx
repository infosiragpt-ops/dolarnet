export function Stamp({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-ink/20 bg-yellow/70 px-2 py-0.5 font-sans text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink">
      {children}
    </span>
  );
}
