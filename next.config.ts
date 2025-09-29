import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: [
      "./messages/fa.json",
      "./messages/en.json",
      "./messages/ar.json",
    ],
  },
  requestConfig: "./src/i18n/request.ts",
});

const nextConfig: NextConfig = withNextIntl({
  /* config options here */
});

export default nextConfig;
