import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK =
  "https://wa.me/?text=Hello%2C%20I'd%20like%20to%20order%20a%20cake%20from%20MAXI%20CAKES%20'N'%20PASTERIES.";

const navItems = [
  { label: "Cakes", href: "#cakes" },
  { label: "About", href: "#about" },
  { label: "How to Order", href: "#how-to-order" },
  { label: "Contact", href: "#contact" },
];

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/80 backdrop-blur-lg shadow-sm py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground transition-colors duration-300">
          MAXI CAKES
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <Button variant="whatsapp" size="sm" asChild>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Order Now
            </a>
          </Button>
        </nav>

        {/* Mobile toggle (Animated Hamburger) */}
        <button
          className="md:hidden relative z-[10000] w-7 h-7 flex flex-col items-center justify-center gap-[5px] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-5 h-[1.5px] bg-foreground rounded-full"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-[1.5px] bg-foreground rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-5 h-[1.5px] bg-foreground rounded-full"
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark backdrop for the "other half" of the screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "fixed", top: 0, left: 0, right: 0, maxHeight: "80vh", zIndex: 9999 }}
              className="flex flex-col bg-[#F1F0E8] md:hidden overflow-y-auto rounded-b-[2rem] shadow-2xl border-b border-[#2D3A24]/10"
            >
              <div className="flex-1 flex flex-col px-6 pt-24 pb-12 space-y-8">
                <nav className="flex flex-col space-y-8">
                  {navItems.map((item, index) => (
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-2xl font-medium text-[#2D3A24] active:opacity-60 transition-opacity"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-auto pt-8 border-t border-[#2D3A24]/10"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full h-16 text-lg bg-[#4A5D44] hover:bg-[#3d4d38] text-white rounded-xl shadow-lg"
                    asChild
                  >
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      Order on WhatsApp
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default StickyHeader;
