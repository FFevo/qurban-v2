"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const painPoints = [
  { text: "Il est interdit de sacrifier soi-meme (en France)", icon: "ban" },
  { text: "Il n'y a pas de place dans les abattoirs", icon: "building" },
  { text: "Les prix des betes sont exorbitants (jusqu'a 400\u20AC)", icon: "money" },
  { text: "Tu ne sais pas ou stocker toute la viande", icon: "box" },
  { text: "Tu vas jeter la moitie parce qu'elle va pourrir", icon: "trash" },
  { text: "Tu as encore du mouton de l'an passe dans ton congelateur", icon: "snow" },
  { text: "En plus de tout ca ? Tu n'aimes pas la viande de mouton", icon: "no" },
];

function PainIcon() {
  return (
    <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const todayLabel = useMemo(() => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(new Date())
      .toUpperCase();
  }, []);

  return (
    <section ref={ref} id="reserve" className="section-light py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #166534 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-dark max-w-3xl mx-auto"
        >
          RESERVE TON MOUTON MAINTENANT POUR RECEVOIR TA VIDEO AVANT QUE LES{" "}
          <span className="font-accent shimmer-gold-on-light text-3xl sm:text-4xl md:text-5xl">
            STOCKS
          </span>{" "}
          SOIENT EPUISES
        </motion.h2>

        {/* CTA top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-col items-center"
        >
          <Button
            asChild
            className="rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-xs sm:text-sm h-11 sm:h-12 px-6 sm:px-10 cta-shine cta-pulse whitespace-nowrap"
          >
            <a href="#commander">RESERVER MON SACRIFICE NOMINATIF MAINTENANT</a>
          </Button>
          <p className="mt-3 text-xs text-gold font-heading tracking-wide text-center">
            DEPECHE-TOI ! LES MOUTONS SONT PEU NOMBREUX AU {todayLabel}
          </p>
        </motion.div>

        {/* Two-column layout: left text + right pain points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 grid lg:grid-cols-5 gap-8 lg:gap-12 items-start"
        >
          {/* Left: intro text */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <Badge
              variant="outline"
              className="border-red-300/40 bg-red-50 text-red-600 px-3 py-1 text-xs font-heading mb-4"
            >
              LE CONSTAT
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-dark leading-tight">
              Tous les ans c&apos;est la meme chose...
            </h3>
            <p className="mt-4 text-sm sm:text-base text-text-muted-light leading-relaxed">
              Tu rencontres{" "}
              <strong className="text-text-dark">
                les memes difficultes pour pratiquer ton sacrifice
              </strong>{" "}
              de l&apos;aid al-adha, la sounnah de la aqiqah, ou un kurban en sadaqah ou
              tu vis.
            </p>

            {/* Conclusion CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="mt-8 rounded-2xl border border-qurban-green/15 bg-qurban-green/5 p-5"
            >
              <p className="text-base sm:text-lg font-heading font-bold text-qurban-green leading-snug">
                Alors qu&apos;est-ce que tu attends pour{" "}
                <span className="font-accent shimmer-gold-on-light text-lg sm:text-xl">
                  reserver ton offrande en video
                </span>{" "}
                ?
              </p>
            </motion.div>
          </div>

          {/* Right: pain points as stacked cards */}
          <div className="lg:col-span-3 space-y-3">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                whileHover={{ x: -4, scale: 1.01 }}
                className="group flex items-center gap-4 rounded-xl border border-red-200/60 bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md hover:border-red-300/80"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 group-hover:bg-red-500/15 transition-colors">
                  <PainIcon />
                </span>
                <span className="text-sm sm:text-base text-text-dark/85 font-medium leading-snug">
                  {point.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <Button
            asChild
            className="rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-xs sm:text-sm h-11 sm:h-12 px-6 sm:px-10 cta-shine cta-pulse whitespace-nowrap"
          >
            <a href="#commander">RESERVER MON SACRIFICE NOMINATIF MAINTENANT</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
