import { Wheat, Phone, MessageCircle, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-[color:var(--brand-brown-dark)] text-primary-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="h-10 w-10 rounded-full bg-white/10 grid place-items-center">
              <Wheat className="h-5 w-5" />
            </span>
            <span className="font-[Playfair_Display] text-2xl font-bold">Amogh Food Products</span>
          </div>
          <p className="mt-4 text-sm opacity-80 max-w-md">
            Premium handmade Jowar Rotis from Karnataka. Healthy, hygienic and freshly packed —
            delivered to your doorstep with love.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href="#" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-base">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><a href="#home" className="hover:opacity-100">Home</a></li>
            <li><a href="#benefits" className="hover:opacity-100">Benefits</a></li>
            <li><a href="#about" className="hover:opacity-100">About</a></li>
            <li><a href="#product" className="hover:opacity-100">Product</a></li>
            <li><a href="#order" className="hover:opacity-100">Order</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-base">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href="tel:+919916428416" className="hover:opacity-100">+91 99164 28416</a></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href="tel:+919663135328" className="hover:opacity-100">+91 96631 35328</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> <a href="https://wa.me/919916428416" target="_top" className="hover:opacity-100">WhatsApp Order</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> <span>Pragathi Colony, Shirur Park, Vidyanagar, Hubballi, Karnataka, India</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs opacity-70">
          <p>© {new Date().getFullYear()} Amogh Food Products. All rights reserved.</p>
          <p>Crafted with care in Karnataka.</p>
        </div>
        <div className="max-w-7xl mx-auto px-5 md:px-8 pb-5 text-xs opacity-70 text-center italic">
          * Actual product and packaging may differ from the images shown. Images are for reference only.
        </div>
      </div>
    </footer>
  );
}