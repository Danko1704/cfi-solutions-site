// src/app/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "CFI Solutions",
  description:
    "Consultoría estratégica y soporte técnico en 3DEXPERIENCE y DELMIA Apriso.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-[#0B1F38] text-white">
        <Navbar />

        {/* 👇 spacer para que el Hero no quede oculto bajo el navbar */}
        <div className="h-16" />

        <main className="min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
