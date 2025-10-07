import { Hero, Industries, Services } from "@/components/sections";

export default function HomePage() {
  return (
    <main className="bg-[#0B1F38] text-white">
      <Hero />
      <Services />
      <Industries />
    </main>
  );
}
