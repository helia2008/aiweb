---
title: 对比两份名单，找出新增、流失和改了什么
summary: 用手机号当主键，别用姓名——公司里可能有三个同名的人。
scene: 名单 / 表格对比
role: 行政 / 通用
difficulty: 入门
order: 4
source: 处方实测
fromPrescription: list-diff-pipeline
tags: ["Excel 表格", "文件整理"]
variables:
  - name: 两份名单路径
    desc: 上周的、本周的分别在哪
    example: 名单/上周.csv、名单/本周.csv
  - name: 主键
    desc: 用什么判定"是同一个人"
    example: 手机号
prompt: |
  对比「名单/上周.csv」和「名单/本周.csv」，按"手机号"作为主键判定同人。

  输出三张表：
  1) 新增：本周有、上周没有的人
  2) 流失：上周有、本周没有的人
  3) 字段变更：同人但其他字段有变化（标出哪些字段变了、新值是什么）

  不要猜测。如果"手机号"格式不一致（有的带 86 有的不带），先做归一再对比。
  结果另存为「对比结果-2026-W34.xlsx」。
---

## 怎么用

把两个文件路径和主键换成你的。

## 为什么这么写

**主键选错是这类任务头号翻车点**。用姓名做主键，公司里三个"张伟"的数据会串在一起。

[看完整处方：让 Agent 帮你核对两份名单的差异](/prescriptions/list-diff-pipeline)
