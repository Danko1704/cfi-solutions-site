import { Hero, Industries, Services } from "@/components/sections";
import About from "@/components/sections/About";
import ContactSection from "@/components/sections/Contact";
import IntegrationsSection from "@/components/sections/IntegrationsSection";

export default function HomePage() {
  return (
    <main className="bg-[#0B1F38] text-white">
      <Hero />
      <Services />
      <Industries />
      <About />
      <IntegrationsSection />
      <ContactSection />
    </main>
  );
}
