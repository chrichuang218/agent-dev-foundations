import { defineConfig } from 'astro/config';
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  output: 'static',
  site: 'https://chrichuang218.github.io',
  base,
  trailingSlash: 'always',
  redirects: { '/config/': `${base}typescript/#project-config` },
  devToolbar: { enabled: false },
});
