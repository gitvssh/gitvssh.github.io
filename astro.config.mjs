import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://blog.damecasol.com',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/posts/terminal-bench-maintenance-debt/': '/posts/terminal-bench-maintenance-debt-20261117/',
    '/posts/vericua-completion-evidence/': '/posts/vericua-completion-evidence-20261118/',
  },
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
