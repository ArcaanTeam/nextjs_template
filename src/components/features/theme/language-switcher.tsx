"use client";

import { Button } from "@/components/ui/button";
import { LOCALES } from "@/config/i18n";
import useI18n from "@/hooks/useI18n";

export default function LanguageSwitcher() {
  const { changeLocale, locale } = useI18n();

  return (
    <div className="flex flex-col gap-2 p-2 rounded">
      {LOCALES.map(($locale) => (
        <Button
          key={$locale}
          variant={$locale === locale ? "default" : "ghost"}
          onClick={() => changeLocale($locale)}
        >
          {$locale}
        </Button>
      ))}
    </div>
  );
}
