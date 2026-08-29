"use client";

import { DestinationCombobox } from "@/components/calculator/DestinationCombobox";
import { Button } from "@/components/ui/Button";
import { Stamp } from "@/components/ui/Stamp";
import { getCountry, type CountryCode } from "@/lib/corridors";
import { currencyFractionDigits } from "@/lib/currencies";
import { formatDateTime, formatMoney, formatNumber, formatRate } from "@/lib/format";
import {
  missingRateMessage,
  quoteFromSoles,
  RATE_DISCLAIMER,
  rateFor,
} from "@/lib/rates";
import { useRates } from "@/lib/use-rates";
import { useState } from "react";

type QuoteCalculatorProps = {
  ctaHref?: string;
  ctaLabel?: string;
  compact?: boolean;
};

export function QuoteCalculator({
  ctaHref = "/registro",
  ctaLabel = "Regístrate ahora",
  compact = false,
}: QuoteCalculatorProps) {
  const [amount, setAmount] = useState("1000");
  const [destination, setDestination] = useState<CountryCode>("EC");
  const rates = useRates();
  const sendAmount = Number(amount.replace(",", ".")) || 0;
  const dest = getCountry(destination);
  const live = rates.status === "ready" ? rateFor(rates.data, destination) : null;
  const liveRate = live?.rate ?? 0;
  const commission = rates.status === "ready" ? rates.data.commissionPen : 0;
  const quote = quoteFromSoles(sendAmount, destination, liveRate, commission);
  const ready = Boolean(live);
  const missingCurrency = rates.status === "ready" && !live;

  return (
    <section
      className={`relative overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-[0_24px_80px_rgba(16,24,32,0.10)] ${
        compact ? "p-5" : "p-5 sm:p-7"
      }`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow/50 blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">
            Cotizador
          </p>
          <h2 className="mt-1 font-display text-[26px] leading-none text-ink">
            Envías soles, recibe {dest.currencyShort}
          </h2>
        </div>
        <Stamp>Referencia</Stamp>
      </div>

      <div className="relative mt-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/50">
          Destino
        </p>
        <div className="mt-2">
          <DestinationCombobox value={destination} onChange={setDestination} />
        </div>
      </div>

      {rates.status === "error" ? (
        <div className="relative mt-5 rounded-2xl border border-[#9B1C1C]/20 bg-[#9B1C1C]/5 px-4 py-4">
          <p className="text-[14px] font-semibold text-[#9B1C1C]">
            No hay tipo de cambio disponible
          </p>
          <p className="mt-1 text-[13px] leading-6 text-muted">{rates.message}</p>
          <Button type="button" variant="line" className="mt-3" onClick={rates.reload}>
            Reintentar
          </Button>
        </div>
      ) : missingCurrency ? (
        <div className="relative mt-5 rounded-2xl border border-[#9B1C1C]/20 bg-[#9B1C1C]/5 px-4 py-4">
          <p className="text-[14px] font-semibold text-[#9B1C1C]">
            No hay tipo de cambio de referencia de mercado
          </p>
          <p className="mt-1 text-[13px] leading-6 text-muted">
            {missingRateMessage(destination)}
          </p>
        </div>
      ) : (
        <>
          <div className="relative mt-5 grid gap-3">
            <label className="rounded-2xl border border-ink/10 bg-paper px-4 py-3">
              <span className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">
                Envías
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] tracking-[0.12em] text-ink/70">
                  Soles · PEN
                </span>
              </span>
              <input
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                className="mt-1 w-full bg-transparent font-display text-[40px] leading-none tracking-[-0.03em] text-ink outline-none"
                aria-label="Monto a enviar en soles"
              />
            </label>

            <div className="flex justify-center">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-yellow text-ink">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M8 2v12M4 10l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-navy px-4 py-3 text-white">
              <span className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
                Recibe
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] tracking-[0.12em] text-white/80">
                  {dest.currencyName} · {dest.currency}
                </span>
              </span>
              <p className="mt-1 font-display text-[40px] leading-none tracking-[-0.03em]">
                {ready
                  ? formatNumber(
                      quote.receiveAmount,
                      currencyFractionDigits(dest.currency),
                    )
                  : "—"}
              </p>
            </div>
          </div>

          <dl className="relative mt-5 divide-y divide-ink/8 rounded-2xl border border-ink/10 bg-paper-2">
            <Row
              label="Tipo de cambio de referencia de mercado"
              value={
                ready
                  ? `1 PEN = ${formatRate(quote.rate)} ${dest.currency}`
                  : "Cargando…"
              }
            />
            <Row
              label="Comisión"
              value={ready ? formatMoney(quote.commission, "PEN") : "—"}
            />
            <Row
              label="Monto total"
              value={ready ? formatMoney(quote.totalToTransfer, "PEN") : "—"}
              strong
            />
            <Row
              label="Actualizado"
              value={
                rates.status === "ready"
                  ? formatDateTime(rates.data.updatedAt)
                  : "…"
              }
            />
          </dl>
        </>
      )}

      <p className="relative mt-3 text-[12px] leading-5 text-muted">{RATE_DISCLAIMER}</p>

      <div className="relative mt-5">
        <Button href={ctaHref} className="w-full" size="lg">
          {ctaLabel}
        </Button>
        {!compact ? (
          <p className="mt-3 text-center text-[13px] text-muted">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="font-semibold text-ink underline underline-offset-2">
              Inicia sesión
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd
        className={`text-right text-[14px] ${strong ? "font-extrabold text-ink" : "font-semibold text-ink"}`}
      >
        {value}
      </dd>
    </div>
  );
}
