import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";

const WHATSAPP_LINK =
  "https://wa.me/?text=Hello%2C%20I'd%20like%20to%20order%20a%20cake%20from%20MAXI%20CAKES%20'N'%20PASTERIES.";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroBg}
          alt="Beautiful cake display at Maxi Cakes bakery"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-bakery-dark/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-sm tracking-[0.3em] uppercase text-primary-foreground/70 mb-4"
        >
          Handcrafted with Love
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.1] mb-6"
        >
          MAXI CAKES
          <span className="block text-3xl md:text-4xl lg:text-5xl font-medium italic mt-2 text-primary-foreground/80">
            'N' Pasteries
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Where every slice tells a story. We craft exquisite cakes and pastries
          that turn your sweetest moments into lasting memories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="whatsapp" size="xl" className="bg-accent text-accent-foreground hover:bg-accent/85" asChild>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
          </Button>
          <Button variant="whatsapp-outline" size="xl" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
            <a href="#cakes">
              View Our Cakes
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/50">
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-primary-foreground/30 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
