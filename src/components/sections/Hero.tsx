// /sections/Hero.tsx
// Hero section with video background. Brand colors: #0B1F38 / #899398 / #FFFFFF
// Fonts: Orbitron (titles) + Open Sans (body). Comments in English.

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      const apply = () => setReduceMotion(m.matches);
      apply();
      m.addEventListener?.("change", apply);
      return () => m.removeEventListener?.("change", apply);
    }
  }, []);

  return (
    <section
      id="hero" // IMPORTANT: used by Navbar's IntersectionObserver
      className="relative isolate min-h-[92vh] w-full overflow-hidden bg-[#0B1F38]"
    >
      {/* Background video (hidden if prefers-reduced-motion) */}
      {!reduceMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/hero-poster.jpg"
          >
            <source src="/media/hero.webm" type="video/webm" />
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Brand tint/gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0B1F38]/60 to-black/80" />

      {/* Subtle noise texture (no external image) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col items-start justify-center px-6 sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-white/70" />
          CFI Solutions — Digital Manufacturing
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[800] leading-[0.95] text-white drop-shadow-sm"
          style={{
            fontFamily: "Orbitron, ui-sans-serif, system-ui",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Digital Manufacturing
          </span>
          <span className="mt-2 block text-xl text-[#899398] sm:text-2xl md:text-3xl">
            3DEXPERIENCE & DELMIA Apriso — Consulting & Technical Support
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
          style={{ fontFamily: "Open Sans, ui-sans-serif, system-ui" }}
        >
          Implementaciones, integraciones y soporte técnico con foco en resultados:
          rendimiento en planta, trazabilidad y tiempos de despliegue reducidos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link
            href="#services"
            className="group rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-[#0B1F38] shadow-lg backdrop-blur transition hover:bg-white"
          >
            Discover Our Services
            <span className="ml-2 inline-block transition group-hover:translate-x-0.5">→</span>
          </Link>

          <Link
            href="#contact"
            className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Talk to an Expert
          </Link>
        </motion.div>
      </div>

      {/* Smooth bottom gradient into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1F38] to-transparent" />
    </section>
  );
}
