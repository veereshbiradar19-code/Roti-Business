import { Truck, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

export function Delivery() {
  const phone = "919916428416";
  const msg = encodeURIComponent("Hi Amogh Food Products! I'd like to know more about delivery.");
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--brand-cream)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden p-8 md:p-14 text-primary-foreground shadow-[var(--shadow-warm)]"
          style={{ background: "var(--gradient-warm)" }}>
          <div className="absolute -top-16 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="h-3.5 w-3.5" /> Karnataka Wide
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">Home Delivery Available Anywhere in Karnataka</h2>
              <p className="mt-4 text-base md:text-lg opacity-90 max-w-lg">
                Freshly packed rotis delivered safely to your doorstep — from Bengaluru to Mysuru, Hubballi to Mangaluru.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#order" className="rounded-full bg-card text-foreground px-6 py-3 font-semibold shadow-[var(--shadow-soft)] hover:opacity-95 transition">
                  Place Order
                </a>
                <a
                  href={`https://wa.me/${phone}?text=${msg}`}
                  target="_top"
                  className="rounded-full px-6 py-3 font-semibold flex items-center gap-2 bg-[#25D366] text-white shadow-[var(--shadow-soft)] hover:opacity-95 transition"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Truck, t: "Doorstep Delivery", d: "Safely to your home across Karnataka" },
                { icon: ShieldCheck, t: "Hygienic Pack", d: "Sealed & safe handling" },
                { icon: MapPin, t: "All Cities", d: "Bengaluru · Mysuru · Hubballi" },
                { icon: MessageCircle, t: "Easy Order", d: "Call or WhatsApp anytime" },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-5">
                  <c.icon className="h-6 w-6" />
                  <p className="mt-3 font-semibold">{c.t}</p>
                  <p className="text-xs opacity-85">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}