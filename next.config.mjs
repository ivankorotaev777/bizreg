import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-intl"],
  webpack: (config) => {
    // Убирает предупреждения о кэше из-за динамического import() в next-intl
    config.infrastructureLogging = { level: "error" };
    return config;
  },
};

export default withNextIntl(nextConfig);
