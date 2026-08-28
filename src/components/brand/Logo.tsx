import Link from "next/link";

type LogoProps = {
  href?: string;
  compact?: boolean;
  onDark?: boolean;
};

export function Logo({ href = "/", compact = false, onDark = false }: LogoProps) {
  const mark = (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className={`relative grid h-10 w-10 place-items-center rounded-[10px] ${
          onDark ? "bg-yellow text-ink" : "bg-ink text-yellow"
        }`}
      >
        <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none">
          <path
            d="M11 8.5h11.2c6.2 0 10.3 3.6 10.3 9.6 0 6.1-4.1 9.9-10.4 9.9H11V8.5Z"
            fill="currentColor"
          />
          <path
            d="M16.4 12.2h5.6c3.6 0 5.7 1.9 5.7 5.8 0 3.8-2.1 5.9-5.8 5.9h-5.5V12.2Z"
            className={onDark ? "fill-yellow" : "fill-ink"}
          />
          <text
            x="19.2"
            y="21.6"
            textAnchor="middle"
            className="fill-[#1F9D4A]"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            $
          </text>
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-sans text-[17px] font-extrabold tracking-[-0.04em]">
            Dolarnett
          </span>
          <span
            className={`mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] ${
              onDark ? "text-white/70" : "text-ink/55"
            }`}
          >
            Envíos
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className="shrink-0 outline-offset-4">
      <span className="sr-only">Dolarnett, inicio</span>
      {mark}
    </Link>
  );
}
