---
name: "local-audio-transcribe · 音视频转写"
skillId: "local-audio-transcribe"
summary: "本地离线把音视频转成文字并提炼要点，隐私不外传。"
category: "会议音视频"
what:
  - "离线转录 mp3 / wav / m4a 等音视频为文字"
  - "用 Whisper 提炼要点、章节"
  - "无需外部 API，文件不出本机"
invoke: "对话里用 @skill:local-audio-transcribe 调用，或说「转写这段培训录音」"
cannot:
  - "首次需下载模型，体积不小、耗时看机器"
  - "方言 / 噪点重的识别率会降"
  - "长文件分段处理，超长需耐心"
fit:
  - "有涉密录音、不能上传云端的人"
  - "要消化培训 / 访谈 / 会议录音的人"
  - "在离线或弱网环境工作的人"
relatedPrescriptions:
  - sop-from-screen-recording
  - meeting-notes-to-action-items
order: 32
---

怕泄密的音视频优先用它：模型在本地跑，原始文件不出机。
