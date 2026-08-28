import { continueWithGoogle } from "@/lib/auth-actions";
import type { CountryCode } from "@/lib/corridors";

type GoogleButtonProps = {
  configured: boolean;
  country?: CountryCode | null;
  label?: string;
};

export function GoogleButton({
  configured,
  country,
  label = "Continuar con Google",
}: GoogleButtonProps) {
  if (!configured) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          disabled
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-white text-[15px] font-semibold text-ink/40"
        >
          <GoogleMark />
          {label}
        </button>
        <p className="text-[13px] leading-6 text-[#9B1C1C]">
          Google OAuth no está configurado. Agrega{" "}
          <code className="font-mono">AUTH_GOOGLE_ID</code> y{" "}
          <code className="font-mono">AUTH_GOOGLE_SECRET</code> en{" "}
          <code className="font-mono">.env.local</code> (ver{" "}
          <code className="font-mono">.env.example</code>).
        </p>
      </div>
    );
  }

  return (
    <form action={continueWithGoogle}>
      {country ? <input type="hidden" name="country" value={country} /> : null}
      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-semibold text-white transition hover:bg-ink/90"
      >
        <GoogleMark />
        {label}
      </button>
    </form>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.71A5.41 5.41 0 0 1 3.69 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
