// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import UnoCSS from "unocss/astro";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://serhiiyahdzhyiev.github.io",
  base: "/",
  outDir: "dist",
  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes("/blog/"),
    }),
    UnoCSS(),
    compress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      SVG: true,
      Image: false,
    }),
  ],
  vite: {
    build: {
      target: "es2020",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/react")) return "react-vendor";
          },
        },
      },
    },
  },
});
