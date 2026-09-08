---
name: 盯网页变化
summary: 定时抓取、和上次快照对比、有变化才通知——这才是"监控"，不是每天骚扰。
level: 进阶
order: 7
can:
  - 定时抓取指定 URL
  - 与上一次快照对比，只报新增
  - 识别页面结构大改并单独告警
howto: 按清单定时抓取每个 URL，和上次快照对比，有新增才发一句话总结给我，没变化不要通知。
cannot:
  - 抓不了需要登录的页面
  - 反爬强的站点会失败或被封 IP
  - 不写"没变化不通知"，它每天给你发 20 条"今日无变化"，三天后你就把它关了
relatedPrescriptions:
  - competitor-website-watcher
---

第一次跑只是建立基线，**第二天开始才有"变化"可比**。

[看完整处方：让它替你盯竞品官网](/prescriptions/competitor-website-watcher)
