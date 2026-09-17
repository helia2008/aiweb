# SEO 对齐方案：16 篇处方标题 / Description / FAQ 对照表

> 状态：**已执行**（2026-09-17 落地：16 篇 title 前置搜索词 + 32 FAQ 补入 frontmatter，构建验证 FAQPage 全 16 页各 2 Question）。审通过后批量改 frontmatter，一次推送。
> 原则：正文一字不动，只动 `title` / `summary` 不动（summary 是卡片话术）——**只改 title + 补 faqs**。
> 标题公式：`真实搜索词 + 场景钩子`，保留站点的「自测过」口吻，不堆砌。

## 第 0 步 · 需要你在面板操作的（AI 代办不了 token）

1. **Google Search Console**：
   - [search.google.com/search-console](https://search.google.com/search-console) 添加资源 `https://aiwind.eu.cc` → 选「网域」验证 → 得到一条 TXT 记录
   - 到 Cloudflare 面板 → DNS → 添加 TXT 记录（主机记录 `@`，内容为 GSC 给的 `google-site-verification=...`）
   - 回 GSC 点验证 → 提交 sitemap：`https://aiwind.eu.cc/sitemap-index.xml`
2. **Cloudflare Web Analytics**：
   - CF 面板 → Analytics & Logs → Web Analytics → 启用（免 token 方式会自动注入；若给 JS beacon token，把 token 发我，我加进 BaseLayout）
3. 两者生效后跑 2 周，用「效果报告」里的**已有曝光词**圈定优先改的 3-5 篇（下表顺序即参考优先级）。

## 对照表（16 篇）

| # | id | 现标题 | 新标题（前置搜索词） |
|---|---|---|---|
| 1 | weekly-report-automation | 周报怎么从两小时压到二十分钟 | AI 写周报实操：三个表格十分钟合成一份（指令可抄） |
| 2 | supplier-statement-reconciliation | 供应商对账单和你自己的台账对不上，让它找出差在哪 | AI 对账实操：供应商对账单和台账自动找差异 |
| 3 | list-diff-pipeline | 让 Agent 帮你核对两份名单的差异 | 两份名单怎么核对差异？AI 比对零代码实操 |
| 4 | monthly-expense-reports | 每月 5 号的报销单整理，交给它 | AI 整理报销单：每月报销汇总自动化实操 |
| 5 | quote-pdf-to-table | 二十家供应商的报价单 PDF，让它拆成一张可比的表 | AI 比价表：20 份报价单 PDF 自动拆成一张可比表 |
| 6 | contract-terms-extraction | 200 份合同里的关键条款，抽成一张表 | AI 提取合同关键条款：200 份 PDF 抽成一张对比表 |
| 7 | resume-screening-pipeline | 简历筛选流水线：HR 一晚看完 800 份 | AI 筛简历实操：HR 一晚看完 800 份的初筛流水线 |
| 8 | attendance-exception-triage | 每月几百条考勤异常，让它先把该解释的挑出来 | 考勤异常处理自动化：几百条记录先分类再解释 |
| 9 | employee-roster-auto-update | 入职离职一圈人，让花名册自己更新不用手改 | 花名册自动更新：入职离职信息自动同步实操 |
| 10 | competitor-website-watcher | 让它替你盯竞品官网，有变化才来叫你 | 竞品监控自动化：盯竞品官网，有变化才通知你 |
| 11 | social-listening-summary | 舆情日报：让 Agent 把 20 个信源压成一页纸 | AI 舆情监测实操：20 个信源自动压成一页日报 |
| 12 | meeting-notes-to-action-items | 开完会那堆笔记，让它变成待办清单和责任人 | AI 会议纪要转待办：录音笔记自动变责任清单 |
| 13 | sop-from-screen-recording | 新人天天问系统怎么操作，让它把你演示一遍的过程变成 SOP | AI 生成 SOP：录屏一遍自动变成新人操作手册 |
| 14 | scattered-files-ledger | 散落在微信群和邮件里的文件，让它自动归集成一份台账 | 文件自动归集：微信邮件散文件变成一份台账 |
| 15 | shipment-monthly-summary | 一个月几百张运单，让它汇总成能交差的月度报表 | 运单月报自动化：几百张运单汇总成月度报表 |
| 16 | equipment-maintenance-reminder | 设备该保养了没人记得，让它按运行小时自动排提醒 | 设备保养自动提醒：按运行小时排期，不靠人记 |

## FAQ 草案（每篇 2 条，答案从正文「我踩过的坑」章节取材改写，定稿时逐篇核对原文）

> 通用原则：只写正文真实覆盖的问题，不硬造；每条答案 2-3 句，给可执行结论。

| id | FAQ Q1 | FAQ Q2 |
|---|---|---|
| weekly-report-automation | AI 写的周报领导会看出来是 AI 吗？ | 数据散在多个 Excel / 群消息里怎么办？ |
| supplier-statement-reconciliation | AI 找出的差异能直接信吗？ | 对账文件要什么格式才能读？ |
| list-diff-pipeline | 两份名单列名不一致能比对吗？ | 核对结果怎么防止误判？ |
| monthly-expense-reports | 发票格式五花八门能识别吗？ | 报销数据涉及隐私怎么处理？ |
| quote-pdf-to-table | 扫描版 PDF 能读吗？ | 报价项名称各家不一样怎么对齐？ |
| contract-terms-extraction | AI 抽的条款敢直接用吗（法律风险）？ | 合同文件保密要求高怎么办？ |
| resume-screening-pipeline | AI 初筛会不会漏掉好简历？ | 简历含个人信息，合规上有讲究吗？ |
| attendance-exception-triage | 考勤数据敏感，能交给 AI 吗？ | 异常分类的标准谁定？ |
| employee-roster-auto-update | 人事信息保密要求高，本地能跑吗？ | 入离职信息从哪些渠道自动收集？ |
| competitor-website-watcher | 盯站会被反爬封 IP 吗？ | 多久盯一次合适？ |
| social-listening-summary | 信源怎么选才不会漏？ | AI 摘要会不会丢关键舆情？ |
| meeting-notes-to-action-items | 会议录音杂音重能转写吗？ | 待办的责任人分配准不准？ |
| sop-from-screen-recording | 录屏要录到什么程度才能成 SOP？ | 系统改版后 SOP 怎么更新？ |
| scattered-files-ledger | 微信群文件能直接读吗？ | 归集规则会误收无关文件吗？ |
| shipment-monthly-summary | 运单格式不统一能汇总吗？ | 月报口径（运量/异常率）谁定？ |
| equipment-maintenance-reminder | 运行小时数数据从哪来？ | 提醒发给谁、怎么发？ |

## 定稿后执行清单（AI 操作）

1. 逐篇改 frontmatter `title`（不动 summary，卡片话术保持）
2. 逐篇在 frontmatter 补 `faqs:` 数组（答案与正文核对后落笔）
3. `npx astro build` 验证（FAQPage schema 会随 faqs 字段自动输出）
4. 提交推送 + 线上抽查 JSON-LD
