import { LOCALE_REGEX, ValidLocaleString } from "@/config/i18n";
import { Key } from "@/constants/KEYS";
import { getCookieClient, setCookieClient } from "@/utils/cookie.utils";
import { usePathname, useRouter } from "next/navigation";

export default function useI18n() {
  const router = useRouter();
  const pathname = usePathname();

  function switchLanguage(newLocale: ValidLocaleString) {
    // Preserve path but replace locale
    const newPathname = pathname.replace(
      LOCALE_REGEX, // match current locale prefix
      `/${newLocale}`
    );

    // Set cookie for middleware to read
    setCookieClient(Key.CookieI18nSavedLocale, `${newLocale}`, {
      path: "/",
      maxAge: 31536000,
      sameSite: "strict",
    });

    // Navigate to new locale path
    router.push(newPathname);
  }

  function getSavedLocale() {
    return getCookieClient(Key.CookieI18nSavedLocale);
  }

  function getCurrentLocale() {
    return pathname.split("/")[1];
  }

  return {
    switchLanguage,
    getSavedLocale,
    getCurrentLocale,
  };
}
