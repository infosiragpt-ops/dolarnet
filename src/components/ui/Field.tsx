type FieldProps = {
  label: string;
  hint?: string;
  children: React.ReactNode;
};

export function Field({ label, hint, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/55">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1.5 block text-[13px] text-muted">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-[15px] text-ink outline-none transition focus:border-ink/40 focus:ring-4 focus:ring-yellow/40";

export const selectClass = `${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%230B0B0B%22 d=%22M1 1.5 6 6.5 11 1.5%22/></svg>')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`;
