---
name: 读 PDF 和长文档
summary: 提取文字、抓指定字段、把 40 页压成三段——它读得比你快，但需要你给它边界。
level: 基础
order: 3
can:
  - 提取 PDF 里的文字
  - 按你列的字段去抓，并标出来自第几页
  - 把长文档压成三段摘要
howto: 读「contracts/」下所有 PDF，抓出签约日期 / 到期日 / 付款方式，每条标来自第几页。
cannot:
  - 扫描件（图片型 PDF）要 OCR，而且会认错字
  - 手写体基本没戏
  - 找不到某个字段时它可能会编——必须写"没找到就写未找到"
relatedPrescriptions:
  - contract-terms-extraction
  - quote-pdf-to-table
---

**让它标页码**。没有页码你就得重新翻一遍原文核对，等于没省时间。

[看完整处方：200 份合同里的关键条款](/prescriptions/contract-terms-extraction)
