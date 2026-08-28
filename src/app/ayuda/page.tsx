import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { FAQ } from "@/lib/faq";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ayuda",
  description:
    "Preguntas frecuentes sobre envíos Dolarnett, el cotizador en vivo y el estado de esta aplicación.",
};

export default function AyudaPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          Ayuda
        </p>
        <h1 className="mt-3 font-display text-[48px] leading-none">
          Preguntas que sí podemos responder
        </h1>
        <p className="mt-5 text-[16px] leading-7 text-muted">
          La página de ayuda en WordPress está vacía. Estas respuestas describen
          el producto tal como está construido aquí, sin plazos ni licencias
          inventadas.
        </p>
        <div className="mt-10 divide-y divide-ink/10 overflow-hidden rounded-[24px] border border-ink/10 bg-white">
          {FAQ.map((item) => (
            <details key={item.question} className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-[16px] font-bold tracking-[-0.01em]">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span className="text-ink/30 group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-[15px] text-muted">
          ¿No está tu caso?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-ink underline underline-offset-2"
          >
            Escríbenos por WhatsApp
          </a>
          .
        </p>
      </div>
    </MarketingShell>
  );
}
