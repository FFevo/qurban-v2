"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg-dark/95 backdrop-blur-xl shadow-lg shadow-black/20 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
          <Image
            src="/images/brand/logo.png"
            alt="Qurban"
            width={36}
            height={36}
            className="h-9 w-9"
          />
        </a>

        {/* Center stats (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-xs text-text-muted-dark">
          <span className="flex items-center gap-1.5">
            <span className="text-gold">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <strong className="text-text-light">4,8/5</strong>
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span>
            <strong className="text-text-light">+3 000</strong> commandes
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span>
            <strong className="text-text-light">+30 000</strong> repas distribues
          </span>
        </div>

        {/* CTA */}
        <Button
          asChild
          className="rounded-full bg-qurban-green hover:bg-qurban-green/90 text-white font-heading text-xs px-5 h-9 cta-shine"
        >
          <a href="#commander">COMMANDER</a>
        </Button>
      </div>
    </nav>
  );
}
