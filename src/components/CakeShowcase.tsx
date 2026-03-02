import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

import cake1 from "@/assets/IMG-20260302-WA0051.jpg";
import cake2 from "@/assets/IMG-20260302-WA0052.jpg";
import cake3 from "@/assets/IMG-20260302-WA0053.jpg";
import cake4 from "@/assets/IMG-20260302-WA0054.jpg";
import cake5 from "@/assets/cake-5.jpg";
import cake6 from "@/assets/cake-6.jpg";
import cake7 from "@/assets/cake-7.jpg";
import cake8 from "@/assets/cake-8.jpg";

const WHATSAPP_BASE =
  "https://wa.me/?text=Hello%2C%20I'd%20like%20to%20order%20";

const cakes = [
  { name: "Elegant Birthday Cake", desc: "A birthday cake is sweet, layered, decorated, often with candles, celebrating someone's special day joyfully.", image: IMG-20260302-WA0051 },
  { name: "Freshly Baked Cupcakes", desc: "Warm, soft, fluffy cupcakes with rich aroma, creamy frosting, and irresistible sweetness.", image: cake2 },
  { name: "Golden meatpie", desc: "Golden flaky pastry filled with savory spiced meat, warm, rich, satisfying.", image: cake3 },
  { name: "Fresh Eggrolls", desc: "Delicate pastel macarons in assorted flavours", image: cake4 },
  
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
  const { searchQuery } = useSearch();

  const filteredCakes = cakes.filter(cake =>
    cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cake.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="cakes" className="py-20 lg:py-28 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-4 mb-12"
      >
        <p className="font-body text-sm tracking-[0.2em] uppercase text-accent text-center mb-3">
          Our Creations
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-4">
          Baked to Perfection
        </h2>
        <p className="font-body text-muted-foreground text-center max-w-lg mx-auto">
          Every cake is handcrafted with the finest ingredients and a whole lot of love.
        </p>
      </motion.div>

      {/* Swipeable/Draggable Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative px-4"
      >
        {filteredCakes.length > 0 ? (
          <div className="overflow-visible cursor-grab active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -((filteredCakes.length * 320) + ((filteredCakes.length - 1) * 24) - (typeof window !== 'undefined' ? window.innerWidth - 64 : 1000)) }}
              className="flex gap-6 w-max"
            >
              {filteredCakes.map((cake, i) => (
                <CakeCard key={`${cake.name}-${i}`} cake={cake} />
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground italic">No cakes found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Visual Cue for swiping */}
        {filteredCakes.length > 0 && (
          <div className="mt-8 flex justify-center items-center gap-2 md:hidden">
            <div className="w-8 h-1 bg-[#2D3A24]/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-full bg-[#4A5D44]"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#2D3A24]/40 font-body">Swipe</span>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default CakeShowcase;
