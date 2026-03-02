import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";

const WHATSAPP_LINK =
    "https://api.whatsapp.com/send?phone=2348036774032&text=Hello%2C%20I'd%20like%20to%20order%20from%20MAXI%20CAKES%20'N'%20PASTERIES.";

const FloatingOrder = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const cakesSection = document.getElementById("cakes");
            const contactSection = document.getElementById("contact");
            
            let shouldShow = false;

            // Show as soon as the 'Baked to Perfection' section (cakes) starts appearing
            if (cakesSection) {
                const rect = cakesSection.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    shouldShow = true;
                }
            }

            // Hide if we've reached the middle of the Contact section
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                const middleOfScreen = window.innerHeight / 2;
                if (rect.top < middleOfScreen) {
                    shouldShow = false;
                }
            }

            setIsVisible(shouldShow);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="md:hidden fixed bottom-4 right-4 z-[5000]">
                    <motion.a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-full shadow-2xl font-display font-semibold text-sm tracking-wide border border-white/20 backdrop-blur-sm"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        <span>Order Now</span>
                    </motion.a>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FloatingOrder;
