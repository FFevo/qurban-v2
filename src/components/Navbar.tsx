"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      /* Hide navbar when scrolling down past 200px, show on scroll up */
      if (y > 200 && y > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Full navbar — hides on scroll down */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        } ${
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

      {/* Floating logo — always visible when navbar is hidden */}
      <div
        className={`fixed top-3 left-4 sm:left-6 z-50 transition-all duration-300 ${
          hidden ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <a href="#hero" className="block">
          <div className="h-10 w-10 rounded-full bg-bg-dark/80 backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/30 flex items-center justify-center">
            <Image
              src="/images/brand/logo.png"
              alt="Qurban"
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </div>
        </a>
      </div>
    </>
  );
}
