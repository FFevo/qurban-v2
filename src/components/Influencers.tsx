"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const influencers = [
  {
    name: "BEDIS",
    role: "INFLUENCEUR VOYAGE",
    followers: "293K",
    photo: "/images/influenceurs/bedis.png",
    handle: "@bedis",
  },
  {
    name: "CH. ALAIN ALI",
    role: "IMAM DIPLOME EN CHARI'AH",
    followers: "98K",
    photo: "/images/influenceurs/ch_alain_ali.jpg",
    handle: "@ch.alainali",
  },
  {
    name: "RAYGDRR",
    role: "CREATEUR DE CONTENU",
    followers: "523K",
    photo: "/images/influenceurs/raygdrr.jpg",
    handle: "@raygdrr",
  },
  {
    name: "MAREA SAADI",
    role: "YOUTUBEUSE",
    followers: "631K",
    photo: "/images/influenceurs/marea_saadi.jpg",
    handle: "@mareasaadi",
  },
  {
    name: "IMENE SHETAE",
    role: "CREATRICE MUSULMANE",
    followers: "732K",
    photo: "/images/influenceurs/imene_shetae.jpg",
    handle: "@imeneshetae",
  },
];

export default function Influencers() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="recommandations" className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-dark">
            ILS NOUS{" "}
            <span className="font-accent shimmer-gold-on-light text-3xl sm:text-4xl md:text-5xl">
              RECOMMANDENT
            </span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {influencers.map((inf, i) => (
            <motion.div
              key={inf.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(212,168,83,0.12)" }}
              className="group w-[150px] sm:w-[170px] rounded-2xl border border-black/8 bg-white/90 p-4 text-center shadow-sm transition-all"
            >
              {/* Avatar */}
              <div className="relative mx-auto mb-3 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-gold/20">
                <Image
                  src={inf.photo}
                  alt={inf.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Followers Badge */}
              <Badge
                variant="outline"
                className="mx-auto mb-2 text-[10px] border-qurban-green/20 bg-qurban-green/5 text-qurban-green font-heading"
              >
                {/* Instagram icon */}
                <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                {inf.followers} Abonnes
              </Badge>

              {/* Name */}
              <h3 className="font-heading text-xs sm:text-sm font-bold text-text-dark tracking-tight">
                {inf.name}
              </h3>

              {/* Role */}
              <p className="mt-0.5 text-[10px] text-text-muted-light font-heading tracking-wider uppercase">
                {inf.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
