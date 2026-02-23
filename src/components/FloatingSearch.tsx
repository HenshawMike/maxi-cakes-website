import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

const FloatingSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { searchQuery, setSearchQuery } = useSearch();
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input and scroll to products when search bar opens
    useEffect(() => {
        if (isOpen) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
            // Scroll to the cakes showcase
            const section = document.getElementById("cakes");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [isOpen]);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && inputRef.current && !inputRef.current.contains(event.target as Node)) {
                // Only close if it's empty, or keep it open if the user is actively searching
                if (!searchQuery) setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, searchQuery]);

    return (
        <div className="fixed bottom-8 left-8 z-[5000] flex items-center">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0, x: -10 }}
                        animate={{ width: 250, opacity: 1, x: 0 }}
                        exit={{ width: 0, opacity: 0, x: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute left-14 flex items-center h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-[#2D3A24]/10 overflow-hidden"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search cakes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-full px-6 bg-transparent outline-none text-[#2D3A24] font-body"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="pr-4 text-[#2D3A24]/40 hover:text-[#2D3A24]"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-full shadow-2xl transition-colors duration-300 ${isOpen ? "bg-[#4A5D44] text-white" : "bg-white/90 text-[#2D3A24] backdrop-blur-md border border-[#2D3A24]/10"
                    }`}
            >
                <Search size={22} />
            </motion.button>
        </div>
    );
};

export default FloatingSearch;
