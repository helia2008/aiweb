---
name: "tencent-docx · 生成 Word"
skillId: "tencent-docx"
summary: "长文、合同、报告一键出 .docx，带样式和目录。"
category: "文档协作"
what:
  - "把 Markdown / 大纲转成带样式的 Word 文档"
  - "生成合同、报告、说明书等结构化文档"
  - "提取文档结构、补目录与排版"
invoke: "对话里用 @skill:tencent-docx 调用，或说「把这篇稿子排成 Word」"
cannot:
  - "复杂表格 / 浮动图片位置不如手动精修"
  - "合同等法律风险文档最终需人工复核条款"
  - "不替代专业排版软件做印刷级成品"
relatedPrescriptions:
  - contract-terms-extraction
order: 13
---

和「合同条款提取」处方互补：先抽条款，再让它在 Word 里生成对照说明。
