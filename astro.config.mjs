import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  site: 'https://urbancoast.dk',
  integrations: [sitemap({
    filter: (page) => !page.includes('/go/') && !page.includes('/produkter/'),
  })],
  markdown: {
    rehypePlugins: [rehypeSlug],
  },
  build: {
    inlineStylesheets: 'always',
  },
});
