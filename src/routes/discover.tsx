import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Layout, img, IMAGES, meta } from "@/components/site";

export const Route = createFileRoute("/discover")({
  head: () => meta("Discover NovaWatch — Register Your Interest", "Be among the first to own NovaWatch. Register your interest for launch updates and early-access pricing."),
  component: Discover,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

function Discover() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(true);
  };

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Launching soon</p>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">The smartwatch you'll <span className="text-gradient">never take off.</span></h1>
            <p className="mt-6 text-lg text-muted-foreground">Register now for early access, exclusive launch pricing and a free premium strap.</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {["24/7 health monitoring", "14-day battery life", "Calls & notifications", "Titanium & sapphire design"].map((b) => (
                <li key={b} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" />{b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-8 shadow-glow">
            <img src={img(IMAGES.lifestyle, 900)} alt="NovaWatch lifestyle" className="mb-6 aspect-video w-full rounded-xl object-cover" />
            {done ? (
              <div className="py-6 text-center">
                <h2 className="text-2xl font-bold">You're on the list! 🎉</h2>
                <p className="mt-2 text-muted-foreground">We'll email you as soon as NovaWatch is available.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-4">
                <h2 className="text-2xl font-bold">Register your interest</h2>
                {(["name", "email"] as const).map((f) => (
                  <div key={f}>
                    <label htmlFor={f} className="mb-1.5 block text-sm font-medium capitalize">{f}</label>
                    <input id={f} name={f} type={f === "email" ? "email" : "text"} maxLength={f === "email" ? 255 : 100}
                      placeholder={f === "email" ? "you@example.com" : "Jane Doe"}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40" />
                    {errors[f] && <p className="mt-1 text-sm text-destructive">{errors[f]}</p>}
                  </div>
                ))}
                <button type="submit" className="w-full rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition hover:shadow-glow">
                  Notify me at launch
                </button>
                <p className="text-center text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
