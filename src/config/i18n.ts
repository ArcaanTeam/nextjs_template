export const LOCALES = ["fa", "en"] as const;
export const LOCALE_REGEX = new RegExp(`^\/(${LOCALES.join("|")})`);

export type ValidLocaleString = (typeof LOCALES)[number];
