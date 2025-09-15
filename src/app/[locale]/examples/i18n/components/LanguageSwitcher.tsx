"use client";

import { LOCALES } from "@/config/i18n"; // or wherever you define ["fa", "en"]
import useI18n from "@/hooks/useI18n";

export default function LanguageSwitcher() {
  const { switchLanguage } = useI18n();

  return (
    <div className="flex gap-2 p-2 bg-gray-100 rounded">
      {LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className="px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          {locale === "fa" ? "فارسی" : "English"}
        </button>
      ))}
    </div>
  );
}
