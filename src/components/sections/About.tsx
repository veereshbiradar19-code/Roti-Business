import heroImg from "@/assets/hero-rotis.png";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Traditional Karnataka recipe, handmade with care",
  "Hygienic preparation setup with quality checks",
  "Made using purified RO water only",
  "Freshly packed and delivered across Karnataka",
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28" style={{ background: "var(--brand-cream)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 md:order-1">
          <div className="rounded-[2rem] overflow-hidden shadow-[var(--shadow-card)]">
            <img src={heroImg} alt="Authentic Karnataka jowar rotis" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-green)]">Our Story</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">About Amogh Food Products</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            At Amogh Food Products, we bring the warmth of a Karnataka kitchen to your table. Our jowar rotis
            are prepared with hygienically sourced ingredients, RO purified water, and time-honoured techniques
            that preserve the authentic taste you love.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-[color:var(--brand-green)] shrink-0" />
                <span className="text-foreground/85">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}