export const ADMIN_EMAIL = "carrerajorge874@gmail.com";
export const RESIDENCE_COOKIE = "dolarnett.residence";

export type UserRole = "admin" | "user";

/** Auth.js Google client id (`AUTH_GOOGLE_ID` only). */
export function googleClientId() {
  return process.env.AUTH_GOOGLE_ID?.trim() ?? "";
}

/** Auth.js Google client secret (`AUTH_GOOGLE_SECRET` only). */
export function googleClientSecret() {
  return process.env.AUTH_GOOGLE_SECRET?.trim() ?? "";
}

/** Canonical app URL for Auth.js (`AUTH_URL`). Empty is fine at build time. */
export function authUrl() {
  return process.env.AUTH_URL?.trim() ?? "";
}

export function isGoogleConfigured() {
  const id = googleClientId();
  const secret = googleClientSecret();
  if (!id || !secret) return false;
  if (id.startsWith("your-") || secret.startsWith("your-")) return false;
  if (id === "placeholder" || secret === "placeholder") return false;
  return true;
}

/**
 * Auth.js secret (`AUTH_SECRET` only).
 * A placeholder keeps `next build` working when the secret is not set;
 * it is not a production secret.
 */
export function authSecret() {
  const secret = process.env.AUTH_SECRET?.trim();
  if (secret) return secret;
  return "insecure-build-placeholder-set-AUTH_SECRET";
}

export function roleForEmail(email?: string | null): UserRole {
  return email?.trim().toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
}
