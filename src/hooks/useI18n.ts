import { DEFAULT_LOCALE, isLocaleStringValid } from "@/config/i18n";
import { Key } from "@/constants/enums";
import { SET_LOCALE_COOKIE_CONFIG } from "@/constants/frequents";
import { routing } from "@/i18n/routing";
import { getCookieClient, setCookieClient } from "@/utils/cookie";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function useI18n() {
  const router = useRouter();
  const pathname = usePathname();
  const local = useLocale();

  /**
   * Store the locale as state so that components re-render immediately
   * after a switch, without waiting for Router events
   */
  const [locale, setLocale] = useState(local);

  const changeLocale = useCallback(
    (newLocale: string) => {
      if (!isLocaleStringValid(newLocale) || newLocale === locale) return;

      if (typeof window !== "undefined") {
        setCookieClient(
          Key.CookieI18nSavedLocale,
          newLocale,
          SET_LOCALE_COOKIE_CONFIG
        );
      }

      setLocale(newLocale);
      pushToNewUrl(newLocale);
    },
    [locale, pushToNewUrl]
  );

  function pushToNewUrl(newLocale: string) {
    const localePrefixCondition = routing.localePrefix as string;
    const currentUrl = new URL(window.location.href);
    const currentLocale = getLocaleFromUrl();
    let newPath: string;

    const newLocalePrefix =
      localePrefixCondition === "always"
        ? newLocale
        : localePrefixCondition === "never"
        ? ""
        : routing.localePrefix === "as-needed"
        ? newLocale === DEFAULT_LOCALE
          ? ""
          : newLocale
        : "";

    if (currentLocale === DEFAULT_LOCALE) {
      newPath = newLocalePrefix.concat(pathname);
    } else {
      newPath = pathname.replace(`/${currentLocale}`, newLocalePrefix);
    }

    currentUrl.pathname = newPath;
    const finalUrl = currentUrl.toString();
    router.replace(finalUrl);
  }

  function getSavedLocale() {
    return getCookieClient(Key.CookieI18nSavedLocale);
  }

  function getLocaleFromUrl() {
    const supposeToBeLocaleString = pathname.split("/")[1];
    const isValid = isLocaleStringValid(supposeToBeLocaleString);
    if (isValid) {
      return supposeToBeLocaleString;
    } else {
      return DEFAULT_LOCALE;
    }
  }

  return {
    changeLocale,
    getSavedLocale,
    getLocaleFromUrl,
    locale,
  };
}
