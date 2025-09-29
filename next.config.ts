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

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundleAnalyzer(withNextIntl({
  /* config options here */
}));

export default nextConfig;
