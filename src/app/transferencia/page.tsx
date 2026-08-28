"use client";

import { useMemo, useState } from "react";
import { Flag } from "@/components/brand/Flag";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, selectClass } from "@/components/ui/Field";
import { Stamp } from "@/components/ui/Stamp";
import { BANKS_BY_COUNTRY, DESTINATION_CODES, getCountry, type CountryCode } from "@/lib/corridors";
import { DOLARNETT_DEPOSIT_ACCOUNTS } from "@/lib/demo-data";
import { formatMoney, formatNumber } from "@/lib/format";
import { quoteFromSoles, RATE_DISCLAIMER } from "@/lib/rates";
import { useStore } from "@/lib/store";
import type { AccountType } from "@/lib/types";

export default function TransferenciaPage() {
  const { accounts, addAccount, addTransfer } = useStore();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [amount, setAmount] = useState("800");
  const [destination, setDestination] = useState<CountryCode>("EC");
  const [accountId, setAccountId] = useState<string>("");
  const [holder, setHolder] = useState("");
  const [bank, setBank] = useState(BANKS_BY_COUNTRY.EC[0]);
  const [number, setNumber] = useState("");
  const [type, setType] = useState<AccountType>("ahorros");
  const [doneId, setDoneId] = useState<string | null>(null);

  const quote = useMemo(
    () => quoteFromSoles(Number(amount.replace(",", ".")) || 0, destination),
    [amount, destination],
  );
  const destAccounts = accounts.filter((a) => a.country === destination);
  const selected = accounts.find((a) => a.id === accountId);

  function continueToAccounts() {
    if (quote.sendAmount <= 0) return;
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
            <Stamp>Tarifa de ejemplo</Stamp>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {DESTINATION_CODES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setDestination(code);
                  setAccountId("");
                  setBank(BANKS_BY_COUNTRY[code][0]);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[13px] font-semibold ${
                  destination === code
                    ? "border-ink bg-ink text-white"
                    : "border-ink/10"
                }`}
              >
                <Flag code={code} size={18} />
                {getCountry(code).name}
              </button>
            ))}
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
          <dl className="mt-5 space-y-2 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-muted">Recibe</dt>
              <dd className="font-extrabold">
                {formatNumber(quote.receiveAmount)} {quote.currency}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Tipo de cambio</dt>
              <dd className="font-semibold">
                1 PEN = {formatNumber(quote.rate)} {quote.currency}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Comisión</dt>
              <dd className="font-semibold">{formatMoney(quote.commission, "PEN")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Monto total</dt>
              <dd className="font-extrabold">
                {formatMoney(quote.totalToTransfer, "PEN")}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-[12px] text-muted">{RATE_DISCLAIMER}</p>
          <Button type="button" className="mt-6 w-full" onClick={continueToAccounts}>
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
                  {BANKS_BY_COUNTRY[destination].map((item) => (
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
            Transfiere {formatMoney(quote.totalToTransfer, "PEN")} a una de estas
            cuentas de ejemplo. No son cuentas reales de cobro.
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
              Ya transferí (demo)
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
            En producción, Dolarnett confirmaría el depósito y acreditaría al
            destino. Aquí solo queda el registro local en el historial.
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
