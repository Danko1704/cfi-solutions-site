// src/components/sections/Contact.tsx
"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  Globe,
} from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    // Honeypot (typed: FormDataEntryValue can be string | File | null)
    const hp = formData.get("company");
    if (typeof hp === "string" && hp.trim().length > 0) {
      setStatus("success");
      setMessage("Thanks! (silent discard)");
      form.reset();
      return;
    }

    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setMessage("Message sent successfully. We'll get back to you shortly.");
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setMessage(
        "We couldn't send your message. Please try again or email us directly."
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative py-14 lg:py-20 overflow-hidden -mt-20 lg:-mt-24 border-t border-white/10"
    >
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background gradient adjusted to avoid hard cut */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-60 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#899398]/15 blur-3xl" />
        <svg
          className="absolute inset-x-0 bottom-[-1px]"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M0 40c120 40 240 40 360 20s240-60 360-60 240 40 360 60 240 20 360-20v60H0V40z"
            fill="rgba(137,147,152,0.12)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
            <ShieldCheck className="h-3.5 w-3.5" /> Trusted contact
          </span>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Let´s build your{" "}
            <span className="text-[#7BDFF2]">digital manufacturing</span>{" "}
            roadmap
          </h2>
          <p className="mt-3 text-white/70">
            Tell us about your 3DEXPERIENCE, DELMIA Apriso, CATIA or integration
            needs. We will respond within 1 business day.
          </p>
        </header>

        <div className="mt-8 lg:mt-10 grid grid-cols-1 items-start gap-6 md:grid-cols-5">
          <div className="md:col-span-2 space-y-6">
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              subtitle="Prefer email?"
              content={
                <a
                  href="mailto:hello@cfi-solutions.mx"
                  className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                >
                  hello@cfi-solutions.mx
                </a>
              }
            />
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Phone / WhatsApp"
              subtitle="Mon–Fri 9:00–18:00 (GMT-6)"
              content={
                <a
                  href="tel:+528121234567"
                  className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                >
                  +52 81 2123 4567
                </a>
              }
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Office"
              subtitle="Monterrey, Nuevo León, MX"
              content={<span>Av. Empresa 123, Piso 4 — 64000</span>}
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Response time"
              subtitle="We answer fast"
              content={<span>Within 24 hours on business days</span>}
            />
          </div>

          <div className="md:col-span-3">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent" />
              <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-5"
                aria-describedby="formStatus"
                noValidate
              >
                <div className="hidden">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label="Full name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className="field"
                    />
                  </Field>
                  <Field label="Work email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="jane@company.com"
                      className="field"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label="Company" htmlFor="org">
                    <input
                      id="org"
                      name="org"
                      placeholder="Company LLC"
                      className="field"
                    />
                  </Field>
                  <Field label="Phone" htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      placeholder="+52 81 0000 0000"
                      className="field"
                    />
                  </Field>
                </div>

                <Field label="Topic" htmlFor="topic">
                  <select id="topic" name="topic" className="field">
                    <option>3DEXPERIENCE</option>
                    <option>DELMIA Apriso</option>
                    <option>CATIA</option>
                    <option>ENOVIA</option>
                    <option>Integrations (Jira, SAP, etc.)</option>
                    <option>Technical support</option>
                    <option>Other</option>
                  </select>
                </Field>

                <Field label="How can we help?" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Share context, timelines, and goals…"
                    className="field resize-y"
                  />
                </Field>

                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
                  />
                  <label htmlFor="consent" className="text-sm text-white/70">
                    I agree to the processing of my data for the purpose of
                    responding to this inquiry.
                  </label>
                </div>

                <div className="mt-3 rounded-lg border border-white/10 p-3 text-xs text-white/50">
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Protected by invisible
                    CAPTCHA (enable in API route).
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-[#0B1F38] shadow-xl shadow-black/10 transition hover:shadow-2xl disabled:opacity-60"
                  >
                    <Send
                      className={`h-4 w-4 ${
                        status === "loading" ? "animate-pulse" : ""
                      }`}
                    />
                    {status === "loading" ? "Sending…" : "Send message"}
                  </button>
                  <a
                    href="#map"
                    className="inline-flex items-center gap-2 text-sm text-white/70 underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    <Globe className="h-4 w-4" /> See our location
                  </a>
                </div>

                <div
                  id="formStatus"
                  aria-live="polite"
                  className="mt-3 min-h-[1.5rem] text-sm"
                >
                  {status === "success" && (
                    <p className="inline-flex items-center gap-2 text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" /> {message}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="inline-flex items-center gap-2 text-rose-300">
                      <AlertCircle className="h-4 w-4" /> {message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          id="map"
          className="mt-10 lg:mt-12 grid grid-cols-1 gap-6 md:grid-cols-5"
        >
          <div className="md:col-span-3 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="CFI Solutions Office Map"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=Monterrey%20Nuevo%20Le%C3%B3n&output=embed`}
            />
          </div>
          <div className="md:col-span-2 grid content-between gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5" />
                <h3 className="text-lg font-semibold">CFI Solutions — HQ</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>Av. Empresa 123, Piso 4</li>
                <li>Centro, Monterrey, N.L. 64000</li>
                <li>Mexico</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/50">
                <span className="rounded-full border border-white/10 px-2 py-1">
                  Mon–Fri: 9:00–18:00
                </span>
                <span className="rounded-full border border-white/10 px-2 py-1">
                  GMT-6
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              <p>
                Prefer a call? Book a 15‑min intro and we will discuss your use
                case, timeline, and architecture options.
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2 text-white/90 transition hover:bg-white/10"
                >
                  <Clock className="h-4 w-4" /> Schedule a call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .field {
          @apply w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none backdrop-blur-md transition focus:border-white/30;
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label htmlFor={htmlFor} className="text-sm text-white/80">
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  subtitle,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
          {icon}
        </span>
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-white/60">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-3 text-sm text-white/80">{content}</div>
    </div>
  );
}
