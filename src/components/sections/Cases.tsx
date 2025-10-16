// Minimal, comments in English as you prefer

import { useTranslations } from "next-intl";

export default function Cases() {
  const t = useTranslations("Cases");

  return (
    <section className="py-24">
      <h1 className="text-4xl md:text-6xl font-bold">{t("title")}</h1>
      <p className="mt-3 text-lg opacity-80">{t("subtitle")}</p>
    </section>
  );
}
