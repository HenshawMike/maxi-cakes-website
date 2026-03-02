import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useSearch } from "@/context/SearchContext";

const WHATSAPP_LINK =
  "https://api.whatsapp.com/send?phone=2348036774032&text=Hello%2C%20I'd%20like%20to%20order%20a%20cake%20from%20MAXI%20CAKES%20'N'%20PASTERIES.";

const navItems = [
  { label: "Cakes", href: "#cakes" },
  { label: "How to Order", href: "#how-to-order" },
  { label: "Contact", href: "#contact" },
];

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { searchQuery, setSearchQuery } = useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const cakesSection = document.getElementById("cakes");
      if (cakesSection) {
        const offset = cakesSection.offsetTop - 100; // Trigger slightly before the section
        setScrolled(window.scrollY >= offset);
      } else {
        setScrolled(window.scrollY > 40);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial check
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
        ? "bg-white shadow-sm py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <a 
          href="#" 
          className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? "text-bakery-dark" : "text-white"
          }`}
        >
          MAXI CAKES
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled 
                    ? "text-primary/90 hover:text-primary" 
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="relative group/search h-10 flex items-center">
            <input
              type="text"
              placeholder="Search pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`h-9 px-4 pl-10 rounded-full text-sm outline-none transition-all duration-300 w-48 focus:w-64 border ${
                scrolled 
                  ? "bg-muted border-border text-foreground placeholder:text-primary/80" 
                  : "bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/20"
              }`}
            />
            <Search className={`absolute left-3 w-4 h-4 ${scrolled ? "text-muted-foreground" : "text-white/60"}`} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute right-3 p-1 rounded-full ${scrolled ? "hover:bg-muted" : "hover:bg-white/10"}`}
              >
                <X className={`w-3 h-3 ${scrolled ? "text-muted-foreground" : "text-white/80"}`} />
              </button>
            )}
          </div>

          <Button variant="whatsapp" size="sm" asChild>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="w-4 h-4" />
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
            className={`w-5 h-[1.5px] rounded-full transition-colors duration-300 ${
              scrolled || menuOpen ? "bg-bakery-dark" : "bg-white"
            }`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`w-5 h-[1.5px] rounded-full transition-colors duration-300 ${
              scrolled || menuOpen ? "bg-bakery-dark" : "bg-white"
            }`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`w-5 h-[1.5px] rounded-full transition-colors duration-300 ${
              scrolled || menuOpen ? "bg-bakery-dark" : "bg-white"
            }`}
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
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "fixed", inset: 0, zIndex: 9999 }}
              className="flex flex-col bg-white md:hidden overflow-y-auto"
            >
              <div className="flex-1 flex flex-col px-6 pt-24 pb-12 space-y-8 max-w-lg mx-auto w-full">
                <nav className="flex flex-col space-y-6 flex-1 justify-center">
                  {/* Mobile Search */}
                  <div className="relative group/search h-12 flex items-center mb-6">
                    <input
                      type="text"
                      placeholder="Search pastries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-full px-5 pl-12 rounded-2xl bg-muted border-border text-foreground text-lg outline-none placeholder:text-primary/80"
                    />
                    <Search className="absolute left-4 w-6 h-6 text-muted-foreground" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 p-2"
                      >
                        <X className="w-5 h-5 text-muted-foreground" />
                      </button>
                    )}
                  </div>

                  {navItems.map((item, index) => (
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-2xl font-medium text-bakery-dark active:opacity-60 transition-opacity"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-auto pt-8 border-t border-bakery-dark/10"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full h-auto py-4 text-lg bg-bakery-deep hover:bg-bakery-dark text-white rounded-xl shadow-lg whitespace-normal"
                    asChild
                  >
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                      <WhatsAppIcon className="w-6 h-6 shrink-0" />
                      <span>Order on WhatsApp</span>
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
