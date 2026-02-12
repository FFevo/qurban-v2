"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import OrderModal from "./OrderModal";

/* ─────────────────────────────────────
   DATA
   ───────────────────────────────────── */

export type OfferType = "sadaqah" | "aqiqah" | "aid";

export interface Offer {
  id: OfferType;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  stockLeft: number;
  badge?: string;
  features: string[];
  popular?: boolean;
  hasGender?: boolean;
}

const offers: Offer[] = [
  {
    id: "sadaqah",
    title: "SADAQAH",
    subtitle: "Offrande volontaire",
    description:
      "Offrez un mouton aux plus demunis pour nourrir jusqu'a 15 personnes.",
    price: 199,
    image: "/images/offrandes/sadaqah.png",
    inStock: true,
    stockLeft: 14,
    features: [
      "Sacrifice en votre nom",
      "Video nominative",
      "Distribue aux necessiteux",
      "Nourrit jusqu'a 15 personnes",
    ],
  },
  {
    id: "aqiqah",
    title: "AQIQAH",
    subtitle: "Naissance",
    description:
      "Une naissance ? Quel heureux evenement ! Partagez votre Aqiqah avec des personnes dans le besoin.",
    price: 199,
    image: "/images/offrandes/aqiqah.jpg",
    inStock: true,
    stockLeft: 8,
    badge: "A partir de",
    features: [
      "1 mouton (fille) ou 2 moutons (garcon)",
      "Conforme a la Sounnah",
      "Video nominative",
      "Distribue aux necessiteux",
    ],
    hasGender: true,
  },
  {
    id: "aid",
    title: "AID",
    subtitle: "Aid al-Adha 2026",
    description:
      "Offrez votre sacrifice aux plus demunis, pour leur offrir un Aid reussi.",
    price: 199,
    image: "/images/offrandes/aid.png",
    inStock: true,
    stockLeft: 6,
    popular: true,
    badge: "Aid 2026",
    features: [
      "Sacrifice le jour de l'Aid",
      "100% conforme a la Sounnah",
      "Video nominative",
      "Distribue a un village entier",
    ],
  },
];

const specs = [
  { icon: "sheep", label: "Race", value: "Ovin, Caprin" },
  { icon: "leaf", label: "Elevage", value: "Traditionnel, en plein air" },
  { icon: "calendar", label: "Age", value: "Plus de 1 an" },
  { icon: "pin", label: "Origine", value: "Madagascar" },
  { icon: "knife", label: "Sacrifice", value: "Madagascar" },
];

/* ─────────────────────────────────────
   ICONS
   ───────────────────────────────────── */

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function FlameIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23c-3.6 0-8-2.4-8-7.7 0-3.6 2.2-6.1 4-8.3.6-.8 1.2-1.5 1.6-2.2.3-.5 1-.6 1.4-.2.1.1.2.3.2.4 0 1.2.6 2.2 1.5 2.8.2-.9.6-1.8 1.1-2.6C15.2 2.5 16.4 1 17 0c.3-.5 1-.6 1.4-.2.2.2.3.4.3.6 0 4.5 3.3 7 3.3 11.3C22 16.3 19.3 23 12 23z" />
    </svg>
  );
}

function SpecIcon({ name }: { name: string }) {
  const cls = "h-6 w-6 text-qurban-green";
  switch (name) {
    case "sheep":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="10" r="6" /><path d="M8 16v4M16 16v4M10 4a2 2 0 11-4 0M18 4a2 2 0 11-4 0" />
        </svg>
      );
    case "leaf":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 8.5-3 10-8s.5-10 .5-10-2 1-3 3" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "pin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "knife":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.5 2L3 13.5 10.5 21 22 9.5z" /><path d="M2 22l5-5" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────── */

export default function OffrandesClient() {
  const [modalOffer, setModalOffer] = useState<Offer | null>(null);
  const [stickySelected, setStickySelected] = useState<OfferType>("aid");
  const [navHidden, setNavHidden] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowLogo(y <= 300);
      if (y > 200 && y > lastScrollY.current) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const todayLabel = useMemo(() => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  const selectedOffer = offers.find((o) => o.id === stickySelected)!;

  return (
    <>
      {/* Logo — appears after scrolling past hero badge */}
      <Link
        href="/"
        className={`fixed top-3 left-4 sm:left-6 z-[51] flex items-center gap-2 transition-all duration-300 ${
          showLogo ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <Image src="/images/brand/logo.png" alt="Qurban" width={28} height={28} />
        <span className="sr-only">Qurban</span>
      </Link>

      {/* ═══ NAVBAR MINI — hides on scroll down ═══ */}
      <nav
        className={`sticky top-0 z-50 bg-bg-dark/95 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-500 ${
          navHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Spacer for logo area */}
          <div className="w-7" />

          <div className="flex items-center gap-3 text-text-light text-sm">
            <span className="hidden sm:inline text-text-muted-dark">
              <span className="text-gold font-heading">4.8/5</span> — +3 000 commandes
            </span>
          </div>
        </div>
      </nav>

      <main className="bg-bg-dark min-h-screen pb-28">
        {/* ═══ HERO BANNER ═══ */}
        <section className="relative py-12 sm:py-16 overflow-hidden">
          {/* Green radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(22,101,52,0.15),transparent_70%)]" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-gold/15 text-gold border-gold/30 font-heading tracking-widest text-[10px] px-4 py-1.5 mb-6">
                AID AL-ADHA 2026 — RESERVATIONS OUVERTES
              </Badge>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-light tracking-tight leading-[1.1]">
                NOS TYPES{" "}
                <span className="font-accent text-gold shimmer-gold text-4xl sm:text-5xl md:text-6xl">
                  D&apos;OFFRANDES
                </span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-text-muted-dark max-w-xl mx-auto leading-relaxed">
                Choisissez votre sacrifice. Chaque offrande est realisee conformement a la Sounnah, filmee a votre nom et distribuee aux plus demunis.
              </p>
            </motion.div>

            {/* Urgency bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs font-heading tracking-wide">
                STOCKS LIMITES AU {todayLabel.toUpperCase()}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ═══ OFFERS GRID ═══ */}
        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {offers.map((offer, i) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="group relative"
                >
                  {/* Popular glow */}
                  {offer.popular && (
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-gold/30 via-gold/10 to-transparent blur-sm" />
                  )}

                  <div
                    className={`relative h-full rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-qurban-green/10 ${
                      offer.popular
                        ? "border-gold/30 bg-bg-card-dark"
                        : "border-white/[0.08] bg-bg-card-dark"
                    }`}
                  >
                    {/* Popular badge */}
                    {offer.popular && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-gold text-bg-dark font-heading text-[10px] tracking-wider px-3 py-1 shadow-lg shadow-gold/20">
                          POPULAIRE — AID 2026
                        </Badge>
                      </div>
                    )}

                    {/* Stock badge */}
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
                      <Badge
                        className={`font-heading text-[10px] tracking-wider px-2.5 py-1 ${
                          offer.inStock
                            ? "bg-qurban-green/90 text-white"
                            : "bg-red-600/90 text-white"
                        }`}
                      >
                        {offer.inStock ? "En stock" : "Hors stock"}
                      </Badge>
                      {/* Stock limité badge */}
                      {offer.inStock && offer.stockLeft <= 15 && (
                        <Badge className="bg-red-500/90 text-white font-heading text-[10px] tracking-wider px-2.5 py-1 flex items-center gap-1 animate-pulse">
                          <FlameIcon className="h-3 w-3" />
                          Plus que {offer.stockLeft} restants
                        </Badge>
                      )}
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card-dark/90 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <p className="text-gold/70 text-[10px] font-heading tracking-widest uppercase mb-1">
                        {offer.subtitle}
                      </p>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-light tracking-tight">
                        {offer.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-muted-dark leading-relaxed">
                        {offer.description}
                      </p>

                      {/* Features */}
                      <ul className="mt-4 space-y-2">
                        {offer.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-text-muted-dark">
                            <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-qurban-green/15">
                              <CheckIcon className="h-2.5 w-2.5 text-qurban-green-light" />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Separator className="my-5 bg-white/[0.06]" />

                      {/* Price + CTA */}
                      <div className="flex items-end justify-between">
                        <div>
                          {offer.badge && (
                            <span className="text-[10px] text-text-muted-dark font-heading tracking-wide uppercase block mb-0.5">
                              {offer.badge}
                            </span>
                          )}
                          <span className="text-3xl font-heading font-bold text-text-light">
                            {offer.price}€
                          </span>
                          <span className="text-xs text-text-muted-dark ml-1">/ mouton</span>
                        </div>
                        <Button
                          onClick={() => offer.inStock && setModalOffer(offer)}
                          disabled={!offer.inStock}
                          className={`rounded-full font-heading text-xs h-10 px-6 transition-all ${
                            offer.popular
                              ? "bg-gold hover:bg-gold/90 text-bg-dark shadow-lg shadow-gold/20 cta-shine"
                              : "bg-qurban-green hover:bg-qurban-green/90 text-white cta-shine"
                          }`}
                        >
                          RESERVER
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TRUST SECTION ═══ */}
        <section className="py-14 sm:py-16 bg-bg-section-alt border-y border-white/[0.04]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  title: "Sacrifice en votre nom",
                  desc: "conformement a la Sounnah",
                },
                {
                  title: "Offert a des musulmans dans le besoin",
                  desc: "distribue dans des villages",
                },
                {
                  title: "Recevez une video nominative",
                  desc: "de votre sadaqah",
                },
              ].map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-qurban-green/15 text-qurban-green-light">
                    <CheckIcon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-heading font-bold text-text-light">{g.title}</p>
                  <p className="text-xs text-text-muted-dark">{g.desc}</p>
                </motion.div>
              ))}
            </div>

            <Separator className="my-10 bg-white/[0.06]" />

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
              {specs.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <SpecIcon name={s.icon} />
                  <p className="text-xs font-heading font-bold text-text-light">{s.label}</p>
                  <p className="text-xs text-text-muted-dark">{s.value}</p>
                </motion.div>
              ))}
            </div>

            <Separator className="my-10 bg-white/[0.06]" />

            {/* Payment methods */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-3">
                <ShieldIcon />
                <p className="text-xs font-heading text-text-muted-dark tracking-wide">PAIEMENT SECURISE</p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Image src="/images/brand/visa.png" alt="Visa" width={44} height={28} className="opacity-60 hover:opacity-100 transition-opacity" />
                <Image src="/images/brand/mastercard.png" alt="Mastercard" width={44} height={28} className="opacity-60 hover:opacity-100 transition-opacity" />
                <Image src="/images/brand/ApplePay.svg" alt="Apple Pay" width={44} height={28} className="opacity-60 hover:opacity-100 transition-opacity" />
                <Image src="/images/brand/GooglePay.svg" alt="Google Pay" width={44} height={28} className="opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SOCIAL PROOF FOOTER ═══ */}
        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {[
                { num: "+3 000", label: "Commandes livrees" },
                { num: "+30 000", label: "Repas distribues" },
                { num: "100%", label: "Tracabilite video" },
                { num: "4.8/5", label: "Satisfaction clients" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-gold">{s.num}</p>
                  <p className="text-[10px] text-text-muted-dark font-heading tracking-wide uppercase mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <Separator className="my-8 bg-white/[0.06] max-w-xs mx-auto" />

            <Link href="/" className="text-xs text-text-muted-dark hover:text-gold transition-colors font-heading tracking-wide">
              ← RETOUR A L&apos;ACCUEIL
            </Link>
          </div>
        </section>
      </main>

      {/* ═══ STICKY BOTTOM ATC BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-dark/95 backdrop-blur-xl border-t border-gold/15 shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
        <div className="mx-auto max-w-lg px-3 py-3">
          {/* Offer selector tabs */}
          <div className="flex rounded-full bg-white/[0.04] border border-white/[0.06] p-0.5 mb-2.5">
            {offers.map((offer) => (
              <button
                key={offer.id}
                onClick={() => setStickySelected(offer.id)}
                className={`relative flex-1 rounded-full py-1.5 text-[11px] font-heading tracking-wide transition-all ${
                  stickySelected === offer.id
                    ? "bg-qurban-green text-white shadow-md shadow-qurban-green/20"
                    : "text-text-muted-dark hover:text-text-light"
                }`}
              >
                {offer.title}
                {/* Stock dot */}
                {offer.stockLeft <= 10 && (
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Selected offer info + CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stickySelected}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-lg font-bold text-text-light">
                      {selectedOffer.price}€
                    </span>
                    <span className="text-[10px] text-text-muted-dark font-heading">/ mouton</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FlameIcon className="h-2.5 w-2.5 text-red-400" />
                    <span className="text-[10px] text-red-400 font-heading truncate">
                      Plus que {selectedOffer.stockLeft} restants
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setModalOffer(selectedOffer)}
                className="rounded-full bg-gold hover:bg-gold/90 text-bg-dark font-heading text-xs h-10 px-5 sm:px-8 cta-shine shadow-lg shadow-gold/20 flex-shrink-0"
              >
                RESERVER MON SACRIFICE
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ ORDER MODAL ═══ */}
      <OrderModal
        offer={modalOffer}
        onClose={() => setModalOffer(null)}
        onConfirm={() => setModalOffer(null)}
      />
    </>
  );
}
