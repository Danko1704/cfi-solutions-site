"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Industries.tsx — CFI Solutions
 *
 * Key idea: normalize mixed logo sizes with a fixed-height card and object-contain.
 * - Every logo lives inside a fixed h-24 (mobile) / h-28 (md) container.
 * - Image uses `fill` + `object-contain` so tall/wide logos fit without distortion.
 * - Cards keep consistent padding and rounded corners for a clean, even look.
 * - Marquee is an infinite loop using two identical tracks.
 *
 * How to use:
 * 1) Put your logos in /public/logos/*.svg|png (transparent if possible).
 * 2) Update the `logos` array below to match filenames.
 * 3) Import and render <Industries /> in app/page.tsx
 */

const logos = [
  { src: "/logos/AGCO.png", alt: "AGCO" },
  { src: "/logos/BAT.png", alt: "BAT" },
  { src: "/logos/BombardierLogo_edited.png", alt: "Bombardier" },
  { src: "/logos/Corning.png", alt: "Corning" },
  { src: "/logos/CortevaLogo_edited_edited.png", alt: "Corteva" },
  { src: "/logos/CSL.webp", alt: "CSL" },
  { src: "/logos/Envision.png", alt: "Envision" },
  { src: "/logos/EssilorLogo_edited_edited.png", alt: "EssilorLuxottica" },
  { src: "/logos/GM.png", alt: "General Motors" },
  { src: "/logos/Hitachi.png", alt: "Hitachi" },
  { src: "/logos/Hondalogo.png", alt: "Honda" },
  { src: "/logos/Ingersoll.png", alt: "Ingersoll Rand" },
  { src: "/logos/Intuitive.avif", alt: "Intuitive" },
  { src: "/logos/IPG.png", alt: "IPG" },
  { src: "/logos/Loockhead.png", alt: "Lockheed Martin" },
  { src: "/logos/Mane.jpg", alt: "MANE" },
  { src: "/logos/Meritor.svg", alt: "Meritor" },
  { src: "/logos/Navistar.png", alt: "Navistar" },
  { src: "/logos/RicohLogo_edited.png", alt: "Ricoh" },
  { src: "/logos/Rolex.png", alt: "Rolex" },
  { src: "/logos/Shiseido_edited_edited.png", alt: "Shiseido" },
  { src: "/logos/Stryker.png", alt: "Stryker" },
  { src: "/logos/Tata.png", alt: "Tata" },
  { src: "/logos/Tesla.png", alt: "Tesla" },
];

const chips = [
  "Automotive",
  "Aerospace",
  "Medical Devices",
  "Electronics",
  "Industrial Equipment",
  "Consumer Goods",
  "Luxury & Cosmetics",
  "Agriculture",
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-20 md:py-24 bg-gradient-to-b from-[#0B1F38] to-[#132944]">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Industries & Partners
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/70 max-w-2xl mx-auto" style={{ fontFamily: "Open Sans, system-ui, sans-serif" }}>
            We collaborate with global leaders across industries to implement cutting‑edge digital manufacturing solutions.
          </p>
        </motion.div>

        {/* Logo Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden"
          aria-label="Partners logo carousel"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B1F38] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B1F38] to-transparent" />

          <div className="flex gap-4 will-change-transform animate-marquee [animation-duration:45s] hover:[animation-play-state:paused]">
            {logos.concat(logos).map((logo, i) => (
              <LogoCard key={i} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </motion.div>

        {/* Industry Chips */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {chips.map((c, i) => (
            <motion.li
              key={c}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="select-none rounded-full border border-[#899398]/30 bg-white/5 px-4 py-2 text-sm md:text-base text-[#E7ECEF] backdrop-blur-sm hover:shadow-[0_0_20px_rgba(137,147,152,0.25)] hover:border-[#899398]/50 transition"
            >
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Local styles for marquee + glow */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function LogoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-24 md:h-28 w-[220px] md:w-[260px] shrink-0 rounded-2xl border border-[#899398]/20 bg-white/5 shadow-[0_2px_20px_rgba(0,0,0,0.15)] backdrop-blur-sm transition hover:shadow-[0_0_24px_rgba(137,147,152,0.25)] hover:border-[#899398]/40">
      <div className="relative h-full w-full p-5">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width:768px) 220px, 260px"
          className="object-contain grayscale hover:grayscale-0 transition duration-300"
          priority={false}
        />
      </div>
    </div>
  );
}
