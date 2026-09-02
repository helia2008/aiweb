#!/usr/bin/env node
/**
 * PKM 同步脚本 · Obsidian Publish 目录 → 站点内容
 *
 * 用途：把 Obsidian vault 里的"想发布"笔记（frontmatter 含 publish: true）
 * 自动转换并写入 src/content/prescriptions/，提交到 git 即触发自动部署。
 *
 * 用法：
 *   1) 在环境变量里设 VAULT_PATH 指向你的 Obsidian vault 根目录
 *      例：VAULT_PATH=I:/wk/ObsidianVault npm run sync
 *   2) 默认扫描 vault/Publish/ 下所有 .md
 *   3) 默认输出到 src/content/prescriptions/，文件名用 slug（kebab-case）
 *   4) 任何一项转换失败都不中断，只在该文件顶部加一行警告
 *
 * 转换规则：
 *   - frontmatter 中 publish: false 或缺 publish → 跳过
 *   - 链接 [[其他笔记]] → 站内相对路径（粗略，按标题转 slug）
 *   - ![](attachments/xxx.png) → ![](/uploads/xxx.png)，同时把文件复制到 public/uploads/
 *   - 自动补齐：publishedAt（取文件 mtime）、updatedAt（同前）
 *
 * 不做：
 *   - 不修改原 vault 任何文件
 *   - 不读 .obsidian/、不写 vault 任何目录
 *   - 不删站点已有的非脚本生成文章（避免误删人工内容）
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../../');
const VAULT = process.env.VAULT_PATH || path.join(ROOT, 'vault');
const PUBLISH_DIR = process.env.PUBLISH_DIR || path.join(VAULT, 'Publish');
const OUT_DIR = path.join(ROOT, 'src/content/prescriptions');
const UPLOADS_DIR = path.join(ROOT, 'public/uploads');

const log = (...a) => console.log('[sync]', ...a);
const warn = (...a) => console.warn('[sync][warn]', ...a);

// ---------- 工具 ----------

/** frontmatter 解析：只支持简单的 key: value 结构（YAML 子集） */
function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: {}, body: src };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const k = line.slice(0, idx).trim();
    let v = line.slice(idx + 1).trim();
    if (v === 'true') v = true;
    else if (v === 'false') v = false;
    else if (/^\d+$/.test(v)) v = Number(v);
    else if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    fm[k] = v;
  }
  return { fm, body: src.slice(m[0].length) };
}

/** 简单 slug：中文保留、空格和标点转 - */
function slugify(title) {
  return String(title)
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'untitled';
}

/** 写 frontmatter（保持原文顺序：补齐缺省字段） */
function buildFrontmatter(extra) {
  const required = ['title', 'summary', 'category', 'difficulty', 'setupMinutes', 'saveHoursPerWeek', 'publishedAt', 'updatedAt', 'draft', 'tags'];
  for (const k of required) if (!(k in extra)) extra[k] = extra[k] ?? defaultFor(k);
  const order = ['title', 'summary', 'category', 'difficulty', 'setupMinutes', 'saveHoursPerWeek', 'publishedAt', 'updatedAt', 'draft', 'tags'];
  const lines = ['---'];
  for (const k of order) {
    const v = extra[k];
    if (Array.isArray(v)) lines.push(`${k}: [${v.map((x) => JSON.stringify(x)).join(', ')}]`);
    else if (typeof v === 'string') lines.push(`${k}: ${JSON.stringify(v)}`);
    else if (typeof v === 'number' || typeof v === 'boolean') lines.push(`${k}: ${v}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

function defaultFor(k) {
  switch (k) {
    case 'category': return '未分类';
    case 'difficulty': return '入门';
    case 'setupMinutes': return 30;
    case 'saveHoursPerWeek': return 1;
    case 'draft': return false;
    case 'tags': return [];
    default: return '';
  }
}

/** 处理 [[wikilink]] → 站内路径；不存在的笔记标成纯文本 */
function rewriteWikilinks(body, knownSlugs) {
  return body.replace(/\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g, (_, target, alias) => {
    const t = target.trim();
    const s = slugify(t);
    if (knownSlugs.has(s)) return `[${alias || t}](/prescriptions/${s})`;
    return alias || t;
  });
}

/** 处理图片引用：本地附件复制到 public/uploads，链接改写 */
async function rewriteImages(body, sourceFile, knownFiles) {
  const re = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const tasks = [];
  const replaced = await asyncReplace(re, body, async (match, alt, src) => {
    // 跳过绝对 URL 与 data:
    if (/^(https?:|data:)/.test(src)) return match;
    const srcPath = path.resolve(path.dirname(sourceFile), src);
    if (!knownFiles.has(srcPath)) {
      warn(`图片不存在：${srcPath}（在 ${sourceFile}）`);
      return match;
    }
    const fname = path.basename(srcPath);
    const destAbs = path.join(UPLOADS_DIR, fname);
    tasks.push(fs.copyFile(srcPath, destAbs).catch((e) => warn(`复制图片失败：${e.message}`)));
    return `![${alt}](/uploads/${fname})`;
  });
  await Promise.all(tasks);
  return replaced;
}

async function asyncReplace(re, str, fn) {
  const parts = [];
  let last = 0;
  for (const m of str.matchAll(re)) {
    parts.push(str.slice(last, m.index));
    parts.push(await fn(...m));
    last = m.index + m[0].length;
  }
  parts.push(str.slice(last));
  return parts.join('');
}

// ---------- 主流程 ----------

async function main() {
  log('VAULT =', VAULT);
  log('PUBLISH_DIR =', PUBLISH_DIR);
  log('OUT_DIR =', OUT_DIR);

  let stat;
  try {
    stat = await fs.stat(PUBLISH_DIR);
  } catch (e) {
    warn(`找不到发布目录：${PUBLISH_DIR}\n  请设置环境变量 VAULT_PATH 或 PUBLISH_DIR`);
    process.exit(0);
  }
  if (!stat.isDirectory()) {
    warn(`PUBLISH_DIR 不是目录：${PUBLISH_DIR}`);
    process.exit(0);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const files = (await fs.readdir(PUBLISH_DIR)).filter((f) => f.endsWith('.md'));
  log(`发现 ${files.length} 个候选 .md`);

  // 预扫所有 publish 笔记的标题 → slug，构建 wikilink 解析表
  const knownSlugs = new Set();
  for (const f of files) {
    const src = await fs.readFile(path.join(PUBLISH_DIR, f), 'utf8');
    const { fm } = parseFrontmatter(src);
    if (fm.title) knownSlugs.add(slugify(fm.title));
  }
  log(`已知发布笔记 ${knownSlugs.size} 个`);

  // 收集所有候选图片（附件通常在 vault 的 attachments/ 目录里），
  // 这里用一个简单的"全 vault 收集"——小库够用，大库需要换成索引。
  const knownFiles = await collectFiles(VAULT);

  let wrote = 0;
  let skipped = 0;
  for (const f of files) {
    const abs = path.join(PUBLISH_DIR, f);
    const src = await fs.readFile(abs, 'utf8');
    const { fm, body } = parseFrontmatter(src);
    if (fm.publish !== true) {
      skipped++;
      continue;
    }
    if (!fm.title) {
      warn(`缺少 title 字段：${f}，跳过`);
      skipped++;
      continue;
    }
    // 补字段
    const mtime = (await fs.stat(abs)).mtime;
    const merged = {
      ...fm,
      publishedAt: fm.publishedAt || mtime.toISOString().slice(0, 10),
      updatedAt: fm.updatedAt || mtime.toISOString().slice(0, 10),
    };
    // 转换 body
    let outBody = rewriteWikilinks(body, knownSlugs);
    outBody = await rewriteImages(outBody, abs, knownFiles);
    // 写入
    const outFile = path.join(OUT_DIR, `${slugify(fm.title)}.md`);
    await fs.writeFile(outFile, buildFrontmatter(merged) + outBody);
    log(`→ ${path.relative(ROOT, outFile)}`);
    wrote++;
  }
  log(`完成：写入 ${wrote}，跳过 ${skipped}`);
}

async function collectFiles(root) {
  const out = new Set();
  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else out.add(p);
    }
  }
  await walk(root);
  return out;
}

main().catch((e) => {
  console.error('[sync] 失败：', e);
  process.exit(1);
});
