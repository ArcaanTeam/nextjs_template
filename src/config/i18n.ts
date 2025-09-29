// Add or remove locales
export const LOCALES = ["fa", "ar", "en"] as const;
export const RTL_LOCALES = LOCALES.filter((locale) =>
  ["fa", "ar"].includes(locale)
);
export const LOCALE_REGEX = new RegExp(`^\/(${LOCALES.join("|")})`);

export type ValidLocaleString = (typeof LOCALES)[number];
// Set the default locale
export const DEFAULT_LOCALE: ValidLocaleString = "fa";

export function isLocaleStringValid(localeString?: string) {
  if (!localeString) return false;
  return LOCALES.some((locale) => locale === localeString);
}

export function isLocaleRTL(localeString: string) {
  return RTL_LOCALES.some((locale) => locale === localeString);
}
