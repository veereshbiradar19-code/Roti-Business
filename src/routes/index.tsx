import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { About } from "@/components/sections/About";
import { Product } from "@/components/sections/Product";
import { Delivery } from "@/components/sections/Delivery";
import { Order } from "@/components/sections/Order";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amogh Food Products — Fresh Jowar Rotis Delivered Across Karnataka" },
      { name: "description", content: "Premium handmade Jowar Rotis — gluten free, high fibre, hygienically prepared with RO water. Home delivery across Karnataka." },
      { property: "og:title", content: "Amogh Food Products — Fresh Jowar Rotis" },
      { property: "og:description", content: "Healthy, hygienic and authentic Jowar Rotis delivered across Karnataka." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <About />
        <Product />
        <Delivery />
        <Order />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
