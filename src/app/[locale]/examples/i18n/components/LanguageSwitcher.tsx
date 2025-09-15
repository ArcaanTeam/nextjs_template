"use client";

import { LOCALES } from "@/config/i18n"; // or wherever you define ["fa", "en"]
import useI18n from "@/hooks/useI18n";

export default function LanguageSwitcher() {
  const { switchLanguage, getCurrentLocale, getSavedLocale } = useI18n();
  const savedLocale = getSavedLocale();
  const currentLocale = getCurrentLocale();
  console.log("Saved locale:", savedLocale);
  console.log("Current locale (URL):", currentLocale);

  return (
    <div className="flex gap-2 p-2 bg-gray-100 rounded">
      {LOCALES.map((locale) => {
        const isSavedLocale = locale == savedLocale;
        console.log(locale, savedLocale, isSavedLocale);
        return (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`px-3 py-1 rounded hover:bg-gray-300 transition ${
              isSavedLocale ? "bg-cyan-400" : ""
            }`}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
