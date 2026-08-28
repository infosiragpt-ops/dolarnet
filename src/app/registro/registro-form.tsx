"use client";

import { useState } from "react";
import { Flag } from "@/components/brand/Flag";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/Button";
import { RESIDENCE_CODES, getCountry, type CountryCode } from "@/lib/corridors";

export function RegistroForm({ configured }: { configured: boolean }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [country, setCountry] = useState<CountryCode | null>(null);

  return (
    <>
      <h1 className="mt-3 font-display text-[44px] leading-none">
        {step === 1
          ? "¿Cuál es tu país de residencia?"
          : "Crea tu cuenta con Google"}
      </h1>
      <div className="mt-5 flex gap-2">
        <span
          className={`rounded-full px-3 py-1 text-[12px] font-bold ${
            step === 1 || step === 2 ? "bg-ink text-white" : "bg-ink/8 text-ink/50"
          }`}
        >
          País
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[12px] font-bold ${
            step === 2 ? "bg-ink text-white" : "bg-ink/8 text-ink/50"
          }`}
        >
          Google
        </span>
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
        <div className="mt-8 rounded-[28px] border border-ink/10 bg-white p-6 sm:p-8">
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
          <p className="mb-5 text-[15px] leading-7 text-muted">
            El registro usa la misma cuenta de Google. No hay usuario y
            contraseña locales.
          </p>
          <GoogleButton configured={configured} country={country} />
        </div>
      )}
    </>
  );
}
