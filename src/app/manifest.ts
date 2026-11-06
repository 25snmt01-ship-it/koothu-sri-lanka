import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Traditional Koothu of Sri Lanka",
    short_name: "Koothu",
    description: "Explore the living theatre traditions of Sri Lanka.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f0e6",
    theme_color: "#4a1826",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
