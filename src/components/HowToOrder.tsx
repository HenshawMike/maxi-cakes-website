import { useEffect, useRef } from "react";
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
    <section id="how-to-order" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 fade-up" ref={ref}>
        <p className="font-body text-sm tracking-[0.2em] uppercase text-accent text-center mb-3">
          Simple & Sweet
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          How to Order
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center group">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold font-body">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
