import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { authErrorMessage } from "@/lib/auth-errors";
import { isGoogleConfigured } from "@/lib/auth-env";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const session = await auth();
  if (session?.user?.email) redirect("/dashboard");

  const params = await searchParams;
  const message = authErrorMessage(params.error);

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
            Inicia sesión con Google. La cuenta{" "}
            <span className="font-semibold text-ink">
              carrerajorge874@gmail.com
            </span>{" "}
            entra como administrador. Otras cuentas de Google quedan como
            usuarios.
          </p>
        </div>
        <div className="rounded-[28px] border border-ink/10 bg-white p-6 shadow-[0_20px_60px_rgba(16,24,32,0.08)] sm:p-8">
          <GoogleButton configured={isGoogleConfigured()} />
          {message ? (
            <p className="mt-4 text-[13px] font-semibold leading-6 text-[#9B1C1C]">
              {message}
            </p>
          ) : null}
          <p className="mt-6 text-center text-[13px] text-muted">
            ¿Primera vez?{" "}
            <a href="/registro" className="font-semibold text-ink underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </MarketingShell>
  );
}
