import { motion } from "framer-motion";
import { Sparkles, Heart, Clock, Star } from "lucide-react";

/**
 * AboutBaker component replaced with a more creative "Philosophy & Craft" section
 * to highlight the brand's standards and passion.
 */
const AboutBaker = () => {
  const qualities = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Finest Ingredients",
      description: "We source only premium, organic, and locally-produced ingredients to ensure every bite is a masterpiece of flavor.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Handcrafted with Love",
      description: "Each pastry is made from scratch with meticulous attention to detail and a genuine passion for the art of baking.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Baked to Order",
      description: "Our ovens are always warm. Everything we deliver is freshly baked specifically for your occasion, never stored.",
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-bakery-cream/30">
      {/* Floating Decorative Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-64 h-64 bg-bakery-sage/10 rounded-full blur-3xl -z-10" 
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-bakery-deep/5 rounded-full blur-3xl -z-10" 
      />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bakery-sage/10 text-bakery-sage border border-bakery-sage/20 mb-6"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">The Maxi Standard</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold text-bakery-dark mb-6 leading-[1.1]"
          >
            Where Art Meets <span className="italic font-normal text-bakery-sage">The Oven</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg text-bakery-neutral max-w-2xl mx-auto leading-relaxed"
          >
            At Maxi Cakes, we don't just bake; we design edible experiences. 
            Every layer tells a story of tradition, innovation, and uncompromising quality.
          </motion.p>
        </div>

        {/* Qualities Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {qualities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.8 }}
              className="group bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bakery-sage/20 to-bakery-sage/5 flex items-center justify-center text-bakery-sage mb-8 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="font-display text-2xl font-bold text-bakery-dark mb-4">{item.title}</h3>
              <p className="font-body text-bakery-neutral leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Creative Philosophy Callout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 md:mt-32 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-bakery-sage/5 to-bakery-deep/5 rounded-[3rem] blur-2xl group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative bg-bakery-dark text-white rounded-[3rem] p-10 md:p-20 overflow-hidden">
             {/* Decorative Background Icon */}
             <Star className="absolute -top-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
             
             <div className="max-w-3xl relative z-10">
               <h3 className="font-display text-3xl md:text-5xl lg:text-5xl text-white leading-tight mb-8">
                 "Our mission is to turn every celebration into a <span className="text-bakery-sage italic">sweet memory</span> that lasts a lifetime."
               </h3>
               <div className="flex items-center gap-6">
                  <div className="h-px w-16 bg-bakery-sage/50" />
                  <span className="font-body text-sm tracking-widest uppercase text-bakery-sage/80 font-medium">The Maxi Promise</span>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBaker;
