export const ADMIN_EMAIL = "carrerajorge874@gmail.com";
export const RESIDENCE_COOKIE = "dolarnett.residence";

export type UserRole = "admin" | "user";

export function googleClientId() {
  return process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "";
}

export function googleClientSecret() {
  return (
    process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || ""
  );
}

export function isGoogleConfigured() {
  const id = googleClientId().trim();
  const secret = googleClientSecret().trim();
  if (!id || !secret) return false;
  if (id.startsWith("your-") || secret.startsWith("your-")) return false;
  if (id === "placeholder" || secret === "placeholder") return false;
  return true;
}

export function authSecret() {
  return (
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "insecure-build-placeholder-set-AUTH_SECRET"
  );
}

export function roleForEmail(email?: string | null): UserRole {
  return email?.trim().toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
}
