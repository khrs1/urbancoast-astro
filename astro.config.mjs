import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://urbancoast.dk',
  integrations: [sitemap({
    filter: (page) => !page.includes('/go/') && !page.includes('/produkter/'),
  })],
});
