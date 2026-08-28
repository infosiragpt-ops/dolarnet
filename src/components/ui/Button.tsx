import Link from "next/link";

type Variant = "yellow" | "ink" | "ghost" | "line";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  yellow:
    "bg-yellow text-ink shadow-[0_1px_0_rgba(0,0,0,0.08)] hover:bg-yellow-deep",
  ink: "bg-ink text-white hover:bg-ink/90",
  ghost: "bg-transparent text-ink hover:bg-black/[.05]",
  line: "border border-ink/15 bg-white text-ink hover:border-ink/40",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-colors disabled:cursor-not-allowed disabled:opacity-50";

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & { href: string; type?: never } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>;

export function Button({
  variant = "yellow",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
