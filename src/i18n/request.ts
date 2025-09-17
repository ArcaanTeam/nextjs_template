import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(
  async ({ locale: specifiedLocale, requestLocale }) => {
    const requested = specifiedLocale || (await requestLocale);
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    return {
      messages: (await import(`../../messages/${locale}.json`)).default,
      locale,
    };
  }
);
