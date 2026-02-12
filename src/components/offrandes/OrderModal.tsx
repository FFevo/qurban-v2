"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Offer } from "./OffrandesClient";

interface OrderModalProps {
  offer: Offer | null;
  onClose: () => void;
  onConfirm: (id: string, qty: number) => void;
}

export default function OrderModal({ offer, onClose, onConfirm }: OrderModalProps) {
  const [qty, setQty] = useState(1);
  const [gender, setGender] = useState<"garcon" | "fille">("garcon");
  const [email, setEmail] = useState("");
  const [names, setNames] = useState<string[]>([""]);
  const [emailError, setEmailError] = useState(false);
  const [nameErrors, setNameErrors] = useState<boolean[]>([false]);

  /* Reset form when offer changes */
  useEffect(() => {
    if (offer) {
      setQty(1);
      setGender("garcon");
      setEmail("");
      setNames([""]);
      setEmailError(false);
      setNameErrors([false]);
    }
  }, [offer]);

  /* Aqiqah: 2 moutons for a boy */
  const effectiveQty = offer?.hasGender && gender === "garcon" ? qty * 2 : qty;
  const total = (offer?.price || 0) * effectiveQty;

  /* Adjust names array when qty changes */
  useEffect(() => {
    setNames((prev) => {
      const arr = [...prev];
      while (arr.length < qty) arr.push("");
      return arr.slice(0, qty);
    });
    setNameErrors((prev) => {
      const arr = [...prev];
      while (arr.length < qty) arr.push(false);
      return arr.slice(0, qty);
    });
  }, [qty]);

  const handleSubmit = useCallback(() => {
    let hasError = false;

    /* Validate email */
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    /* Validate names */
    const newNameErrors = names.map((n) => n.trim().length === 0);
    setNameErrors(newNameErrors);
    if (newNameErrors.some(Boolean)) hasError = true;

    if (hasError || !offer) return;

    onConfirm(offer.id, effectiveQty);
  }, [email, names, offer, effectiveQty, onConfirm]);

  /* Close on ESC */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {offer && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-md bg-bg-card-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-5 sm:p-6 pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text-light">
                      Personnalisez
                    </h2>
                    <p className="text-xs text-text-muted-dark mt-0.5">
                      Personnalisez votre{" "}
                      <span className="text-gold font-heading">{offer.title}</span>{" "}
                      en ajoutant un nom pour chaque mouton.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-text-muted-dark hover:text-text-light"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* Quantity selector */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold hover:bg-gold/25 transition-colors font-heading text-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-heading text-xl font-bold text-text-light">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold hover:bg-gold/25 transition-colors font-heading text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Gender selector (Aqiqah only) */}
                {offer.hasGender && (
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setGender("garcon")}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-heading transition-all ${
                        gender === "garcon"
                          ? "bg-qurban-green text-white"
                          : "bg-white/5 text-text-muted-dark hover:bg-white/10"
                      }`}
                    >
                      <span className={`h-3.5 w-3.5 rounded-full border-2 ${gender === "garcon" ? "border-white bg-white" : "border-text-muted-dark"}`} />
                      Garcon
                    </button>
                    <button
                      onClick={() => setGender("fille")}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-heading transition-all ${
                        gender === "fille"
                          ? "bg-qurban-green text-white"
                          : "bg-white/5 text-text-muted-dark hover:bg-white/10"
                      }`}
                    >
                      <span className={`h-3.5 w-3.5 rounded-full border-2 ${gender === "fille" ? "border-white bg-white" : "border-text-muted-dark"}`} />
                      Fille
                    </button>
                    <Badge className="bg-bg-dark/50 text-text-muted-dark border-white/[0.06] text-[10px] font-heading">
                      {effectiveQty} x Mouton
                    </Badge>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="text-xs font-heading text-text-muted-dark tracking-wide">
                    Contact
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(false);
                    }}
                    className={`mt-1 w-full rounded-lg bg-white/[0.04] border px-3 py-2.5 text-sm text-text-light placeholder:text-text-muted-dark/50 outline-none focus:ring-1 transition-all ${
                      emailError
                        ? "border-red-500/60 focus:ring-red-500/40"
                        : "border-white/[0.08] focus:ring-gold/40 focus:border-gold/30"
                    }`}
                  />
                  {emailError && (
                    <p className="text-[11px] text-red-400 mt-1">e-mail invalide</p>
                  )}
                </div>

                {/* Sacrifice names */}
                {names.map((name, i) => (
                  <div key={i}>
                    <label className="text-xs font-heading text-text-muted-dark tracking-wide">
                      {i + 1}. Sacrifice au nom de
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        const arr = [...names];
                        arr[i] = e.target.value;
                        setNames(arr);
                        if (nameErrors[i]) {
                          const errs = [...nameErrors];
                          errs[i] = false;
                          setNameErrors(errs);
                        }
                      }}
                      className={`mt-1 w-full rounded-lg bg-white/[0.04] border px-3 py-2.5 text-sm text-text-light placeholder:text-text-muted-dark/50 outline-none focus:ring-1 transition-all ${
                        nameErrors[i]
                          ? "border-red-500/60 focus:ring-red-500/40"
                          : "border-white/[0.08] focus:ring-gold/40 focus:border-gold/30"
                      }`}
                    />
                    {nameErrors[i] && (
                      <p className="text-[11px] text-red-400 mt-1">Le texte doit contenir au moins 1 caractere(s)</p>
                    )}
                  </div>
                ))}

                <Separator className="bg-white/[0.06]" />

                {/* Total + Submit */}
                <div className="text-center">
                  <p className="text-sm text-text-muted-dark">
                    {effectiveQty} x Mouton —{" "}
                    <span className="text-lg font-heading font-bold text-text-light">{total} €</span>
                  </p>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full rounded-full bg-gold hover:bg-gold/90 text-bg-dark font-heading text-sm h-12 cta-shine shadow-lg shadow-gold/15"
                >
                  RESERVER MON SACRIFICE
                </Button>

                {/* Cross-sell hint */}
                {offer.id !== "aid" && (
                  <p className="text-center text-[11px] text-text-muted-dark">
                    Pensez aussi a reserver votre sacrifice de l&apos;Aid al-Adha 2026
                  </p>
                )}
                {offer.id === "aid" && (
                  <p className="text-center text-[11px] text-text-muted-dark">
                    Combinez avec une Sadaqah pour multiplier les recompenses
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
