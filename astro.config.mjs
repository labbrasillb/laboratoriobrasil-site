import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import remarkMermaid from './src/lib/remark-mermaid.mjs';

export default defineConfig({
  site: 'https://laboratoriobrasil.com.br',
  output: 'static',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMermaid],
    }),
  },
});
