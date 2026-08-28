"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/ayuda", label: "Ayuda" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const email = session?.user?.email;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-yellow">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] font-semibold tracking-[-0.01em] ${
                  active ? "text-ink" : "text-ink/70 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {email ? (
            <>
              <span className="max-w-[220px] truncate text-[13px] font-semibold text-ink/80">
                {email}
              </span>
              <Button href="/dashboard" variant="ink" size="sm">
                Ir al panel
              </Button>
              <SignOutButton className="text-[13px] font-semibold text-ink/70 hover:text-ink" />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-2 text-[14px] font-semibold text-ink/80 hover:text-ink"
              >
                <UserIcon />
                Iniciar sesión
              </Link>
              <Button href="/registro" variant="ink" size="sm">
                Regístrate
              </Button>
            </>
          )}
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 md:hidden"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <span className="block h-px w-4 bg-ink" />
          <span className="mt-1.5 block h-px w-4 bg-ink" />
        </button>
      </div>
      {open ? (
        <div className="border-t border-ink/10 bg-yellow px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 text-[15px] font-semibold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            {email ? (
              <>
                <p className="truncate text-[13px] font-semibold">{email}</p>
                <Button href="/dashboard" variant="ink">
                  Ir al panel
                </Button>
                <SignOutButton className="text-[13px] font-semibold text-ink/70" />
              </>
            ) : (
              <div className="flex gap-2">
                <Button href="/login" variant="line" className="flex-1">
                  Iniciar sesión
                </Button>
                <Button href="/registro" variant="ink" className="flex-1">
                  Regístrate
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 16.2c1.4-2.4 3.5-3.6 6-3.6s4.6 1.2 6 3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
