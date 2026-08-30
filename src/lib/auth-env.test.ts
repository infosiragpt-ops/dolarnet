import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  googleProviderOptions,
  isGoogleConfigured,
  residenceCookieString,
} from "./auth-env.ts";

const AUTH_KEYS = [
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET",
  "AUTH_SECRET",
] as const;

const previous = new Map<string, string | undefined>();

function setAuthEnv(vars: Record<string, string | undefined>) {
  if (previous.size === 0) {
    for (const key of AUTH_KEYS) previous.set(key, process.env[key]);
  }
  for (const key of AUTH_KEYS) {
    const value = vars[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

afterEach(() => {
  for (const [key, value] of previous) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  previous.clear();
});

describe("isGoogleConfigured", () => {
  it("is false when Google env is empty", () => {
    setAuthEnv({ AUTH_GOOGLE_ID: "", AUTH_GOOGLE_SECRET: "" });
    assert.equal(isGoogleConfigured(), false);
  });

  it("rejects Auth.js not-configured placeholders", () => {
    setAuthEnv({
      AUTH_GOOGLE_ID: "not-configured.apps.googleusercontent.com",
      AUTH_GOOGLE_SECRET: "not-configured",
    });
    assert.equal(isGoogleConfigured(), false);
  });

  it("rejects your-* and placeholder values", () => {
    setAuthEnv({
      AUTH_GOOGLE_ID: "your-google-client-id",
      AUTH_GOOGLE_SECRET: "placeholder",
    });
    assert.equal(isGoogleConfigured(), false);
  });

  it("is true when AUTH_GOOGLE_* look real", () => {
    setAuthEnv({
      AUTH_GOOGLE_ID: "123456789-abcdef.apps.googleusercontent.com",
      AUTH_GOOGLE_SECRET: "GOCSPX-real-secret",
    });
    assert.equal(isGoogleConfigured(), true);
  });
});

describe("googleProviderOptions", () => {
  it("returns null instead of placeholder credentials", () => {
    setAuthEnv({
      AUTH_GOOGLE_ID: "not-configured.apps.googleusercontent.com",
      AUTH_GOOGLE_SECRET: "not-configured",
    });
    assert.equal(googleProviderOptions(), null);
  });

  it("returns env credentials when configured", () => {
    setAuthEnv({
      AUTH_GOOGLE_ID: "123456789-abcdef.apps.googleusercontent.com",
      AUTH_GOOGLE_SECRET: "GOCSPX-real-secret",
    });
    assert.deepEqual(googleProviderOptions(), {
      clientId: "123456789-abcdef.apps.googleusercontent.com",
      clientSecret: "GOCSPX-real-secret",
    });
  });
});

describe("residenceCookieString", () => {
  it("sets the residence cookie without Auth.js cookie names", () => {
    const value = residenceCookieString("PE", true);
    assert.match(value, /^dolarnett\.residence=PE;/);
    assert.match(value, /Path=\//);
    assert.match(value, /SameSite=Lax/);
    assert.match(value, /Secure/);
    assert.doesNotMatch(value, /pkce/i);
    assert.doesNotMatch(value, /authjs/i);
  });
});
