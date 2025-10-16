"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  // efecto sombra / blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // headroom (ocultar al bajar, mostrar al subir)
  useEffect(() => {
    const onScrollDir = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current + 2;
      const goingUp = y < lastY.current - 2;

      let nextHidden = hidden;
      if (y <= 80) nextHidden = false;
      else if (goingDown) nextHidden = true;
      else if (goingUp) nextHidden = false;

      lastY.current = y;
      if (nextHidden !== hidden) setHidden(nextHidden);
    };
    onScrollDir();
    window.addEventListener("scroll", onScrollDir, { passive: true });
    return () => window.removeEventListener("scroll", onScrollDir);
  }, [hidden]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transform-gpu transition-transform duration-200",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0",
          scrolled
            ? "bg-black/90 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-black",
        ].join(" ")}
      />
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-cfi-negative.png"
            alt="CFI Solutions Logo"
            width={110}
            height={40}
            priority
            className="object-contain select-none pointer-events-none"
          />
          <span className="ml-2 text-xs text-[#899398]">
            Consulting & Tech Support
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <NavItem key={href} href={href}>
              {label}
            </NavItem>
          ))}
          <Link
            href="#contact"
            className="ml-2 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-white text-[#0B1F38] hover:opacity-90 transition"
          >
            Get in touch
          </Link>

          {/* Language Switch */}
          <div className="ml-4 flex gap-2 text-sm font-semibold">
            <Link
              href="/en"
              locale="en"
              className="hover:text-white text-[#899398]"
            >
              EN
            </Link>
            <span className="text-[#899398]">|</span>
            <Link
              href="/es"
              locale="es"
              className="hover:text-white text-[#899398]"
            >
              ES
            </Link>
          </div>
        </div>

        {/* Burger button (mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/95 text-white flex flex-col items-center gap-6 py-6 border-t border-white/10 backdrop-blur-md"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium hover:text-[#899398] transition"
              >
                {label}
              </Link>
            ))}

            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold bg-white text-[#0B1F38] hover:opacity-90 transition"
            >
              Get in touch
            </Link>

            {/* Language Switch Mobile */}
            <div className="flex gap-3 text-sm font-semibold">
              <Link
                href="/en"
                locale="en"
                className="hover:text-white text-[#899398]"
              >
                EN
              </Link>
              <span className="text-[#899398]">|</span>
              <Link
                href="/es"
                locale="es"
                className="hover:text-white text-[#899398]"
              >
                ES
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHashLink = href.startsWith("#");
  const isActive = !isHashLink && href === pathname;

  return (
    <Link
      href={href}
      className="group relative px-3 py-2 text-sm font-medium text-[#EAEAEA] hover:text-white transition"
    >
      <span className="relative z-10">{children}</span>
      <span
        className={[
          "pointer-events-none absolute left-2 right-2 -bottom-0.5 h-[2px] origin-left rounded-full",
          "bg-white/90 transition-transform duration-300",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        ].join(" ")}
      />
    </Link>
  );
}
