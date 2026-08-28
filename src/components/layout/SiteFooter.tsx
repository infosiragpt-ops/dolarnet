import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { WHATSAPP_URL } from "@/lib/constants";

const FOOTER_NAV = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/ayuda", label: "Ayuda" },
  { href: "/login", label: "Iniciar sesión" },
  { href: "/registro", label: "Regístrate" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo onDark href="/" />
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-white/70">
            Envíos internacionales de dinero entre Perú, Ecuador, Chile,
            Colombia y México. Cotiza, transfiere a Dolarnett y recibe en la
            cuenta destino.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-yellow">
            Sitio
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px] text-white/75">
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-yellow">
            Contacto
          </p>
          <p className="mt-4 text-[14px] leading-7 text-white/75">
            Atención por WhatsApp, el mismo canal del sitio actual.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-[14px] font-semibold text-yellow hover:text-white"
          >
            Escribir a Dolarnett
          </a>
          <p className="mt-8 text-[12px] leading-6 text-white/45">
            Esta aplicación no afirma autorización, licencia ni registro de un
            supervisor. El sitio en producción sigue en WordPress hasta el
            despliegue de este código.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[12px] text-white/40 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Dolarnett</p>
          <p>Hecho para seguir programándose. No es un tema de WordPress.</p>
        </div>
      </div>
    </footer>
  );
}
