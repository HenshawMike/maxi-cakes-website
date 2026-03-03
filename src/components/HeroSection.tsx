import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";

const WHATSAPP_LINK =
  "https://api.whatsapp.com/send?phone=2348036774032&text=Hello%2C%20I'd%20like%20to%20order%20a%20cake%20from%20MAXI%20CAKES%20'N'%20PASTERIES.";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background image */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
        style={{ clipPath: "ellipse(100% 30% at 50% 100%)" }}
      >
        <img
          src={heroBg}
          alt="Beautiful cake display at Maxi Cakes bakery"
          className="w-full h-full object-cover"
          loading="eager"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-bakery-dark/60" />
      </motion.div>


      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.1] mb-6 drop-shadow-xl"
        >
          MAXI CAKES
          <span className="block text-3xl md:text-4xl lg:text-5xl font-medium italic mt-2 text-primary-foreground/80">
            'n' Pasteries
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-md"
        >
          Every slice tells a story. We create exquisite cakes & pastries for your sweetest moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="whatsapp" size="xl" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/85 h-auto py-4 whitespace-normal" asChild>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>Order on WhatsApp</span>
            </a>
          </Button>
          <Button variant="whatsapp-outline" size="xl" className="w-full sm:w-auto border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground h-auto py-4 whitespace-normal" asChild>
            <a href="#cakes">
              View Our Cakes
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
