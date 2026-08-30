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

function isPlaceholderCredential(value: string) {
  const normalized = value.toLowerCase();
  if (!normalized) return true;
  if (normalized.startsWith("your-")) return true;
  if (normalized === "placeholder" || normalized === "not-configured") return true;
  if (normalized.includes("not-configured")) return true;
  return false;
}

export function isGoogleConfigured() {
  const id = googleClientId();
  const secret = googleClientSecret();
  if (isPlaceholderCredential(id) || isPlaceholderCredential(secret)) return false;
  return true;
}

/** Real Google OAuth credentials, or null so Auth.js never sees placeholders. */
export function googleProviderOptions() {
  if (!isGoogleConfigured()) return null;
  return {
    clientId: googleClientId(),
    clientSecret: googleClientSecret(),
  };
}

export const RESIDENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

/** Client-side residence cookie. Set separately so it cannot merge with Auth.js PKCE cookies. */
export function residenceCookieString(country: string, secure: boolean) {
  const parts = [
    `${RESIDENCE_COOKIE}=${encodeURIComponent(country)}`,
    "Path=/",
    `Max-Age=${RESIDENCE_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
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
