import test from "node:test";
import assert from "node:assert/strict";

import { assertAllowedAuthDomain } from "./auth-domain-policy.js";

test("allows invited or existing users to sign in even when email falls outside restricted domains", () => {
  assert.doesNotThrow(() => {
    assertAllowedAuthDomain({
      email: "admin@example.com",
      mode: "sign-in",
      restrictedDomains: ["sampleacademy.org"],
    });
  });
});

test("rejects self-sign-up when email falls outside restricted domains", () => {
  assert.throws(
    () => {
      assertAllowedAuthDomain({
        email: "admin@example.com",
        mode: "sign-up",
        restrictedDomains: ["sampleacademy.org"],
      });
    },
    {
      message: "Unauthorized email domain. Expected one of: sampleacademy.org",
    },
  );
});

test("allows self-sign-up when email matches a restricted domain", () => {
  assert.doesNotThrow(() => {
    assertAllowedAuthDomain({
      email: "admin@sampleacademy.org",
      mode: "sign-up",
      restrictedDomains: ["sampleacademy.org"],
    });
  });
});
