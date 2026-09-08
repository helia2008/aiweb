---
name: 跑定时任务
summary: 让它每天固定时间自己跑一遍——但电脑关机它就不跑，而且失败了不会主动说。
level: 进阶
order: 8
can:
  - 按 cron / 固定时间自动执行
  - 每个工作日早上自动跑一遍流程
  - 跑完把结果发到你指定的地方
howto: 每个工作日早上 8 点跑一遍，把结果发到企业微信机器人。
cannot:
  - 电脑关机或休眠就不跑（它不是云服务）
  - 失败时不会主动告诉你——要让它发"跑完了，共 N 条"这样的消息
  - 它不会自己判断"这次结果对不对"，只会照跑
relatedPrescriptions:
  - social-listening-summary
  - equipment-maintenance-reminder
---

**让它每次都发一条"跑完了"的消息**。没有这条，它静默失败三个月你都不知道。

[看完整处方：舆情日报](/prescriptions/social-listening-summary)
