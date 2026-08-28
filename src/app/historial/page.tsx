"use client";

import { Flag } from "@/components/brand/Flag";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { getCountry } from "@/lib/corridors";
import { formatDateTime, formatMoney, formatNumber } from "@/lib/format";
import { statusLabel } from "@/lib/status";
import { useStore } from "@/lib/store";

export default function HistorialPage() {
  const { transfers, updateTransferStatus } = useStore();

  return (
    <AppShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
            Operaciones
          </p>
          <h1 className="mt-2 font-display text-[40px] leading-none">Historial</h1>
        </div>
        <Button href="/transferencia">Nuevo envío</Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-[28px] border border-ink/10 bg-white">
        <div className="hidden grid-cols-12 gap-3 border-b border-ink/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/40 md:grid">
          <span className="col-span-3">Fecha</span>
          <span className="col-span-3">Destino</span>
          <span className="col-span-2">Envías</span>
          <span className="col-span-2">Recibe</span>
          <span className="col-span-2">Estado</span>
        </div>
        <ul>
          {transfers.map((tx) => (
            <li
              key={tx.id}
              className="grid gap-2 border-b border-ink/8 px-5 py-4 last:border-0 md:grid-cols-12 md:items-center"
            >
              <div className="md:col-span-3">
                <p className="text-[13px] font-semibold">{formatDateTime(tx.createdAt)}</p>
                <p className="text-[12px] text-muted">{tx.reference}</p>
              </div>
              <div className="flex items-center gap-2 md:col-span-3">
                <Flag code={tx.destinationCountry} size={22} />
                <div>
                  <p className="text-[14px] font-semibold">
                    {tx.beneficiary ?? getCountry(tx.destinationCountry).name}
                  </p>
                  <p className="text-[12px] text-muted">
                    {getCountry(tx.destinationCountry).name}
                  </p>
                </div>
              </div>
              <p className="text-[14px] font-extrabold md:col-span-2">
                {formatMoney(tx.sendAmount, "PEN")}
              </p>
              <p className="text-[14px] md:col-span-2">
                {formatNumber(tx.receiveAmount)} {tx.currency}
              </p>
              <div className="md:col-span-2">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em]">
                  {statusLabel(tx.status)}
                </p>
                {tx.status === "esperando_transferencia" ? (
                  <button
                    type="button"
                    className="mt-1 text-[12px] font-semibold underline"
                    onClick={() => updateTransferStatus(tx.id, "en_proceso")}
                  >
                    Marcar en proceso
                  </button>
                ) : null}
                {tx.status === "en_proceso" ? (
                  <button
                    type="button"
                    className="mt-1 text-[12px] font-semibold underline"
                    onClick={() => updateTransferStatus(tx.id, "entregada")}
                  >
                    Marcar entregada
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        {transfers.length === 0 ? (
          <p className="px-5 py-12 text-center text-[14px] text-muted">
            Aún no hay operaciones. El historial se guarda en este navegador.
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}
