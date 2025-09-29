import { isLocaleRTL, Locale } from "@/config/i18n";
import Providers from "@/providers/providers";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages = (await import(`@/../messages/${locale}.json`)).default;
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  } as Metadata;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dir = isLocaleRTL(locale) ? "rtl" : "ltr";
  const messages = await getMessages({ locale: locale as Locale });

  return (
    <html lang={locale} dir={dir}>
      <body className="antialiased">
        <Providers locale={locale as Locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
