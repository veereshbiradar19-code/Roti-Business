import packImg from "@/assets/product-pack.png";
import heroImg from "@/assets/hero-rotis.png";

const tags = ["100% Jowar", "No Preservatives", "Freshly Packed", "Healthy Choice"];

export function Product() {
  return (
    <section id="product" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-green)]">Our Product</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">Crispy Jowar Rotis, Premium Packed</h2>
          <p className="mt-4 text-muted-foreground">Sealed for freshness. Made for everyday wellness.</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-[var(--shadow-card)]"
            style={{ background: "var(--gradient-hero)" }}>
            <img src={packImg} alt="Amogh jowar rotis premium packed" className="w-full h-full object-cover" />
            <div className="absolute top-5 left-5 flex flex-wrap gap-2">
              {tags.slice(0, 2).map((t) => (
                <span key={t} className="rounded-full bg-card/90 backdrop-blur px-3 py-1 text-xs font-semibold border border-border">{t}</span>
              ))}
            </div>
            <div className="absolute bottom-5 right-5 flex flex-wrap gap-2 justify-end">
              {tags.slice(2).map((t) => (
                <span key={t} className="rounded-full text-primary-foreground px-3 py-1 text-xs font-semibold shadow-[var(--shadow-soft)]"
                  style={{ background: "var(--gradient-warm)" }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 content-center">
            <div className="rounded-3xl p-7 border border-border shadow-[var(--shadow-soft)] bg-card hover:-translate-y-1 transition">
              <div className="flex items-start gap-5">
                <img src={heroImg} alt="Fresh roti close-up" className="h-24 w-24 rounded-2xl object-cover" />
                <div>
                  <h3 className="text-xl font-bold">Handmade Texture</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Roasted to perfection with golden brown spots and a soft, authentic bite.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl p-7 border border-border shadow-[var(--shadow-soft)] bg-card hover:-translate-y-1 transition">
              <div className="flex items-start gap-5">
                <img src={packImg} alt="Sealed packaging" className="h-24 w-24 rounded-2xl object-cover" />
                <div>
                  <h3 className="text-xl font-bold">Sealed Packaging</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Premium transparent packaging keeps every roti fresh, safe and ready to serve.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl p-7 border border-border shadow-[var(--shadow-soft)] text-primary-foreground"
              style={{ background: "var(--gradient-warm)" }}>
              <h3 className="text-xl font-bold">Available in 5, 10 & 50 packs</h3>
              <p className="mt-2 text-sm opacity-90">Choose what fits your family. Mix and match in a single order.</p>
              <a href="#contact" className="inline-block mt-4 rounded-full bg-card text-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition">For Bulk Order — Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}