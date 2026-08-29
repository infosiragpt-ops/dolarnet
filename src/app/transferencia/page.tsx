"use client";

import { useMemo, useState } from "react";
import { DestinationCombobox } from "@/components/calculator/DestinationCombobox";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, selectClass } from "@/components/ui/Field";
import { Stamp } from "@/components/ui/Stamp";
import { banksForCountry, getCountry, type CountryCode } from "@/lib/corridors";
import { DOLARNETT_DEPOSIT_ACCOUNTS } from "@/lib/demo-data";
import { formatDateTime, formatMoney, formatNumber, formatRate } from "@/lib/format";
import {
  missingRateMessage,
  quoteFromSoles,
  RATE_DISCLAIMER,
  rateFor,
} from "@/lib/rates";
import { useRates } from "@/lib/use-rates";
import { useStore } from "@/lib/store";
import type { AccountType } from "@/lib/types";

export default function TransferenciaPage() {
  const { accounts, addAccount, addTransfer } = useStore();
  const rates = useRates();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [amount, setAmount] = useState("800");
  const [destination, setDestination] = useState<CountryCode>("EC");
  const [accountId, setAccountId] = useState<string>("");
  const [holder, setHolder] = useState("");
  const [bank, setBank] = useState(banksForCountry("EC")[0]);
  const [number, setNumber] = useState("");
  const [type, setType] = useState<AccountType>("ahorros");
  const [doneId, setDoneId] = useState<string | null>(null);

  const live = rates.status === "ready" ? rateFor(rates.data, destination) : null;
  const liveRate = live?.rate ?? 0;
  const commission =
    rates.status === "ready" ? rates.data.commissionPen : 0;
  const quote = useMemo(
    () =>
      quoteFromSoles(
        Number(amount.replace(",", ".")) || 0,
        destination,
        liveRate,
        commission,
      ),
    [amount, destination, liveRate, commission],
  );
  const quoteReady = Boolean(live);
  const missingCurrency = rates.status === "ready" && !live;
  const destAccounts = accounts.filter((a) => a.country === destination);
  const selected = accounts.find((a) => a.id === accountId);

  function continueToAccounts() {
    if (!quoteReady || quote.sendAmount <= 0) return;
    setStep(2);
  }

  function continueToDeposit() {
    if (selected) {
      setStep(3);
      return;
    }
    if (!holder || !number) return;
    const created = addAccount({
      country: destination,
      bank,
      holder,
      number,
      type,
    });
    setAccountId(created.id);
    setStep(3);
  }

  function confirm() {
    const account = accounts.find((a) => a.id === accountId);
    const created = addTransfer({
      destinationCountry: destination,
      sendAmount: quote.sendAmount,
      receiveAmount: quote.receiveAmount,
      currency: quote.currency,
      commission: quote.commission,
      total: quote.totalToTransfer,
      rate: quote.rate,
      accountId: account?.id,
      beneficiary: account?.holder,
      status: "esperando_transferencia",
    });
    setDoneId(created.id);
    setStep(4);
  }

  return (
    <AppShell>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
        Transferencia
      </p>
      <h1 className="mt-2 font-display text-[40px] leading-none">Nuevo envío</h1>
      <ol className="mt-5 flex flex-wrap gap-2 text-[12px] font-bold">
        {["Cotiza", "Cuenta destino", "Paga a Dolarnett", "Listo"].map(
          (label, i) => (
            <li
              key={label}
              className={`rounded-full px-3 py-1 ${
                step === i + 1 ? "bg-ink text-white" : "bg-white text-ink/50"
              }`}
            >
              {i + 1}. {label}
            </li>
          ),
        )}
      </ol>

      {step === 1 ? (
        <div className="mt-8 max-w-xl rounded-[28px] border border-ink/10 bg-white p-6">
          <div className="flex justify-between">
            <p className="text-[13px] font-semibold text-muted">País destino</p>
            <Stamp>Referencia</Stamp>
          </div>
          <div className="mt-3">
            <DestinationCombobox
              value={destination}
              onChange={(code) => {
                setDestination(code);
                setAccountId("");
                setBank(banksForCountry(code)[0]);
              }}
            />
          </div>
          <div className="mt-5">
            <Field label="Envías (soles)">
              <input
                className={inputClass}
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                inputMode="decimal"
              />
            </Field>
          </div>
          {rates.status === "error" ? (
            <div className="mt-5 rounded-2xl border border-[#9B1C1C]/20 bg-[#9B1C1C]/5 px-4 py-4">
              <p className="text-[14px] font-semibold text-[#9B1C1C]">
                No hay tipo de cambio disponible
              </p>
              <p className="mt-1 text-[13px] text-muted">{rates.message}</p>
              <Button type="button" variant="line" className="mt-3" onClick={rates.reload}>
                Reintentar
              </Button>
            </div>
          ) : missingCurrency ? (
            <div className="mt-5 rounded-2xl border border-[#9B1C1C]/20 bg-[#9B1C1C]/5 px-4 py-4">
              <p className="text-[14px] font-semibold text-[#9B1C1C]">
                No hay tipo de cambio de referencia de mercado
              </p>
              <p className="mt-1 text-[13px] text-muted">
                {missingRateMessage(destination)}
              </p>
            </div>
          ) : (
            <dl className="mt-5 space-y-2 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-muted">Recibe</dt>
                <dd className="font-extrabold">
                  {quoteReady
                    ? `${formatNumber(quote.receiveAmount)} ${quote.currency}`
                    : "Cargando…"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Tipo de cambio de referencia de mercado</dt>
                <dd className="font-semibold">
                  {quoteReady
                    ? `1 PEN = ${formatRate(quote.rate)} ${quote.currency}`
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Comisión</dt>
                <dd className="font-semibold">
                  {quoteReady ? formatMoney(quote.commission, "PEN") : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Monto total</dt>
                <dd className="font-extrabold">
                  {quoteReady ? formatMoney(quote.totalToTransfer, "PEN") : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Actualizado</dt>
                <dd className="text-[13px] font-semibold">
                  {rates.status === "ready"
                    ? formatDateTime(rates.data.updatedAt)
                    : "…"}
                </dd>
              </div>
            </dl>
          )}
          <p className="mt-3 text-[12px] text-muted">{RATE_DISCLAIMER}</p>
          <Button
            type="button"
            className="mt-6 w-full"
            onClick={continueToAccounts}
            disabled={!quoteReady || quote.sendAmount <= 0}
          >
            Continuar
          </Button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-8 max-w-xl rounded-[28px] border border-ink/10 bg-white p-6">
          <h2 className="text-[18px] font-extrabold">
            ¿A qué cuenta llega en {getCountry(destination).name}?
          </h2>
          {destAccounts.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {destAccounts.map((account) => (
                <li key={account.id}>
                  <button
                    type="button"
                    onClick={() => setAccountId(account.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left ${
                      accountId === account.id
                        ? "border-ink bg-paper-2"
                        : "border-ink/10"
                    }`}
                  >
                    <p className="font-semibold">{account.holder}</p>
                    <p className="text-[13px] text-muted">
                      {account.bank} · {account.number}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-[14px] text-muted">
              No hay cuentas guardadas para este país. Agrégala abajo.
            </p>
          )}
          <div className="mt-6 border-t border-ink/10 pt-5">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink/40">
              Nueva cuenta
            </p>
            <div className="mt-3 grid gap-3">
              <Field label="Titular">
                <input
                  className={inputClass}
                  value={holder}
                  onChange={(e) => {
                    setHolder(e.target.value);
                    setAccountId("");
                  }}
                />
              </Field>
              <Field label="Banco">
                <select
                  className={selectClass}
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                >
                  {banksForCountry(destination).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>
              <Field label="Número de cuenta">
                <input
                  className={inputClass}
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Field>
              <Field label="Tipo">
                <select
                  className={selectClass}
                  value={type}
                  onChange={(e) => setType(e.target.value as AccountType)}
                >
                  <option value="ahorros">Ahorros</option>
                  <option value="corriente">Corriente</option>
                </select>
              </Field>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button type="button" variant="line" onClick={() => setStep(1)}>
              Volver
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={continueToDeposit}
              disabled={!selected && !(holder && number)}
            >
              Continuar
            </Button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-8 max-w-xl rounded-[28px] border border-ink/10 bg-white p-6">
          <h2 className="text-[18px] font-extrabold">Transfiere a Dolarnett</h2>
          <p className="mt-2 text-[14px] leading-6 text-muted">
            Transfiere {formatMoney(quote.totalToTransfer, "PEN")} a una cuenta
            de Dolarnett. Estas son cuentas de cobro de referencia para el
            flujo; confirma el número vigente antes de depositar.
          </p>
          <ul className="mt-5 space-y-3">
            {DOLARNETT_DEPOSIT_ACCOUNTS.map((item) => (
              <li
                key={item.bank}
                className="rounded-2xl border border-ink/10 bg-paper px-4 py-3"
              >
                <p className="font-extrabold">{item.bank}</p>
                <p className="mt-1 text-[13px] text-muted">{item.holder}</p>
                <p className="text-[13px] font-semibold">{item.number}</p>
                <p className="text-[12px] text-muted">CCI {item.cci}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            <Button type="button" variant="line" onClick={() => setStep(2)}>
              Volver
            </Button>
            <Button type="button" className="flex-1" onClick={confirm}>
              Ya transferí
            </Button>
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="mt-8 max-w-xl rounded-[28px] border border-ink/10 bg-white p-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-success">
            Registrada
          </p>
          <h2 className="mt-2 font-display text-[32px] leading-none">
            Envío {doneId ? "en espera de acreditación" : "creado"}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-muted">
            Quedó registrada en tu historial con el tipo de cambio de
            referencia usado en esta cotización. La acreditación en destino
            depende de que el depósito se confirme.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button href="/historial">Ver historial</Button>
            <Button href="/dashboard" variant="line">
              Ir al panel
            </Button>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
