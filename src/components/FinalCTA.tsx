"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <>
      {/* CTA Section */}
      <section ref={ref} id="commander" className="section-dark relative py-24 sm:py-32 overflow-hidden">
        {/* Gold radial glow effect */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(212,168,83,0.08) 0%, rgba(212,168,83,0.03) 40%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 70%, rgba(22,101,52,0.15) 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-light"
          >
            TOUJOURS{" "}
            <span className="font-accent shimmer-gold text-4xl sm:text-5xl md:text-6xl">
              LA ?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg sm:text-xl text-text-muted-dark"
          >
            Merci d&apos;avoir lu jusqu&apos;au bout
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-2 text-2xl sm:text-3xl font-heading font-bold text-text-light"
          >
            Tout est dit !
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-2 text-base sm:text-lg text-text-muted-dark"
          >
            Maintenant{" "}
            <strong className="text-text-light">passe a l&apos;action</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 relative flex justify-center"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-20 rounded-full bg-gold/10 blur-2xl" />
            <Button
              asChild
              className="relative rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-sm sm:text-base h-12 sm:h-14 px-8 sm:px-12 cta-shine cta-pulse shadow-2xl shadow-qurban-green/30 border border-gold/20"
            >
              <a href="/offrandes">COMMANDER MON SACRIFICE</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-dark border-t border-white/5 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            {/* Brand + Payments - centered */}
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/images/brand/logo.png"
                alt="Qurban"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <p className="text-xs font-heading text-text-muted-dark uppercase tracking-wider">
                Paiement securise
              </p>
              <div className="flex items-center justify-center gap-5">
                <Image
                  src="/images/brand/visa.png"
                  alt="Visa"
                  width={44}
                  height={28}
                  className="h-7 w-auto opacity-60"
                />
                <Image
                  src="/images/brand/mastercard.png"
                  alt="Mastercard"
                  width={44}
                  height={28}
                  className="h-7 w-auto opacity-60"
                />
                <Image
                  src="/images/brand/ApplePay.svg"
                  alt="Apple Pay"
                  width={44}
                  height={28}
                  className="h-7 w-auto opacity-60"
                />
                <Image
                  src="/images/brand/GooglePay.svg"
                  alt="Google Pay"
                  width={44}
                  height={28}
                  className="h-7 w-auto opacity-60"
                />
              </div>
            </div>

            {/* Links - centered on mobile */}
            <div className="flex justify-center gap-10 sm:gap-12 text-xs">
              <div className="text-center md:text-left">
                <h6 className="font-heading text-text-muted-dark uppercase tracking-wider mb-2">
                  Navigation
                </h6>
                <a
                  href="/offrandes"
                  className="text-text-light/60 hover:text-gold transition-colors"
                >
                  Offrandes
                </a>
              </div>
              <div className="text-center md:text-left">
                <h6 className="font-heading text-text-muted-dark uppercase tracking-wider mb-2">
                  Partenaire
                </h6>
                <a
                  href="#"
                  className="text-text-light/60 hover:text-gold transition-colors"
                >
                  Connexion
                </a>
              </div>
              <div className="text-center md:text-left">
                <h6 className="font-heading text-text-muted-dark uppercase tracking-wider mb-2">
                  Legal
                </h6>
                <a
                  href="#"
                  className="text-text-light/60 hover:text-gold transition-colors"
                >
                  CGS
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-white/5" />

          <p className="text-center text-xs text-text-muted-dark pb-20">
            &copy; 2026 Qurban. Tous droits reserves.
          </p>
        </div>
      </footer>
    </>
  );
}
