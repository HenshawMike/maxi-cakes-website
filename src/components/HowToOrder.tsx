import { motion } from "framer-motion";
import { Search, MousePointerClick, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Our Cakes",
    desc: "Scroll through our handcrafted collection and find the cake that speaks to you.",
  },
  {
    icon: MousePointerClick,
    title: "Click to Order",
    desc: "Tap the order button on your favourite cake to start the conversation.",
  },
  {
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    desc: "We'll confirm your order details, customise to your taste, and arrange delivery.",
  },
];

const HowToOrder = () => {
  return (
    <section id="how-to-order" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-accent mb-3">
            Simple & Sweet
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            How to Order
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
