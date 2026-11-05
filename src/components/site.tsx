import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

export const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: "1546868871-7041f2a55e12",
  wrist: "1579586337278-3befd40fd17a",
  health: "1575311373937-040b8e1fd5b6",
  connect: "1508685096489-7aacd43bd3b1",
  battery: "1557438159-51eec7a6c9e8",
  lifestyle: "1617043786394-f977fa12eddf",
};

const links = [
  { to: "/health", label: "Health" },
  { to: "/connectivity", label: "Connectivity" },
  { to: "/battery", label: "Battery" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
      <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-primary">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
      Nova<span className="text-primary">Watch</span>
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>Contact</Link>
          <Link to="/discover" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:shadow-glow">
            Register interest
          </Link>
        </div>
        <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen(!open)}>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
          </div>
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-4 border-t px-5 py-5 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/discover" onClick={() => setOpen(false)} className="rounded-full bg-primary px-5 py-2 text-center font-semibold text-primary-foreground">
            Register interest
          </Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Precision-engineered wearables designed to make every day healthier, more connected and effortlessly smarter.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            {links.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-foreground">{l.label}</Link></li>
            ))}
            <li><Link to="/discover" className="hover:text-foreground">Register interest</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:hello@novawatch.example" className="hover:text-foreground">hello@novawatch.example</a></li>
            <li><a href="tel:+18005550199" className="hover:text-foreground">+1 (800) 555-0199</a></li>
            <li>Mon–Fri, 9:00–18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © 2026 NovaWatch. A fictional brand. Photos courtesy of Unsplash.
      </div>
    </footer>
  );
}

export function ContactCta() {
  return (
    <section aria-labelledby="contact-cta" className="border-t bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-14 text-center md:flex-row md:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Contact us</p>
          <h2 id="contact-cta" className="mt-2 text-2xl font-bold md:text-3xl">Questions about NovaWatch?</h2>
          <p className="mt-2 text-muted-foreground">Our team usually replies within one business day.</p>
        </div>
        <Link to="/contact" className="shrink-0 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:shadow-glow">
          Contact Our Team
        </Link>
      </div>
    </section>
  );
}

export function Layout({ children, hideContactCta = false }: { children: ReactNode; hideContactCta?: boolean }) {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>{children}</main>
      {!hideContactCta && <ContactCta />}
      <Footer />
    </div>
  );
}

type FeatureProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  sections: { title: string; text: string }[];
  benefits: string[];
  specs: [string, string][];
};

export function FeaturePage(p: FeatureProps) {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-accent">{p.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">{p.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground">{p.intro}</p>
          </div>
          <img src={img(p.image)} alt={p.title} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-glow animate-rise" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {p.sections.map((s) => (
            <div key={s.title} className="rounded-2xl border bg-card p-7">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">Benefits</h2>
          <ul className="mt-6 space-y-4">
            {p.benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Specifications</h2>
          <dl className="mt-6 divide-y rounded-2xl border bg-card">
            {p.specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-6 py-4">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary p-10 text-primary-foreground md:flex-row">
          <h2 className="text-2xl font-bold md:text-3xl">Be first to wear NovaWatch.</h2>
          <div className="flex gap-3">
            <Link to="/" className="rounded-full border border-primary-foreground/40 px-6 py-3 font-semibold">Home</Link>
            <Link to="/discover" className="rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground">Register interest</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
