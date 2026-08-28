import { MarketingShell } from "@/components/layout/MarketingShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          404
        </p>
        <h1 className="mt-3 font-display text-[48px] leading-none">
          Esta página no existe
        </h1>
        <p className="mt-4 text-[16px] text-muted">
          Vuelve al inicio o abre el cotizador.
        </p>
        <Button href="/" className="mt-8">
          Ir al inicio
        </Button>
      </div>
    </MarketingShell>
  );
}
