import { motion } from "framer-motion";
import bakerPortrait from "@/assets/baker-portrait.jpg";

const AboutBaker = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={bakerPortrait}
                alt="Maxi, the baker behind Maxi Cakes"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-accent/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-primary/10 -z-10" />
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="font-body text-sm tracking-[0.2em] uppercase text-accent">
              Meet the Baker
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              A Passion Baked Into Every Layer
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                Hi there! I'm Maxi — a self-taught baker with a deep love for creating
                cakes that make people smile. What started as weekend experiments in my
                kitchen has blossomed into a full-fledged passion.
              </p>
              <p>
                Every cake I make is crafted by hand using premium ingredients and a lot
                of heart. From birthdays to weddings, I believe every celebration
                deserves something truly special — and that's exactly what I aim to deliver.
              </p>
              <p>
                Let's make your next occasion unforgettable, one slice at a time. 🎂
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutBaker;
