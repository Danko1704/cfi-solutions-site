"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

/* ---------- Types ---------- */
type ServiceItem = {
  image: string;
  title: string;
  desc: string;
  bullets: string[];
};

/* ---------- Component ---------- */
export default function Services() {
  const t = useTranslations("Services");
  /* ---------- Data ---------- */
  const services: ServiceItem[] = [
    {
      image: "/images/services/implementations.jpg",
      title: t("cards.Implementations.title"),
      desc: t("cards.Implementations.desc"),
      bullets: t.raw("cards.Implementations.bullets") as string[],
    },
    {
      image: "/images/services/integrations.jpg",
      title: t("cards.Integrations.title"),
      desc: t("cards.Integrations.desc"),
      bullets: t.raw("cards.Integrations.bullets") as string[],
    },
    {
      image: "/images/services/technical-support.jpg",
      title: t("cards.Technical Support.title"),
      desc: t("cards.Technical Support.desc"),
      bullets: t.raw("cards.Technical Support.bullets") as string[],
    },
  ];
  return (
    <section
      id="services"
      className="relative isolate w-full bg-[#0B1F38] py-24 text-white scroll-mt-20"
    >
      <BackgroundBeams />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75 backdrop-blur">
            {t("tag")}
          </span>
          <h2 className="mt-4 text-3xl font-[800] leading-tight sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/85">{t("description")}</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} index={i} service={s} />
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {Object.entries(
            t.raw("stats") as Record<string, [string, string]>
          ).map(([key, [num, label]]) => (
            <div
              key={key}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
            >
              <div className="text-2xl font-extrabold">{num}</div>
              <div className="text-xs text-white/80">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B1F38] to-transparent" />
    </section>
  );
}

/* ---------- Card ---------- */
function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm will-change-transform"
      style={{
        backgroundImage:
          "radial-gradient(400px circle at var(--mx, 0) var(--my, 0), rgba(255,255,255,0.08), transparent 40%)",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-1 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background:
            "radial-gradient(600px circle at 0% 0%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(600px circle at 100% 100%, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />

      {/* Imagen reemplazando el ícono */}
      <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10">
        <Image
          src={service.image}
          alt={service.title}
          width={400}
          height={180}
          className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay azul translúcido */}
        <div className="absolute inset-0 bg-[#0B1F38]/40 mix-blend-multiply"></div>
      </div>

      <h3 className="text-xl font-bold">{service.title}</h3>
      <p className="mt-2 text-sm text-white/85">{service.desc}</p>

      <ul className="mt-4 space-y-1 text-sm text-white/80">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-1 inline-block size-1.5 rounded-full bg-white/70" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-white/90">
        <span>Learn more</span>
        <span aria-hidden className="transition group-hover:translate-x-0.5">
          →
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition group-hover:ring-white/30" />
    </motion.div>
  );
}

/* ---------- Background ---------- */
function BackgroundBeams() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="absolute -left-1/4 top-[-10%] h-[120%] w-[60%] rotate-12 bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl" />
      <div className="absolute -right-1/4 top-[10%] h-[120%] w-[60%] -rotate-12 bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl" />
    </div>
  );
}
