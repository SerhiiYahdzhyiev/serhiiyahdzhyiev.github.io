import {defineConfig} from "unocss";
import presetMini from "@unocss/preset-mini";

export default defineConfig({
  presets: [
    presetMini({}),
  ],
  theme: {
    spacing: {
      0: '0',
      1: 'var(--sp-1)',
      2: 'var(--sp-2)',
      3: 'var(--sp-3)',
      4: 'var(--sp-4)',
      5: 'var(--sp-5)',
      6: 'var(--sp-6)',
      7: 'var(--sp-7)',
      8: 'var(--sp-8)',
    },
    colors: {
      bg: 'var(--clr-bg-body)',
      surface: 'var(--clr-bg-surface)',
      text: 'var(--clr-text-primary)',
      muted: 'var(--clr-text-muted)',
      border: 'var(--clr-border-subtle)',
      accent: 'var(--clr-accent)',
    },
    fontFamily: {
      sans: 'var(--ff-sans)',
      mono: 'var(--ff-mono)',
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
    },
  },
});
