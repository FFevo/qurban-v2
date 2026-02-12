"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Service() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const todayLabel = useMemo(() => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <section ref={ref} id="service" className="section-dark py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <Badge
            variant="outline"
            className="border-gold/30 bg-gold/10 text-gold px-4 py-1.5 text-xs font-heading tracking-wide"
          >
            <span className="text-gold mr-1.5">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            4.8 sur +3000 commandes
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-light mb-12"
        >
          UN SERVICE FIABLE, CONFORME A LA SUNNAH ET{" "}
          <span className="font-accent shimmer-gold text-3xl sm:text-4xl md:text-5xl">
            100% TRACABLE
          </span>
        </motion.h2>

        {/* Letter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10"
        >
          <p className="text-sm text-text-muted-dark mb-4">
            Mis a jour : {todayLabel}
          </p>

          <div className="space-y-4 text-text-light/90 text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-text-light">Cher frere, chere soeur,</strong>
            </p>
            <p>
              Nous sommes conscients de la difficulte de pratiquer l&apos;obligation du
              qurban (debha) lors de l&apos;aid el-kebir, ainsi que la sounna de la aqiqa,
              ou bien une oudhiya en sadaqa en Europe.
            </p>
            <p>C&apos;est pourquoi :</p>
            <p>
              Nous avons decide depuis 2021 de vous proposer des solutions,{" "}
              <strong className="text-text-light">
                simples, transparentes et surtout impactantes.
              </strong>
            </p>
            <p>
              Beaucoup de musulmans d&apos;occident ont perdu ce gout pour la viande de
              mouton et preferent ne pas la consommer. De plus, les prix des moutons en
              Europe aujourd&apos;hui ont atteint des prix prohibitifs !
            </p>
            {/* Price badges */}
            <div className="flex flex-wrap justify-center gap-3 py-6">
              {["350\u20AC", "380\u20AC", "400\u20AC"].map((price, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="border-red-500/30 bg-red-500/10 text-red-400 px-4 py-2 text-base sm:text-lg font-heading font-bold"
                >
                  {price}
                </Badge>
              ))}
              <span className="flex items-center text-text-muted-dark text-sm">
                ...PARFOIS MEME PLUS !
              </span>
            </div>
            <p className="text-center">
              Alors n&apos;attendez pas, la solution est toute trouvee ! Accomplissez vos
              adorations en toute conformite
            </p>
            <div className="flex justify-center mt-4">
              <Badge
                variant="outline"
                className="border-qurban-green-light/40 bg-qurban-green-light/10 text-qurban-green-light px-6 py-2.5 text-base sm:text-lg font-heading font-bold tracking-wide"
              >
                MOITIE MOINS CHER
              </Badge>
            </div>
          </div>
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
            <a href="/offrandes">COMMANDER MON SACRIFICE</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
