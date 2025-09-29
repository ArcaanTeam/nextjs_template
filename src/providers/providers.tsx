import { QueryProvider } from "@/providers/react-query-provider";
import { Locale, Messages } from "@/config/i18n";
import { ThemeProvider } from "@/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";

interface Props {
  locale: Locale;
  messages: Messages;
}

export default function Providers({
  children,
  locale,
  messages,
}: PropsWithChildren<Props>) {
  return (
    <NextIntlClientProvider locale={locale as Locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
