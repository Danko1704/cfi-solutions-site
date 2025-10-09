"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Cpu, Wrench } from "lucide-react";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  // Control del scroll para el morph
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Suavizado
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    mass: 0.6,
  });

  // Ondas que morphéan con el scroll
  const d1 = useTransform(
    smooth,
    [0, 0.5, 1],
    [
      "M0,120 C300,220 520,20 800,120 L800,800 L0,800 Z",
      "M0,150 C350,250 500,50 800,100 L800,800 L0,800 Z",
      "M0,120 C300,220 520,20 800,120 L800,800 L0,800 Z",
    ]
  );

  const d2 = useTransform(
    smooth,
    [0, 0.5, 1],
    [
      "M0,220 C420,360 620,80 800,210 L800,800 L0,800 Z",
      "M0,230 C380,330 600,120 800,200 L800,800 L0,800 Z",
      "M0,220 C420,360 620,80 800,210 L800,800 L0,800 Z",
    ]
  );

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-[#0B1F38] text-white px-8 md:px-20 py-24"
    >
      {/* ===== FONDO (ondas) ===== */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* En desktop recortamos a la franja derecha; en mobile, ancho completo */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[50%] lg:w-[46%] overflow-hidden">
          <motion.svg
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="
              absolute top-0 h-full
              left-1/2 -translate-x-1/2 w-[140%]      /* mobile: centrado y ancho */
              md:left-auto md:translate-x-0 md:right-[-6%] /* desktop: pegado a la derecha */
              md:w-[115%] lg:w-[110%]
            "
          >
            <motion.path
              d={d1 as unknown as string}
              transition={{ ease: "easeInOut" }}
              fill="rgba(137,147,152,0.35)"
            />
            <motion.path
              d={d2 as unknown as string}
              transition={{ ease: "easeInOut" }}
              fill="rgba(137,147,152,0.45)"
            />
          </motion.svg>
        </div>

        {/* Onda inferior (decorativa) */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-60"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(137,147,152,0.25)"
            d="M0,64L80,85.3C160,107,320,149,480,181.3C640,213,800,235,960,218.7C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      {/* ===== CONTENIDO ===== */}
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold">
            About <span className="text-[#899398]">CFI Solutions</span>
          </h2>

          <p className="text-lg text-[#E6E8EA] leading-relaxed">
            CFI Solutions is a consulting firm specialized in{" "}
            <span className="text-[#AEB5BA] font-semibold">
              Digital Manufacturing and MES/MOM systems
            </span>
            . We optimize operations through{" "}
            <span className="text-[#AEB5BA] font-semibold">DELMIA Apriso</span>{" "}
            and{" "}
            <span className="text-[#AEB5BA] font-semibold">3DEXPERIENCE</span>,
            blending technical depth with strategic consulting.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#D9DEE2]">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 size-5 text-[#AEB5BA]" />
              <span>End-to-end implementations & integrations</span>
            </li>
            <li className="flex items-start gap-2">
              <Cpu className="mt-1 size-5 text-[#AEB5BA]" />
              <span>3DEXPERIENCE data flows & governance</span>
            </li>
            <li className="flex items-start gap-2">
              <Wrench className="mt-1 size-5 text-[#AEB5BA]" />
              <span>Technical support & continuous improvement</span>
            </li>
          </ul>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              { k: "10+", v: "Years combined exp." },
              { k: "30+", v: "Projects delivered" },
              { k: "24/7", v: "Support window" },
            ].map((s, i) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-center"
              >
                <div className="text-2xl font-bold">{s.k}</div>
                <div className="text-xs text-[#C1C7CC]">{s.v}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="relative w-[92%] max-w-[560px] h-[340px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about-team.jpg"
              alt="CFI Solutions team collaborating in a modern office"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-[#0B1F38]/20 mix-blend-multiply" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
