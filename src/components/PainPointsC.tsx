"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

/**
 * VARIANTE C — "Carousel Cinématique"
 * Grande cartes numérotées en horizontal scroll avec gradient,
 * très immersif style Apple/Stripe. Le constat est une intro dramatique.
 */

const painPoints = [
  { text: "Il est interdit de sacrifier soi-meme (en France)", short: "INTERDIT" },
  { text: "Il n'y a pas de place dans les abattoirs", short: "PAS DE PLACE" },
  { text: "Les prix des betes sont exorbitants (jusqu'a 400\u20AC)", short: "TROP CHER" },
  { text: "Tu ne sais pas ou stocker toute la viande", short: "STOCKAGE" },
  { text: "Tu vas jeter la moitie parce qu'elle va pourrir", short: "GASPILLAGE" },
  { text: "Tu as encore du mouton de l'an passe dans ton congelateur", short: "SURPLUS" },
  { text: "En plus de tout ca ? Tu n'aimes pas la viande de mouton", short: "GOUT" },
];

export default function PainPointsC() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const todayLabel = useMemo(() => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date()).toUpperCase();
  }, []);

  return (
    <section ref={ref} className="section-light py-20 sm:py-28 relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-dark leading-[1.15]">
            RESERVE TON MOUTON MAINTENANT POUR RECEVOIR TA VIDEO AVANT QUE LES{" "}
            <span className="font-accent shimmer-gold-on-light text-3xl sm:text-4xl md:text-5xl">STOCKS</span>{" "}
            SOIENT EPUISES
          </h2>
          <p className="mt-3 text-xs text-gold font-heading tracking-wide">
            DEPECHE-TOI ! LES MOUTONS SONT PEU NOMBREUX AU {todayLabel}
          </p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.15 }} className="mt-8 flex justify-center">
            <Button asChild className="rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-xs sm:text-sm h-11 sm:h-12 px-6 sm:px-10 cta-shine cta-pulse">
              <a href="#commander">RESERVER MON SACRIFICE NOMINATIF MAINTENANT</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* ── Dramatic Constat intro ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-300/30 mb-6">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-600 text-xs font-heading tracking-widest uppercase">Le constat</span>
          </div>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-text-dark leading-[1.05]">
            Tous les ans<br />
            c&apos;est la <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">meme</span> chose...
          </h3>
          <p className="mt-4 text-sm sm:text-base text-text-muted-light max-w-lg mx-auto">
            Tu rencontres <strong className="text-text-dark">les memes difficultes</strong> pour pratiquer ton sacrifice de l&apos;aid al-adha.
          </p>
        </motion.div>
      </div>

      {/* ── Horizontal Scroll Cards ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 relative"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-bg-warm to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-bg-warm to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-6 sm:px-12 pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {painPoints.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="flex-shrink-0 w-[260px] sm:w-[300px] snap-center group"
            >
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-white to-red-50/50 border border-red-200/50 p-6 shadow-sm hover:shadow-xl hover:border-red-300/60 hover:-translate-y-2 transition-all duration-300">
                {/* Number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[48px] font-heading font-bold text-red-500/10 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-heading tracking-widest text-red-400/60 uppercase">
                    {p.short}
                  </span>
                </div>

                {/* Icon + Text */}
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 group-hover:bg-red-500/15 transition-colors">
                    <svg className="h-3.5 w-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  <span className="text-sm text-text-dark/80 font-medium leading-snug">
                    {p.text}
                  </span>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-red-300/40 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Conclusion ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-qurban-green/[0.06] via-gold/[0.03] to-transparent border border-qurban-green/15 p-6 sm:p-8 text-center"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-qurban-green leading-snug">
            Alors qu&apos;est-ce que tu attends pour{" "}
            <span className="font-accent shimmer-gold-on-light text-xl sm:text-2xl md:text-3xl">reserver ton offrande en video</span> ?
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-6 flex justify-center"
          >
            <Button asChild className="rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-xs sm:text-sm h-11 sm:h-12 px-6 sm:px-10 cta-shine cta-pulse">
              <a href="#commander">RESERVER MON SACRIFICE NOMINATIF MAINTENANT</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
