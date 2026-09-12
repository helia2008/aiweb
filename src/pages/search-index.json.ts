import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// 静态站：GET 端点在构建期被预渲染为 dist/search-index.json，
// 前端按需 fetch 一次即可做全站检索（零额外依赖、对中文子串匹配友好）。
export const prerender = true;

// 取正文原始 markdown（glob loader 下 entry.body 可用），失败则回退空串。
function bodyOf(entry: any): string {
  return typeof entry?.body === 'string' ? entry.body : '';
}

export const GET: APIRoute = async () => {
  const [prescriptions, prompts, skills, tools] = await Promise.all([
    getCollection('prescriptions', ({ data }) => !data.draft),
    getCollection('prompts'),
    getCollection('skills'),
    getCollection('tools'),
  ]);

  const index: Record<string, unknown>[] = [];

  for (const p of prescriptions) {
    index.push({
      type: '处方',
      title: p.data.title,
      summary: p.data.summary,
      tags: p.data.tags ?? [],
      role: p.data.role,
      url: `/prescriptions/${p.id}`,
      body: bodyOf(p),
    });
  }

  for (const p of prompts) {
    index.push({
      type: '提示词',
      title: p.data.title,
      summary: p.data.summary,
      tags: p.data.tags ?? [],
      role: p.data.role,
      url: `/prompts/${p.id}`,
      body: bodyOf(p),
    });
  }

  for (const s of skills) {
    index.push({
      type: '技能',
      title: s.data.name,
      summary: s.data.summary,
      tags: [s.data.skillId, s.data.category],
      role: s.data.category,
      // 2026-09-12：技能详情页上线，搜索直接命中深链而非列表页
      url: `/skills/${s.id}`,
      body: [...(s.data.what ?? []), ...(s.data.fit ?? []), ...(s.data.cannot ?? []), bodyOf(s)].join(' '),
    });
  }

  for (const t of tools) {
    index.push({
      type: '工具',
      title: t.data.name,
      summary: t.data.tag,
      tags: [t.data.type],
      role: t.data.type,
      url: `/tools/${t.id}`,
      body: [...(t.data.fit ?? []), ...(t.data.unfit ?? []), t.data.dataBoundary ?? '', bodyOf(t)].join(' '),
    });
  }

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
