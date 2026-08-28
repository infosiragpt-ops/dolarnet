"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { useStore } from "@/lib/store";

const LINKS = [
  { href: "/dashboard", label: "Panel", icon: "grid" },
  { href: "/transferencia", label: "Enviar", icon: "send" },
  { href: "/cuentas-destinos", label: "Cuentas", icon: "book" },
  { href: "/historial", label: "Historial", icon: "list" },
  { href: "/verificar-cuenta", label: "Verificar", icon: "shield" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useStore();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-full place-items-center bg-paper text-sm text-muted">
        Cargando tu sesión…
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F4F1E8]">
      <div className="mx-auto flex min-h-full max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-ink/10 bg-navy text-white md:flex">
          <div className="px-5 py-5">
            <Logo href="/dashboard" onDark />
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-3">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-3 py-2.5 text-[14px] font-semibold ${
                    active
                      ? "bg-yellow text-ink"
                      : "text-white/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-4">
            <p className="truncate text-[13px] font-semibold">{user.name}</p>
            <p className="truncate text-[12px] text-white/50">{user.email}</p>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="mt-3 text-[12px] font-semibold text-yellow hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ink/10 bg-yellow px-4 md:h-16 md:bg-[#F4F1E8] md:px-8">
            <div className="md:hidden">
              <Logo href="/dashboard" compact />
            </div>
            <p className="hidden text-[13px] text-muted md:block">
              Demostración local · sin pagos reales
            </p>
            <Link href="/" className="text-[13px] font-semibold text-ink/70">
              Ver sitio
            </Link>
          </header>
          <div className="flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-10">{children}</div>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-ink/10 bg-white/95 backdrop-blur md:hidden">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center py-2 text-[10px] font-bold uppercase tracking-[0.08em] ${
                active ? "text-ink" : "text-ink/45"
              }`}
            >
              <span
                className={`mb-1 h-1 w-6 rounded-full ${active ? "bg-yellow" : "bg-transparent"}`}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <WhatsAppButton />
    </div>
  );
}
