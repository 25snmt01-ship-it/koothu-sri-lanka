import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/traditions/thenmudi-koothu", destination: "/traditions/thenmodi-koothu", permanent: true },
      { source: "/traditions/panni-koothu", destination: "/traditions/panri-koothu", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
