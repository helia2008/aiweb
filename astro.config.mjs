// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 站点正式域名：https://aiwind.eu.cc（Cloudflare Pages 自定义域名，状态 active）
// 通过环境变量 SITE_URL 可临时覆盖（如本地预览或临时子域）。
// 优先级：SITE_URL 环境变量 > 下方默认值。
const SITE = process.env.SITE_URL || 'https://aiwind.eu.cc';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
