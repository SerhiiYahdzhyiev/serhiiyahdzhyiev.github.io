// @ts-check
import { defineConfig } from 'astro/config';

import image from "@astrojs/image";

export default defineConfig({
  base: "/",
  outDir: "dist",
  integrations: [image()],
});