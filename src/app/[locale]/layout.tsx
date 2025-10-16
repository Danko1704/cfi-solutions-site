// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "CFI Solutions",
  description:
    "Consultoría estratégica y soporte técnico en 3DEXPERIENCE y DELMIA Apriso.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    // 🚫 notFound() no se puede usar aquí
    // fallback: usa inglés por defecto o uno vacío
    messages = (await import("@/messages/en.json")).default;
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="bg-[#0B1F38] text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />

          {/* 👇 spacer para que el Hero no quede oculto bajo el navbar */}
          <div className="h-16" />

          <main className="min-h-screen">{children}</main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
