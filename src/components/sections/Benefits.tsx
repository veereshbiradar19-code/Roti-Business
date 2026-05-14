import { Leaf, Wheat, HeartPulse, Sparkles } from "lucide-react";

const items = [
  { icon: Leaf, title: "Gluten Free", desc: "100% jowar — naturally gluten free for sensitive tummies." },
  { icon: Wheat, title: "High Fibre", desc: "Aids digestion and keeps you fuller for longer." },
  { icon: Sparkles, title: "Low Fat", desc: "Light, wholesome and perfect for daily meals." },
  { icon: HeartPulse, title: "Authentic Taste", desc: "Traditional Karnataka recipe, freshly handmade." },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-green)]">Why Amogh Food Products</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">Goodness in Every Bite</h2>
          <p className="mt-4 text-muted-foreground">Crafted with care, our jowar rotis are loved for their wholesome benefits and authentic flavour.</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((b) => (
            <div
              key={b.title}
              className="group relative rounded-3xl bg-card border border-border p-7 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl grid place-items-center text-primary-foreground shadow-[var(--shadow-soft)] transition-transform group-hover:scale-110"
                style={{ background: "var(--gradient-leaf)" }}>
                <b.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}