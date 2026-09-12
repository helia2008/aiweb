---
name: "agent-browser · 浏览器自动化"
skillId: "agent-browser"
summary: "开网页、截图、抓内容、点元素、填表，全程自动。"
category: "信息获取"
what:
  - "打开网页并截图"
  - "提取页面内容与链接"
  - "点击元素、填写表单、跑多步流程"
invoke: "对话里用 @skill:agent-browser 调用，或说「打开这个后台把数据抓下来」"
cannot:
  - "遇验证码 / 登录态易卡，敏感操作需你接管"
  - "反爬严格的站点可能失败"
  - "自动填表有风险，涉及支付 / 隐私先确认"
fit:
  - "要定期巡网页后台、盯竞品页面变化的人"
  - "总在重复「开网页 → 截图 → 抄数据」的人"
  - "想跑多步网页流程但不会写爬虫的人"
relatedPrescriptions:
  - competitor-website-watcher
  - social-listening-summary
order: 43
---

和「竞品盯站」处方搭配：让浏览器自己巡站、抓变化，你只看告警。
