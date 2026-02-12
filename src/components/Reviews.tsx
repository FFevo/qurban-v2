"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const reviews = [
  {
    stars: 5,
    text: "Al hamdulillah, un service irreprochable. J'ai recu la video de mon sacrifice le jour meme. Qu'Allah vous recompense.",
    author: "Aicha M.",
    initials: "AM",
  },
  {
    stars: 5,
    text: "Troisieme annee consecutive avec Qurban. Toujours aussi fiable et transparent. Je recommande les yeux fermes.",
    author: "Youssef B.",
    initials: "YB",
  },
  {
    stars: 5,
    text: "Le rapport qualite-prix est imbattable. En plus on fait un acte de sadaqa qui profite a ceux qui en ont vraiment besoin.",
    author: "Fatima Z.",
    initials: "FZ",
  },
  {
    stars: 5,
    text: "Ma famille au complet a commande cette annee. La video nominative, c'est la preuve qui fait toute la difference.",
    author: "Karim D.",
    initials: "KD",
  },
  {
    stars: 4,
    text: "Tres content du service. La video est arrivee un peu tard mais le sacrifice etait conforme. Bravo a l'equipe.",
    author: "Omar S.",
    initials: "OS",
  },
  {
    stars: 5,
    text: "Barakallahu fikum pour ce projet magnifique. Les beneficiaires avaient le sourire, ca fait chaud au coeur.",
    author: "Nadia L.",
    initials: "NL",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="text-gold text-sm tracking-wide">
      {Array.from({ length: 5 }, (_, i) => (i < count ? "\u2605" : "\u2606")).join("")}
    </span>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <section ref={ref} id="avis" className="section-dark-alt py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <Badge
            variant="outline"
            className="border-gold/30 bg-gold/10 text-gold px-4 py-1.5 text-xs font-heading tracking-wide"
          >
            <span className="text-gold mr-1.5">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            4.8 sur +3000 commandes
          </Badge>
        </motion.div>

        {/* Title + Nav */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-end justify-between mb-10"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-light">
            DONATEURS{" "}
            <span className="font-accent shimmer-gold text-3xl sm:text-4xl md:text-5xl">
              SATISFAITS
            </span>
          </h2>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-gold/20 bg-gold/5 p-2.5 text-gold/60 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all"
              aria-label="Precedent"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-gold/20 bg-gold/5 p-2.5 text-gold/60 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all"
              aria-label="Suivant"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="snap-scroll flex gap-5 overflow-x-auto pb-4"
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -6 }}
              className="snap-item flex-shrink-0 w-[290px] sm:w-[330px]"
            >
              {/* Card with gold gradient border */}
              <div className="relative h-full rounded-2xl p-px bg-gradient-to-br from-gold/30 via-transparent to-gold/10">
                <div className="h-full rounded-2xl bg-bg-card-dark p-6 flex flex-col justify-between">
                  {/* Quote icon */}
                  <div>
                    <svg className="h-8 w-8 text-gold/20 mb-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.3 2.5c-2 .4-3.7 1.4-5 2.8C5 6.6 4.2 8.3 3.8 10.2c-.2.7-.3 1.4-.3 2.2 0 2.3.8 4.2 2.3 5.7 1.5 1.5 3.3 2.2 5.4 2.2.4 0 .7-.3.7-.7v-1.3c0-.4-.3-.7-.7-.7-1.3 0-2.4-.5-3.3-1.4-.9-.9-1.4-2-1.4-3.3 0-.4.1-.9.2-1.3h4.5c.4 0 .7-.3.7-.7V3.2c0-.4-.3-.7-.7-.7h-.9zm9.5 0c-2 .4-3.7 1.4-5 2.8-1.3 1.3-2.1 3-2.5 4.9-.2.7-.3 1.4-.3 2.2 0 2.3.8 4.2 2.3 5.7 1.5 1.5 3.3 2.2 5.4 2.2.4 0 .7-.3.7-.7v-1.3c0-.4-.3-.7-.7-.7-1.3 0-2.4-.5-3.3-1.4-.9-.9-1.4-2-1.4-3.3 0-.4.1-.9.2-1.3h4.5c.4 0 .7-.3.7-.7V3.2c0-.4-.3-.7-.7-.7h-.9z" />
                    </svg>
                    <Stars count={r.stars} />
                    <p className="mt-3 text-sm text-text-light/80 leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                  {/* Author */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold text-xs font-heading font-bold">
                      {r.initials}
                    </div>
                    <span className="text-sm font-heading text-text-light/90">
                      {r.author}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
