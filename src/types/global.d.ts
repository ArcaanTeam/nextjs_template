import { routing } from "@/i18n/routing";
import { formats } from "@/i18n/request";
// Use default locale
import messages from "../../messages/fa.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
