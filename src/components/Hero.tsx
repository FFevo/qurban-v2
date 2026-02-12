"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ── Animated counter ── */
function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const duration = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      +{count.toLocaleString("fr-FR")}
    </span>
  );
}

/* ── All proof images with desktop positioning data ── */
const proofImages = [
  { src: "/images/proofs/1.png", alt: "Preuve 1", rotate: -3, yOffset: 0 },
  { src: "/images/proofs/2.png", alt: "Preuve 2", rotate: 2, yOffset: 12 },
  { src: "/images/proofs/3.jpg", alt: "Preuve 3", rotate: -1.5, yOffset: -8 },
  { src: "/images/proofs/4.png", alt: "Preuve 4", rotate: 2.5, yOffset: 6 },
  { src: "/images/proofs/5.png", alt: "Preuve 5", rotate: -2, yOffset: -10 },
  { src: "/images/proofs/7.jpg", alt: "Preuve 7", rotate: 1.5, yOffset: 8 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const todayLabel = useMemo(() => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden section-dark"
    >
      {/* Parallax BG */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="/images/hero/kids.png"
          alt="Enfants beneficiaires"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/90 via-bg-dark/75 to-bg-dark" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-20 flex flex-col items-center text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="mb-6 border-gold/40 bg-gold/10 text-gold px-4 py-1.5 text-xs font-heading tracking-widest"
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-qurban-green-light animate-pulse" />
            UN AID SIMPLE, UN IMPACT IMMENSE
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-4xl"
        >
          DELEGUEZ VOTRE SACRIFICE DE L&apos;AID EN AFRIQUE ET OFFREZ JUSQU&apos;A{" "}
          <span className="font-accent shimmer-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            15 REPAS
          </span>{" "}
          EN DISTRIBUANT LA VIANDE DANS UN VILLAGE MUSULMAN
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-text-muted-dark leading-relaxed"
        >
          Grace a vous, nous avons distribue plus de{" "}
          <strong className="text-text-light">30&apos;000 repas</strong> a des
          musulmans dans le besoin. Soyez parmi les premiers a reserver votre
          sacrifice avant rupture de stock.
        </motion.p>

        {/* ═══ DESKTOP: Video with floating images ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 w-full max-w-5xl hidden lg:block"
        >
          <div className="relative">
            {/* Floating images - Left side */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -3 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              className="absolute -left-4 top-2 w-[140px] z-10"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/50 ring-1 ring-gold/10">
                <Image src="/images/proofs/1.png" alt="Preuve 1" fill sizes="140px" className="object-cover" loading="lazy" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, rotate: 4 }}
              animate={{ opacity: 1, x: 0, rotate: 2 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              className="absolute left-8 -bottom-6 w-[130px] z-10"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/50 ring-1 ring-gold/10">
                <Image src="/images/proofs/2.png" alt="Preuve 2" fill sizes="130px" className="object-cover" loading="lazy" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: -1.5 }}
              transition={{ duration: 0.7, delay: 1 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              className="absolute -left-8 bottom-[38%] w-[120px] z-10"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/50 ring-1 ring-gold/10">
                <Image src="/images/proofs/3.jpg" alt="Preuve 3" fill sizes="120px" className="object-cover" loading="lazy" />
              </div>
            </motion.div>

            {/* Floating images - Right side */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 6 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              className="absolute -right-4 top-2 w-[140px] z-10"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/50 ring-1 ring-gold/10">
                <Image src="/images/proofs/4.png" alt="Preuve 4" fill sizes="140px" className="object-cover" loading="lazy" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              className="absolute right-8 -bottom-6 w-[130px] z-10"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/50 ring-1 ring-gold/10">
                <Image src="/images/proofs/5.png" alt="Preuve 5" fill sizes="130px" className="object-cover" loading="lazy" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 1.5 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              className="absolute -right-8 bottom-[38%] w-[120px] z-10"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/50 ring-1 ring-gold/10">
                <Image src="/images/proofs/7.jpg" alt="Preuve 7" fill sizes="120px" className="object-cover" loading="lazy" />
              </div>
            </motion.div>

            {/* Center YouTube Video */}
            <div className="relative mx-auto max-w-2xl z-20 rounded-2xl overflow-hidden border-2 border-white/15 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] ring-1 ring-gold/10">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/I5EcCoSCCUk?rel=0&modestbranding=1"
                  title="Video Qurban"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ MOBILE + TABLET: Video + horizontal scroll strip ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 w-full lg:hidden"
        >
          {/* Video */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-white/15 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] ring-1 ring-gold/10 max-w-2xl mx-auto">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/I5EcCoSCCUk?rel=0&modestbranding=1"
                title="Video Qurban"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Horizontal scroll strip of proof images */}
          <div className="relative mt-5 -mx-4 sm:-mx-6">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-bg-dark to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-bg-dark to-transparent" />

            <div className="flex gap-3 overflow-x-auto px-6 pb-2 snap-x snap-mandatory scrollbar-hide">
              {proofImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, rotate: img.rotate }}
                  animate={{ opacity: 1, y: 0, rotate: img.rotate }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="relative flex-shrink-0 w-[120px] sm:w-[150px] snap-center"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-white/15 shadow-xl shadow-black/40 ring-1 ring-gold/10">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="150px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex justify-center"
        >
          <Button
            asChild
            className="rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-sm sm:text-base h-12 sm:h-14 px-8 sm:px-12 cta-shine cta-pulse shadow-2xl shadow-qurban-green/20"
          >
            <a href="/offrandes">COMMANDER MON SACRIFICE</a>
          </Button>
        </motion.div>

        {/* Urgency */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 text-xs sm:text-sm text-gold/80 font-heading tracking-wide uppercase"
        >
          DEPECHE-TOI ! LES MOUTONS SONT PEU NOMBREUX AU {todayLabel.toUpperCase()}
        </motion.p>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          {[
            { value: 3000, label: "commandes livrees" },
            { value: 30000, label: "repas distribues" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-3 text-center"
            >
              <p className="text-xl sm:text-2xl font-bold font-heading text-text-light">
                <AnimatedCounter target={s.value} />
              </p>
              <p className="text-[11px] text-text-muted-dark uppercase tracking-wider mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-3 text-center">
            <p className="text-xl sm:text-2xl font-bold font-heading text-text-light">
              100%
            </p>
            <p className="text-[11px] text-text-muted-dark uppercase tracking-wider mt-0.5">
              tracabilite video
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-3 text-center">
            <p className="text-xl sm:text-2xl font-bold font-heading text-text-light">
              4,8/5
            </p>
            <p className="text-[11px] text-text-muted-dark uppercase tracking-wider mt-0.5">
              satisfaction clients
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
