import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, img, IMAGES, meta } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => meta("NovaWatch — Your Life. Smarter.", "NovaWatch is the premium smartwatch for health tracking, seamless connectivity and multi-day battery life."),
  component: Index,
});

const benefits = [
  { k: "24/7", v: "Health insights" },
  { k: "14 days", v: "Battery life" },
  { k: "5 ATM", v: "Water resistance" },
  { k: "1.9\"", v: "AMOLED display" },
];

const features = [
  { to: "/health", title: "Health Monitoring", text: "Heart rate, sleep and activity tracking with clinical-grade sensors.", image: IMAGES.health },
  { to: "/connectivity", title: "Smart Connectivity", text: "Calls, notifications and apps — right on your wrist.", image: IMAGES.connect },
  { to: "/battery", title: "Battery Performance", text: "Up to 14 days per charge, 50% in just 20 minutes.", image: IMAGES.battery },
] as const;

function Index() {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-28">
          <div className="animate-rise">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Introducing NovaWatch Series 1</p>
            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
              Your Life. <span className="text-gradient">Smarter.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              A beautifully crafted smartwatch that understands your body, keeps you connected and lasts for days — so you can focus on living.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/discover" className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:shadow-glow">Discover NovaWatch</Link>
              <a href="#features" className="rounded-full border px-7 py-3.5 font-semibold transition hover:bg-muted">Explore Features</a>
            </div>
          </div>
          <img src={img(IMAGES.hero)} alt="NovaWatch smartwatch" className="aspect-square w-full rounded-[2rem] object-cover shadow-glow animate-float" />
        </div>
      </section>

      <section className="border-y bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.v} className="text-center">
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">{b.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{b.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <img src={img(IMAGES.wrist)} alt="NovaWatch worn on wrist" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Designed for every moment.</h2>
          <p className="mt-4 text-muted-foreground">From your morning run to late-night meetings, NovaWatch adapts to you.</p>
          <ul className="mt-8 space-y-4">
            {["Aerospace-grade titanium case, just 38 g", "Sapphire crystal always-on display", "Built-in GPS and NFC payments", "Works with iOS and Android"].map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-primary" /><span>{t}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-24">
        <h2 className="text-3xl font-bold md:text-4xl">Features that matter.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Link key={f.to} to={f.to} className="group overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:shadow-glow">
              <img src={img(f.image, 800)} alt={f.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
