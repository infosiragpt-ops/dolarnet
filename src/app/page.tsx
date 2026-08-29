import { Flag } from "@/components/brand/Flag";
import { QuoteCalculator } from "@/components/calculator/QuoteCalculator";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Button } from "@/components/ui/Button";
import { Stamp } from "@/components/ui/Stamp";
import { BANKS_SHOWN, getCountry, POPULAR_DESTINATION_CODES } from "@/lib/corridors";

export default function HomePage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden paper-grid">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-yellow/40 to-transparent" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <Stamp>Perú · envíos al mundo</Stamp>
            <h1 className="mt-5 max-w-xl font-display text-[44px] leading-[0.95] tracking-[-0.03em] text-ink sm:text-[64px]">
              Envía dinero rápido, fácil y barato
            </h1>
            <p className="mt-6 max-w-md text-[18px] leading-8 text-ink/75">
              <span className="font-semibold text-ink">
                La comisión más baja de mercado
              </span>
              <br />
              <span className="font-extrabold">Tipo de cambio real</span>
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
              Cotiza en soles, transfiere a Dolarnett y el destinatario recibe
              en cualquier país del mundo.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {POPULAR_DESTINATION_CODES.map((code) => {
                const country = getCountry(code);
                return (
                  <span
                    key={country.code}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-2.5 py-1.5 text-[12px] font-semibold"
                  >
                    <Flag code={country.code} size={22} />
                    {country.name}
                  </span>
                );
              })}
              <span className="inline-flex items-center rounded-full border border-ink/10 bg-paper-2 px-2.5 py-1.5 text-[12px] font-semibold text-ink/70">
                y más destinos
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/registro" size="lg">
                Regístrate ahora
              </Button>
              <Button href="#como-funciona" variant="line" size="lg">
                Cómo funciona
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <QuoteCalculator />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow">
            El flujo
          </p>
          <h2 className="mt-3 font-display text-[40px] leading-none sm:text-[52px]">
            ¿Cómo funciona?
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Cotiza tu envío",
                body: "Cotiza tu monto a enviar, y el país destino para recibir.",
              },
              {
                n: "02",
                title: "Transfiere a Dolarnett",
                body: "Transfiere a una de nuestras múltiples cuentas según prefieras.",
              },
              {
                n: "03",
                title: "Recibe el dinero",
                body: "Recibe el dinero en el país y cuenta destino.",
              },
            ].map((step) => (
              <article
                key={step.n}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="font-display text-[28px] text-yellow">{step.n}</p>
                <h3 className="mt-4 text-[20px] font-extrabold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-white/65">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Enviar dinero a la mejor tarifa
            </p>
            <h2 className="mt-3 font-display text-[40px] leading-none sm:text-[48px]">
              Tú eliges el banco
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-7 text-muted">
              Usa el banco que ya tienes. En la portada mostramos las entidades
              que el producto actual menciona con más frecuencia.
            </p>
          </div>
          <p className="md:col-span-5 md:text-right text-[13px] text-muted">
            Marcas listadas como referencia de destino. No es un ranking ni un
            endoso.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {BANKS_SHOWN.map((bank) => (
            <li
              key={bank}
              className="grid h-[84px] place-items-center rounded-2xl border border-ink/10 bg-white px-3 text-center text-[13px] font-extrabold tracking-[-0.02em]"
            >
              {bank}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-ink/10 bg-paper-2">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-[36px] leading-none">
              Empieza con una cotización clara
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-7 text-muted">
              Crea una cuenta de demostración, guarda una cuenta destino y
              recorre una transferencia sin mover dinero real.
            </p>
          </div>
          <Button href="/registro" size="lg">
            Regístrate ahora
          </Button>
        </div>
      </section>
    </MarketingShell>
  );
}
