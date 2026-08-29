type FlagProps = {
  code: string;
  size?: number;
  className?: string;
};

export function Flag({ code, size = 28, className = "" }: FlagProps) {
  const iso = code.toLowerCase();
  const src = `https://flagcdn.com/w80/${iso}.png`;

  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-full bg-paper-2 ring-1 ring-black/10 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
