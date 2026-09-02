import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ============================================================
// 痛点处方（核心内容集合）
// ============================================================
const prescriptions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prescriptions' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(), // 卡片上的一行话
    category: z.string(), // "财务 / 行政" 这类
    difficulty: z.enum(['入门', '进阶', '高阶']),
    setupMinutes: z.number(), // 上手耗时（分钟）
    saveHoursPerWeek: z.number(), // 每周省下的小时数
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(), // 封面图（可选）
    /**
     * 可选：真实 Q&A。只有写了才会输出 FAQPage schema。
     * 不要为了 schema 硬造问题——PAA 富摘要靠的是真问题，不是模板。
     */
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
  }),
});

// ============================================================
// 工具罗盘
// ============================================================
const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    tag: z.string(), // 一句话定位
    type: z.enum(['图形界面派', '命令行派', '自动化流派', '浏览器派', '云端派']),
    fit: z.array(z.string()), // 适合谁
    unfit: z.array(z.string()), // 不适合谁
    setupTime: z.string(), // "20 分钟"
    cost: z.string(), // "免费 / 有付费版"
    dataBoundary: z.string(), // 数据安全说明
    order: z.number().default(0),
  }),
});

export const collections = { prescriptions, tools };
