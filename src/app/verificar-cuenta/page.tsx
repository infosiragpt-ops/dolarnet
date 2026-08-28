"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, selectClass } from "@/components/ui/Field";
import { useSession } from "next-auth/react";
import { DEMO_NOTICE } from "@/lib/constants";
import { useStore } from "@/lib/store";
import type { DocumentType } from "@/lib/types";

export default function VerificarCuentaPage() {
  const { data: session } = useSession();
  const { profile, updateProfile } = useStore();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [code, setCode] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>(
    profile?.documentType ?? "DNI",
  );
  const [documentNumber, setDocumentNumber] = useState(
    profile?.documentNumber ?? "",
  );
  const [name, setName] = useState(profile?.name ?? session?.user?.name ?? "");
  const [error, setError] = useState<string | null>(null);

  const complete = Boolean(profile?.phoneVerified && profile?.profileComplete);

  function nextPhone() {
    if (phone.replace(/\D/g, "").length < 8) {
      setError("Ingresa un número de celular válido.");
      return;
    }
    setError(null);
    updateProfile({ phone });
    setStep(2);
  }

  function nextCode() {
    if (code.trim().length < 4) {
      setError("Ingresa el código de demostración (cualquier 4+ dígitos).");
      return;
    }
    setError(null);
    updateProfile({ phoneVerified: true });
    setStep(3);
  }

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (documentNumber.trim().length < 6) {
      setError("Ingresa un número de documento.");
      return;
    }
    updateProfile({
      name: name.trim() || profile?.name || session?.user?.name || undefined,
      documentType,
      documentNumber: documentNumber.trim(),
      profileComplete: true,
    });
    router.push("/dashboard");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          Verificar cuenta
        </p>
        <h1 className="mt-2 font-display text-[40px] leading-none">
          {complete ? "Tu cuenta ya está verificada en esta demo" : titleFor(step)}
        </h1>
        <p className="mt-4 text-[14px] leading-6 text-muted">{DEMO_NOTICE}</p>

        {complete ? (
          <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-6">
            <p className="text-[15px] font-semibold">
              {profile?.name || session?.user?.name}
            </p>
            <p className="mt-1 text-[14px] text-muted">{session?.user?.email}</p>
            <p className="mt-1 text-[14px] text-muted">{profile?.phone}</p>
            <p className="mt-1 text-[14px] text-muted">
              {profile?.documentType} {profile?.documentNumber}
            </p>
            <Button href="/dashboard" className="mt-6">
              Volver al panel
            </Button>
          </div>
        ) : (
          <div className="mt-8 rounded-[28px] border border-ink/10 bg-white p-6">
            {step === 1 ? (
              <>
                <Field label="Número de celular" hint="Incluye código de país, por ejemplo +51.">
                  <input
                    className={inputClass}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    placeholder="+51 900 000 000"
                  />
                </Field>
                {error ? <ErrorText>{error}</ErrorText> : null}
                <Button type="button" className="mt-6 w-full" onClick={nextPhone}>
                  Siguiente
                </Button>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <Field
                  label="Código"
                  hint="En producción llegaría por SMS. Aquí acepta cualquier código de 4 o más dígitos."
                >
                  <input
                    className={inputClass}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    inputMode="numeric"
                    placeholder="0000"
                  />
                </Field>
                {error ? <ErrorText>{error}</ErrorText> : null}
                <Button type="button" className="mt-6 w-full" onClick={nextCode}>
                  Siguiente
                </Button>
              </>
            ) : null}

            {step === 3 ? (
              <form onSubmit={saveProfile}>
                <Field label="Nombre completo">
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Field>
                <div className="mt-4">
                  <Field label="Tipo de documento">
                    <select
                      className={selectClass}
                      value={documentType}
                      onChange={(e) =>
                        setDocumentType(e.target.value as DocumentType)
                      }
                    >
                      <option value="DNI">DNI</option>
                      <option value="CE">C.E</option>
                    </select>
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Número de documento">
                    <input
                      className={inputClass}
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      required
                    />
                  </Field>
                </div>
                {error ? <ErrorText>{error}</ErrorText> : null}
                <Button type="submit" className="mt-6 w-full">
                  Guardar
                </Button>
              </form>
            ) : null}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function titleFor(step: 1 | 2 | 3) {
  if (step === 1) return "Ingresa tu número de celular";
  if (step === 2) return "Ingresa código";
  return "Completa tu información personal";
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[13px] font-semibold text-[#9B1C1C]">{children}</p>;
}
