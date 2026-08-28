"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/demo-data";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginDemo } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = login(email, password);
    if (result) {
      setError(result);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <MarketingShell>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
            Acceso
          </p>
          <h1 className="mt-3 font-display text-[48px] leading-none">
            Entra a tu mesa de envíos
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-7 text-muted">
            Sesión local en este navegador. No hay un servidor de autenticación
            todavía: sirve para recorrer el panel y seguir programando.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-[28px] border border-ink/10 bg-white p-6 shadow-[0_20px_60px_rgba(16,24,32,0.08)] sm:p-8"
        >
          <Field label="Correo">
            <input
              className={inputClass}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <div className="mt-4">
            <Field label="Contraseña">
              <input
                className={inputClass}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
          </div>
          {error ? (
            <p className="mt-4 text-[13px] font-semibold text-[#9B1C1C]">{error}</p>
          ) : null}
          <Button type="submit" className="mt-6 w-full" size="lg">
            Iniciar sesión
          </Button>
          <button
            type="button"
            className="mt-3 w-full text-center text-[13px] font-semibold text-ink/70 underline underline-offset-2"
            onClick={() => {
              loginDemo();
              router.push("/dashboard");
            }}
          >
            Entrar con cuenta de demostración
          </button>
          <p className="mt-4 text-center text-[12px] text-muted">
            Demo: {DEMO_EMAIL} · {DEMO_PASSWORD}
          </p>
          <p className="mt-6 text-center text-[13px] text-muted">
            ¿No tienes cuenta?{" "}
            <a href="/registro" className="font-semibold text-ink underline">
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </MarketingShell>
  );
}
