"use client";

import React from "react";
import Image from "next/image";
import { Search, Filter, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Integrations / Ecosystem Section (v6 — uniform logos)
 * - 6 items (3×2): 3DEXPERIENCE, DELMIA Apriso, CATIA, ENOVIA, Jira, SAP
 * - Logos normalized with a fixed LogoBox (width 180 × height 44) and object-contain
 * - Per-logo fine tuning with `logoClass` (scale/translate) to visually match cap-height
 * - English copy; no looping animations; fade-in/out on viewport only
 */

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "MES", label: "MES" },
  { key: "PLM", label: "PLM" },
  { key: "Analytics", label: "Analytics" },
  { key: "DevOps", label: "DevOps" },
] as const;

// Place files in /public/images/integrations/
// Use exact casing as below
const INTEGRATIONS: Array<{
  name: string;
  category: (typeof CATEGORIES)[number]["key"] | "MES" | "PLM" | "Analytics" | "DevOps";
  url: string;
  logo: string;        // filename in /public/images/integrations
  logoClass?: string;  // tailwind tweaks (scale/translate)
  blurb: string;
  tags?: string[];
}> = [
  {
    name: "3DEXPERIENCE",
    category: "PLM",
    url: "https://www.3ds.com/3dexperience",
    logo: "3dexperience.webp",
    logoClass: "scale-90",
    blurb: "Central PLM platform for governance, collaboration, and end‑to‑end traceability.",
    tags: ["PLM", "Governance", "Traceability"],
  },
  {
    name: "DELMIA Apriso",
    category: "MES",
    url: "https://www.3ds.com/products/delmia/operations/apriso",
    logo: "Delmia.png",
    logoClass: "scale-95 translate-y-[1px]",
    blurb: "Manufacturing execution, genealogy, and real‑time quality control.",
    tags: ["MES", "Genealogy", "Quality"],
  },
  {
    name: "CATIA",
    category: "PLM",
    url: "https://www.3ds.com/products-services/catia/",
    logo: "Catia.png",
    logoClass: "scale-95",
    blurb: "3D design and advanced surfacing integrated across the PLM lifecycle.",
    tags: ["CAD", "3D", "Surfacing"],
  },
  {
    name: "ENOVIA",
    category: "PLM",
    url: "https://www.3ds.com/products/enovia",
    logo: "enovia.webp",
    logoClass: "scale-95",
    blurb: "Product collaboration, BOM, change management and compliance in 3DEXPERIENCE.",
    tags: ["BOM", "Change", "Compliance"],
  },
  {
    name: "Jira",
    category: "DevOps",
    url: "https://www.atlassian.com/software/jira",
    logo: "Jira.png",
    logoClass: "scale-95",
    blurb: "Agile work management and full traceability from requirement to deployment.",
    tags: ["Scrum", "Boards", "Traceability"],
  },
  {
    name: "SAP",
    category: "MES",
    url: "https://www.sap.com",
    logo: "SAP.png",
    logoClass: "scale-90 translate-y-[1px]",
    blurb: "ERP integration for orders, master data and finance connected to the shop floor.",
    tags: ["ERP", "IDoc", "BAPI"],
  },
];

// Fixed logo box for visual uniformity
function LogoBox({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className="relative h-11 w-[180px] shrink-0">
      <Image
        src={`/images/integrations/${src}`}
        alt={`${alt} logo`}
        fill
        className={`object-contain ${className}`}
        sizes="180px"
        priority={false}
      />
    </div>
  );
}

// Fade in/out on scroll (no loop)
function FadeInItem({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { root: null, threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      {children}
    </div>
  );
}

export default function IntegrationsSection() {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<(typeof CATEGORIES)[number]["key"]>("all");

  const list = INTEGRATIONS; // base list
  const filtered = list.filter((i) => {
    const inCategory = active === "all" || i.category === active;
    const inQuery = i.name.toLowerCase().includes(query.toLowerCase()) || i.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return inCategory && (query ? inQuery : true);
  });

  return (
    <section id="integrations" className="relative isolate overflow-hidden bg-[#0B1F38] pt-10 pb-20 sm:pt-12 sm:pb-28 -mt-12">
      {/* Soft top overlay to connect with previous section */}
      <div aria-hidden className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-[#0B1F38]/0 to-[#0B1F38]" />

      {/* Subtle background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(26,88,128,0.16),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 border border-white/20 bg-white/10 text-white">Ecosystem</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Integrations connecting <span className="text-[#9FD8FF]">design</span>, <span className="text-[#9FD8FF]">operations</span> and <span className="text-[#9FD8FF]">analytics</span>
          </h2>
          <p className="mt-4 text-[#899398]">We connect your PLM/MES stack with ERP and Analytics for seamless end‑to‑end traceability.</p>
        </div>

        {/* Filters + Search */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => (
              <Button
                key={c.key}
                size="sm"
                className={`rounded-full border border-white/10 ${active === c.key ? "bg-white/15 hover:bg-white/20" : "bg-white/5 hover:bg-white/10"}`}
                onClick={() => setActive(c.key)}
              >
                <Filter className="mr-2 h-4 w-4" /> {c.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search integration…"
              className="w-full rounded-full border border-white/10 bg-white/5 px-9 py-2 text-sm text-white placeholder:text-white/50 outline-none ring-0 transition focus:border-white/20"
            />
          </div>
        </div>

        {/* Grid 3×2 */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <FadeInItem key={`${item.name}-${item.url}`}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9FD8FF]/50">
                <Card className="relative overflow-hidden rounded-2xl border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.07] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <LogoBox src={item.logo} alt={item.name} className={item.logoClass} />
                      <Badge className="border border-white/10 bg-white/10 text-xs text-white">{item.category}</Badge>
                    </div>

                    <h3 className="mt-4 text-lg font-medium text-white">{item.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-[#B8C3CC]">{item.blurb}</p>

                    {item.tags && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/80">{t}</span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-center text-[#9FD8FF]">
                      View docs <ArrowUpRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </FadeInItem>
          ))}
        </div>
      </div>

      {/* Divider */}
      <svg aria-hidden viewBox="0 0 1440 120" className="mt-16 block h-[120px] w-full fill-[#0B1F38] text-white/10">
        <path opacity="0.28" d="M0 60c120 30 240 45 360 45s240-15 360-45 240-45 360-45 240 15 360 45v60H0V60z" />
      </svg>
    </section>
  );
}
