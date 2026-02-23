import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

import cake1 from "@/assets/cake-1.jpg";
import cake2 from "@/assets/cake-2.jpg";
import cake3 from "@/assets/cake-3.jpg";
import cake4 from "@/assets/cake-4.jpg";
import cake5 from "@/assets/cake-5.jpg";
import cake6 from "@/assets/cake-6.jpg";
import cake7 from "@/assets/cake-7.jpg";
import cake8 from "@/assets/cake-8.jpg";

const WHATSAPP_BASE =
  "https://wa.me/?text=Hello%2C%20I'd%20like%20to%20order%20";

const cakes = [
  { name: "Chocolate Ganache Dream", desc: "Rich layers of dark chocolate with fresh berries", image: cake1 },
  { name: "Classic Wedding Elegance", desc: "Vanilla buttercream with handcrafted sugar flowers", image: cake2 },
  { name: "Red Velvet Delight", desc: "Moist red velvet with velvety cream cheese frosting", image: cake3 },
  { name: "French Macaron Collection", desc: "Delicate pastel macarons in assorted flavours", image: cake4 },
  { name: "Salted Caramel Bliss", desc: "Buttery caramel drip with crunchy nut toppings", image: cake5 },
  { name: "Strawberry Shortcake", desc: "Light sponge layered with fresh cream and strawberries", image: cake6 },
  { name: "Lemon Drizzle Bundt", desc: "Zesty lemon cake with sweet glaze icing", image: cake7 },
  { name: "Tiramisu Cup", desc: "Classic Italian layers of coffee-soaked sponge and mascarpone", image: cake8 },
];

const CakeCard = ({ cake }: { cake: typeof cakes[0] }) => (
  <div className="group flex-shrink-0 w-72 sm:w-80 glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="overflow-hidden h-64">
      <img
        src={cake.image}
        alt={cake.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-5 space-y-3">
      <h3 className="font-display text-lg font-semibold text-foreground">{cake.name}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{cake.desc}</p>
      <Button variant="whatsapp" size="sm" className="w-full" asChild>
        <a
          href={`${WHATSAPP_BASE}${encodeURIComponent(cake.name)}%20from%20MAXI%20CAKES%20'N'%20PASTERIES.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="w-4 h-4" />
          Order This
        </a>
      </Button>
    </div>
  </div>
);

const CakeShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cakes" className="py-20 lg:py-28 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 mb-12 fade-up" ref={(el) => {
        if (el) {
          const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add("visible"); }, { threshold: 0.2 });
          obs.observe(el);
        }
      }}>
        <p className="font-body text-sm tracking-[0.2em] uppercase text-accent text-center mb-3">
          Our Creations
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-4">
          Baked to Perfection
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-lg mx-auto">
          Every cake is handcrafted with the finest ingredients and a whole lot of love.
        </p>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative">
        <div className="flex animate-marquee gap-6 w-max px-4">
          {[...cakes, ...cakes].map((cake, i) => (
            <CakeCard key={`${cake.name}-${i}`} cake={cake} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CakeShowcase;
