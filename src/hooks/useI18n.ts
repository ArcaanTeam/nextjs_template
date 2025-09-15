import {
  DEFAULT_LOCALE,
  isLocaleStringValid,
  LOCALE_REGEX,
  ValidLocaleString,
} from "@/config/i18n";
import { Key } from "@/constants/enums";
import { SET_LOCALE_COOKIE_CONFIG } from "@/constants/frequents";
import { getCookieClient, setCookieClient } from "@/utils/cookie.utils";
import { usePathname, useRouter } from "next/navigation";

export default function useI18n() {
  const router = useRouter();
  const pathname = usePathname();

  function switchLanguage(newLocale: ValidLocaleString) {
    // Set cookie for middleware to read
    setCookieClient(
      Key.CookieI18nSavedLocale,
      `${newLocale}`,
      SET_LOCALE_COOKIE_CONFIG
    );

    let newPathname: string;

    if (newLocale === DEFAULT_LOCALE) {
      newPathname = pathname.replace(LOCALE_REGEX, ""); // remove any locale
      router.push(newPathname || "/"); // fallback to root
    } else {
      // If switching FROM default (no prefix) → add new locale
      // Or replace existing non-default locale
      newPathname = pathname.replace(LOCALE_REGEX, `/${newLocale}`);
      router.push(newPathname);
    }
  }

  function getSavedLocale() {
    return getCookieClient(Key.CookieI18nSavedLocale);
  }

  function getCurrentLocale() {
    const supposeToBeLocaleString = pathname.split("/")[1];
    const isValid = isLocaleStringValid(supposeToBeLocaleString);
    if (isValid) {
      return supposeToBeLocaleString;
    } else {
      const savedLocale = getSavedLocale();
      if (savedLocale === DEFAULT_LOCALE) {
        return savedLocale;
      } else {
        return ""; // Undefined condition
      }
    }
  }

  return {
    switchLanguage,
    getSavedLocale,
    getCurrentLocale,
  };
}
