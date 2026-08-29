import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { getCountry, POPULAR_DESTINATION_CODES } from "@/lib/corridors";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Dolarnett es un servicio peruano de envíos internacionales de dinero desde soles hacia cualquier país del mundo.",
};

export default function NosotrosPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          Nosotros
        </p>
        <h1 className="mt-3 font-display text-[48px] leading-[0.95]">
          Envíos internacionales de dinero, desde Perú.
        </h1>
        <p className="mt-6 text-[18px] leading-8 text-ink/80">
          Dolarnett existe para mover dinero desde Perú hacia cualquier país,
          con una cotización que se entiende de un vistazo: cuánto envías en
          soles, cuánto llega y cuánto pagas de comisión.
        </p>
        <p className="mt-5 text-[16px] leading-8 text-muted">
          El sitio público actual vive en WordPress y se siente a medias. Esta
          aplicación es el reemplazo en código propio: las mismas frases de
          marca, el mismo flujo de tres pasos y un panel que ya se puede usar
          para seguir programando el producto. No es un tema comercial
          disfrazado.
        </p>

        <h2 className="mt-12 font-display text-[32px]">Qué hacemos</h2>
        <p className="mt-4 text-[16px] leading-8 text-muted">
          Cotizas un envío, transfieres el total a una cuenta de Dolarnett y el
          destinatario recibe en su banco. Tú eliges el banco. Nosotros no
          pedimos que cambies de app para cada corredor.
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {POPULAR_DESTINATION_CODES.map((code) => {
            const country = getCountry(code);
            return (
              <li
                key={country.code}
                className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[14px] font-semibold"
              >
                {country.name}
                <span className="ml-2 font-normal text-muted">
                  {country.currency} · {country.currencyName}
                </span>
              </li>
            );
          })}
          <li className="rounded-2xl border border-dashed border-ink/15 bg-paper-2 px-4 py-3 text-[14px] font-semibold">
            Cualquier otro país
            <span className="ml-2 font-normal text-muted">
              búscalo en el cotizador
            </span>
          </li>
        </ul>

        <h2 className="mt-12 font-display text-[32px]">Lo que no afirmamos</h2>
        <p className="mt-4 text-[16px] leading-8 text-muted">
          Esta página no publica un sello de autorización, una licencia, un
          número de clientes ni testimonios. El WordPress de{" "}
          <a
            href="https://dolarnett.com/nosotros/"
            className="font-semibold text-ink underline underline-offset-2"
          >
            dolarnett.com/nosotros
          </a>{" "}
          está vacío; preferimos texto honesto a un párrafo inventado de
          cumplimiento.
        </p>
        <p className="mt-4 text-[16px] leading-8 text-muted">
          Cuando el producto de producción tenga el marco legal que
          corresponda, se escribirá con precisión. Hasta entonces, trata esta
          web como el frente de un producto en construcción.
        </p>

        <h2 className="mt-12 font-display text-[32px]">Cómo hablar con nosotros</h2>
        <p className="mt-4 text-[16px] leading-8 text-muted">
          El canal que ya está en el sitio en vivo es WhatsApp. Si tienes una
          operación o una duda sobre un corredor, ese es el lugar.
        </p>
        <p className="mt-6">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-ink underline underline-offset-4"
          >
            Abrir conversación en WhatsApp
          </a>
        </p>
      </article>
    </MarketingShell>
  );
}
