export const LOCALES = ["fa", "en"] as const;
export const LOCALE_REGEX = new RegExp(`^\/(${LOCALES.join("|")})`);

export type ValidLocaleString = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: ValidLocaleString = "fa";

export function isLocaleStringValid(localeString: string) {
  return LOCALES.some((locale) => locale === localeString);
}
