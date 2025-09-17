"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Page() {
  const t = useTranslations();

  return (
    <div>
      <LanguageSwitcher />
      <h1>{t("welcome")}</h1>
    </div>
  );
}
