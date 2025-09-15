import { ValidLocaleString } from "@/config/i18n";
import { usePathname, useRouter } from "next/navigation";

export default function useI18n() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: ValidLocaleString) => {
    // Preserve path but replace locale
    const newPathname = pathname.replace(
      /^\/(fa|en)/, // match current locale prefix
      `/${newLocale}`
    );

    // Set cookie for middleware to read
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Strict`;

    // Navigate to new locale path
    router.push(newPathname);
  };

  return {
    switchLanguage,
  };
}
