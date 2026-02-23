import { Instagram } from "lucide-react";

const Footer = () => (
  <footer className="py-10 bg-bakery-dark border-t border-border/10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="font-display text-lg font-bold text-primary-foreground/80">
        MAXI CAKES 'N' PASTERIES
      </div>
      <p className="font-body text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} Maxi Cakes. All rights reserved.
      </p>
      <a
        href="#"
        className="text-primary-foreground/50 hover:text-accent transition-colors"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="w-5 h-5" />
      </a>
    </div>
  </footer>
);

export default Footer;
