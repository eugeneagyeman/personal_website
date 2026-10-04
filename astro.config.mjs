// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Required so absolute og:image/og:url/canonical URLs can
  // be built in the layout (Open Graph scrapers do not resolve relative URLs).
  site: 'https://eugeneagyeman.io',

  // Nothing on the site is hydrated, so the toolbar only ever says "no islands
  // detected". It is a dev-only overlay, so turning it off changes no output.
  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});