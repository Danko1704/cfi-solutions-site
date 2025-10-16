"use client";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { useTranslations } from "next-intl";

const SOCIALS = { linkedin: "", facebook: "", instagram: "" };

export default function Footer() {
  const t = useTranslations("Footer");
  const hasAnySocial = Object.values(SOCIALS).some(Boolean);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1F38] text-white border-t border-[#899398]/20">
      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F2A4A] to-[#163958] ring-1 ring-white/10">
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wider text-white/70">
                {t("ready")}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold">
                {t("headline")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 transition px-4 py-2"
              >
                {t("cta_contact")} <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+528121234567"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-[#0B1F38] hover:bg-white/90 transition px-4 py-2"
              >
                {t("cta_call")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-3 text-[#00BFFF]">
            {t("brand.title")}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-prose">
            {t("brand.desc")}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-lg font-semibold mb-3 text-[#00BFFF]">
            {t("sitemap.title")}
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white transition">
                {t("sitemap.home")}
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:text-white transition">
                {t("sitemap.about")}
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white transition">
                {t("sitemap.services")}
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-white transition">
                {t("sitemap.contact")}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#00BFFF]">
            {t("contact.title")}
          </h3>
          <address className="not-italic space-y-3 text-sm text-gray-300">
            <a
              href="mailto:Htijerina@cloudforgeitsolutions.com"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Mail size={16} className="text-[#00BFFF]" /> {t("contact.email")}
            </a>
            <a
              href="tel:+528121234567"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Phone size={16} className="text-[#00BFFF]" />{" "}
              {t("contact.phone")}
            </a>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-[#00BFFF]" />
              <span>{t("contact.address")}</span>
            </p>
          </address>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#899398]/20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {year} CFI Solutions. {t("bottom.rights")}
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                {t("bottom.privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                {t("bottom.terms")}
              </Link>
            </li>
            {hasAnySocial && (
              <>
                <span className="opacity-50">|</span>
                {SOCIALS.linkedin && (
                  <a
                    href={SOCIALS.linkedin}
                    aria-label="LinkedIn"
                    className="hover:text-white transition"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {SOCIALS.facebook && (
                  <a
                    href={SOCIALS.facebook}
                    aria-label="Facebook"
                    className="hover:text-white transition"
                  >
                    <Facebook size={18} />
                  </a>
                )}
                {SOCIALS.instagram && (
                  <a
                    href={SOCIALS.instagram}
                    aria-label="Instagram"
                    className="hover:text-white transition"
                  >
                    <Instagram size={18} />
                  </a>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
