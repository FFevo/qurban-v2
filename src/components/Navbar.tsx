"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

        {/* Spacer on mobile to keep logo left-aligned */}
        <div className="w-9 md:hidden" />
      </div>
    </nav>
  );
}
