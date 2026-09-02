// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 站点 URL：部署到 Cloudflare Pages 后会得到 `${PROJECT_SLUG}.pages.dev`。
// 通过环境变量 SITE_URL 注入实际值；本地默认是占位子域，部署时务必设置。
// 优先级：SITE_URL 环境变量 > 下方默认值。
const SITE = process.env.SITE_URL || 'https://desktop-agent-handbook.pages.dev';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
