import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("Google OAuth start", () => {
  it("starts Google from the official Auth.js client flow, not a server action", () => {
    const button = readFileSync(
      join(root, "src/components/auth/GoogleButton.tsx"),
      "utf8",
    );
    const actions = readFileSync(join(root, "src/lib/auth-actions.ts"), "utf8");

    assert.match(button, /from ["']next-auth\/react["']/);
    assert.match(button, /signIn\(\s*["']google["']/);
    assert.doesNotMatch(button, /continueWithGoogle/);
    assert.doesNotMatch(actions, /continueWithGoogle/);
    assert.doesNotMatch(actions, /signIn\(\s*["']google["']/);
  });

  it("sends Auth.js errors to /login and does not register placeholder Google apps", () => {
    const auth = readFileSync(join(root, "src/auth.ts"), "utf8");
    assert.match(auth, /error:\s*["']\/login["']/);
    assert.match(auth, /trustHost:\s*true/);
    assert.doesNotMatch(auth, /not-configured/);
  });
});
