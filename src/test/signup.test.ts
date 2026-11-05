import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { validateSignup } from "@/lib/signup-validation";

const valid = {
  fullName: "Jane Doe",
  email: "jane@example.com",
  password: "nova2026watch",
  confirmPassword: "nova2026watch",
};

const errorsFor = (data: Record<string, unknown>) => {
  const result = validateSignup(data);
  return result.ok ? {} : result.errors;
};

describe("Signup form validation", () => {
  it("accepts a complete registration with matching passwords", () => {
    const result = validateSignup(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.fullName).toBe("Jane Doe");
      expect(result.values.email).toBe("jane@example.com");
    }
  });

  it("asks for a full name when the name is blank", () => {
    expect(errorsFor({ ...valid, fullName: "   " }).fullName).toBe(
      "Please enter your full name",
    );
  });

  it("rejects an email without an @", () => {
    expect(errorsFor({ ...valid, email: "jane.example.com" }).email).toBe(
      "Please enter a valid email address",
    );
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(errorsFor({ ...valid, password: "nova202", confirmPassword: "nova202" }).password).toBe(
      "Password must be at least 8 characters",
    );
  });

  it("requires a number in the password", () => {
    expect(
      errorsFor({
        ...valid,
        password: "novawatch",
        confirmPassword: "novawatch",
      }).password,
    ).toBe("Password must contain at least one number");
  });

  it("flags a confirmation that does not match the password", () => {
    expect(errorsFor({ ...valid, confirmPassword: "nova2026watch!" }).confirmPassword).toBe(
      "Passwords do not match",
    );
  });

  it("asks for a confirmation when it is left empty", () => {
    expect(errorsFor({ ...valid, confirmPassword: "" }).confirmPassword).toBe(
      "Please confirm your password",
    );
  });
});

describe("Signup route", () => {
  it("matches a page for /signup", () => {
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
    });
    expect(router.matchRoutes("/signup").at(-1)?.routeId).toBe("/signup");
  });
});
