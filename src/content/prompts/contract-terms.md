---
title: 把一堆合同里的关键条款抽成一张表
summary: 200 份合同不用一份份翻。让它抓字段，并且标出每个字段来自第几页——方便你复核。
scene: 合同 / 条款提取
role: 财务 / 采购
difficulty: 进阶
order: 2
source: 处方实测
fromPrescription: contract-terms-extraction
tags: ["PDF 文档", "对账财务"]
variables:
  - name: 文件夹路径
    desc: 合同 PDF 放在哪
    example: contracts/
  - name: 要抓的字段
    desc: 你关心哪几项，换成自己的
    example: 合同名 / 对方主体 / 签约日期 / 到期日 / 付款方式 / 违约金比例
  - name: 输出文件名
    desc: 结果存成什么
    example: 合同汇总-2026-Q3.xlsx
prompt: |
  读「contracts/」下所有 PDF。按下面这张表抓字段：
  合同名 / 对方主体 / 签约日期 / 到期日 / 付款方式 / 违约金比例 / 争议解决地。

  每一条字段后面必须标注它来自第几页，例如：
  签约日期：2025-03-12（第 2 页）。

  如果某份合同没找到某字段，写「未找到」而不是猜。

  结果另存为「合同汇总-2026-Q3.xlsx」。不要改动原文件。
---

## 怎么用

把字段列表换成你真正关心的那几项，别贪多——字段越多，它越容易编。

## 为什么这么写

- **"标第几页"是复核的关键**。没有页码你就得重新翻一遍，等于没省事。
- **"没找到写未找到，不要猜"这句不能删**。合同金额猜错是要出事的。

[看完整处方：200 份合同里的关键条款](/prescriptions/contract-terms-extraction)
