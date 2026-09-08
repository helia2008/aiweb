---
title: 把一周的痕迹收成一份周报草稿
summary: 企业微信、邮件、工单、文档里的痕迹扫一遍，输出做过什么 / 卡在哪 / 还没回的事。
scene: 周报 / 汇报
role: 市场 / 运营
difficulty: 进阶
order: 3
source: 处方实测
fromPrescription: weekly-report-automation
tags: ["周报汇报"]
variables:
  - name: 各来源路径
    desc: 聊天导出、邮件、工单、文档分别在哪
    example: /weekly/wechat/2026-W34/
  - name: 时间范围
    desc: 这一周是哪一周
    example: 2026-W34
prompt: |
  按来源扫我这周留下的痕迹：

  - 企业微信导出：/weekly/wechat/2026-W34/
  - 邮件：/weekly/mail/2026-W34.mbox
  - 工单：/weekly/jira/2026-W34.csv
  - 我的文档：/weekly/docs/2026-W34/

  输出三件事：
  1) 本周做过的事，按"项目 > 关键动作 > 涉及人"列出。
  2) 遇到的问题 / 卡点 / 风险。
  3) 我提过但还没回的事。

  每条标来源（"这条来自企业微信-产品群，8/23"）。
  涉及客户名、人名时一律打码成「XX 公司 / XX 同事」。
  只产出草稿，不要写到我的正式周报文档。
---

## 怎么用

把你自己的四个来源路径换进去。没有工单系统就删掉那一行。

## 为什么这么写

- **"每条标来源"让它不敢编**。没有来源的话你没法判断真假。
- **"只产出草稿"是保险**。让它直接写进正式文档，改都没法改。

[看完整处方：周报怎么从两小时压到二十分钟](/prescriptions/weekly-report-automation)
