"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { isGoogleConfigured, RESIDENCE_COOKIE } from "@/lib/auth-env";
import type { CountryCode } from "@/lib/corridors";
import { isResidenceCode } from "@/lib/corridors";

function asCountry(value: FormDataEntryValue | null): CountryCode | null {
  const code = String(value ?? "");
  return isResidenceCode(code) ? code : null;
}

export async function continueWithGoogle(formData?: FormData) {
  if (!isGoogleConfigured()) {
    redirect("/login?error=config");
  }

  const country = asCountry(formData?.get("country") ?? null);
  if (country) {
    const jar = await cookies();
    jar.set(RESIDENCE_COOKIE, country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
