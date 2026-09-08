---
name: "meeting-notes-pro · 会议纪要"
skillId: "meeting-notes-pro"
summary: "录音 / 文字一键整理成结构化会议纪要。"
category: "会议音视频"
what:
  - "把会议录音或零散文字整理成纪要（结论 / 待办 / 责任人）"
  - "提取行动项并分派"
  - "按你公司的纪要模板输出"
invoke: "对话里用 @skill:meeting-notes-pro 调用，或说「整理这段会议录音」"
cannot:
  - "识别依赖音频质量，杂音大则错漏多"
  - "涉密会议注意数据边界，别把敏感内容外传"
  - "不替你开会，只整理你给的材料"
relatedPrescriptions:
  - meeting-notes-to-action-items
order: 31
---

和「会议纪要转行动项」处方同源：录完直接出待办清单，散会即同步。
