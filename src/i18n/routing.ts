import { DEFAULT_LOCALE, LOCALES } from "@/config/i18n";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed", // or "always", "never"
});
