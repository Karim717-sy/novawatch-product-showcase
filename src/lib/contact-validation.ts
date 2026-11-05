import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name").max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address, like you@example.com")
    .max(255, "Email must be 255 characters or fewer"),
  subject: z.string().trim().min(1, "Please enter a subject").max(150, "Subject must be 150 characters or fewer"),
  message: z.string().trim().min(1, "Please write a message").max(2000, "Message must be 2000 characters or fewer"),
});

export type ContactField = "fullName" | "email" | "subject" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactValues = z.infer<typeof contactSchema>;

export function validateContact(
  data: Record<string, unknown>,
): { ok: true; values: ContactValues } | { ok: false; errors: ContactErrors } {
  const parsed = contactSchema.safeParse(data);
  if (parsed.success) return { ok: true, values: parsed.data };
  const errors: ContactErrors = {};
  for (const issue of parsed.error.issues) {
    const f = String(issue.path[0]) as ContactField;
    if (!errors[f]) errors[f] = issue.message;
  }
  return { ok: false, errors };
}
