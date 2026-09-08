---
name: 操作表格
summary: 合并、归一、去重、找差异——Excel 能做的它基本能做，而且能处理"不规则"的输入。
level: 基础
order: 2
can:
  - 把多张表合成一张
  - 按规则归一（"一店"="01 店"="门店1"）
  - 标出重复行、找出两份表的差异
  - 结果另存新文件，不动你的原件
howto: 对比「名单/上周.csv」和「名单/本周.csv」，按手机号判定同人，输出新增 / 流失 / 变更三张表。
cannot:
  - 不会替你判断业务上"哪个是对的"——它只按你给的规则跑
  - 不写"不要改动原文件"，它可能直接覆盖你的原件
  - 没有表头、或合并单元格的表，它基本读不懂
relatedPrescriptions:
  - list-diff-pipeline
  - shipment-monthly-summary
---

**"另存为"三个字一定要写**。这是表格类任务最常出的事故。

[看完整处方：让 Agent 帮你核对两份名单的差异](/prescriptions/list-diff-pipeline)
