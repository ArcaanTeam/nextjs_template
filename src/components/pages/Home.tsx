"use client";

import LanguageSwitcher from "@/components/features/theme/language-switcher";
import { ThemeToggle } from "@/components/features/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-4 rounded-2xl bg-emerald-200 dark:bg-emerald-950 flex items-center flex-col gap-4">
        <h1>{t("welcome")}</h1>
        <LanguageSwitcher />
        <ThemeToggle />
        <Button variant="outline">Button</Button>
      </div>
    </div>
  );
}
