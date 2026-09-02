import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site.js';

export async function GET(context) {
  const prescriptions = (await getCollection('prescriptions', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: prescriptions.map((p) => ({
      title: p.data.title,
      pubDate: p.data.publishedAt,
      description: p.data.summary,
      link: `/prescriptions/${p.id}/`,
      categories: [p.data.category, p.data.difficulty],
    })),
    customData: `<language>zh-cn</language>`,
  });
}
