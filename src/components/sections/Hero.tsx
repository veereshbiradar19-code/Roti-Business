import heroImg from "@/assets/hero-rotis.png";
import { Leaf, Droplets, Wheat, Sparkles, Truck } from "lucide-react";

const badges = [
  { icon: Leaf, label: "Gluten Free" },
  { icon: Wheat, label: "High Fibre" },
  { icon: Sparkles, label: "Low Fat" },
  { icon: Droplets, label: "Hygienic + RO Water" },
  { icon: Leaf, label: "Organic Jowar" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-28 md:pt-32 pb-20 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--brand-wheat)" }} />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--brand-green)" }} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 backdrop-blur border border-border text-xs font-semibold tracking-wide uppercase text-[color:var(--brand-brown)]">
            <Truck className="h-3.5 w-3.5" /> Home Delivery Across Karnataka
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-foreground">
            Fresh & Healthy <br />
            <span className="text-[color:var(--brand-brown)]">Jowar Rotis</span> <br />
            Delivered Across Karnataka
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
            Made with Hygiene · RO Water Used · Traditional Taste · Premium Quality.
            Authentic handmade rotis crafted with love for your everyday wellness.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {badges.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground/80 shadow-[var(--shadow-soft)]"
              >
                <b.icon className="h-3.5 w-3.5 text-[color:var(--brand-green)]" />
                {b.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#order"
              className="rounded-full px-7 py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-warm)] hover:translate-y-[-2px] transition"
              style={{ background: "var(--gradient-warm)" }}
            >
              Order Now
            </a>
            <a
              href="#contact"
              className="rounded-full px-7 py-3.5 font-semibold border border-border bg-card hover:bg-secondary transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-warm)] animate-fade-up">
            <img src={heroImg} alt="Fresh handmade Jowar rotis on a brass plate" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-6 -left-6 hidden md:flex flex-col items-center gap-1 bg-card rounded-2xl px-4 py-3 shadow-[var(--shadow-card)] border border-border animate-float">
            <span className="text-2xl font-bold text-[color:var(--brand-brown)]">100%</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Pure Jowar</span>
          </div>
          <div className="absolute -bottom-5 -right-3 md:-right-6 flex items-center gap-2 bg-card rounded-full px-4 py-2.5 shadow-[var(--shadow-card)] border border-border animate-float" style={{ animationDelay: "1s" }}>
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--brand-green)]" />
            <span className="text-xs font-semibold">Freshly Packed Daily</span>
          </div>
        </div>
      </div>
    </section>
  );
}