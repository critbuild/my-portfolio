import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://critbuild.io',
  trailingSlash: 'always',
  compressHTML: true,
  devToolbar: { enabled: false },
  // Preserve animation-timeline longhands; Lightning CSS folds them into unsupported shorthand.
  vite: { build: { cssMinify: 'esbuild' } },
});
