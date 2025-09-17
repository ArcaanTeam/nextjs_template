"use client";

import { LOCALES } from "@/config/i18n";
import useI18n from "@/hooks/useI18n";

export default function LanguageSwitcher() {
  const { changeLocale, locale } = useI18n();

  return (
    <div className="flex gap-2 p-2 bg-gray-100 rounded">
      {LOCALES.map(($locale) => (
        <button
          key={$locale}
          className={`px-3 py-1 rounded hover:bg-gray-300 transition ${
            locale === $locale && "bg-cyan-300"
          }`}
          onClick={() => changeLocale($locale)}
        >
          {$locale}
        </button>
      ))}
    </div>
  );
}
