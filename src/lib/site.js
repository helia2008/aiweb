/**
 * 站点常量。集中放这里，避免散落在多个组件里。
 *
 * 联系邮箱单一源头：email 字段是全站唯一的联系邮箱定义，
 * 所有模板（Footer / 订阅区 / 痛点门诊 / 关于页）一律引用 SITE.email，
 * 不要在任何 .astro 里再硬编码邮箱——改邮箱只改这一行。
 */
export const SITE = {
  name: '桌面 Agent 实战手册',
  description: '写给不想学编程、但想把重复劳动交出去的人。痛点处方、工具罗盘、痛点门诊——只在跑通后写出来。',
  url: 'https://aiwind.eu.cc',
  author: '桌面 Agent 实战手册',
  email: 'agent@aiwind.eu.cc',
  locale: 'zh-CN',
};
