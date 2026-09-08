---
title: 把 20 个信源压成一页日报
summary: 收集与摘要交给它，你只复核。摘要必须包含新信息，不许复述标题。
scene: 舆情 / 日报
role: 市场 / 运营
difficulty: 进阶
order: 7
source: 处方实测
fromPrescription: social-listening-summary
tags: ["竞品调研", "周报汇报"]
variables:
  - name: 信源清单
    desc: RSS / 公众号 / 网站列表在哪
    example: sources/rss-list.yaml
  - name: 信号词列表
    desc: 老板关心的关键词
    example: signals.yaml
prompt: |
  按信源清单抓过去 24 小时的内容。

  对每条做：
  1) 提取标题、来源、发布时间、链接。
  2) 写一句话摘要（不超过 30 字）。
  3) 命中信号词列表的话，在摘要前标 [命中]。

  摘要必须包含新信息，不能只复述标题。
---

## 怎么用

先让它跑三天纯收集、不摘要，你花十分钟校对收得全不全，再加摘要。

## 为什么这么写

- **"摘要必须包含新信息"这句是防偷懒**。不写它，它把原标题改改就交上来。

[看完整处方：舆情日报](/prescriptions/social-listening-summary)
