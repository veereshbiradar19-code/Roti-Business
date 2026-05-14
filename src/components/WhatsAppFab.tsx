import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const phone = "919916428416";
  const msg = encodeURIComponent("Hi Amogh Food Products! I'd like to order Jowar Rotis.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_top"
      aria-label="Order on WhatsApp"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full grid place-items-center text-white shadow-[var(--shadow-warm)] animate-pulse-soft"
      style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}