import { z } from "zod";

const passwordRules = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be 72 characters or fewer")
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(100, "Name must be 100 characters or fewer"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(255, "Email must be 255 characters or fewer"),
    password: passwordRules,
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .max(72, "Password must be 72 characters or fewer"),
  })
  .superRefine((value, ctx) => {
    if (value.confirmPassword !== value.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type SignupField = "fullName" | "email" | "password" | "confirmPassword";

export type SignupErrors = Partial<Record<SignupField, string>>;

export type SignupResult =
  | { ok: true; values: { fullName: string; email: string } }
  | { ok: false; errors: SignupErrors };

/** Validates raw form data and returns one message per field, ready to render inline. */
export function validateSignup(data: Record<string, unknown>): SignupResult {
  const parsed = signupSchema.safeParse(data);
  if (parsed.success) {
    return {
      ok: true,
      values: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
      },
    };
  }

  const errors: SignupErrors = {};
  for (const issue of parsed.error.issues) {
    const field = String(issue.path[0]) as SignupField;
    if (!errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}
