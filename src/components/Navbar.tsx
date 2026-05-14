import { useEffect, useState } from "react";
import { Wheat, Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#benefits", label: "Benefits" },
  { href: "#about", label: "About" },
  { href: "#product", label: "Product" },
  { href: "#order", label: "Order" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-[var(--shadow-soft)] border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--brand-brown)] to-[var(--brand-brown-dark)] grid place-items-center text-primary-foreground shadow-[var(--shadow-soft)]">
            <Wheat className="h-5 w-5" />
          </span>
          <span className="font-[Playfair_Display] text-xl md:text-2xl font-bold text-foreground">
            Amogh <span className="text-[color:var(--brand-brown)]">Foods</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-[color:var(--brand-brown)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            className="rounded-full bg-[var(--gradient-warm)] text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-[var(--shadow-warm)] hover:opacity-95 transition"
          >
            Order Now
          </a>
        </nav>
        <button
          className="md:hidden h-10 w-10 grid place-items-center rounded-full bg-card border border-border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur border-t border-border">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/85 font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#order"
              onClick={() => setOpen(false)}
              className="mt-2 text-center rounded-full bg-[var(--gradient-warm)] text-primary-foreground px-5 py-3 font-semibold"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}