"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const proofImages = [
  "/images/proofs/1.png",
  "/images/proofs/2.png",
  "/images/proofs/4.png",
  "/images/proofs/5.png",
  "/images/proofs/7.jpg",
  "/images/proofs/8.jpg",
];

export default function ProofVideo() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="preuve" className="section-light py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-dark">
            LA MEILLEURE DES GARANTIES ?
          </h2>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-dark mt-1">
            RECEVEZ LA{" "}
            <span className="font-accent shimmer-gold-on-light text-3xl sm:text-4xl md:text-5xl">
              PREUVE VIDEO
            </span>{" "}
            DANS VOTRE BOITE MAIL
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-full overflow-hidden"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-bg-warm to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-bg-warm to-transparent" />

        <div className="marquee-track flex gap-4">
          {[...proofImages, ...proofImages].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[240px] sm:w-[280px] aspect-[9/16] relative rounded-xl overflow-hidden border border-black/8 shadow-md"
            >
              <Image
              src={src}
              alt={`Preuve video ${(i % proofImages.length) + 1}`}
              fill
              sizes="280px"
              className="object-cover"
              loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Counter Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mx-auto max-w-lg mt-12 flex items-center justify-center gap-4 rounded-2xl border border-black/8 bg-white/90 px-6 py-4 shadow-sm"
      >
        <Image
          src="/images/brand/logo.png"
          alt="Logo Qurban"
          width={40}
          height={40}
          className="h-10 w-10"
        />
        <p className="text-sm sm:text-base text-text-dark font-heading">
          Grace a vous <strong className="text-qurban-green">+30&apos;000 repas</strong>{" "}
          distribues en 4 ans
        </p>
      </motion.div>
    </section>
  );
}
