import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { authErrorMessage } from "./auth-errors.ts";

describe("authErrorMessage", () => {
  it("maps Auth.js Configuration to a Spanish retry message", () => {
    const message = authErrorMessage("Configuration");
    assert.ok(message);
    assert.match(message, /Google/);
    assert.doesNotMatch(message, /SBS/i);
    assert.doesNotMatch(message, /Server error/i);
  });

  it("maps InvalidCheck to the same user-facing login error", () => {
    assert.equal(authErrorMessage("InvalidCheck"), authErrorMessage("Configuration"));
  });

  it("keeps an explicit missing-config message for error=config", () => {
    const message = authErrorMessage("config");
    assert.match(message ?? "", /AUTH_GOOGLE_ID/);
  });
});
