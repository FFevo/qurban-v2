"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (roughly 600px)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Backdrop blur bar */}
          <div className="bg-bg-dark/90 backdrop-blur-xl border-t border-gold/15 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
            <div className="mx-auto max-w-lg px-4 py-3 flex flex-col items-center gap-2">
              {/* Incitative text */}
              <p className="text-[11px] sm:text-xs text-gold/90 font-heading tracking-wide text-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse mr-1.5 relative top-[-1px]" />
                STOCKS LIMITES — NE RATE PAS TON SACRIFICE CETTE ANNEE
              </p>
              {/* CTA Button */}
              <Button
                asChild
                className="w-full sm:w-auto rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-sm h-11 px-10 cta-shine shadow-lg shadow-qurban-green/25 border border-gold/15"
              >
                <a href="#commander">RESERVER MON SACRIFICE MAINTENANT</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
