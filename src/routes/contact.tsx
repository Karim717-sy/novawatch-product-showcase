import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Layout, meta } from "@/components/site";
import { validateContact, type ContactErrors, type ContactField } from "@/lib/contact-validation";

export const Route = createFileRoute("/contact")({
  head: () =>
    meta(
      "Contact NovaWatch — Talk to Our Team",
      "Questions about NovaWatch? Send our team a message about products, orders or partnerships.",
    ),
  component: Contact,
});

const fields = [
  { name: "fullName", label: "Full Name", type: "text", autoComplete: "name", placeholder: "Jane Doe", maxLength: 100 },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email", placeholder: "you@example.com", maxLength: 255 },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off", placeholder: "How can we help?", maxLength: 150 },
] as const;

const inputCls =
  "w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";

function Contact() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const r = validateContact(Object.fromEntries(new FormData(form)));
    if (!r.ok) {
      setErrors(r.errors);
      return;
    }
    setErrors({});
    setSentTo(r.values.fullName.split(" ")[0] ?? r.values.fullName);
    form.reset();
  };

  const err = (f: ContactField) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-1.5 text-sm text-destructive">{errors[f]}</p>
    ) : null;

  return (
    <Layout hideContactCta>
      <section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-5 py-14">
        <div className="pointer-events-none absolute inset-0 bg-glow" />
        <div className="relative flex w-full max-w-5xl flex-col gap-10 md:flex-row md:items-center">
          <div className="animate-rise md:w-2/5">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Contact us</p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">Let&apos;s talk.</h1>
            <p className="mt-4 text-muted-foreground">
              Questions about NovaWatch, orders or partnerships? Send us a message and we&apos;ll reply within one business day.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li><a href="mailto:hello@novawatch.example" className="text-accent hover:underline">hello@novawatch.example</a></li>
              <li><a href="tel:+18005550199" className="text-accent hover:underline">+1 (800) 555-0199</a></li>
              <li className="text-muted-foreground">Mon–Fri, 9:00–18:00</li>
            </ul>
          </div>

          <div className="w-full animate-rise rounded-2xl border bg-card p-7 shadow-glow sm:p-9 md:w-3/5">
            {sentTo ? (
              <div role="status" className="flex flex-col items-center py-8 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-primary">
                  <span className="text-xl font-bold text-primary">✓</span>
                </div>
                <h2 className="mt-5 text-2xl font-bold">Thanks, {sentTo}!</h2>
                <p className="mt-3 text-muted-foreground">Your message has been sent. Our team will get back to you shortly.</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button onClick={() => setSentTo(null)} className="rounded-full border px-6 py-3 font-semibold transition hover:bg-muted">
                    Send another
                  </button>
                  <Link to="/" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:shadow-glow">
                    Return to homepage
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                <h2 className="text-2xl font-bold">Send us a message</h2>
                {fields.map((f) => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium">{f.label}</label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      maxLength={f.maxLength}
                      aria-invalid={errors[f.name] ? true : undefined}
                      aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                      className={inputCls}
                    />
                    {err(f.name)}
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="Tell us a little about your question…"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${inputCls} resize-y`}
                  />
                  {err("message")}
                </div>
                <button type="submit" className="self-stretch rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition hover:shadow-glow sm:self-start sm:px-10">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
