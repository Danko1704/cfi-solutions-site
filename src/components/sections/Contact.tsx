// src/components/sections/Contact.tsx
"use client";

import { useState, useEffect } from "react";
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

type FormState = {
  name: string;
  email: string;
  message: string;
  org: string;
  phone: string;
  topic: string;
  consent: boolean;
  company: string; // honeypot
};
type FormErrors = Partial<Record<keyof FormState, string>>;
const MAX_MESSAGE = 300;

export default function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMsg, setStatusMsg] = useState<string>("");

  // form state (manteniendo el layout original)
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    org: "",
    phone: "",
    topic: "",
    consent: false,
    company: "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [errors, setErrors] = useState<FormErrors>({});

  // validación cliente (simple y clara)
  function validate(v: FormState): FormErrors {
    const e: FormErrors = {};
    if (!v.name.trim()) e.name = "Name is required.";
    if (!v.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      e.email = "Enter a valid email.";
    if (!v.message.trim()) e.message = "Message is required.";
    else if (v.message.length > MAX_MESSAGE)
      e.message = `Max ${MAX_MESSAGE} characters.`;
    if (!v.consent) e.consent = "You must accept the consent.";
    return e;
  }

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  function setValue<K extends keyof FormState>(key: K, val: FormState[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }
  function onBlur<K extends keyof FormState>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }));
  }
  function inputClass(key: keyof FormState) {
    const base = "field";
    const isError = touched[key] && errors[key];
    return `${base} ${isError ? "border-red-500 focus:border-red-400" : ""}`;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setStatusMsg("");

    // marcar campos principales como tocados
    setTouched((t) => ({
      ...t,
      name: true,
      email: true,
      message: true,
      consent: true,
    }));
    const currentErrors = validate(values);

    // honeypot (si está lleno, hacemos “éxito silencioso”)
    if (values.company.trim()) {
      setStatus("success");
      setStatusMsg("Thanks!");
      (e.currentTarget as HTMLFormElement).reset();
      setValues({
        name: "",
        email: "",
        message: "",
        org: "",
        phone: "",
        topic: "",
        consent: false,
        company: "",
      });
      setTouched({});
      return;
    }

    if (Object.keys(currentErrors).length) {
      setErrors(currentErrors);
      setStatus("error");
      setStatusMsg("Please fix the errors and try again.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.ok === false) {
        const detail = Array.isArray(json?.errors)
          ? json.errors.join(", ")
          : json?.error;
        throw new Error(detail || "Request failed");
      }

      setStatus("success");
      setStatusMsg("Message sent successfully. We'll get back to you shortly.");
      form.reset();
      (e.currentTarget as HTMLFormElement).reset();
      setValues({
        name: "",
        email: "",
        message: "",
        org: "",
        phone: "",
        topic: "",
        consent: false,
        company: "",
      });
      setTouched({});
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "We couldn't send your message. Please try again.";
      setStatus("error");
      setStatusMsg(msg);
    }
  }

  return (
    <section
      id="contact"
      className="relative py-14 lg:py-20 overflow-hidden -mt-20 lg:-mt-24 border-t border-white/10"
    >
      {/* divider y fondo: igual que tu diseño */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-60 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#899398]/15 blur-3xl" />
        <svg
          className="absolute inset-x-0 bottom-[-1px]"
          viewBox="0 0 1440 120"
          fill="none"
          aria-hidden
        >
          <path
            d="M0 40c120 40 240 40 360 20s240-60 360-60 240 40 360 60 240 20 360-20v60H0V40z"
            fill="rgba(137,147,152,0.12)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {/* header igual */}
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
          {/* columna de tarjetas, intacta */}
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
                  Htijerina@cloudforgeitsolutions.com
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
                  +52 81 2646 3740
                </a>
              }
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Office"
              subtitle="Monterrey, Nuevo León, MX"
              content={
                <span>
                  Valle del Mirador 603 Col. Mirador de la silla, Guadalupe,
                  Nuevo León, 67176, Mexico
                </span>
              }
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Response time"
              subtitle="We answer fast"
              content={<span>Within 24 hours on business days</span>}
            />
          </div>

          {/* formulario con los mismos estilos + errores por campo */}
          <div className="md:col-span-3">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent" />
              <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-5"
                aria-describedby="formStatus"
                noValidate
              >
                {/* honeypot */}
                <div className="hidden">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => setValue("company", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label="Full name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      className={inputClass("name")}
                      value={values.name}
                      onChange={(e) => setValue("name", e.target.value)}
                      onBlur={() => onBlur("name")}
                      aria-invalid={!!(touched.name && errors.name)}
                      aria-describedby={
                        touched.name && errors.name ? "error-name" : undefined
                      }
                    />
                    <FieldError
                      id="error-name"
                      show={!!(touched.name && errors.name)}
                      text={errors.name}
                    />
                  </Field>

                  <Field label="Work email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      className={inputClass("email")}
                      value={values.email}
                      onChange={(e) => setValue("email", e.target.value)}
                      onBlur={() => onBlur("email")}
                      aria-invalid={!!(touched.email && errors.email)}
                      aria-describedby={
                        touched.email && errors.email
                          ? "error-email"
                          : undefined
                      }
                    />
                    <FieldError
                      id="error-email"
                      show={!!(touched.email && errors.email)}
                      text={errors.email}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label="Company" htmlFor="org">
                    <input
                      id="org"
                      name="org"
                      placeholder="Company LLC"
                      className={inputClass("org")}
                      value={values.org}
                      onChange={(e) => setValue("org", e.target.value)}
                      onBlur={() => onBlur("org")}
                    />
                  </Field>
                  <Field label="Phone" htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      placeholder="+52 81 0000 0000"
                      className={inputClass("phone")}
                      value={values.phone}
                      onChange={(e) => setValue("phone", e.target.value)}
                      onBlur={() => onBlur("phone")}
                    />
                  </Field>
                </div>

                <Field label="Topic" htmlFor="topic">
                  <select
                    id="topic"
                    name="topic"
                    className={inputClass("topic") + " bg-white text-[#0B1F38]"}
                    value={values.topic}
                    onChange={(e) => setValue("topic", e.target.value)}
                    onBlur={() => onBlur("topic")}
                  >
                    <option value="">Select…</option>
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
                    rows={5}
                    placeholder="Share context, timelines, and goals…"
                    className={inputClass("message") + " resize-y"}
                    value={values.message}
                    onChange={(e) =>
                      setValue("message", e.target.value.slice(0, MAX_MESSAGE))
                    }
                    onBlur={() => onBlur("message")}
                    maxLength={MAX_MESSAGE}
                    aria-invalid={!!(touched.message && errors.message)}
                    aria-describedby={
                      touched.message && errors.message
                        ? "error-message"
                        : "message-hint"
                    }
                  />
                  <div className="mt-1 flex items-center justify-between text-xs">
                    {touched.message && errors.message ? (
                      <p id="error-message" className="text-rose-300">
                        {errors.message}
                      </p>
                    ) : (
                      <p id="message-hint" className="text-white/60">
                        Up to {MAX_MESSAGE} characters.
                      </p>
                    )}
                    <span className="text-white/60">
                      {values.message.length}/{MAX_MESSAGE}
                    </span>
                  </div>
                </Field>

                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    className={`mt-1 h-4 w-4 rounded bg-transparent ${
                      touched.consent && errors.consent
                        ? "border-red-500"
                        : "border-white/20"
                    }`}
                    checked={values.consent}
                    onChange={(e) => setValue("consent", e.target.checked)}
                    onBlur={() => onBlur("consent")}
                    aria-invalid={!!(touched.consent && errors.consent)}
                    aria-describedby={
                      touched.consent && errors.consent
                        ? "error-consent"
                        : undefined
                    }
                  />
                  <label htmlFor="consent" className="text-sm text-white/70">
                    I agree to the processing of my data for the purpose of
                    responding to this inquiry.
                  </label>
                </div>
                <FieldError
                  id="error-consent"
                  show={!!(touched.consent && errors.consent)}
                  text={errors.consent}
                />

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
                      <CheckCircle2 className="h-4 w-4" /> {statusMsg}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="inline-flex items-center gap-2 text-rose-300">
                      <AlertCircle className="h-4 w-4" /> {statusMsg}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* mapa y tarjetas: igual */}
        <div
          id="map"
          className="mt-10 lg:mt-12 grid grid-cols-1 gap-6 md:grid-cols-5"
        >
          {/* 🗺️ Google Map */}
          <div className="md:col-span-3 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="CFI Solutions Office Map"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=Valle%20del%20Mirador%20603%20Guadalupe%20Nuevo%20Le%C3%B3n%2067176%20Mexico&output=embed`}
            />
          </div>

          {/* 🏢 Contact Info */}
          <div className="md:col-span-2 grid content-between gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5" />
                <h3 className="text-lg font-semibold">CFI Solutions — HQ</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>Valle del Mirador 603</li>
                <li>Col. Mirador de la Silla, Guadalupe, Nuevo León</li>
                <li>67176, Mexico</li>
              </ul>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:Htijerina@cloudforgeitsolutions.com"
                    className="text-white/90 hover:text-white transition"
                  >
                    Htijerina@cloudforgeitsolutions.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+528126463740"
                    className="text-white/90 hover:text-white transition"
                  >
                    +52 81 2646 3740
                  </a>
                </li>
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

            {/* ☎️ Call to Action */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              <p>
                Prefer a call? Book a 15-min intro and we’ll discuss your use
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

      {/* misma utilidad de estilos */}
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
    <div className="flex flex-col gap-2 mb-1">
      <label htmlFor={htmlFor} className="text-sm text-white/80">
        {label}
      </label>
      {children}
    </div>
  );
}

function FieldError({
  id,
  show,
  text,
}: {
  id: string;
  show: boolean;
  text?: string;
}) {
  if (!show || !text) return null;
  return (
    <p id={id} className="mt-1 text-sm text-rose-300">
      {text}
    </p>
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
