"use client";

import Link from "next/link";
import { Flag } from "@/components/brand/Flag";
import { QuoteCalculator } from "@/components/calculator/QuoteCalculator";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { getCountry } from "@/lib/corridors";
import { formatDate, formatMoney } from "@/lib/format";
import { useSession } from "next-auth/react";
import { useStore } from "@/lib/store";
import { statusLabel } from "@/lib/status";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { profile, transfers, accounts } = useStore();
  const latest = transfers[0];
  const verified = Boolean(profile?.phoneVerified && profile?.profileComplete);
  const firstName =
    session?.user?.name?.split(" ")[0] ||
    session?.user?.email?.split("@")[0] ||
    "ahí";

  return (
    <AppShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
            Panel
          </p>
          <h1 className="mt-2 font-display text-[40px] leading-none">
            Hola, {firstName}
          </h1>
        </div>
        <Button href="/transferencia">Nueva transferencia</Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <section className="rounded-3xl border border-ink/10 bg-white p-5 lg:col-span-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink/40">
            Estado de cuenta
          </p>
          <p className="mt-3 text-[18px] font-extrabold">
            {verified ? "Perfil completo" : "Pendiente de verificar"}
          </p>
          <p className="mt-2 text-[14px] leading-6 text-muted">
            {verified
              ? "Puedes cotizar con el tipo de cambio de referencia y registrar un envío."
              : "Completa celular y documento para marcar la cuenta como lista."}
          </p>
          {!verified ? (
            <Button href="/verificar-cuenta" variant="line" className="mt-4" size="sm">
              Verificar ahora
            </Button>
          ) : null}
        </section>
        <section className="rounded-3xl border border-ink/10 bg-white p-5 lg:col-span-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink/40">
            Cuentas destino
          </p>
          <p className="mt-3 font-display text-[40px] leading-none">
            {accounts.length}
          </p>
          <p className="mt-2 text-[14px] text-muted">
            {accounts.length === 0
              ? "Aún no guardas un beneficiario."
              : "Listas para reutilizar en el próximo envío."}
          </p>
          <Link
            href="/cuentas-destinos"
            className="mt-4 inline-block text-[13px] font-semibold underline"
          >
            Administrar cuentas
          </Link>
        </section>
        <section className="rounded-3xl bg-navy p-5 text-white lg:col-span-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/40">
            Última operación
          </p>
          {latest ? (
            <>
              <p className="mt-3 text-[18px] font-extrabold">
                {formatMoney(latest.sendAmount, "PEN")} →{" "}
                {getCountry(latest.destinationCountry).name}
              </p>
              <p className="mt-2 text-[13px] text-white/60">
                {statusLabel(latest.status)} · {latest.reference}
              </p>
            </>
          ) : (
            <p className="mt-3 text-[15px] text-white/70">
              Todavía no hay envíos en esta sesión.
            </p>
          )}
        </section>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <QuoteCalculator
            compact
            ctaHref="/transferencia"
            ctaLabel="Continuar envío"
          />
        </div>
        <section className="rounded-3xl border border-ink/10 bg-white p-5 lg:col-span-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold">Actividad reciente</h2>
            <Link href="/historial" className="text-[13px] font-semibold underline">
              Ver todo
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-ink/8">
            {transfers.slice(0, 4).map((tx) => (
              <li key={tx.id} className="flex items-center gap-3 py-3">
                <Flag code={tx.destinationCountry} size={28} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold">
                    {tx.beneficiary ?? getCountry(tx.destinationCountry).name}
                  </p>
                  <p className="text-[12px] text-muted">{formatDate(tx.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-extrabold">
                    {formatMoney(tx.sendAmount, "PEN")}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/45">
                    {statusLabel(tx.status)}
                  </p>
                </div>
              </li>
            ))}
            {transfers.length === 0 ? (
              <li className="py-8 text-center text-[14px] text-muted">
                Cotiza y confirma un envío de demostración para verlo aquí.
              </li>
            ) : null}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
