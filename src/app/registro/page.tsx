import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { isGoogleConfigured } from "@/lib/auth-env";
import { RegistroForm } from "./registro-form";

export default async function RegistroPage() {
  const session = await auth();
  if (session?.user?.email) redirect("/dashboard");

  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          Registro
        </p>
        <RegistroForm configured={isGoogleConfigured()} />
      </div>
    </MarketingShell>
  );
}
