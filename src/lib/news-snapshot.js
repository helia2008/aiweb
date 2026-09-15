/**
 * 资讯雷达 · 今日 Top 10 快照（单一数据源）
 * news.astro（完整 Top 10）与 index.astro（首页引流卡）共用，防止双处维护失同步。
 *
 * 更新流程（每周一随「工具精选」一起）：
 *   1. WebFetch github.com/trending        → 更新 ghTop（按今日新增 Star 排序）
 *   2. WebFetch producthunt.com            → 更新 phTop（当日榜顺序 + 赞数）
 *   3. WebFetch news.aibase.com/news       → 更新 aibaseTop（按浏览量排序，子页才有列表）
 *   4. 改 snapshotDate 为当天
 * 全部为抓取当日的一手数据，英文标题翻译为中文，链接直达原文，不编 URL。
 */
export const snapshotDate = '2026-09-15';

export const ghTop = [
  { name: 'debpalash/VoiceStudio', desc: '开源全本地的 ElevenLabs 替代：声音克隆、视频配音、转写与有声书，646 种语言。', lang: 'Python', metric: '+2,774', url: 'https://github.com/debpalash/VoiceStudio' },
  { name: 'JustVugg/colibri', desc: '在你已有的硬件上跑前沿 MoE 大模型：纯 C、零依赖，专家权重从磁盘流式加载。', lang: 'C', metric: '+2,233', url: 'https://github.com/JustVugg/colibri' },
  { name: 'alibaba/open-code-review', desc: '混合架构代码审查：确定性流水线 + LLM Agent，行级精准评论，内置多语言规则集。', lang: 'Go', metric: '+1,796', url: 'https://github.com/alibaba/open-code-review' },
  { name: 'ever-co/ever-gauzy', desc: '开源业务管理平台：ERP / CRM / HRM / ATS / PM 一体。', lang: 'TypeScript', metric: '+1,095', url: 'https://github.com/ever-co/ever-gauzy' },
  { name: 'asgeirtj/system_prompts_leaks', desc: 'Claude、ChatGPT、Gemini、Grok 等各家模型的真实系统提示词合集，持续更新。', lang: 'JavaScript', metric: '+770', url: 'https://github.com/asgeirtj/system_prompts_leaks' },
  { name: 'TauricResearch/TradingAgents', desc: '多 Agent LLM 金融交易框架。', lang: 'Python', metric: '+756', url: 'https://github.com/TauricResearch/TradingAgents' },
  { name: 'Panniantong/Agent-Reach', desc: '给 Agent 全网之眼：一个 CLI 读搜推特、Reddit、YouTube、B站、小红书，零 API 费。', lang: 'Python', metric: '+640', url: 'https://github.com/Panniantong/Agent-Reach' },
  { name: 'multimodal-art-projection/YuE', desc: 'YuE2 前沿音乐生成：符号规划、零样本翻唱、Agent 式音乐编辑。', lang: 'Python', metric: '+578', url: 'https://github.com/multimodal-art-projection/YuE' },
  { name: 'huggingface/transformers', desc: 'Hugging Face 模型定义框架：文本、视觉、音频与多模态模型统一接口。', lang: 'Python', metric: '+528', url: 'https://github.com/huggingface/transformers' },
  { name: '666ghj/MiroFish', desc: '简洁通用的群体智能引擎，预测万物。', lang: 'Python', metric: '+524', url: 'https://github.com/666ghj/MiroFish' },
];

export const phTop = [
  { name: 'Naoma AI Demo Agent V2', desc: '把网站访客流量自动变成预约好的合格会议。', metric: '158 赞', url: 'https://www.producthunt.com/' },
  { name: 'Web Search Agents by Nimble', desc: '自学习 Agent 自动完成网络检索与信息提取。', metric: '45 赞', url: 'https://www.producthunt.com/' },
  { name: 'Hello Inbox', desc: '让营销邮件更多送达收件箱（送达率优化）。', metric: '39 赞', url: 'https://www.producthunt.com/' },
  { name: 'Slashy Assistant', desc: '替你处理邮件的 AI 助手。', metric: '74 赞', url: 'https://www.producthunt.com/' },
  { name: 'Oats', desc: '免费、开源、本地运行的 AI 会议记录器。', metric: '68 赞', url: 'https://www.producthunt.com/' },
  { name: 'Elva', desc: '再见 Postman：你的 API 迎来新消费者（AI Agent）。', metric: '50 赞', url: 'https://www.producthunt.com/' },
  { name: 'Aside', desc: '真正替你干活的 AI 浏览器。', metric: '33 赞', url: 'https://www.producthunt.com/' },
  { name: 'LLMagnet', desc: '让你的 WordPress 网站被 AI 看见（AI 搜索优化）。', metric: '54 赞', url: 'https://www.producthunt.com/' },
  { name: 'AppZapper 3000', desc: '苹果忘了做的卸载器。', metric: '3 赞', url: 'https://www.producthunt.com/' },
  { name: 'OzBrain', desc: '把你的知识共享给所有 AI Agent 和团队成员。', metric: '13 赞', url: 'https://www.producthunt.com/' },
];

export const aibaseTop = [
  { name: '传 DeepSeek 下一代大模型将至：3 万亿参数，性能对标 GPT-6 Astra', desc: '本周已发 V4.1 Flash；V4.1 Pro 已确认，Code 2.0 也曝光在即。', metric: '15.4K 浏览', url: 'https://news.aibase.com/news/31026' },
  { name: 'DeepSeek-V4.1-Flash 登陆千问平台', desc: '552B MoE 架构、激活约 8B，原生图文理解，上下文百万 token。', metric: '13.9K 浏览', url: 'https://news.aibase.com/news/31028' },
  { name: '开源编码工具 OpenCode Go 宣布盈亏平衡', desc: '月费仅 10 美元，连续两周打平——低成本 AI 订阅模式的商业突破。', metric: '13.5K 浏览', url: 'https://news.aibase.com/news/31022' },
  { name: 'GPT-6 Astra 模拟自动售货机一年净赚 1.5 万美元', desc: 'Vending-Bench2 榜首，最差成绩也超过 Claude 的最好成绩，近 3 倍。', metric: '13.1K 浏览', url: 'https://news.aibase.com/news/31035' },
  { name: 'OpenAI 关停最快模型 GPT-5.3-Codex-Spark', desc: '1200 tokens/秒，从发布到退役仅 7 个月，让位给后续模型。', metric: '13.1K 浏览', url: 'https://news.aibase.com/news/31021' },
  { name: 'Anthropic 与 Rum Group 签下 137 亿美元算力协议', desc: '六年期采购，为一年来的算力扩张再添一家供应商。', metric: '13.1K 浏览', url: 'https://news.aibase.com/news/31019' },
  { name: 'OpenAI 推出 Agents API', desc: 'Codex 能力拆分为云服务，「能力即服务」——从卖模型转向建开发者生态。', metric: '12.4K 浏览', url: 'https://news.aibase.com/news/31025' },
  { name: 'Suno 发布音乐模型 v6', desc: '携手华纳、BMG：自然语言即可改歌、混音、采样，旗舰版面向 Pro 用户。', metric: '12.4K 浏览', url: 'https://news.aibase.com/news/31033' },
  { name: '蓝虫具身发布模块化人形机器人「小白」', desc: '西交大成果转化，基座/手臂/腰部/头部标准模块自由组合，起价 0.98 万元。', metric: '12.4K 浏览', url: 'https://news.aibase.com/news/31038' },
  { name: 'YC CEO 反对禁止模型蒸馏', desc: '「与其禁止，不如让开源实验室通过正道合法获取能力」。', metric: '12.0K 浏览', url: 'https://news.aibase.com/news/31037' },
];
