"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function Founder() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} id="fondateur" className="section-dark-alt py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-light mb-12"
        >
          MOT DU{" "}
          <span className="font-accent shimmer-gold text-3xl sm:text-4xl md:text-5xl">
            FONDATEUR
          </span>
        </motion.h2>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col md:flex-row gap-8 md:gap-12 rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10"
        >
          {/* Photo */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-2xl border border-white/10 shadow-xl">
              <Image
                src="/images/team/simon.jpg"
                alt="Photo du fondateur"
                fill
                sizes="224px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-4 text-sm sm:text-base text-text-light/80 leading-relaxed">
            <p>
              Apres pres de 10 ans d&apos;action dans les organisations islamiques de
              jeunesse en France je me suis rendu compte des limites de certains modeles
              d&apos;organisation.
            </p>
            <p>
              <strong className="text-text-light">
                La confiance n&apos;exclu pas le controle
              </strong>
              , la transparence et la reddition des comptes sont essentiels au bon
              fonctionnement des organisations au profit de la communaute musulmane.
            </p>
            <p>
              Les musulmans sont de plus en plus exigeants et recherchent des services
              conformes, transparents, avec le plus haut degre de professionnalisme.
            </p>
            <p>
              C&apos;est ce que nous nous efforcons d&apos;accomplir depuis plus de 4 ans
              avec Qurban en Europe et en Amerique du Nord.
            </p>
            <p>
              Notre engagement, le meilleur service, pour plus de confiance, et un
              accomplissement de vos adorations avec l&apos;esprit tranquille et un coeur
              apaise bi idhi Llah.
            </p>
            <p className="pt-2 text-gold font-accent italic text-base sm:text-lg">
              Toute l&apos;equipe Qurban ainsi que moi meme souhaitons aux contributeurs
              ainsi qu&apos;aux beneficiaires une excellente fete de l&apos;Aid al-Adha
              pleine de benedictions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
