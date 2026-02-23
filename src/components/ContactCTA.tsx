import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK =
  "https://wa.me/?text=Hello%2C%20I'd%20like%20to%20order%20a%20cake%20from%20MAXI%20CAKES%20'N'%20PASTERIES.";

const ContactCTA = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-bakery-dark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-4 text-center"
      >
        <p className="font-body text-sm tracking-[0.2em] uppercase text-accent mb-4">
          Let's Talk Cake
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6 max-w-2xl mx-auto leading-tight">
          Ready to Make Your Celebration Sweeter?
        </h2>
        <p className="font-body text-lg text-primary-foreground/70 mb-10 max-w-md mx-auto">
          Send us a message on WhatsApp and let's create something beautiful together.
        </p>
        <Button variant="whatsapp" size="xl" className="bg-accent text-accent-foreground hover:bg-accent/85" asChild>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5" />
            Chat With Us on WhatsApp
          </a>
        </Button>
      </motion.div>
    </section>
  );
};

export default ContactCTA;
