// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import UnoCSS from "unocss/astro";

export default defineConfig({
  site: "https://serhiiyahdzhyiev.github.io" ,
  base: "/",
  outDir: "dist",
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    compressor(),
    UnoCSS(),
  ],
});
