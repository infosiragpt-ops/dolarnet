"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flag } from "@/components/brand/Flag";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { RESIDENCE_CODES, getCountry, type CountryCode } from "@/lib/corridors";
import { useStore } from "@/lib/store";

export default function RegistroPage() {
  const router = useRouter();
  const { register } = useStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [country, setCountry] = useState<CountryCode | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!country) return;
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    const result = register({ country, name, email, password });
    if (result) {
      setError(result);
      return;
    }
    router.push("/verificar-cuenta");
  }

  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          Registro
        </p>
        <h1 className="mt-3 font-display text-[44px] leading-none">
          {step === 1
            ? "¿Cuál es tu país de residencia?"
            : "Completa los datos de tu cuenta"}
        </h1>
        <div className="mt-5 flex gap-2">
          <StepDot active={step === 1} done={step === 2} label="País" />
          <StepDot active={step === 2} done={false} label="Cuenta" />
        </div>

        {step === 1 ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {RESIDENCE_CODES.map((code) => {
              const item = getCountry(code);
              const selected = country === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCountry(code)}
                  className={`flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${
                    selected
                      ? "border-ink bg-ink text-white"
                      : "border-ink/10 bg-white hover:border-ink/25"
                  }`}
                >
                  <Flag code={code} size={36} />
                  <span>
                    <span className="block text-[17px] font-extrabold">
                      {item.name}
                    </span>
                    <span
                      className={`text-[13px] ${selected ? "text-white/60" : "text-muted"}`}
                    >
                      {item.currencyName}
                    </span>
                  </span>
                </button>
              );
            })}
            <div className="sm:col-span-2 mt-2">
              <Button
                type="button"
                size="lg"
                className="w-full sm:w-auto"
                disabled={!country}
                onClick={() => setStep(2)}
              >
                Continuar
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={onRegister}
            className="mt-8 rounded-[28px] border border-ink/10 bg-white p-6 sm:p-8"
          >
            <p className="mb-5 text-[13px] text-muted">
              Residencia:{" "}
              <button
                type="button"
                className="font-semibold text-ink underline"
                onClick={() => setStep(1)}
              >
                {country ? getCountry(country).name : "cambiar"}
              </button>
            </p>
            <Field label="Nombre completo">
              <input
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
            <div className="mt-4">
              <Field label="Email">
                <input
                  className={inputClass}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Contraseña">
                <input
                  className={inputClass}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field label="Confirmar contraseña">
                <input
                  className={inputClass}
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </Field>
            </div>
            {error ? (
              <p className="mt-4 text-[13px] font-semibold text-[#9B1C1C]">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="mt-6 w-full" size="lg">
              Registrarme
            </Button>
          </form>
        )}
      </div>
    </MarketingShell>
  );
}

function StepDot({
  active,
  done,
  label,
}: {
  active: boolean;
  done: boolean;
  label: string;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[12px] font-bold ${
        active || done ? "bg-ink text-white" : "bg-ink/8 text-ink/50"
      }`}
    >
      {label}
    </span>
  );
}
