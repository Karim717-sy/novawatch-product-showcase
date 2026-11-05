import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/contact-validation";

const valid = { fullName: "Jane Doe", email: "jane@example.com", subject: "Hi", message: "Hello" };
const errs = (d: Record<string, unknown>) => {
  const r = validateContact(d);
  return r.ok ? {} : r.errors;
};

describe("Contact form validation", () => {
  it("accepts a complete message", () => expect(validateContact(valid).ok).toBe(true));
  it("requires every field", () =>
    expect(Object.keys(errs({ fullName: " ", email: "", subject: "", message: "" })).sort()).toEqual(
      ["email", "fullName", "message", "subject"],
    ));
  it("rejects a badly formatted email", () => expect(errs({ ...valid, email: "jane@" }).email).toBeDefined());
});
