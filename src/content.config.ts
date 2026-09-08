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
    category: z.string(), // 细类目（保留作标签，如「财务 / 行政」）
    /**
     * 岗位分桶：首页筛选只用它。
     * 2026-09-07：原 category 有 14 个不同值对应 16 篇文章（其中 12 个只挂 1 篇），
     * 筛选栏被撑到 15 个胶囊、窄屏折三四行，且点任一大概率只出 1 篇——筛选等于废的。
     * 现收敛为 4 个岗位桶，并用 enum 锁死，防止日后再次碎片化。
     */
    role: z.enum(['人事 / HR', '财务 / 采购', '行政 / 通用', '市场 / 运营']),
    difficulty: z.enum(['入门', '进阶', '高阶']),
    setupMinutes: z.number(), // 上手耗时（分钟）
    saveHoursPerWeek: z.number(), // 每周省下的小时数
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(), // 封面图（可选）
    /**
     * 可选：首页「我踩过的坑」区块固定展示的这一条翻车。
     * 不写则回退到从正文自动提取第一条坑（随正文更新，零维护）。
     *
     * 2026-09-08 加：自动提取是按岗位桶取「最新一篇」，导致最有冲击力的翻车
     * （例："我第一次直接交上去，被财务退回"）反而上不了首页。
     * 想让某条固定露出，就在这里手写一句——**必须是正文里真实发生过的，不编造**。
     */
    showcase: z.string().optional(),
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
