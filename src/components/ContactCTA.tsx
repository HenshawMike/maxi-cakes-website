import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK =
  "https://wa.me/?text=Hello%2C%20I'd%20like%20to%20order%20a%20cake%20from%20MAXI%20CAKES%20'N'%20PASTERIES.";

const ContactCTA = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 lg:py-28 bg-bakery-dark">
      <div className="container mx-auto px-4 text-center fade-up" ref={ref}>
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
      </div>
    </section>
  );
};

export default ContactCTA;
