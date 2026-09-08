---
title: 按硬性条件给简历分档，而不是让它替你决定
summary: 它只输出"必看 / 可看 / 不看 + 理由"，决定权还在你手上。
scene: 招聘 / 简历筛选
role: 人事 / HR
difficulty: 进阶
order: 5
source: 处方实测
fromPrescription: resume-screening-pipeline
tags: ["招聘人事"]
variables:
  - name: JD 与硬性条件文件
    desc: 你的岗位要求写在哪
    example: jobs/2026-校招-JD.md
  - name: 简历文件夹
    desc: 简历放在哪
    example: resumes/
prompt: |
  按 JD 和硬性条件文件的定义，对 resumes/ 下所有简历做初筛。

  每份简历输出三件事：
  1) 提取出的关键字段（学校 / 专业 / 年级 / 实习经历 / 英语 / 项目）
  2) 命中的硬性条件列表（hit / miss 二值）
  3) 归入哪一档（必看 / 可看 / 不看）+ 一句话理由

  判断逻辑：
  - 必看：100% 硬性条件 hit + 至少 1 项加分项
  - 可看：≥ 80% 硬性条件 hit + 无"明确不录"项
  - 不看：其余
---

## 怎么用

把 JD 和硬性条件先写成文件（哪怕是 md），别在对话里口述——口述每次都会变。

## 为什么这么写

- **硬性条件用"包含任一关键词"而不是"完全等于"**。有人专业写"计算机科学与技术（大数据方向）"，写死等于会整批漏掉。

[看完整处方：简历筛选流水线](/prescriptions/resume-screening-pipeline)
