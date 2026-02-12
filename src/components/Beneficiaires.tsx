"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Beneficiaires() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="beneficiaires" className="section-dark py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-light mb-10"
        >
          CE QU&apos;EN DISENT LES{" "}
          <span className="font-accent shimmer-gold text-3xl sm:text-4xl md:text-5xl">
            BENEFICIAIRES
          </span>
        </motion.h2>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30"
        >
          <video
            controls
            preload="metadata"
            poster="/images/proofs/8.jpg"
            className="w-full aspect-video"
          >
            <source src="/videos/beneficiaires.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la video HTML5.
          </video>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Button
            asChild
            className="rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-sm sm:text-base h-12 sm:h-14 px-8 sm:px-12 cta-shine cta-pulse"
          >
            <a href="#commander">COMMANDER MON SACRIFICE</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
