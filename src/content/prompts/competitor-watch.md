---
title: 让它盯竞品官网，有变化才来叫你
summary: 没变化就闭嘴，有新增才发一句话总结——这才是"监控"而不是"每天骚扰"。
scene: 竞品 / 网页监控
role: 市场 / 运营
difficulty: 高阶
order: 6
source: 处方实测
fromPrescription: competitor-website-watcher
tags: ["竞品调研", "监控提醒"]
variables:
  - name: 监控清单
    desc: 要盯哪些 URL
    example: watcher/config.yaml
  - name: 通知方式
    desc: 有变化时发到哪
    example: 企业微信机器人 webhook
prompt: |
  按监控清单里的地址定时抓取每个 URL。

  每个 URL 用上一次的快照对比今天抓到的内容：
  - 如果完全没变化：不通知，只更新检查时间。
  - 如果有新增内容：用一句话总结"新增了什么"，附上 URL 和时间，发到通知渠道。
  - 如果页面结构变了（HTML 大改）：单独发一条「⚠️ 结构变化」警告给我。

  抓取时加上 2 秒随机延迟，user-agent 写正常的桌面浏览器，不要并发。
---

## 怎么用

先把要盯的 URL 写成清单文件。第一次跑会建立基线，之后才有"变化"可比。

## 为什么这么写

- **"没变化不通知"是这类工具的生命线**。不写这句，它每天给你发 20 条"今日无变化"，三天后你就把它关了。

[看完整处方：让它替你盯竞品官网](/prescriptions/competitor-website-watcher)
