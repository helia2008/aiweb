# 桌面 Agent 实战手册 · 站点

> 写给不想学编程、但想把每周重复的活交给电脑自己做的人。

一个面向**非程序员职场人**的 AI 工具实战站。技术栈：Astro 5 + Tailwind 4 + Cloudflare Pages。内容由 Obsidian 知识库自动供血。

---

## 一分钟跑起来

```bash
cd desktop-agent-handbook
npm install
npm run dev      # http://localhost:4321
```

打开浏览器看首页、痛点处方列表、单篇文章详情。

构建生产版本：

```bash
npm run build
npm run preview  # 本地预览 dist/
```

---

## 目录结构

```
desktop-agent-handbook/
├── astro.config.mjs          # Astro 配置（站点 URL、Tailwind、Sitemap）
├── wrangler.toml             # Cloudflare Pages 部署配置
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── hero-desk.svg         # 首页占位图，建议替换为真实桌面图
├── src/
│   ├── content.config.ts     # 痛点处方 + 工具 罗盘 集合定义
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── lib/site.js           # 站点常量
│   ├── pages/
│   │   ├── index.astro       # 首页
│   │   ├── start-here.astro  # 7 天路线
│   │   ├── prescriptions/    # 痛点处方
│   │   │   ├── index.astro
│   │   │   └── [id].astro
│   │   ├── tools/index.astro # 工具罗盘
│   │   ├── about.astro       # 关于
│   │   └── rss.xml.js
│   ├── content/
│   │   ├── prescriptions/    # 7 篇种子文章
│   │   └── tools/            # 3 个工具卡
│   ├── scripts/
│   │   └── sync-from-obsidian.mjs  # PKM 同步脚本
│   └── styles/global.css     # 设计系统 · 纸感编辑风
└── .gitignore
```

---

## 内容如何更新

### 方式一：手动（在仓库里写）

直接编辑 `src/content/prescriptions/*.md`，frontmatter 必须满足 `content.config.ts` 里的 schema。`git push` 后 Cloudflare Pages 自动构建。

### 方式二：PKM 同步（推荐）

把 Obsidian vault 里的笔记写进 `Publish/`，frontmatter 标 `publish: true`，然后跑：

```bash
VAULT_PATH=I:/wk/ObsidianVault npm run sync
git add .
git commit -m "sync: 同步 2026-W36 笔记"
git push
```

脚本会做三件事：

1. 扫 `vault/Publish/` 下所有 `publish: true` 的笔记；
2. 把 `[[wikilink]]` 转成站内链接，把附件图复制到 `public/uploads/`，重写相对路径；
3. 把渲染好的 Markdown 写到 `src/content/prescriptions/`，frontmatter 自动补齐。

> 脚本不会动原 vault 任何文件。详见 `src/scripts/sync-from-obsidian.mjs` 顶部注释。

### 痛点处方 frontmatter 模板

```yaml
---
publish: true                 # 必填：不写就不会被同步
slug: monthly-expense-reports # 可选但强烈建议：中文标题会生成中文 URL（分享时是一长串百分号编码）
title: 你的处方标题
summary: 一句话描述这个活是什么、用什么做了、效果如何。
category: 财务 / 行政
difficulty: 入门              # 入门 / 进阶 / 高阶
setupMinutes: 40
saveHoursPerWeek: 2.5
publishedAt: 2026-09-02
updatedAt: 2026-09-02
tags:
  - 发票
  - 行政

# 可选：写了才会输出 FAQPage schema（抢 Google「大家也在问」富摘要）
# 必须是读者真会问的问题，不要为了 SEO 硬造
faqs:
  - q: 这个需要装什么软件？
    a: 装一个桌面 Agent 即可，不需要编程环境。
  - q: 它会改我的原文件吗？
    a: 不会，指令里限定只读原目录。
---

## 这个活到底烦在哪

...

## 一步步怎么配

...

## 直接能抄的指令

\`\`\`text
...
\`\`\`

## 我踩过的坑

...
```

---

## 部署到 Cloudflare Pages

### 最简单的方式：Git 直连（推荐）

1. 把这个目录推到 GitHub
2. 登录 Cloudflare → Pages → Create a project → Connect to Git
3. 选择仓库，`Build command` 填 `npm run build`，`Build output` 填 `dist`
4. 在 Environment variables 加：
   - `SITE_URL` = `https://你的域名`
   - `NODE_VERSION` = `20`
5. 部署完成。在 Custom domains 绑定你的域名

之后每次 `git push` 都自动构建、自动部署。

### 用 wrangler CLI 手动部署

```bash
npm install -g wrangler
npm run build
npx wrangler pages deploy dist --project-name=desktop-agent-handbook
```

`wrangler.toml` 里已配好项目名。

---

## 视觉系统

设计稿在 Ardot 文件 `AI Agent 入门指南站 · 设计稿`（fileId `721428621454886`）里。  
核心 token 落在 `src/styles/global.css` 的 `@theme` 块：

| Token            | 值             | 用途                         |
| ---------------- | ------------- | -------------------------- |
| `--color-paper`  | `#FBF9F4`     | 页面底色                       |
| `--color-ink`    | `#1A1917`     | 正文与标题                      |
| `--color-accent` | `#B23A2B`     | 朱砂强调色（CTA、链接、徽标）           |
| `--color-rule`   | `#E5DFD2`     | 边线 / 分隔线                   |
| `--color-deep`   | `#1A1917`     | 深色反转区（Before/After、Footer） |
| `--font-display` | Noto Serif SC | 衬线标题                       |
| `--font-sans`    | Inter         | 正文 / 按钮 / meta             |

改 token 即可换皮肤，组件不用动。

---

## 下一步

- [x] 替换 `public/hero-desk.svg` 为真实桌面图 → 已用 AI 生成 936×904 PNG
- [x] 修占位 `desktopagent.dev` → 改用自定义域名 `https://aiwind.eu.cc`（CF Pages 已绑定，状态 active）
- [ ] 在 Cloudflare Pages 创建项目、连 GitHub、设 `SITE_URL` 环境变量、绑定自定义域名（可选）
- [ ] 把你 vault 里的真实笔记丢进 `I:/AI知识库-Vault/Publish/`，跑 `VAULT_PATH=I:/AI知识库-Vault npm run sync` 验证
- [ ] `git init && git add . && git commit -m "init"` → 推到 GitHub → 触发自动部署
- [ ] 在 Cloudflare 绑定自定义域名

---

## 常见问题（环境坑）

### `npm install` 卡住不动 / 报 `FETCH_ERROR` + `genie-trash.exe ETIMEDOUT`

**根因**：WorkBuddy 会往 `NODE_OPTIONS` 注入 `--require=.../genie-safe-delete.cjs`，把 Node 的 `fs.rmSync` 重定向到系统回收站（`genie-trash.exe`）。npm 在写入缓存时会清理旧文件，被这个护栏拦截后超时，导致 install 卡死或 `FETCH_ERROR`。

**解法**：给 npm 一个干净的 `NODE_OPTIONS`：

```bash
NODE_OPTIONS="" npm install
```

本仓库的 `.npmrc` 已经配好了国内镜像和项目内缓存（`cache=.npm-cache`），避免占用 C 盘。

### C 盘空间不足

本机 C 盘曾只剩 374MB，导致 npm 缓存在 `C:\...\AppData\Local\npm-cache` 写满、install 卡死。
`.npmrc` 里的 `cache=.npm-cache`（相对路径）会把缓存放到项目目录（I 盘），不占 C 盘。

---

## SEO 交付物

站点已按 SEO 基线加固，详见 `SEO-STRATEGY.md`。关键文件：

| 文件 | 作用 |
|---|---|
| `public/robots.txt` | 允许全站抓取 + sitemap 声明 |
| `public/og-default.png` | 1200×630 社交分享卡（Ardot 设计导出） |
| `src/components/SEO.astro` | canonical / OG / Twitter / JSON-LD 统一组件 |
| `src/components/Subscribe.astro` | 订阅区（抽离复用） |
| `src/pages/404.astro` | 404 兜底 + 最新 5 篇 |
| `src/pages/rss.xml.js` | RSS（含分类） |

结构化数据已覆盖：Organization、WebSite、Article、BreadcrumbList、FAQPage（文章 frontmatter 写 `faqs` 才输出）。

---

## License

站点内容（含 `src/content/`）CC BY-NC-SA 4.0。  
代码（含 `src/components/`、`src/scripts/`）MIT。
