"use client";

import { useState } from "react";
import { DestinationCombobox } from "@/components/calculator/DestinationCombobox";
import { Flag } from "@/components/brand/Flag";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, selectClass } from "@/components/ui/Field";
import { banksForCountry, getCountry, type CountryCode } from "@/lib/corridors";
import { useStore } from "@/lib/store";
import type { AccountType } from "@/lib/types";

export default function CuentasDestinosPage() {
  const { accounts, addAccount, removeAccount } = useStore();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<CountryCode>("EC");
  const [bank, setBank] = useState(banksForCountry("EC")[0]);
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState<AccountType>("ahorros");

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    addAccount({ country, bank, holder, number, type });
    setHolder("");
    setNumber("");
    setOpen(false);
  }

  return (
    <AppShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
            Beneficiarios
          </p>
          <h1 className="mt-2 font-display text-[40px] leading-none">
            Cuentas destino
          </h1>
        </div>
        <Button type="button" onClick={() => setOpen((v) => !v)}>
          {open ? "Cerrar" : "Agregar cuenta"}
        </Button>
      </div>

      {open ? (
        <form
          onSubmit={onAdd}
          className="mt-6 grid max-w-2xl gap-3 rounded-[28px] border border-ink/10 bg-white p-6 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/55">
              País
            </p>
            <DestinationCombobox
              value={country}
              onChange={(next) => {
                setCountry(next);
                setBank(banksForCountry(next)[0]);
              }}
            />
          </div>
          <Field label="Banco">
            <select
              className={selectClass}
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              {banksForCountry(country).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Titular">
            <input
              className={inputClass}
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
              required
            />
          </Field>
          <Field label="Número">
            <input
              className={inputClass}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
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
          <div className="flex items-end">
            <Button type="submit" className="w-full">
              Guardar
            </Button>
          </div>
        </form>
      ) : null}

      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {accounts.map((account) => (
          <li
            key={account.id}
            className="flex items-start gap-4 rounded-3xl border border-ink/10 bg-white p-5"
          >
            <Flag code={account.country} size={36} />
            <div className="min-w-0 flex-1">
              <p className="font-extrabold">{account.holder}</p>
              <p className="text-[14px] text-muted">
                {account.bank} · {getCountry(account.country).name}
              </p>
              <p className="mt-1 font-mono text-[13px]">{account.number}</p>
              <p className="text-[12px] uppercase tracking-[0.1em] text-ink/40">
                {account.type}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeAccount(account.id)}
              className="text-[12px] font-semibold text-ink/45 hover:text-ink"
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>
      {accounts.length === 0 ? (
        <p className="mt-10 text-[15px] text-muted">
          No hay cuentas destino en esta sesión. Agrega una para usarla en
          transferencias.
        </p>
      ) : null}
    </AppShell>
  );
}
