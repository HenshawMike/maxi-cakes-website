import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, SearchX, SlidersHorizontal } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useSearch } from "@/context/SearchContext";
import Highlight from "./Highlight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import cake1 from "@/assets/IMG-20260302-WA0051.jpg";
import cake2 from "@/assets/IMG-20260302-WA0052.jpg";
import cake3 from "@/assets/IMG-20260302-WA0053.jpg";
import cake4 from "@/assets/IMG-20260302-WA0054.jpg";


const WHATSAPP_BASE =
  "https://api.whatsapp.com/send?phone=2348036774032&text=Hello%2C%20I'd%20like%20to%20order%20";

const cakes = [
  { name: "Elegant Birthday Cake", desc: "A birthday cake is sweet, layered, decorated, often with candles, celebrating someone's special day joyfully.", image: cake1 },
  { name: "Freshly Baked Cupcakes", desc: "Warm, soft, fluffy cupcakes with rich aroma, creamy frosting, and irresistible sweetness.", image: cake2 },
  { name: "Golden meatpie", desc: "Golden flaky pastry filled with savory spiced meat, warm, rich, satisfying.", image: cake3 },
  { name: "Fresh Eggrolls", desc: "Crispy fried pastry rolls filled with seasoned eggs, vegetables, or meat.", image: cake4 },
  
];

const CakeCard = ({ cake, searchQuery, className }: { cake: typeof cakes[0]; searchQuery: string; className?: string }) => (
  <div className={`group flex-shrink-0 w-72 sm:w-80 glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
    <div className="overflow-hidden h-64">
      <img
        src={cake.image}
        alt={cake.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-5 space-y-3">
      <h3 className="font-display text-lg font-semibold text-foreground">
        <Highlight text={cake.name} highlight={searchQuery} />
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        <Highlight text={cake.desc} highlight={searchQuery} />
      </p>
      <Button variant="whatsapp" size="sm" className="w-full" asChild>
        <a
          href={`${WHATSAPP_BASE}${encodeURIComponent(cake.name)}%20from%20MAXI%20CAKES%20'N'%20PASTERIES.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Order This
        </a>
      </Button>
    </div>
  </div>
);


const CakeShowcase = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredCakes = cakes.filter(cake =>
    cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cake.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-scroll to cakes if searching for the first time
  useEffect(() => {
    if (searchQuery.length > 2 && window.scrollY < 200) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchQuery]);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const nextScroll = Math.min(scrollLeft + 350, maxScroll);
      scrollContainerRef.current.scrollTo({ left: nextScroll, behavior: "smooth" });
    }
  };

  return (
    <section id="cakes" ref={sectionRef} className="py-20 lg:py-28 overflow-hidden">
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
          {searchQuery ? "Search Results" : "Baked to Perfection"}
        </h2>
        {searchQuery ? (
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">
              Showing {filteredCakes.length} {filteredCakes.length === 1 ? "result" : "results"} for "{searchQuery}"
            </span>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-xs font-medium text-accent hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <p className="font-body text-muted-foreground text-center max-w-lg mx-auto">
            Every cake is handcrafted with the finest ingredients and a whole lot of love.
          </p>
        )}
      </motion.div>

      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {filteredCakes.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Mobile: Accordion */}
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {filteredCakes.map((cake, i) => (
                    <AccordionItem
                      key={`mobile-${cake.name}-${i}`}
                      value={`item-${i}`}
                      className="border-none glass-card rounded-xl overflow-hidden px-4"
                    >
                      <AccordionTrigger className="hover:no-underline py-4 text-foreground font-display font-semibold">
                        <Highlight text={cake.name} highlight={searchQuery} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex justify-center py-2">
                          <CakeCard cake={cake} searchQuery={searchQuery} className="w-full sm:w-full" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Desktop: Horizontal Scroll with Chevron */}
              <div className="hidden md:block relative group/carousel">
                <div
                  ref={scrollContainerRef}
                  className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8"
                >
                  {filteredCakes.map((cake, i) => (
                    <CakeCard key={`desktop-${cake.name}-${i}`} cake={cake} searchQuery={searchQuery} />
                  ))}
                </div>
                
                {filteredCakes.length > 3 && (
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 translate-x-1/2"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <SearchX className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold">No pastries found</p>
                <p className="text-muted-foreground mt-1">
                  We couldn't find anything matching "{searchQuery}"
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
                className="mt-2"
              >
                Show all cakes
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};


export default CakeShowcase;
