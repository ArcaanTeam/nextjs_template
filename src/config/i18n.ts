export const LOCALES = ["fa", "en"] as const;

export type ValidLocaleString = (typeof LOCALES)[number];
