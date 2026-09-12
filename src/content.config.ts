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
    /**
     * 编辑精选（2026-09-08 加）：用于「热门 / 精选」排序。
     * 静态站没有浏览量数据，硬做「热门」会名不副实——
     * 所以热门 = 人工指定的精选，order 小的排前，未精选的按发布时间兜底。
     */
    featured: z.boolean().default(false),
    order: z.number().default(0),
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

// ============================================================
// 提示词库（2026-09-08 新增）
// 核心：拿来就能用。每条必须说清「哪些地方要改成你自己的」（variables）——
// 提示词站最常见的不满就是复制过去跑不通，因为占位符没解释。
// ============================================================
const prompts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prompts' }),
  schema: z.object({
    title: z.string(), // 一句话说明解决什么
    summary: z.string(), // 卡片上的一行话
    scene: z.string(), // 场景（如「写周报」「整理发票」）
    role: z.enum(['人事 / HR', '财务 / 采购', '行政 / 通用', '市场 / 运营', '通用']),
    prompt: z.string(), // 提示词正文，用 {{变量}} 标出要替换的地方
    variables: z
      .array(z.object({ name: z.string(), desc: z.string(), example: z.string().optional() }))
      .default([]),
    /**
     * 来源：从处方实测提取，或通用模板。
     * 不冒充——通用模板不声称"我实测过"，这与全站"只写自己跑通过的"立场一致。
     */
    source: z.enum(['处方实测', '通用模板']).default('通用模板'),
    fromPrescription: z.string().optional(), // 提取自哪篇处方（填其 id）
    difficulty: z.enum(['入门', '进阶', '高阶']).default('入门'),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
  }),
});

// ============================================================
// Agent 技能 · 真实 skill 目录（2026-09-09 重构）
// 不是泛化的"能力清单"，而是 WorkBuddy 技能生态里真实可装的 agent skill。
// 每条对应一个真实技能（skillId），教读者怎么调用、能做什么、边界在哪。
// ============================================================
const skills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
  schema: z.object({
    name: z.string(), // 显示名（如「find-skills · 技能发现器」）
    skillId: z.string(), // 真实技能 id（如 find-skills），用于调用
    summary: z.string(), // 一句话定位
    category: z.enum(['文档协作', '知识笔记', '会议音视频', '信息获取', '元技能']),
    what: z.array(z.string()), // 能做什么
    invoke: z.string(), // 怎么调用（@skill:xxx / 面板搜索）
    cannot: z.array(z.string()).default([]), // 边界与注意
    /**
     * 最适合谁（2026-09-12 加）：与工具罗盘的 fit 口径一致。
     * 让读者 3 秒判断「这技能是不是为我准备的」，再决定往下读。
     */
    fit: z.array(z.string()).default([]),
    relatedPrescriptions: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { prescriptions, tools, prompts, skills };
