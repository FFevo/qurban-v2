"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "Le mouton est-il sacrifie en mon nom ?",
    a: "Oui le mouton est sacrifie au nom que vous choisissez lors de la commande, il est mentionne dans la video de l'abattage.",
  },
  {
    q: "Comment savoir si mon mouton a bien ete sacrifie ?",
    a: "Une video nominative du sacrifice vous sera envoyee par email afin de vous prouver qu'il a bien eu lieu.",
  },
  {
    q: "Qui sacrifiera mon mouton ?",
    a: "Un membre de notre equipe est sur place et s'assure que le sacrifice est conforme a la Sounnah et fait en votre nom.",
  },
  {
    q: "Ou est abattu mon mouton ?",
    a: "Tous nos moutons sont eleves et abattus a Madagascar ou en Tanzanie dans diverses regions, nous redistribuons localement aux demunis la viande issue de votre sacrifice pour faire vivre a chacun la joie d'un Aid genereux en famille.",
  },
  {
    q: "Quel age a mon mouton ?",
    a: "Conformement aux conditions de validite mentionnees par le Prophete \uFDFA toutes nos betes ont plus de 1 an.",
  },
  {
    q: "Est-ce qu'il est obligatoire de sacrifier pour l'Aid ?",
    a: "Le Prophete \uFDFA a dit : \u00ABCelui qui est aise et ne fait pas le sacrifice (du jour de l'Aid) ; alors, qu'il n'approche pas notre Mousalla\u00BB Rapporte par Ibn Maja. Dans les ecoles Hanafite il est obligatoire (wajib) pour celui qui en a les moyens. Dans les ecoles Malikite et Hanbalite il est obligatoire (wajib) pour certains et a ne pas delaisser pour d'autres (sunnah muakkadah). Dans l'ecole Chafiite il est considere sunnah muakkadah.",
  },
  {
    q: "Quelle est la date de l'Aid al-Adha (Bayram) en 2026 ?",
    a: "Cette annee l'Aid al-Kbir est prevu pour le 27 Mai 2026 du calendrier gregorien, la fete dure 4 jours en ajoutant les 3 jours de tachriq 28, 29 et 30 Mai 2026.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} id="faq" className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-dark mb-12"
        >
          QUESTIONS{" "}
          <span className="font-accent shimmer-gold-on-light text-3xl sm:text-4xl md:text-5xl">
            FREQUENTES
          </span>
        </motion.h2>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-black/8"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-heading text-text-dark hover:no-underline py-5 [&[data-state=open]]:text-qurban-green">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-muted-light leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
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
