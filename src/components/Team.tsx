"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

const teamPhotos = [
  { src: "/images/team/2.jpg", alt: "Equipe terrain" },
  { src: "/images/team/4.jpg", alt: "Equipe terrain" },
  { src: "/images/team/5.jpg", alt: "Equipe terrain" },
  { src: "/images/team/6.jpg", alt: "Equipe terrain" },
];

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="equipe" className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-dark mb-12"
        >
          NOTRE{" "}
          <span className="font-accent shimmer-gold-on-light text-3xl sm:text-4xl md:text-5xl">
            EQUIPE
          </span>
        </motion.h2>

        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 max-w-3xl mx-auto"
        >
          {teamPhotos.map((photo, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative aspect-[3/4] overflow-hidden rounded-xl border border-black/8 shadow-md"
            >
              <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
              className="object-cover"
              loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-3xl space-y-5 text-sm sm:text-base text-text-muted-light leading-relaxed"
        >
          <p>
            Chez Qurban, nous ne vendons pas des moutons.{" "}
            <strong className="text-text-dark">
              Nous rehabilitons une sounnah delaissee.
            </strong>{" "}
            Notre equipe internationale de 11 membres est repartie aux quatre coins du
            globe : Medine, Paris, Lyon, Antananarivo, Rabat et Le Caire. Avec un fort
            engagement dans{" "}
            <strong className="text-text-dark">
              les sciences islamiques, la da&apos;wah et la tech
            </strong>
            , avec un objectif clair : permettre a chaque musulman d&apos;Occident
            d&apos;accomplir son sacrifice de l&apos;Aid en toute confiance, dans le
            respect rigoureux des rites.
          </p>
          <p>
            A la tete du projet,{" "}
            <strong className="text-text-dark">Fatih et Romain</strong>, les fondateurs.
            L&apos;un, stratege et etudiant en sciences islamiques, l&apos;autre,
            ingenieur fullstack qui a developpe l&apos;infrastructure technique de A a Z.
            Autour d&apos;eux, Sara assure la coordination, Omar encadre le terrain avec
            son experience precieuse, Hikma gere l&apos;operationnel a Madagascar avec
            une rigueur rare.
          </p>
          <p>
            Pendant l&apos;Aid, l&apos;equipe se divise sur trois regions de Madagascar.
            Routes impraticables, villages isoles, nuits sans sommeil :{" "}
            <strong className="text-text-dark">
              nous allons la ou personne ne va.
            </strong>{" "}
            Chaque contributeur a le droit a sa propre video personnalisee. Aucun
            sacrifice generique. Chaque mouton est sacrifie en votre nom, dans le respect
            strict de la sounnah.
          </p>
          <p>
            La conformite religieuse est supervisee par le{" "}
            <strong className="text-text-dark">Chaykh Omar</strong>, imam a La Reunion et
            diplome de Darul Uloom Zakariyah. Rien n&apos;est laisse au hasard.
          </p>
          <p className="text-center text-lg sm:text-xl font-heading font-bold text-text-dark pt-4">
            Plus qu&apos;un service.{" "}
            <span className="font-accent shimmer-gold-on-light text-xl sm:text-2xl">
              Une responsabilite.
            </span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
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
