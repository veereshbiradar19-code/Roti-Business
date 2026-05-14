import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Minus, Plus, MessageCircle, Send } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitOrder } from "@/lib/orders.functions";

type PackKey = "p5" | "p10" | "p50";
const PACKS: { key: PackKey; label: string; price: number; size: number }[] = [
  { key: "p5", label: "Pack of 5 Rotis", price: 50, size: 5 },
  { key: "p10", label: "Pack of 10 Rotis", price: 95, size: 10 },
  { key: "p50", label: "Pack of 50 Rotis", price: 470, size: 50 },
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s\-+]/g, ""))
    .refine((v) => /^\d{10}$/.test(v), "Enter a valid 10-digit phone number"),
  address: z.string().trim().min(10, "Please share a complete delivery address").max(400),
});

export function Order() {
  const [qty, setQty] = useState<Record<PackKey, number>>({ p5: 1, p10: 0, p50: 0 });
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const submit = useServerFn(submitOrder);
  const total = useMemo(
    () => PACKS.reduce((s, p) => s + qty[p.key] * p.price, 0),
    [qty],
  );
  const totalRotis = useMemo(
    () => PACKS.reduce((s, p) => s + qty[p.key] * p.size, 0),
    [qty],
  );

  const update = (k: PackKey, delta: number) =>
    setQty((q) => ({ ...q, [k]: Math.max(0, q[k] + delta) }));

  const buildMessage = () => {
    const lines = PACKS.filter((p) => qty[p.key] > 0).map(
      (p) => `• ${p.label} × ${qty[p.key]} = ₹${p.price * qty[p.key]}`,
    );
    return `Hi Amogh Food Products! I'd like to place an order:%0A%0A${encodeURIComponent(
      lines.join("\n"),
    )}%0A%0ATotal: ₹${total}%0A%0AName: ${encodeURIComponent(
      form.name,
    )}%0APhone: ${encodeURIComponent(form.phone)}%0AAddress: ${encodeURIComponent(form.address)}`;
  };

  const validate = () => {
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return false;
    }
    if (totalRotis === 0) {
      toast.error("Please select at least one pack");
      return false;
    }
    return true;
  };

  const onPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submit({
        data: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          p5: qty.p5,
          p10: qty.p10,
          p50: qty.p50,
          totalRotis,
          total,
        },
      });
      toast.success("Thank you for ordering from Amogh Food Products!", {
        description: "We'll reach out shortly to confirm your delivery.",
      });
      setForm({ name: "", phone: "", address: "" });
      setQty({ p5: 1, p10: 0, p50: 0 });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't submit your order. Please try WhatsApp or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  const waHref = `https://wa.me/919916428416?text=${buildMessage()}`;
  const onWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      e.preventDefault();
    }
  };

  return (
    <section id="order" className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-green)]">Order Now</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">Place Your Order</h2>
          <p className="mt-4 text-muted-foreground">Fill in your details and choose your packs. We'll handle the rest.</p>
        </div>

        <form onSubmit={onPlace} className="mt-12 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl bg-card border border-border p-6 md:p-8 shadow-[var(--shadow-card)]">
            <h3 className="text-lg font-bold">Delivery Details</h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--brand-brown)]/40"
                  placeholder="Your name"
                  maxLength={80}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                  }
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--brand-brown)]/40"
                  placeholder="10-digit mobile number"
                  inputMode="tel"
                  maxLength={10}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Delivery Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={4}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--brand-brown)]/40 resize-none"
                placeholder="House / Street / City / Pincode"
                maxLength={400}
              />
            </div>

            <h3 className="mt-8 text-lg font-bold">Select Packets</h3>
            <div className="mt-4 space-y-3">
              {PACKS.map((p) => (
                <div key={p.key} className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4">
                  <div>
                    <p className="font-semibold">{p.label}</p>
                    <p className="text-xs text-muted-foreground">₹{p.price} per pack</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => update(p.key, -1)}
                      className="h-9 w-9 grid place-items-center rounded-full bg-secondary hover:bg-muted transition">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{qty[p.key]}</span>
                    <button type="button" onClick={() => update(p.key, 1)}
                      className="h-9 w-9 grid place-items-center rounded-full text-primary-foreground transition"
                      style={{ background: "var(--gradient-warm)" }}>
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-3xl p-7 text-primary-foreground shadow-[var(--shadow-warm)]"
              style={{ background: "var(--gradient-warm)" }}>
              <h3 className="text-lg font-bold">Order Summary</h3>
              <div className="mt-4 space-y-2 text-sm">
                {PACKS.map((p) => (
                  <div key={p.key} className="flex justify-between opacity-90">
                    <span>{p.label}</span>
                    <span>× {qty[p.key]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/25 flex justify-between text-sm opacity-90">
                <span>Total Rotis</span><span>{totalRotis}</span>
              </div>
              <div className="mt-2 flex justify-between text-xl font-bold">
                <span>Total</span><span>₹{total}</span>
              </div>

              <button type="submit" disabled={submitting}
                className="mt-6 w-full rounded-full bg-card text-foreground py-3.5 font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-60">
                <Send className="h-4 w-4" /> {submitting ? "Placing..." : "Place Order"}
              </button>
              <a href={waHref} target="_top" onClick={onWhatsApp}
                className="mt-3 w-full rounded-full py-3.5 font-semibold flex items-center justify-center gap-2 text-white transition hover:opacity-95"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </a>
              <p className="mt-4 text-[11px] opacity-80 text-center">Cash on delivery available across Karnataka.</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}