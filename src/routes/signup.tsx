import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Layout, Logo, meta } from "@/components/site";
import {
  validateSignup,
  type SignupErrors,
  type SignupField,
} from "@/lib/signup-validation";

export const Route = createFileRoute("/signup")({
  head: () =>
    meta(
      "Create Your NovaWatch Account",
      "Create your NovaWatch account for launch updates, early-access pricing and priority support.",
    ),
  component: Signup,
});

const fields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    autoComplete: "name",
    placeholder: "Jane Doe",
    maxLength: 100,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
    maxLength: 255,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "At least 8 characters",
    maxLength: 72,
    hint: "Use at least 8 characters, including a letter and a number.",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "Re-enter your password",
    maxLength: 72,
  },
] as const;

function Signup() {
  const [errors, setErrors] = useState<SignupErrors>({});
  const [created, setCreated] = useState<{ fullName: string; email: string } | null>(
    null,
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const result = validateSignup(Object.fromEntries(new FormData(form)));

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setCreated(result.values);
    form.reset();
  };

  return (
    <Layout>
      <section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-5 py-14">
        <div className="pointer-events-none absolute inset-0 bg-glow" />

        <div className="relative w-full max-w-md animate-rise rounded-2xl border bg-card p-7 shadow-glow sm:p-9">
          <div className="flex justify-center">
            <Logo />
          </div>

          {created ? (
            <div className="py-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border-2 border-primary">
                <span className="text-xl font-bold text-primary">✓</span>
              </div>
              <h1 className="mt-5 text-2xl font-bold">
                Welcome, {created.fullName.split(" ")[0]}!
              </h1>
              <p className="mt-3 text-muted-foreground">
                Your NovaWatch account is ready. We&apos;ve sent a confirmation to{" "}
                <span className="font-medium text-foreground">{created.email}</span>.
              </p>
              <Link
                to="/"
                className="mt-7 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:shadow-glow"
              >
                Return to homepage
              </Link>
            </div>
          ) : (
            <>
              <h1 className="mt-6 text-center text-3xl font-bold">Create Account</h1>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Join NovaWatch for launch updates and early-access pricing.
              </p>

              <form onSubmit={submit} noValidate className="mt-8 space-y-5">
                {fields.map((f) => (
                  <div key={f.name}>
                    <label
                      htmlFor={f.name}
                      className="mb-1.5 block text-sm font-medium"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      maxLength={f.maxLength}
                      aria-invalid={errors[f.name as SignupField] ? true : undefined}
                      aria-describedby={
                        errors[f.name as SignupField] || "hint" in f
                          ? `${f.name}-help`
                          : undefined
                      }
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
                    />
                    <p id={`${f.name}-help`} className="mt-1.5 text-sm">
                      {errors[f.name as SignupField] ? (
                        <span className="text-destructive">
                          {errors[f.name as SignupField]}
                        </span>
                      ) : (
                        "hint" in f && (
                          <span className="text-xs text-muted-foreground">{f.hint}</span>
                        )
                      )}
                    </p>
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition hover:shadow-glow"
                >
                  Create Account
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <p className="pb-14 text-center text-sm text-muted-foreground">
        Prefer to look around first?{" "}
        <Link to="/" className="font-semibold text-accent hover:underline">
          Return to homepage
        </Link>
      </p>
    </Layout>
  );
}
